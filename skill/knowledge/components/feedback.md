# 反馈组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-dialog

| Prop | Type | Default |
|------|------|---------|
| show | `Boolean` | `false` |
| title | `String` | `''` |
| message | `String` | `''` |
| showCancelButton | `Boolean` | `true` |
| confirmText | `String` | `'Confirm'` |
| cancelText | `String` | `'Cancel'` |

> 源码: packages/components/tt-dialog/props.ts
> 实现: packages/components/tt-dialog/tt-dialog.vue

---

### tt-popup

**PopupPosition**: `'center' | 'top' | 'bottom' | 'left' | 'right'`

| Prop | Type | Default |
|------|------|---------|
| show | `Boolean` | `false` |
| position | `PopupPosition` | `'center'` |
| overlay | `Boolean` | `true` |
| closeable | `Boolean` | `false` |
| round | `Boolean` | `false` |
| duration | `Number` | `300` |

> 源码: packages/components/tt-popup/props.ts
> 实现: packages/components/tt-popup/tt-popup.vue

---

### tt-sheet

| Prop | Type | Default |
|------|------|---------|
| show | `Boolean` | `false` |
| position | `'bottom' | 'right'` | `'bottom'` |
| title | `String` | `''` |

> 源码: packages/components/tt-sheet/props.ts
> 实现: packages/components/tt-sheet/tt-sheet.vue

---

### tt-action-sheet

| Prop | Type | Default |
|------|------|---------|
| show | `Boolean` | `false` |
| title | `String` | `''` |
| actions | `Array<{ name: string; disabled?: boolean; color?: string }` | `() => ...` |
| cancelText | `String` | `'Cancel'` |

> 源码: packages/components/tt-action-sheet/props.ts
> 实现: packages/components/tt-action-sheet/tt-action-sheet.vue

---

### tt-toast

| Prop | Type | Default |
|------|------|---------|
| message | `String` | `''` |
| type | `'text' | 'success' | 'fail' | 'loading'` | `'text'` |
| duration | `Number` | `2000` |
| show | `Boolean` | `false` |

> 源码: packages/components/tt-toast/props.ts
> 实现: packages/components/tt-toast/tt-toast.vue

---

### tt-loading

| Prop | Type | Default |
|------|------|---------|
| size | `[String, Number]` | `24` |
| color | `String` | `''` |
| text | `String` | `''` |
| vertical | `Boolean` | `false` |

> 源码: packages/components/tt-loading/props.ts
> 实现: packages/components/tt-loading/tt-loading.vue

---

### tt-skeleton

| Prop | Type | Default |
|------|------|---------|
| loading | `Boolean` | `true` |
| rows | `Number` | `3` |
| avatar | `Boolean` | `false` |
| title | `Boolean` | `true` |
| animate | `Boolean` | `true` |

> 源码: packages/components/tt-skeleton/props.ts
> 实现: packages/components/tt-skeleton/tt-skeleton.vue

---

### tt-empty

| Prop | Type | Default |
|------|------|---------|
| description | `String` | `'No data'` |
| image | `String` | `''` |

> 源码: packages/components/tt-empty/props.ts
> 实现: packages/components/tt-empty/tt-empty.vue

---

### tt-notice-bar

| Prop | Type | Default |
|------|------|---------|
| text | `String` | `''` |
| color | `String` | `''` |
| background | `String` | `''` |
| closeable | `Boolean` | `false` |
| scrollable | `Boolean` | `true` |

> 源码: packages/components/tt-notice-bar/props.ts
> 实现: packages/components/tt-notice-bar/tt-notice-bar.vue

---

### tt-tooltip

**TooltipPlacement**: `'top' | 'bottom' | 'left' | 'right'`

| Prop | Type | Default |
|------|------|---------|
| content | `String` | `''` |
| placement | `TooltipPlacement` | `'top'` |
| show | `Boolean` | `false` |

> 源码: packages/components/tt-tooltip/props.ts
> 实现: packages/components/tt-tooltip/tt-tooltip.vue

---

### tt-dropdown-menu

| Prop | Type | Default |
|------|------|---------|
| options | `DropdownOption[]` | `() => ...` |
| modelValue | `[String, Number]` | `''` |
| title | `String` | `''` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-dropdown-menu/props.ts
> 实现: packages/components/tt-dropdown-menu/tt-dropdown-menu.vue

---

### tt-swipe-action

| Prop | Type | Default |
|------|------|---------|
| leftActions | `SwipeActionButton[]` | `() => ...` |
| rightActions | `SwipeActionButton[]` | `() => ...` |
| disabled | `Boolean` | `false` |
| autoClose | `Boolean` | `true` |

> 源码: packages/components/tt-swipe-action/props.ts
> 实现: packages/components/tt-swipe-action/tt-swipe-action.vue

---

### tt-transition

**TransitionName**: `'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom'`

| Prop | Type | Default |
|------|------|---------|
| show | `Boolean` | `false` |
| name | `TransitionName` | `'fade'` |
| duration | `Number` | `300` |

> 源码: packages/components/tt-transition/props.ts
> 实现: packages/components/tt-transition/tt-transition.vue

---

### tt-config-provider

| Prop | Type | Default |
|------|------|---------|
| theme | `'light' | 'dark'` | `undefined` |
| themeVars | `Record<string, string` | `() => ...` |

> 源码: packages/components/tt-config-provider/props.ts
> 实现: packages/components/tt-config-provider/tt-config-provider.vue

---
