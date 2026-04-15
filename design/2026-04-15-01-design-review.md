# TT ShadUni Skill 设计审查反馈

> 审查方法：苏格拉底式批判性思维（Review Mode）
> 审查对象：`2026-04-15-skill-design.md`
> 场景类型：🏗️ Design Review

## 审查结论

核心目标清晰，整体设计方向正确。以下是从四个维度发现的问题和改进建议。

---

## Dimension A — 问题定义：Skill 的双重角色未区分

### 发现

设计文档同时承担了两个不同的角色，但没有明确区分：

1. **知识库 Skill**（查询组件 API、架构模式、主题系统）
2. **代码生成器 Skill**（模板驱动，从需求文档生成完整模块）

这两个角色的触发条件、工作流、输出形式完全不同：

| 维度 | 知识库模式 | 生成器模式 |
|------|-----------|-----------|
| 触发 | "tt-button 怎么用" | "帮我生成一个课程管理模块" |
| 输入 | 单个问题 | 需求文档（字段、页面、功能点） |
| 工作流 | 路由到对应知识文件 → 返回 API/示例 | 分析需求 → 按顺序生成 8 类文件 |
| 输出 | 知识片段 + 代码示例 | 完整模块代码（Schema/API/Store/页面/路由） |

### 建议

在 SKILL.md 中明确区分两种模式，各自有独立的触发条件和工作流描述。用户进入时 AI 先判断属于哪种模式。

### 优先级：🔴 高

---

## Dimension B — 假设挑战：模板消费者不是模板引擎

### 发现 1：AI 不做字符串替换

设计中 `templates/` 目录的模板文件用 `{{MODULE_NAME}}` 等变量，参考了 uniapp-mp-generator 的做法。但 AI Agent（Cursor/Claude Code）不是模板引擎——它们不会做 `{{变量}}` 的字符串替换。

AI 的实际行为是：读取模板 → 理解模式 → 生成新代码。

### 建议

模板文件的定位应该是**参考范例**而非**可执行模板**。两种方案：

- **方案 A**：保留变量占位符，但在 SKILL.md 中说明"AI 读取模板理解模式后，用实际值替换生成代码"
- **方案 B**（推荐）：直接用 tt-daka-mp 中的真实代码作为范例（如 project 模块），AI 更容易理解真实代码的模式

### 发现 2：JSON 配置对 AI 的指导效果有限

`default_config.json` 中的 `fieldTypes` 映射假设 AI 会读取并严格遵循。但 AI 更擅长理解自然语言+示例代码，而非 JSON 配置。

### 建议

将字段类型映射直接写入知识文件中，用自然语言+示例代码的形式：

```
字段类型 string → 使用 <tt-input>
字段类型 boolean → 使用 <tt-switch>
字段类型 date → 使用 <tt-date-picker>
```

### 优先级：🟡 中

---

## Dimension C — 视角盲点

### 发现 1：多 Agent 平台兼容性缺失

设计只考虑了 Cursor 的 Skill 加载机制（`SKILL.md` 通过 `available_skills` 加载）。但目标受众包括 Codex 和 Claude Code，它们的加载机制不同：

| 平台 | Skill 加载方式 |
|------|--------------|
| Cursor | `.cursor/skills/xxx/SKILL.md`，通过 `available_skills` 匹配 |
| Codex | `AGENTS.md` 或 `.codex/` 目录 |
| Claude Code | `CLAUDE.md` 或 `.claude/commands/` |

### 建议

增加一节说明多平台适配策略。核心知识文件（`knowledge/` + `templates/`）是通用的，只需要为不同平台生成不同的入口文件。

### 发现 2：渐进式披露的 Layer 2 跳转缺乏路径指引

Layer 1 → Layer 2 的跳转依赖 AI 自主判断"需要读源码"。但 AI 可能不会主动去读 tt-shaduni 的 `props.ts` 文件，除非知识文件中明确给出路径。

### 建议

在组件分类文件中，每个组件条目末尾加上源码路径引用：

```markdown
### tt-button
... props 表格 ...
> 源码: packages/components/tt-button/props.ts
> 实现: packages/components/tt-button/tt-button.vue
```

### 优先级：🟡 中

---

## Dimension D — 风险压测

### 发现 1：63 个组件文档的维护成本

从源码手动提取 63 个组件的 props/events/slots 是一次性大工作量。更关键的是，如果 tt-shaduni 后续新增组件或修改 props，知识文件会过时。

### 建议

编写一个自动化脚本（如 `scripts/gen-skill-docs.mjs`），从 `packages/components/*/props.ts` 自动提取 props 生成组件文档。每次组件变更后运行一次即可同步。

### 发现 2：SKILL.md Layer 0 可能过长

SKILL.md 的 Layer 0 计划包含：项目概览 + 代码规范（10 条）+ 禁止事项（5 条）+ 组件索引（63 个组件）+ 架构分层图 + 路由表 + 模板变量说明。预估 200-300 行。

如果超过 AI 的有效注意力窗口，规范和路由表反而会被"淹没"。

### 建议

SKILL.md 只保留最核心的内容（约 100 行以内）：
- 项目概览（5 行）
- 代码规范（10 条，精简）
- 组件分类索引（只列分类名 + 组件名，不含描述）
- 知识文件路由表

将以下内容下沉到 Layer 1：
- 架构分层图 → `07-architecture.md`
- 模板变量说明 → `08-patterns.md`
- 禁止事项 → 合并到代码规范中

### 优先级：🟡 中

---

## 最高优先级改进项 (Top 3)

| # | 改进项 | 优先级 | 影响范围 |
|---|--------|--------|---------|
| 1 | 明确区分"查询模式"和"生成模式" | 🔴 高 | SKILL.md 结构 |
| 2 | 模板定位为"参考范例"而非"可执行模板" | 🟡 中 | templates/ 目录 |
| 3 | 控制 SKILL.md 长度，核心内容 ≤100 行 | 🟡 中 | SKILL.md 内容 |

## Recommended next step

1. 根据改进项 #1 调整设计文档，在 SKILL.md 设计中增加模式区分
2. 决定模板策略（变量占位符 vs 真实范例）
3. 评估是否需要自动化脚本生成组件文档
4. 确认后进入实施阶段
