# TT ShadUni — UniApp 小程序开发 Skill

## 概览
- 包名: tt-shaduni | 风格: shadcn/ui | 框架: Vue3 + UniApp
- 组件前缀: tt- | 图标: Remix Icon (ri-xxx-line/fill)
- 云服务: EMAS Serverless (子路径 tt-shaduni/cloud-emas)
- 平台: H5 / 微信小程序 / 支付宝小程序

## 工作模式

**查询模式**：问组件/架构/主题 → 加载对应知识文件回答
- 信号："怎么用"、"有哪些"、"是什么"、提到 tt-xxx 组件名

**生成模式**：提供模块名+字段 → AI 自动推断类型选组件 → 确认后按 Schema→API→Store→页面→路由 顺序生成
- 信号："生成"、"创建"、"帮我写"、"新增一个 xxx 模块"、提供字段列表
- 修改类（"加一个"、"改一下"）：先读现有代码再增量修改

## 代码规范
1. `<script setup>` Composition API
2. 组件前缀 tt-，easycom 自动注册无需 import
3. rpx 单位（系统值除外）
4. 颜色用 `var(--tt-xxx)` CSS 变量
5. 图标用完整名 `ri-xxx-line` / `ri-xxx-fill`
6. EMAS SDK 显式传入（setupEmas 的 sdk 参数），不用 require
7. API 统一返回 `{ success, data?, error? }`
8. 不用 scoped style，BEM 命名隔离
9. 路由用 `route/index.js`，不硬编码路径
10. dayjs 从 `@/utils/date` 导入

## 组件索引
基础: tt-button tt-icon tt-image tt-typography tt-space tt-divider
布局: tt-row tt-col tt-grid tt-safe-area tt-sticky tt-scroll-view
导航: tt-navbar tt-tabbar tt-tabs tt-sidebar tt-breadcrumb tt-index-bar tt-pagination tt-steps
表单: tt-input tt-textarea tt-switch tt-checkbox tt-radio tt-slider tt-rate tt-number-box tt-search tt-picker tt-date-picker tt-upload tt-form tt-form-item
展示: tt-cell tt-card tt-tag tt-badge tt-avatar tt-list tt-table tt-descriptions tt-collapse tt-count-down tt-progress tt-swiper tt-calendar tt-drag
反馈: tt-dialog tt-popup tt-sheet tt-action-sheet tt-toast tt-loading tt-skeleton tt-empty tt-notice-bar tt-tooltip tt-dropdown-menu tt-swipe-action tt-transition tt-config-provider

## 知识路由
| 意图 | 加载文件 |
|------|---------|
| 组件用法 | knowledge/components/{basic\|layout\|navigation\|form\|display\|feedback}.md |
| 主题颜色 | knowledge/04-theme.md |
| 图标系统 | knowledge/05-icons.md |
| EMAS云服务 | knowledge/06-cloud-emas.md |
| 项目架构 | knowledge/07-architecture.md |
| 生成模块 | knowledge/08-patterns.md + templates/ |
| 常见问题 | knowledge/09-faq.md |
