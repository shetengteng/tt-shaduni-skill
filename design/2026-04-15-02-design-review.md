# TT ShadUni Skill v2 设计审查反馈

> 审查方法：苏格拉底式批判性思维（Review Mode）
> 审查对象：`2026-04-15-skill-design.md` v2（经第一轮审查修订后）
> 场景类型：🏗️ Design Review
> 核心问题：查询/生成双模式是否应拆分为两个 Skill？

## 整体评估

v2 设计质量明显提升。第一轮审查提出的三个高优先级问题已全部有效解决：

| 第一轮问题 | v2 处理 | 状态 |
|-----------|---------|------|
| 双模式未区分 | Section 3 明确分离，含判断规则 | ✅ 已解决 |
| 模板定位为可执行模板 | 改为 tt-daka-mp 真实代码范例 | ✅ 已解决 |
| Layer 0 可能过长 | 严格控制 ≤100 行 | ✅ 已解决 |

以下为新一轮审查发现。

---

## Dimension A — 问题定义：双模式是否应拆分为两个 Skill？

这是本次审查的核心问题。从五个角度分析：

### 角度 1：知识依赖关系

两种模式共享同一个知识底座：

```
查询模式需要: knowledge/ (组件/主题/图标/EMAS/架构)
生成模式需要: knowledge/ (同上) + templates/ + 08-patterns.md
```

生成模式是查询模式的**超集**。拆分意味着要么复制 `knowledge/`（维护负担），要么建立跨 Skill 引用（AI 不一定能同时加载两个 Skill，不可靠）。

### 角度 2：真实使用场景的模式边界

实际场景经常跨模式：

| 用户输入 | 需要的能力 |
|---------|-----------|
| "帮我生成一个日程模块，用 tt-calendar" | 生成 + 查询（需要知道 tt-calendar API） |
| "tt-button 有哪些 variant？顺便帮我写个登录按钮" | 查询 → 生成 |
| "这个表单页面有什么问题？帮我改一下" | 查询 + 生成 |

如果拆成两个 Skill，这些场景需要 AI **同时加载两个 Skill** 或在对话中**切换 Skill**——在 Cursor/Claude Code 中不可靠。

### 角度 3：Layer 0 的 token 代价

当前 SKILL.md 设计 ≤100 行，其中生成模式相关内容只占约 15 行（模式判断规则 + 知识路由表中的一行）。拆分带来的 token 节省极其有限。

### 角度 4：平台 Skill 匹配机制

Cursor 的 `available_skills` 通过 description 关键词匹配。一个 Skill 的 description 可以覆盖 "组件用法/架构模式/代码生成/模块生成"。拆分后两个 Skill 的 description 反而可能相互竞争，导致 AI 误选。

### 角度 5：行业参考

现有成熟 Skill 的模式都是合并而非拆分：
- `metadata-code-generator`：理解 schema + 生成代码 → 一个 Skill
- `uniapp-mp-generator`：查组件文档 + 生成模块 → 一个 Skill
- `project-knowledge-base`：查知识 + 生成文档 → 一个 Skill

### 结论

**不拆分。** 保持一个 Skill，内部通过模式判断规则区分。当前 v2 的设计（Section 3.3 的模式判断规则 + 渐进式披露）已经是正确的方案。

---

## Dimension B — 假设挑战

### 发现：templates/ 与 tt-daka-mp 的同步假设

v2 设计将 templates/ 定位为 tt-daka-mp 真实代码的副本（Section 5.2）。隐含假设：**tt-daka-mp 的代码是稳定的参考范例。**

风险：如果 tt-daka-mp 后续重构（比如 API 层从单文件改为集中式），templates/ 中的范例会过时，且没有自动化机制检测不一致。

### 建议

在 `templates/` 每个文件顶部的注释中加上**源码版本标记**（如 commit hash 或日期），便于后续对比是否需要同步。或在 Phase 5 验证阶段加一步 diff 检查。

### 优先级：🟢 低（tt-daka-mp 当前架构稳定，短期不会重构）

---

## Dimension C — 视角盲点

### 发现：缺少"修改模式"的判断规则

当前设计有查询和生成两种模式，但遗漏了一个高频场景：**修改/增强现有代码**。

例如：
- "帮我给 project 模块加一个搜索功能"
- "把列表页改成支持下拉刷新"
- "给 schema.js 加一个新字段 priority"

这类操作既不是纯查询也不是从零生成，而是**理解现有代码 → 定点修改**。

### 建议

不需要单独增加第三种模式。在 Section 3.3 模式判断规则中补充：

```
修改模式信号（归入生成模式）:
  - "加一个"、"改一下"、"增强"、"增加功能"
  - AI 应先读取现有模块代码（Layer 2），再进行增量修改
  - 不从模板重新生成，而是基于现有代码调整
```

### 优先级：🟡 中

---

## Dimension D — 风险压测

### 发现 1：Section 5.3 编号重复

设计文档中有两个 Section 5.3：
- 第一个 5.3："范例文件格式"
- 第二个 5.3："字段类型到组件映射"（应为 5.4）

当前 5.4 应改为 5.5。

### 发现 2：gen-component-docs.mjs 的边界情况

脚本从 `props.ts` 提取 props，但部分组件可能：
- 没有独立的 `props.ts`（props 内联在 .vue 文件中）
- 有通过 `extends` 继承的 props
- 使用 composable 导出的 props

建议在脚本设计中预留降级策略——找不到 `props.ts` 时标记为"需手动补充"。

### 优先级：🟢 低

---

## 最高优先级改进项 (Top 3)

| # | 改进项 | 优先级 | 影响范围 |
|---|--------|--------|---------|
| 1 | 双模式保持不拆分（当前设计正确） | ✅ 确认 | 无需改动 |
| 2 | 补充"修改模式"判断规则到 Section 3.3 | 🟡 中 | Section 3.3 |
| 3 | 修复 Section 5.3 编号重复 | 🟢 低 | Section 5 |

---

---

## 补充分析：生成模式的交互优化

### 问题

设计文档 Section 3.2 中的生成模式示例暗示用户需要指定具体组件（如 "用 tt-calendar"），但这增加了用户的认知负担——用户需要先知道有哪些组件、每个组件适合什么场景。

### 分析

Section 5.4 已经定义了字段类型到组件的映射表。AI 完全可以从字段名**自动推断类型并选择组件**：

| 字段名 | 推断类型 | 自动选择 |
|--------|---------|---------|
| name | string | `<tt-input>` |
| startDate | date | `<tt-date-picker>` |
| enabled | boolean | `<tt-switch>` |
| status | enum | `<tt-radio>` |

### 建议的交互流程

```
用户: "帮我生成一个课程管理模块，字段有 name/duration/price/startDate"
  ↓
AI: 展示字段映射预览
  - name(string) → <tt-input>
  - duration(number) → <tt-input type="number">
  - price(number) → <tt-input type="number">
  - startDate(date) → <tt-date-picker>
  确认后开始生成？
  ↓
用户: "好的" 或 "startDate 用 tt-calendar"
  ↓
AI: 生成代码
```

优势：
1. 用户无需预先了解组件库，降低使用门槛
2. AI 通过字段名语义推断，准确率高
3. 保留用户覆盖能力，灵活性不减
4. 生成前确认，避免返工

### 已更新

此建议已合并到设计文档 v3 的 Section 3.2。

---

## Recommended next step

1. ~~在 Section 3.3 补充修改类请求的判断规则~~ ✅ 已完成
2. ~~修复编号问题~~ ✅ 已完成
3. ~~补充生成模式交互优化~~ ✅ 已完成
4. 确认后进入 Phase 1 实施阶段（编写 SKILL.md + knowledge/01-overview.md）
