#!/usr/bin/env node
// 从 tt-shaduni 源码自动生成组件分类文档

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILL_ROOT = resolve(__dirname, '..')

const SHADUNI_ROOT = process.argv[2] || resolve(SKILL_ROOT, '..', 'tt-shaduni')
const COMPONENTS_DIR = join(SHADUNI_ROOT, 'packages', 'components')
const OUTPUT_DIR = join(SKILL_ROOT, 'knowledge', 'components')

const CATEGORIES = {
  basic: ['tt-button', 'tt-icon', 'tt-image', 'tt-typography', 'tt-space', 'tt-divider'],
  layout: ['tt-row', 'tt-col', 'tt-grid', 'tt-safe-area', 'tt-sticky', 'tt-scroll-view'],
  navigation: ['tt-navbar', 'tt-tabbar', 'tt-tabs', 'tt-sidebar', 'tt-breadcrumb', 'tt-index-bar', 'tt-pagination', 'tt-steps'],
  form: ['tt-input', 'tt-textarea', 'tt-switch', 'tt-checkbox', 'tt-checkbox-group', 'tt-radio', 'tt-slider', 'tt-rate', 'tt-number-box', 'tt-search', 'tt-picker', 'tt-date-picker', 'tt-upload', 'tt-form', 'tt-form-item'],
  display: ['tt-cell', 'tt-card', 'tt-tag', 'tt-badge', 'tt-avatar', 'tt-list', 'tt-table', 'tt-descriptions', 'tt-collapse', 'tt-collapse-item', 'tt-count-down', 'tt-progress', 'tt-swiper', 'tt-calendar', 'tt-drag'],
  feedback: ['tt-dialog', 'tt-popup', 'tt-sheet', 'tt-action-sheet', 'tt-toast', 'tt-loading', 'tt-skeleton', 'tt-empty', 'tt-notice-bar', 'tt-tooltip', 'tt-dropdown-menu', 'tt-swipe-action', 'tt-transition', 'tt-config-provider'],
}

const CATEGORY_NAMES = {
  basic: '基础组件',
  layout: '布局组件',
  navigation: '导航组件',
  form: '表单组件',
  display: '展示组件',
  feedback: '反馈组件',
}

function parsePropsTs(content) {
  const props = []
  const typeAliases = []

  // Extract type aliases: handle multiline `export type Xxx = ...`
  // Find all `export type` declarations and collect until the next `export` or end of type
  const lines = content.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const aliasMatch = line.match(/^export\s+type\s+(\w+)\s*=\s*(.*)/)
    if (aliasMatch) {
      const name = aliasMatch[1]
      if (name.endsWith('Props')) { i++; continue }
      let def = aliasMatch[2].trim()
      // Collect multiline type definitions
      while (i + 1 < lines.length && !def.endsWith(';') && !lines[i + 1].match(/^export\s/)) {
        i++
        def += ' ' + lines[i].trim()
      }
      def = def.replace(/;$/, '').trim()
      // Clean up: collapse whitespace, remove leading |
      def = def.replace(/\s*\|\s*/g, ' | ').replace(/^\|\s*/, '').trim()
      typeAliases.push({ name, definition: def })
    }
    i++
  }

  // Find the props object: look for `export const xxxProps = {`
  const propsObjMatch = content.match(/export\s+const\s+\w+Props\s*=\s*\{([\s\S]*)\}\s*$/m)
  if (!propsObjMatch) return { props, typeAliases }

  const propsBody = propsObjMatch[1]

  // Parse individual props using brace matching
  const propRe = /(\w+)\s*:\s*\{/g
  let match
  while ((match = propRe.exec(propsBody)) !== null) {
    const name = match[1]
    const startIdx = match.index + match[0].length
    let depth = 1
    let endIdx = startIdx
    for (let j = startIdx; j < propsBody.length && depth > 0; j++) {
      if (propsBody[j] === '{') depth++
      else if (propsBody[j] === '}') depth--
      endIdx = j
    }
    const block = propsBody.substring(startIdx, endIdx)

    // Extract type
    let type = 'unknown'
    const propTypeMatch = block.match(/PropType<([^>]+)>/)
    if (propTypeMatch) {
      type = propTypeMatch[1].trim()
    } else {
      const typeMatch = block.match(/type\s*:\s*(\[[\w,\s]+\]|\w+)/)
      if (typeMatch) type = typeMatch[1].trim()
    }

    // Extract default value
    let defaultVal = '—'
    const defaultFnMatch = block.match(/default\s*:\s*\(\)\s*=>/)
    const defaultMatch = block.match(/default\s*:\s*(.+?)(?:,\s*$|\s*$)/m)
    if (defaultFnMatch) {
      defaultVal = '() => ...'
    } else if (defaultMatch) {
      defaultVal = defaultMatch[1].trim().replace(/,$/, '').trim()
      if (defaultVal === "''") defaultVal = "''"
    }

    props.push({ name, type, default: defaultVal })
  }

  return { props, typeAliases }
}

function generateComponentSection(componentName) {
  const propsFile = join(COMPONENTS_DIR, componentName, 'props.ts')

  if (!existsSync(propsFile)) {
    return `### ${componentName}\n\n> ⚠️ 需手动补充（无 props.ts）\n\n> 源码: packages/components/${componentName}/${componentName}.vue\n`
  }

  const content = readFileSync(propsFile, 'utf-8')
  const { props, typeAliases } = parsePropsTs(content)

  let md = `### ${componentName}\n\n`

  if (typeAliases.length > 0) {
    for (const alias of typeAliases) {
      md += `**${alias.name}**: \`${alias.definition}\`\n\n`
    }
  }

  if (props.length > 0) {
    md += `| Prop | Type | Default |\n`
    md += `|------|------|---------|\n`
    for (const p of props) {
      md += `| ${p.name} | \`${p.type}\` | \`${p.default}\` |\n`
    }
  } else {
    md += `无自定义 props。\n`
  }

  md += `\n> 源码: packages/components/${componentName}/props.ts\n`
  md += `> 实现: packages/components/${componentName}/${componentName}.vue\n`

  return md
}

function generateCategoryFile(category, componentNames) {
  const title = CATEGORY_NAMES[category]
  let md = `# ${title}\n\n`
  md += `> 自动生成自 tt-shaduni 源码，运行 \`node scripts/gen-component-docs.mjs\` 更新\n\n`

  for (const name of componentNames) {
    md += generateComponentSection(name)
    md += '\n---\n\n'
  }

  return md.trimEnd() + '\n'
}

// Main
console.log(`📂 组件目录: ${COMPONENTS_DIR}`)
console.log(`📝 输出目录: ${OUTPUT_DIR}`)

let totalComponents = 0
for (const [category, names] of Object.entries(CATEGORIES)) {
  const md = generateCategoryFile(category, names)
  const outFile = join(OUTPUT_DIR, `${category}.md`)
  writeFileSync(outFile, md, 'utf-8')
  totalComponents += names.length
  console.log(`  ✅ ${category}.md — ${names.length} 个组件`)
}

console.log(`\n🎉 完成！共生成 ${Object.keys(CATEGORIES).length} 个文件，覆盖 ${totalComponents} 个组件`)
