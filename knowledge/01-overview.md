# 项目概览

## 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 框架 | Vue 3 | ^3.4 |
| 跨端 | UniApp (Vite 版) | — |
| 状态管理 | Pinia | ^2.1 |
| UI 组件库 | tt-shaduni (shadcn/ui 风格) | 自研 |
| 云服务 | EMAS Serverless (阿里云) | — |
| 样式 | SCSS + CSS 变量 | — |
| 日期处理 | dayjs | — |

## 项目结构

**tt-shaduni**：组件库，提供 63 个 Vue3 组件。

```
packages/
├── components/     # 63 个 tt- 前缀组件，每个组件一个目录
│   └── tt-button/
│       ├── props.ts
│       └── tt-button.vue
├── composables/    # useSvgIcon 等可复用逻辑
├── styles/         # theme.css + utilities.scss
└── cloud-emas/     # EMAS 云服务封装（子路径按需加载）
```

**tt-daka-mp**：基于 tt-shaduni 的参考项目（打卡小程序），展示完整架构模式。

```
project-root/
├── api/            # API 层：按业务域拆分子目录
│   ├── emas.js     # EMAS 统一入口
│   ├── schema.js   # 集合常量 + JSDoc 类型定义
│   └── project/    # 每个模块一个子目录，每个操作一个文件
├── components/     # 业务包装组件（Tt 前缀，如 TtNavbar）
├── composables/    # usePageFresh 等可复用逻辑
├── config/         # 项目配置 + 多环境
├── pages/          # 页面（按功能域分目录）
│   └── project/
│       ├── index.vue        # 列表页
│       ├── components/      # 页面私有组件
│       └── sub/             # 子页面（detail/add）
├── route/          # 路由集中管理
├── stores/         # Pinia Store（按业务域拆分）
├── styles/         # global.scss → theme.css + utilities.scss
├── utils/          # auth.js、date.js 等工具函数
└── uni_modules/    # tt-shaduni（uni_modules 格式引入）
```

## 构建产物

| 产物 | 用途 |
|------|------|
| H5 | Web 端预览和文档 |
| 微信小程序 | 生产发布 |
| 支付宝小程序 | 生产发布 |
| npm (ESM+CJS) | 其他项目引用 |
| uni_modules | UniApp 项目直接引用 |

## 组件系统

- easycom 自动注册：`tt-` 前缀自动映射 tt-shaduni 组件，`Tt` 前缀映射业务包装组件
- 无需手动 import：在 template 中直接使用 `<tt-button>`
- shadcn/ui 设计风格：中性色调、圆角卡片、CSS 变量驱动主题

## 云服务 (EMAS)

- 通过 `api/emas.js` 统一导出所有 EMAS 能力
- SDK 显式传入：`setupEmas({ sdk: MPServerless, config: {...} })`
- 支持匿名认证和微信认证
- 数据库操作：`db.collection('xxx').where({}).get()`
