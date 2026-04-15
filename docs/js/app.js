const { createApp, ref, computed } = Vue

createApp({
  setup() {
    const isDark = ref(false)
    const lang = ref('en')
    const t = computed(() => i18n[lang.value])
    const isZh = computed(() => lang.value === 'zh')

    const modes = computed(() => [
      {
        title: isZh.value ? '查询模式' : 'Query Mode',
        desc: isZh.value
          ? '查询组件 API、主题系统、架构模式、EMAS 云服务等。'
          : 'Ask about component APIs, theme system, architecture patterns, EMAS cloud service, and more.',
        icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
        signals: isZh.value ? ['怎么用', '有哪些', '是什么', 'tt-xxx'] : ['how to use', 'what is', 'which props', 'tt-xxx'],
      },
      {
        title: isZh.value ? '生成模式' : 'Generate Mode',
        desc: isZh.value
          ? '提供模块名+字段，AI 推断类型选组件，按 Schema→API→Store→页面→路由 生成。'
          : 'Provide module name + fields, AI infers types, selects components, generates Schema → API → Store → Page → Route.',
        icon: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        signals: isZh.value ? ['生成', '创建', '帮我写', '新增模块'] : ['generate', 'create', 'write', 'new module'],
      },
      {
        title: isZh.value ? '修改模式' : 'Modify Mode',
        desc: isZh.value
          ? '先读已有代码，再增量修改 —— 添加字段、功能或修复问题。'
          : 'Read existing code first, then make incremental changes — add fields, features, or fix issues.',
        icon: '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
        signals: isZh.value ? ['加一个', '改一下', '修改', '修复'] : ['add a', 'change', 'modify', 'fix'],
      },
    ])

    const scenarios = computed(() => isZh.value ? [
      {
        type: 'query', tag: '查询', title: '组件 API 查询',
        messages: [
          { role: 'user', text: 'tt-button 有哪些 variant？怎么用 outline 样式？' },
          { role: 'ai', text: '<code>tt-button</code> 支持 5 种 variant：<ul class="chat-list"><li><code>default</code> — 实心主色按钮</li><li><code>secondary</code> — 次要灰色按钮</li><li><code>outline</code> — 边框按钮</li><li><code>ghost</code> — 无边框透明背景</li><li><code>destructive</code> — 危险操作红色按钮</li></ul>用法：<code>&lt;tt-button variant="outline"&gt;取消&lt;/tt-button&gt;</code>' },
        ]
      },
      {
        type: 'gen', tag: '生成', title: '从需求生成完整模块',
        messages: [
          { role: 'user', text: '帮我生成一个任务管理模块，字段有 title、deadline、priority、assignee' },
          { role: 'ai', text: '字段类型推断如下：<ul class="chat-list"><li><code>title</code> → <code>&lt;tt-input&gt;</code> 文本输入</li><li><code>deadline</code> → <code>&lt;tt-date-picker&gt;</code> 日期选择</li><li><code>priority</code> → <code>&lt;tt-radio&gt;</code> 单选（高/中/低）</li><li><code>assignee</code> → <code>&lt;tt-picker&gt;</code> 人员选择</li></ul>确认后将生成 8 个文件：Schema、5 个 API、Store、列表页、详情页、表单页、路由配置。' },
        ]
      },
      {
        type: 'modify', tag: '修改', title: '增量修改已有模块',
        messages: [
          { role: 'user', text: '给 project 模块加一个搜索功能' },
          { role: 'ai', text: '已读取 <code>pages/project/index.vue</code> 和 <code>stores/project.js</code>。修改方案：<ul class="chat-list"><li>列表页顶部添加 <code>&lt;tt-search&gt;</code> 组件</li><li>Store 中添加 <code>searchKeyword</code> 状态和 <code>filteredList</code> getter</li><li>API 层添加 <code>keyword</code> 参数传递到 EMAS 查询</li></ul>只修改 3 个文件，其余模块不受影响。' },
        ]
      },
      {
        type: 'cross', tag: '跨模式', title: '先查询后生成',
        messages: [
          { role: 'user', text: 'tt-calendar 怎么用？帮我做一个日程管理页面' },
          { role: 'ai', text: '<code>tt-calendar</code> 核心 props：<code>mode</code>（single/range）、<code>formatter</code>（自定义日期渲染）、<code>showBottom</code>（底部确认栏）。<br><br>现在为你生成日程管理模块，将使用 <code>&lt;tt-calendar mode="single"&gt;</code> + <code>formatter</code> 标记有日程的日期，包含 Schema、API、Store 和页面……' },
        ]
      },
      {
        type: 'query', tag: '查询', title: '架构模式咨询',
        messages: [
          { role: 'user', text: 'EMAS 数据库怎么连接？API 返回格式是什么？' },
          { role: 'ai', text: 'EMAS 通过 <code>setupEmas(sdk)</code> 初始化，SDK 必须显式传入。数据库操作统一走 <code>emas.js</code> 入口：<br><code>const db = emas.database()</code><br><code>const res = await db.collection("xxx").get()</code><br><br>API 统一返回格式：<code>{ success: true, data: [...] }</code> 或 <code>{ success: false, error: "msg" }</code>' },
        ]
      },
    ] : [
      {
        type: 'query', tag: 'QUERY', title: 'Component API Lookup',
        messages: [
          { role: 'user', text: 'What variants does tt-button have? How to use outline style?' },
          { role: 'ai', text: '<code>tt-button</code> supports 5 variants:<ul class="chat-list"><li><code>default</code> — solid primary button</li><li><code>secondary</code> — muted gray button</li><li><code>outline</code> — bordered button</li><li><code>ghost</code> — transparent background</li><li><code>destructive</code> — red for dangerous actions</li></ul>Usage: <code>&lt;tt-button variant="outline"&gt;Cancel&lt;/tt-button&gt;</code>' },
        ]
      },
      {
        type: 'gen', tag: 'GENERATE', title: 'Full Module from Requirements',
        messages: [
          { role: 'user', text: 'Generate a task management module with fields: title, deadline, priority, assignee' },
          { role: 'ai', text: 'Field type inference:<ul class="chat-list"><li><code>title</code> → <code>&lt;tt-input&gt;</code> text input</li><li><code>deadline</code> → <code>&lt;tt-date-picker&gt;</code> date picker</li><li><code>priority</code> → <code>&lt;tt-radio&gt;</code> radio (high/medium/low)</li><li><code>assignee</code> → <code>&lt;tt-picker&gt;</code> person picker</li></ul>After confirmation, I\'ll generate 8 files: Schema, 5 APIs, Store, list page, detail page, form page, and route config.' },
        ]
      },
      {
        type: 'modify', tag: 'MODIFY', title: 'Incremental Code Changes',
        messages: [
          { role: 'user', text: 'Add search functionality to the project module' },
          { role: 'ai', text: 'Read <code>pages/project/index.vue</code> and <code>stores/project.js</code>. Plan:<ul class="chat-list"><li>Add <code>&lt;tt-search&gt;</code> at the top of the list page</li><li>Add <code>searchKeyword</code> state and <code>filteredList</code> getter in Store</li><li>Add <code>keyword</code> param to EMAS query in API layer</li></ul>Only 3 files modified, no impact on other modules.' },
        ]
      },
      {
        type: 'cross', tag: 'CROSS-MODE', title: 'Query Then Generate',
        messages: [
          { role: 'user', text: 'How does tt-calendar work? Build me a schedule management page.' },
          { role: 'ai', text: '<code>tt-calendar</code> key props: <code>mode</code> (single/range), <code>formatter</code> (custom date rendering), <code>showBottom</code> (bottom confirm bar).<br><br>Now generating schedule module using <code>&lt;tt-calendar mode="single"&gt;</code> + <code>formatter</code> to mark dates with events. Includes Schema, API, Store, and pages...' },
        ]
      },
      {
        type: 'query', tag: 'QUERY', title: 'Architecture Pattern',
        messages: [
          { role: 'user', text: 'How to connect EMAS database? What\'s the API return format?' },
          { role: 'ai', text: 'EMAS is initialized via <code>setupEmas(sdk)</code> — SDK must be explicitly passed. Database operations go through <code>emas.js</code> entry:<br><code>const db = emas.database()</code><br><code>const res = await db.collection("xxx").get()</code><br><br>Unified API return format: <code>{ success: true, data: [...] }</code> or <code>{ success: false, error: "msg" }</code>' },
        ]
      },
    ])

    const layers = computed(() => [
      {
        tag: 'LAYER 0',
        title: isZh.value ? '入口层' : 'Entry Point',
        desc: isZh.value
          ? 'SKILL.md — 首先加载。包含模式规则、代码规范、组件索引和知识路由表。'
          : 'SKILL.md — loaded first. Contains mode rules, code conventions, component index, and knowledge routing table.',
        files: ['SKILL.md (~60 lines)'],
      },
      {
        tag: 'LAYER 1',
        title: isZh.value ? '知识层' : 'Knowledge Files',
        desc: isZh.value
          ? '13 个分类 Markdown 文件 — 组件文档、主题、图标、EMAS、架构、模式、FAQ。按需加载。'
          : '13 categorized Markdown files — component docs, theme, icons, EMAS, architecture, patterns, FAQ. Loaded on demand.',
        files: ['knowledge/components/*.md', 'knowledge/04~09-*.md'],
      },
      {
        tag: 'LAYER 2',
        title: isZh.value ? '源码层' : 'Source Code',
        desc: isZh.value
          ? '14 个来自 tt-daka-mp 的参考范例 + 需要精确信息时直接读源码。'
          : '14 reference templates from tt-daka-mp + direct source code reading when precise details are needed.',
        files: ['templates/**/*', 'tt-shaduni/packages/**'],
      },
    ])

    const stats = computed(() => [
      { num: '63', label: isZh.value ? '个组件' : 'Components' },
      { num: '13', label: isZh.value ? '个知识文件' : 'Knowledge Files' },
      { num: '14', label: isZh.value ? '个参考范例' : 'Templates' },
      { num: '10', label: isZh.value ? '个架构模式' : 'Architecture Patterns' },
      { num: '3', label: isZh.value ? '个平台支持' : 'Platforms' },
    ])

    const platforms = computed(() => isZh.value ? [
      {
        name: 'Cursor', sub: '通过 Skills 目录加载',
        steps: [
          { text: '克隆仓库', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: '将 skill/ 目录复制到 Cursor Skills 目录', code: 'cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/' },
          { text: '重启 Cursor，Skill 会自动出现在 available_skills 列表中', code: null },
        ]
      },
      {
        name: 'Codex', sub: '通过 AGENTS.md 自动读取',
        steps: [
          { text: '克隆仓库', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: '将入口文件和知识目录复制到项目根目录', code: 'cp tt-shaduni-skill/skill/AGENTS.md ./\ncp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/\ncp -r tt-shaduni-skill/skill/templates/ ./templates/' },
          { text: 'Codex 会自动读取 AGENTS.md 并加载知识', code: null },
        ]
      },
      {
        name: 'Claude Code', sub: '通过 CLAUDE.md 自动读取',
        steps: [
          { text: '克隆仓库', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: '将入口文件和知识目录复制到项目根目录', code: 'cp tt-shaduni-skill/skill/CLAUDE.md ./\ncp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/\ncp -r tt-shaduni-skill/skill/templates/ ./templates/' },
          { text: 'Claude Code 会自动读取 CLAUDE.md 并加载知识', code: null },
        ]
      },
    ] : [
      {
        name: 'Cursor', sub: 'Load via Skills directory',
        steps: [
          { text: 'Clone the repository', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: 'Copy skill/ directory to Cursor Skills', code: 'cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/' },
          { text: 'Restart Cursor. The skill will appear in available_skills automatically.', code: null },
        ]
      },
      {
        name: 'Codex', sub: 'Auto-read via AGENTS.md',
        steps: [
          { text: 'Clone the repository', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: 'Copy entry file and knowledge to project root', code: 'cp tt-shaduni-skill/skill/AGENTS.md ./\ncp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/\ncp -r tt-shaduni-skill/skill/templates/ ./templates/' },
          { text: 'Codex will auto-read AGENTS.md and load the knowledge.', code: null },
        ]
      },
      {
        name: 'Claude Code', sub: 'Auto-read via CLAUDE.md',
        steps: [
          { text: 'Clone the repository', code: 'git clone https://github.com/shetengteng/tt-shaduni-skill.git' },
          { text: 'Copy entry file and knowledge to project root', code: 'cp tt-shaduni-skill/skill/CLAUDE.md ./\ncp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/\ncp -r tt-shaduni-skill/skill/templates/ ./templates/' },
          { text: 'Claude Code will auto-read CLAUDE.md and load the knowledge.', code: null },
        ]
      },
    ])

    function toggleTheme() {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }
    function toggleLang() { lang.value = lang.value === 'en' ? 'zh' : 'en' }

    return { isDark, lang, t, isZh, modes, scenarios, layers, stats, platforms, toggleTheme, toggleLang }
  }
}).mount('#app')
