# 图标系统

## Remix Icon

tt-shaduni 使用 Remix Icon 的 SVG 文件作为图标来源。

### 命名规则

| 格式 | 说明 | 示例 |
|------|------|------|
| `ri-xxx-line` | 线性图标 | `ri-home-line` |
| `ri-xxx-fill` | 填充图标 | `ri-home-fill` |

### 存放位置

SVG 文件存放在 `static/svg/` 目录下，文件名即图标名：

```
static/svg/
├── ri-home-line.svg
├── ri-home-fill.svg
├── ri-checkbox-circle-line.svg
├── ri-arrow-left-s-line.svg
└── ...
```

### tt-icon 组件用法

```vue
<!-- 基本用法 -->
<tt-icon name="ri-home-line" />

<!-- 自定义大小和颜色 -->
<tt-icon name="ri-home-fill" :size="48" color="#3B82F6" />

<!-- 使用 CSS 变量颜色 -->
<tt-icon name="ri-check-line" :size="28" :color="'var(--tt-success)'" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | String | '' | 图标名（ri-xxx-line/fill 格式） |
| svg | String | '' | 直接传入 SVG 字符串 |
| size | string \| number | 48 | 图标大小（rpx） |
| color | String | '' | 图标颜色 |

### 加载机制

图标通过 `useSvgIcon` composable 加载：
- H5 端：fetch 请求 SVG 文件
- 小程序端：通过文件系统读取
- 默认路径：`./static/svg/`（相对路径，兼容子路径部署）

### 常见图标速查

| 场景 | 图标名 |
|------|--------|
| 返回 | `ri-arrow-left-s-line` |
| 首页 | `ri-home-line` / `ri-home-fill` |
| 设置 | `ri-settings-line` |
| 搜索 | `ri-search-line` |
| 添加 | `ri-add-line` |
| 删除 | `ri-delete-bin-line` |
| 编辑 | `ri-edit-line` |
| 勾选 | `ri-check-line` |
| 关闭 | `ri-close-line` |
| 更多 | `ri-more-2-fill` |
| 日历 | `ri-calendar-line` |
| 用户 | `ri-user-line` |

> 源码: packages/composables/useSvgIcon.ts
> 图标目录: static/svg/
