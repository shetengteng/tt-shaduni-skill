# TT ShadUni Skill 设计文档

> 版本：v3（根据第二轮苏格拉底式审查反馈修订）

## 1. 目标

构建一个 AI Agent Skill，将 tt-shaduni 组件库 + tt-daka-mp 项目架构作为知识库，支持两种工作模式：

- **查询模式**：回答组件 API、架构模式、主题系统等问题
- **生成模式**：从需求文档生成完整模块代码（Schema + API + Store + 页面 + 路由）

## 2. 受众与平台

### 2.1 受众

使用 Vue3 + UniApp + tt-shaduni 开发微信/支付宝小程序的开发者。

### 2.2 多 Agent 平台适配

核心知识文件（`knowledge/` + `templates/`）是通用的，入口文件按平台适配：

| 平台 | 入口文件 | 加载方式 |
|------|---------|---------|
| Cursor | `SKILL.md` | `.cursor/skills/` 目录，通过 `available_skills` 匹配 |
| Codex | `AGENTS.md` | 项目根目录，Codex 自动读取 |
| Claude Code | `CLAUDE.md` | 项目根目录，Claude Code 自动读取 |

入口文件内容相同（Layer 0），只是文件名和放置位置不同。可通过脚本从 `SKILL.md` 自动生成 `AGENTS.md` 和 `CLAUDE.md`。

## 3. 双模式设计

### 3.1 查询模式（Query）

**触发**：用户问组件用法、架构模式、主题配置等知识性问题。

```
用户: "tt-button 有哪些 variant？"
  ↓
AI 识别: 查询模式 → 组件问题 → basic 分类
  ↓
加载: knowledge/components/basic.md
  ↓
输出: tt-button 的 props 表格 + 示例代码
  ↓
(可选) 需要更精确信息 → 读源码 packages/components/tt-button/props.ts
```

### 3.2 生成模式（Generate）

**触发**：用户要求生成模块、页面、API 等完整代码。

**交互流程**：用户只需提供模块名和字段列表，AI 自动推断字段类型并选择组件。

```
用户: "帮我生成一个课程管理模块，字段有 name/duration/price/startDate/enabled"
  ↓
AI 识别: 生成模式
  ↓
Step 1: 分析需求 → 提取模块名、字段、页面列表
Step 2: 自动推断字段类型 → 自动选择 tt-shaduni 组件
  ┌──────────────────────────────────────────┐
  │ 字段映射预览:                            │
  │ - name(string) → <tt-input>              │
  │ - duration(number) → <tt-input type="number"> │
  │ - price(number) → <tt-input type="number">    │
  │ - startDate(date) → <tt-date-picker>     │
  │ - enabled(boolean) → <tt-switch>         │
  │                                          │
  │ 页面: 列表页 + 详情页 + 新增/编辑页     │
  │ 确认后开始生成？                         │
  └──────────────────────────────────────────┘
Step 3: 用户确认（或调整，如 "startDate 用 tt-calendar"）
Step 4: 加载 templates/ 中的参考范例
Step 5: 按顺序生成:
  ① api/schema.js 添加集合常量 + JSDoc 类型
  ② api/course/*.js（CRUD API 文件）
  ③ stores/course.js
  ④ pages/course/index.vue + sub/
  ⑤ pages/course/components/
  ⑥ route/index.js 添加路径和导航函数
  ⑦ pages.json 添加页面配置
```

**组件自动选择规则**：AI 通过字段名推断类型，无需用户指定组件。推断逻辑：

| 字段名特征 | 推断类型 | 默认组件 |
|-----------|---------|---------|
| name/title/desc 等文本 | string | `<tt-input>` |
| price/count/num 等数值 | number | `<tt-input type="number">` |
| remark/content 等长文本 | textarea | `<tt-textarea>` |
| date/time/start/end 等时间 | date | `<tt-date-picker>` |
| enabled/active/is_ 等开关 | boolean | `<tt-switch>` |
| status/type/level 等枚举 | enum | `<tt-radio>` |

用户可在确认步骤中覆盖默认选择（如 "日期用 tt-calendar"），但不是必须的。

### 3.3 模式判断规则（写入 SKILL.md）

```
查询模式信号:
  - 问句（"怎么用"、"有哪些"、"是什么"）
  - 提到具体组件名（tt-button、tt-cell）
  - 问主题/图标/EMAS 用法

生成模式信号:
  - "生成"、"创建"、"帮我写"
  - 提供字段列表或需求文档
  - "新增一个 xxx 模块"

修改模式信号（归入生成模式）:
  - "加一个"、"改一下"、"增强"、"增加功能"
  - 提到现有模块名 + 变更描述
  - AI 应先读取现有模块代码（Layer 2），再进行增量修改
  - 不从模板重新生成，而是基于现有代码调整
```

## 4. 渐进式披露策略

### 4.1 三层架构

```
┌─────────────────────────────────────────────┐
│  Layer 0: SKILL.md（始终加载，≤100 行）      │
│  ─ 项目概览（5 行）                          │
│  ─ 双模式说明 + 判断规则                     │
│  ─ 代码规范（10 条，精简）                   │
│  ─ 组件分类索引（只列分类名 + 组件名）       │
│  ─ 知识文件路由表                            │
├─────────────────────────────────────────────┤
│  Layer 1: 分类知识文件（按需加载）           │
│  ─ 用户问组件 → 加载对应分类的组件文件       │
│  ─ 用户问架构 → 加载架构文件                 │
│  ─ 用户要生成模块 → 加载参考范例             │
├─────────────────────────────────────────────┤
│  Layer 2: 源码参考（按需读取）               │
│  ─ 需要精确 API → 读 tt-shaduni 源码 props  │
│  ─ 需要实现参考 → 读 tt-daka-mp 源码        │
└─────────────────────────────────────────────┘
```

### 4.2 SKILL.md 长度控制

SKILL.md（Layer 0）严格控制在 **≤100 行**，只保留：

1. 项目概览（5 行）
2. 双模式说明 + 判断规则（15 行）
3. 代码规范（10 条，每条 1 行）
4. 组件分类索引（只列名称，不含描述，约 20 行）
5. 知识文件路由表（10 行）

以下内容下沉到 Layer 1：
- ~~架构分层图~~ → `07-architecture.md`
- ~~模板变量说明~~ → `08-patterns.md`
- ~~禁止事项~~ → 合并到代码规范中

### 4.3 知识文件路由表

| 用户意图 | 加载文件 |
|---------|---------|
| 组件用法 | `knowledge/components/{category}.md` |
| 主题/颜色 | `knowledge/04-theme.md` |
| 图标 | `knowledge/05-icons.md` |
| EMAS/数据库 | `knowledge/06-cloud-emas.md` |
| 项目架构 | `knowledge/07-architecture.md` |
| 生成模块 | `knowledge/08-patterns.md` + `templates/` |
| 常见问题 | `knowledge/09-faq.md` |

### 4.4 源码路径指引

组件分类文件中，每个组件条目末尾加上源码路径，引导 AI 在需要时深入 Layer 2：

```markdown
### tt-button
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | ... | ... | ... |

> 源码: packages/components/tt-button/props.ts
> 实现: packages/components/tt-button/tt-button.vue
```

## 5. 模板系统设计

### 5.1 定位：参考范例（非可执行模板）

**关键决策**：模板文件定位为 AI 的**参考范例**，而非传统模板引擎的可执行模板。

原因：AI Agent 不是模板引擎，不会做 `{{变量}}` 字符串替换。AI 的实际行为是读取范例 → 理解模式 → 生成新代码。

因此 `templates/` 目录使用 **tt-daka-mp 中的真实代码片段**作为范例，而非变量占位符模板。

### 5.2 范例文件来源映射

每个范例文件直接复制 tt-daka-mp 的真实代码，顶部添加"模式要点"注释。

| 范例文件 | 来源（tt-daka-mp） | 展示的模式 |
|---------|-------------------|-----------|
| `templates/page/list.vue` | `pages/index/index.vue` | 列表页：onShow 刷新 + usePageFresh + Store 驱动 + 空状态 + 操作菜单 |
| `templates/page/detail.vue` | `pages/project/sub/detail/index.vue` | 详情页：onLoad 获取 ID + fetchDetail + 数据展示 |
| `templates/page/form.vue` | `pages/project/sub/add/index.vue` | 表单页：新增/编辑复用 + 表单验证 + 提交 |
| `templates/api/getList.js` | `api/project/getProjectList.js` | 列表查询：db.collection().where().orderBy().get() |
| `templates/api/getDetail.js` | `api/project/getProjectDetail.js` | 详情查询：含关联数据（打卡记录+连续统计） |
| `templates/api/create.js` | `api/project/createProject.js` | 创建：requireAccountId + sortOrder 计算 + db.add() |
| `templates/api/update.js` | `api/project/updateProject.js` | 更新：db.doc(id).update() |
| `templates/api/delete.js` | `api/project/deleteProject.js` | 删除：db.doc(id).remove() |
| `templates/component/Card.vue` | `pages/index/components/DakaCard.vue` | 业务卡片：props 接收数据 + emit 事件 + tt-shaduni 组件组合 |
| `templates/store/index.js` | `stores/project.js` | Store：restore/persist/markDirty/markFresh + API 封装 |
| `templates/schema/collection.js` | `api/schema.js` | Schema：COLLECTIONS 常量 + JSDoc 类型定义 |
| `templates/composable/usePageFresh.js` | `composables/usePageFresh.js` | 页面新鲜度：dataTs 对比 + TTL 云端检查 |
| `templates/utils/auth.js` | `utils/auth.js` | 身份管理：accountId 持久化 + requireAccountId |
| `templates/config/emas.js` | `api/emas.js` | EMAS 统一入口：setupEmas + 导出所有能力 |

```
templates/
├── page/
│   ├── list.vue
│   ├── detail.vue
│   └── form.vue
├── api/
│   ├── getList.js
│   ├── getDetail.js
│   ├── create.js
│   ├── update.js
│   └── delete.js
├── component/
│   └── Card.vue
├── store/
│   └── index.js
├── schema/
│   └── collection.js
├── composable/
│   └── usePageFresh.js
├── utils/
│   └── auth.js
└── config/
    └── emas.js
```

### 5.3 范例文件格式

每个范例文件顶部添加注释，说明模式要点和来源：

```javascript
/**
 * 范例：获取列表 API
 * 源自：tt-daka-mp/api/project/getProjectList.js
 * 
 * 模式要点：
 * 1. 从 @/api/emas 导入 db 和 COLLECTIONS
 * 2. 使用 requireAccountId() 获取用户身份
 * 3. 返回格式：{ success: boolean, list: array, error?: string }
 * 4. try-catch 包裹，catch 中返回 { success: false }
 * 5. 文件名：get{Module}List.js（camelCase）
 * 
 * 生成新模块时，替换以下内容：
 * - COLLECTIONS.PROJECTS → COLLECTIONS.{YOUR_COLLECTION}
 * - getProjectList → get{Module}List
 * - 业务字段和查询条件
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓
```

### 5.4 字段类型到组件映射

直接在 `08-patterns.md` 中用自然语言+示例说明（而非 JSON 配置）：

```markdown
## 字段类型 → tt-shaduni 组件映射

| 字段类型 | 组件 | 示例 |
|---------|------|------|
| string | `<tt-input>` | `<tt-input v-model="form.name" placeholder="请输入名称" />` |
| number | `<tt-input type="number">` | `<tt-input v-model="form.price" type="number" />` |
| boolean | `<tt-switch>` | `<tt-switch v-model="form.enabled" />` |
| date | `<tt-date-picker>` | `<tt-date-picker v-model="form.startDate" />` |
| enum | `<tt-radio>` | `<tt-radio v-model="form.status" :options="statusOptions" />` |
| textarea | `<tt-textarea>` | `<tt-textarea v-model="form.remark" :maxlength="500" />` |
| array | 自定义 | 根据业务场景选择组件 |
```

### 5.5 模块生成工作流（写入 08-patterns.md）

```
1. 分析需求 → 提取模块名（中英文）、字段列表、页面列表、功能点
2. 生成 Schema → api/schema.js 中添加集合常量 + JSDoc 类型定义
3. 生成 API → api/{module}/*.js（每个操作一个文件，参考 templates/api/）
4. 生成 Store → stores/{module}.js（参考 templates/store/）
5. 生成页面 → pages/{module}/index.vue + sub/（参考 templates/page/）
6. 生成组件 → pages/{module}/components/（参考 templates/component/）
7. 更新路由 → route/index.js 添加路径和导航函数
8. 更新配置 → pages.json 添加页面配置
```

## 6. 项目架构知识（从 tt-daka-mp 提炼）

### 6.1 目录结构规范

```
project-root/
├── api/                    # API 层：按业务域拆分子目录
│   ├── emas.js             # EMAS 统一入口
│   ├── schema.js           # 集合常量 + 类型定义
│   ├── {module}/           # 每个模块一个子目录
│   │   ├── create{Module}.js
│   │   ├── get{Module}List.js
│   │   ├── update{Module}.js
│   │   └── delete{Module}.js
├── components/             # 业务包装组件（Tt 前缀）
├── composables/            # 可复用逻辑
├── config/                 # 项目配置 + 多环境
├── mock/                   # Mock 数据
├── pages/                  # 页面（按功能域分目录）
│   └── {module}/
│       ├── index.vue
│       ├── components/     # 页面私有组件
│       └── sub/            # 子页面
├── plugins/                # 插件
├── route/                  # 路由集中管理
├── stores/                 # Pinia Store（按业务域拆分）
├── styles/                 # 全局样式
├── utils/                  # 工具函数
├── uni_modules/            # tt-shaduni（uni_modules 格式）
├── App.vue / main.js / pages.json / uni.scss
```

### 6.2 分层架构

```
Pages → Components → Composables → Stores → API → Utils → tt-shaduni
```

详细说明移至 `knowledge/07-architecture.md`。

### 6.3 关键架构模式（摘要）

| 模式 | 说明 | 详见 |
|------|------|------|
| EMAS 统一入口 | 所有 EMAS 能力通过 api/emas.js 导出 | 07-architecture.md |
| API 单文件 | 每个操作一个文件，统一返回 `{ success, data?, error? }` | 07-architecture.md |
| Local-First | Store 立即更新 → pending-ops 入队 → 异步同步云端 | 07-architecture.md |
| 页面新鲜度 | usePageFresh：dataTs 对比 + TTL 云端版本检查 | 07-architecture.md |
| Store 缓存 | restore → fetch → persist → markDirty | 07-architecture.md |
| easycom | tt- 自动映射 tt-shaduni，Tt 自动映射业务组件 | 07-architecture.md |
| 业务包装 | TtNavbar/TtTabbar 封装平台差异 | 07-architecture.md |
| 路由集中 | route/index.js 定义路径 + 导航函数 | 07-architecture.md |
| 样式导入链 | global.scss → theme.css + utilities.scss | 07-architecture.md |
| Schema 集中 | api/schema.js 定义集合常量 + JSDoc 类型 | 07-architecture.md |

## 7. Skill 文件结构

```
tt-shaduni-skill/
├── SKILL.md                          # Layer 0: 入口（≤100 行）
├── design/
│   ├── 2026-04-15-skill-design.md    # 设计文档（本文件）
│   └── 2026-04-15-01-design-review.md # 苏格拉底审查反馈
├── knowledge/
│   ├── 01-overview.md                # 项目概览与技术栈
│   ├── components/                   # 组件 API（按分类拆分，含源码路径）
│   │   ├── basic.md
│   │   ├── layout.md
│   │   ├── navigation.md
│   │   ├── form.md
│   │   ├── display.md
│   │   └── feedback.md
│   ├── 04-theme.md                   # 主题系统
│   ├── 05-icons.md                   # 图标系统
│   ├── 06-cloud-emas.md              # EMAS 云服务
│   ├── 07-architecture.md            # 项目架构（10 个模式详解）
│   ├── 08-patterns.md                # 生成模式工作流 + 字段映射 + 范例说明
│   └── 09-faq.md                     # 常见问题
├── templates/                        # 参考范例（tt-daka-mp 真实代码 + 模式要点注释）
│   ├── page/
│   │   ├── list.vue                  # ← pages/index/index.vue
│   │   ├── detail.vue                # ← pages/project/sub/detail/index.vue
│   │   └── form.vue                  # ← pages/project/sub/add/index.vue
│   ├── api/
│   │   ├── getList.js                # ← api/project/getProjectList.js
│   │   ├── getDetail.js              # ← api/project/getProjectDetail.js
│   │   ├── create.js                 # ← api/project/createProject.js
│   │   ├── update.js                 # ← api/project/updateProject.js
│   │   └── delete.js                 # ← api/project/deleteProject.js
│   ├── component/
│   │   └── Card.vue                  # ← pages/index/components/DakaCard.vue
│   ├── store/
│   │   └── index.js                  # ← stores/project.js
│   ├── schema/
│   │   └── collection.js             # ← api/schema.js
│   ├── composable/
│   │   └── usePageFresh.js           # ← composables/usePageFresh.js
│   ├── utils/
│   │   └── auth.js                   # ← utils/auth.js
│   └── config/
│       └── emas.js                   # ← api/emas.js
└── scripts/
    └── gen-component-docs.mjs        # 自动从源码提取组件 props 生成文档
```

## 8. SKILL.md 内容大纲（≤100 行）

```markdown
# TT ShadUni — UniApp 小程序开发 Skill

## 概览
- 包名: tt-shaduni | 风格: shadcn/ui | 框架: Vue3 + UniApp
- 组件前缀: tt- | 图标: Remix Icon (ri-xxx-line/fill)
- 云服务: EMAS Serverless (子路径 tt-shaduni/cloud-emas)
- 平台: H5 / 微信小程序 / 支付宝小程序

## 工作模式
查询模式: 问组件/架构/主题 → 加载对应知识文件
生成模式: 提供需求 → 按 Schema→API→Store→页面→路由 顺序生成

## 代码规范
1. <script setup> Composition API
2. 组件前缀 tt-，easycom 自动注册无需 import
3. rpx 单位（系统值除外）
4. 颜色用 var(--tt-xxx)
5. 图标用完整名 ri-xxx-line / ri-xxx-fill
6. EMAS SDK 显式传入，不用 require
7. API 统一返回 { success, data?, error? }
8. 不用 scoped style，BEM 命名隔离
9. 路由用 route/index.js，不硬编码
10. dayjs 从 @/utils/date 导入

## 组件索引
基础: tt-button tt-icon tt-image tt-typography tt-space tt-divider
布局: tt-row tt-col tt-grid tt-safe-area tt-sticky tt-scroll-view
导航: tt-navbar tt-tabbar tt-tabs tt-sidebar tt-breadcrumb tt-index-bar tt-pagination tt-steps
表单: tt-input tt-textarea tt-switch tt-checkbox tt-radio tt-slider tt-rate tt-number-box tt-search tt-picker tt-date-picker tt-upload tt-form tt-form-item
展示: tt-cell tt-card tt-tag tt-badge tt-avatar tt-list tt-table tt-descriptions tt-collapse tt-count-down tt-progress tt-swiper tt-calendar tt-drag
反馈: tt-dialog tt-popup tt-sheet tt-action-sheet tt-toast tt-loading tt-skeleton tt-empty tt-notice-bar tt-tooltip tt-dropdown-menu tt-swipe-action tt-transition tt-config-provider

## 知识路由
组件用法 → knowledge/components/{basic|layout|navigation|form|display|feedback}.md
主题颜色 → knowledge/04-theme.md
图标系统 → knowledge/05-icons.md
EMAS云服务 → knowledge/06-cloud-emas.md
项目架构 → knowledge/07-architecture.md
生成模块 → knowledge/08-patterns.md + templates/
常见问题 → knowledge/09-faq.md
```

## 9. 自动化文档生成

### 9.1 脚本：gen-component-docs.mjs

从 tt-shaduni 源码自动提取组件 props 生成文档，解决 63 个组件的维护成本问题：

```
输入: packages/components/*/props.ts
输出: knowledge/components/{category}.md

流程:
1. 扫描所有 props.ts 文件
2. 解析 TypeScript 类型定义（PropType、default、type）
3. 按预定义分类分组
4. 生成 Markdown 表格 + 源码路径引用
5. 写入对应分类文件
```

每次 tt-shaduni 组件变更后运行 `node scripts/gen-component-docs.mjs` 即可同步。

## 10. 参考来源

### 10.1 uniapp-mp-generator Skill

从 skillix-hub 的 uniapp-mp-generator 借鉴了以下设计，并做了适配：

| 借鉴 | 适配调整 |
|------|---------|
| 模板驱动生成 | 模板改为"参考范例"（真实代码片段） |
| 需求驱动工作流（8 步生成） | 保留，适配 tt-shaduni 组件 |
| 字段类型映射 | 从 JSON 配置改为自然语言+示例 |
| 禁止事项清单 | 合并到代码规范中 |
| 模块目录结构 | 与 tt-daka-mp 一致 |
| API 单文件模式 | 保留，路径从 pages/内 改为 api/ 顶层 |

### 10.2 tt-daka-mp 项目

提炼了 10 个经过验证的架构模式，作为 `07-architecture.md` 的核心内容。

## 11. 实施计划

### Phase 1：核心入口
- [ ] 编写 SKILL.md（≤100 行，双模式 + 规范 + 索引 + 路由表）
- [ ] 编写 `knowledge/01-overview.md`

### Phase 2：组件知识
- [ ] 编写 `scripts/gen-component-docs.mjs`（自动提取 props）
- [ ] 运行脚本生成 6 个组件分类文件
- [ ] 人工补充 events/slots/示例

### Phase 3：架构与模式
- [ ] 编写 `knowledge/04-theme.md`
- [ ] 编写 `knowledge/05-icons.md`
- [ ] 编写 `knowledge/06-cloud-emas.md`
- [ ] 编写 `knowledge/07-architecture.md`（10 个模式详解）
- [ ] 编写 `knowledge/08-patterns.md`（生成工作流 + 字段映射）
- [ ] 编写 `knowledge/09-faq.md`

### Phase 4：参考范例（从 tt-daka-mp 提取真实代码）
- [ ] `templates/page/list.vue` ← pages/index/index.vue（添加模式要点注释）
- [ ] `templates/page/detail.vue` ← pages/project/sub/detail/index.vue
- [ ] `templates/page/form.vue` ← pages/project/sub/add/index.vue
- [ ] `templates/api/*.js` ← api/project/*.js（5 个 CRUD 文件）
- [ ] `templates/component/Card.vue` ← pages/index/components/DakaCard.vue
- [ ] `templates/store/index.js` ← stores/project.js
- [ ] `templates/schema/collection.js` ← api/schema.js
- [ ] `templates/composable/usePageFresh.js` ← composables/usePageFresh.js
- [ ] `templates/utils/auth.js` ← utils/auth.js
- [ ] `templates/config/emas.js` ← api/emas.js

### Phase 5：验证
- [ ] Cursor 中加载 Skill，测试查询模式
- [ ] 测试生成模式（生成一个新模块）
- [ ] 验证渐进式披露（Layer 0 → 1 → 2）
