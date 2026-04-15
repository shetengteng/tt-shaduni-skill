# 主题系统

## CSS 变量

tt-shaduni 使用 CSS Custom Properties 实现 Light/Dark 主题。所有变量以 `--tt-` 为前缀。

### 导入方式

```scss
// uni.scss 或 global.scss 中引入
@import 'tt-shaduni/styles/theme.css';
@import 'tt-shaduni/styles/utilities.scss';
```

### Light 主题变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--tt-background` | #ffffff | 页面背景 |
| `--tt-foreground` | #0a0a0a | 主文字颜色 |
| `--tt-card` | #f4f4f5 | 卡片背景 |
| `--tt-card-foreground` | #0a0a0a | 卡片文字 |
| `--tt-primary` | #171717 | 主色 |
| `--tt-primary-foreground` | #fafafa | 主色上的文字 |
| `--tt-secondary` | #f5f5f5 | 次要色 |
| `--tt-secondary-foreground` | #171717 | 次要色文字 |
| `--tt-muted` | #f5f5f5 | 弱化背景 |
| `--tt-muted-foreground` | #737373 | 弱化文字 |
| `--tt-accent` | #f5f5f5 | 强调色 |
| `--tt-accent-foreground` | #171717 | 强调色文字 |
| `--tt-border` | #e5e5e5 | 边框 |
| `--tt-input` | #e5e5e5 | 输入框边框 |
| `--tt-ring` | #0a0a0a | 聚焦环 |
| `--tt-success` | #22c55e | 成功 |
| `--tt-warning` | #f97316 | 警告 |
| `--tt-error` | #ef4444 | 错误 |
| `--tt-disabled` | #d4d4d8 | 禁用态 |
| `--tt-overlay` | rgba(0,0,0,0.4) | 遮罩层 |

### Dark 主题变量

通过 `[data-theme="dark"]` 或 `.theme-dark` 激活：

| 变量名 | Dark 值 |
|--------|---------|
| `--tt-background` | #09090b |
| `--tt-foreground` | #fafafa |
| `--tt-card` | #1c1c1e |
| `--tt-primary` | #fafafa |
| `--tt-primary-foreground` | #09090b |
| `--tt-muted` | #27272a |
| `--tt-muted-foreground` | #a1a1aa |
| `--tt-border` | #3f3f46 |

## 使用规范

1. **始终使用 CSS 变量**，不硬编码颜色值：
```vue
<style>
.my-card {
  background-color: var(--tt-card);
  color: var(--tt-card-foreground);
  border: 1rpx solid var(--tt-border);
}
</style>
```

2. **通过 CSS 变量覆盖组件样式**（如 tt-cell 背景色）：
```vue
<tt-cell style="--tt-cell-bg: transparent" />
```

3. **主题切换**：通过给根元素设置 `data-theme="dark"` 属性实现。

## utilities.scss

提供原子化工具类，与 CSS 变量配合使用：
- `.text-foreground`、`.text-muted`、`.bg-card` 等颜色类
- `.flex-center`、`.flex-center-v` 等布局类
- `.rounded-xl`、`.rounded-2xl` 等圆角类
- `.ml-md`、`.mt-xs`、`.p-lg` 等间距类
- `.font-semibold`、`.text-base`、`.text-xs` 等排版类

> 源码: packages/styles/theme.css
> 源码: packages/styles/utilities.scss
