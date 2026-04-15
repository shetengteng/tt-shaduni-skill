# TT ShadUni Skill

将 [tt-shaduni](https://github.com/shetengteng/tt-shaduni) 组件库与 tt-daka-mp 项目架构转化为可查询的 AI 知识库，支持 Cursor、Codex、Claude Code 三个平台。

An AI Agent Skill that turns the [tt-shaduni](https://github.com/shetengteng/tt-shaduni) component library and tt-daka-mp project architecture into a queryable knowledge base for AI coding assistants on Cursor, Codex, and Claude Code.

**在线文档 / Documentation**: [https://shetengteng.github.io/tt-shaduni-skill/](https://shetengteng.github.io/tt-shaduni-skill/)

---

## 安装指南 / Installation

### Cursor

首先克隆本仓库到本地，然后将 `skill/` 目录复制到 Cursor 的 Skills 目录下。重启 Cursor 后，Skill 会自动出现在可用列表中。

Clone this repository and copy the `skill/` directory into Cursor's Skills folder. After restarting Cursor, the skill will automatically appear in the available skills list.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp -r tt-shaduni-skill/skill/ ~/.cursor/skills/tt-shaduni/
```

### Codex

克隆仓库后，将入口文件 `AGENTS.md` 以及 `knowledge/` 和 `templates/` 目录复制到你的项目根目录下。Codex 启动时会自动读取 `AGENTS.md` 并加载知识库。

Clone the repository, then copy the entry file `AGENTS.md` along with the `knowledge/` and `templates/` directories into your project root. Codex will automatically read `AGENTS.md` on startup and load the knowledge base.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/AGENTS.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

### Claude Code

克隆仓库后，将入口文件 `CLAUDE.md` 以及 `knowledge/` 和 `templates/` 目录复制到你的项目根目录下。Claude Code 启动时会自动读取 `CLAUDE.md` 并加载知识库。

Clone the repository, then copy the entry file `CLAUDE.md` along with the `knowledge/` and `templates/` directories into your project root. Claude Code will automatically read `CLAUDE.md` on startup and load the knowledge base.

```bash
git clone https://github.com/shetengteng/tt-shaduni-skill.git
cp tt-shaduni-skill/skill/CLAUDE.md ./
cp -r tt-shaduni-skill/skill/knowledge/ ./knowledge/
cp -r tt-shaduni-skill/skill/templates/ ./templates/
```

---

## 工作模式 / Work Modes

| 模式 / Mode | 说明 / Description | 触发信号 / Trigger Signals |
|-------------|-------------------|--------------------------|
| **查询 / Query** | 查询组件 API、主题系统、架构模式、EMAS 云服务 | "怎么用"、"有哪些"、"是什么"、`tt-xxx` |
| **生成 / Generate** | 提供模块名+字段 → AI 生成完整代码 | "生成"、"创建"、"帮我写"、"新增模块" |
| **修改 / Modify** | 先读取已有代码，再进行增量修改 | "加一个"、"改一下"、"修改"、"修复" |

---

## 交互场景 / Interaction Scenarios

### 场景一：组件 API 查询 / Component API Query

> **你 / You**: tt-button 有哪些 variant？怎么用 outline 样式？
>
> **AI**: `tt-button` 支持 5 种 variant：`default`（实心主色按钮）、`secondary`（次要灰色按钮）、`outline`（边框按钮）、`ghost`（无边框透明背景）、`destructive`（危险操作红色按钮）。
>
> 用法：`<tt-button variant="outline">取消</tt-button>`

### 场景二：从需求生成完整模块 / Full Module Generation

> **你 / You**: 帮我生成一个任务管理模块，字段有 title、deadline、priority、assignee
>
> **AI**: 字段类型推断如下：
> - `title` → `<tt-input>` 文本输入
> - `deadline` → `<tt-date-picker>` 日期选择
> - `priority` → `<tt-radio>` 单选（高/中/低）
> - `assignee` → `<tt-picker>` 人员选择
>
> 确认后将生成 8 个文件：Schema、5 个 API（增删改查+列表）、Store、列表页、详情页、表单页、路由配置。

### 场景三：增量修改已有代码 / Incremental Code Changes

> **你 / You**: 给 project 模块加一个搜索功能
>
> **AI**: 已读取 `pages/project/index.vue` 和 `stores/project.js`。修改方案：
> - 列表页顶部添加 `<tt-search>` 组件
> - Store 中添加 `searchKeyword` 状态和 `filteredList` getter
> - API 层添加 `keyword` 参数传递到 EMAS 查询
>
> 只修改 3 个文件，其余模块不受影响。

### 场景四：先查询后生成（跨模式）/ Query Then Generate

> **你 / You**: tt-calendar 怎么用？帮我做一个日程管理页面
>
> **AI**: `tt-calendar` 核心属性：`mode`（single/range）、`formatter`（自定义日期渲染）、`showBottom`（底部确认栏）。
>
> 现在为你生成日程管理模块，将使用 `<tt-calendar mode="single">` 搭配 `formatter` 标记有日程的日期，包含 Schema、API、Store 和页面……

### 场景五：架构模式咨询 / Architecture Pattern

> **你 / You**: EMAS 数据库怎么连接？API 返回格式是什么？
>
> **AI**: EMAS 通过 `setupEmas(sdk)` 初始化，SDK 必须显式传入。数据库操作统一走 `emas.js` 入口：
> ```javascript
> const db = emas.database()
> const result = await db.collection("xxx").get()
> ```
> API 统一返回格式：`{ success: true, data: [...] }` 或 `{ success: false, error: "错误信息" }`

---

## 渐进式披露 / Progressive Disclosure

| 层级 / Layer | 内容 / Content | 加载时机 / When Loaded |
|-------------|---------------|----------------------|
| Layer 0 | `SKILL.md`（约 60 行） | 始终加载（入口文件） |
| Layer 1 | 13 个知识文件 | 按话题按需加载 |
| Layer 2 | 14 个参考范例 + 源代码 | 需要精确细节时加载 |

---

## 文件结构 / File Structure

```
skill/
├── SKILL.md                    # Cursor 入口 / Cursor entry point
├── AGENTS.md                   # Codex 入口 / Codex entry point
├── CLAUDE.md                   # Claude Code 入口 / Claude Code entry point
├── knowledge/
│   ├── 01-overview.md          # 项目概览 / Project overview
│   ├── components/             # 6 个组件分类文件（63 个组件）
│   │   ├── basic.md            # 基础组件 / Basic components
│   │   ├── layout.md           # 布局组件 / Layout components
│   │   ├── navigation.md       # 导航组件 / Navigation components
│   │   ├── form.md             # 表单组件 / Form components
│   │   ├── display.md          # 展示组件 / Display components
│   │   └── feedback.md         # 反馈组件 / Feedback components
│   ├── 04-theme.md             # CSS 变量主题系统 / CSS variable theme system
│   ├── 05-icons.md             # Remix Icon 图标系统 / Remix Icon system
│   ├── 06-cloud-emas.md        # EMAS Serverless 云服务
│   ├── 07-architecture.md      # 10 个架构模式 / 10 architecture patterns
│   ├── 08-patterns.md          # 生成模式工作流 / Generation workflow
│   └── 09-faq.md               # 常见问题 / Frequently asked questions
├── templates/                  # 14 个来自 tt-daka-mp 的真实代码范例
│   ├── page/                   # 列表页 / 详情页 / 表单页
│   ├── api/                    # 增删改查 + 列表（5 个文件）
│   ├── component/              # 业务卡片组件
│   ├── store/                  # Pinia 状态管理
│   ├── schema/                 # 集合 Schema 定义
│   ├── composable/             # usePageFresh 组合式函数
│   ├── utils/                  # 身份认证工具
│   └── config/                 # EMAS 配置
└── scripts/
    └── gen-component-docs.mjs  # 自动生成组件文档脚本
```

---

## 技术栈 / Tech Stack

- **组件库 / UI Library**: [tt-shaduni](https://github.com/shetengteng/tt-shaduni) — shadcn/ui 风格，63 个组件
- **框架 / Framework**: Vue 3 + UniApp
- **云服务 / Cloud**: EMAS Serverless
- **支持平台 / Platforms**: H5 / 微信小程序 / 支付宝小程序

## 许可协议 / License

MIT
