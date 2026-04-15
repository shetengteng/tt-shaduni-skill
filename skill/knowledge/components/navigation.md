# 导航组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-navbar

| Prop | Type | Default |
|------|------|---------|
| title | `String` | `''` |
| leftText | `String` | `''` |
| leftArrow | `Boolean` | `false` |
| fixed | `Boolean` | `false` |
| border | `Boolean` | `true` |

> 源码: packages/components/tt-navbar/props.ts
> 实现: packages/components/tt-navbar/tt-navbar.vue

---

### tt-tabbar

| Prop | Type | Default |
|------|------|---------|
| modelValue | `[Number, String]` | `0` |
| items | `TabbarItem[]` | `() => ...` |
| fixed | `Boolean` | `true` |
| placeholder | `Boolean` | `true` |
| border | `Boolean` | `true` |
| safeAreaInsetBottom | `Boolean` | `true` |
| activeColor | `String` | `''` |
| inactiveColor | `String` | `''` |

> 源码: packages/components/tt-tabbar/props.ts
> 实现: packages/components/tt-tabbar/tt-tabbar.vue

---

### tt-tabs

| Prop | Type | Default |
|------|------|---------|
| modelValue | `string | number` | `0` |
| items | `Array<{ label: string; value: string | number; disabled?: boolean }` | `() => ...` |

> 源码: packages/components/tt-tabs/props.ts
> 实现: packages/components/tt-tabs/tt-tabs.vue

---

### tt-sidebar

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Number` | `0` |
| items | `SidebarItem[]` | `() => ...` |
| width | `String` | `'160rpx'` |

> 源码: packages/components/tt-sidebar/props.ts
> 实现: packages/components/tt-sidebar/tt-sidebar.vue

---

### tt-breadcrumb

| Prop | Type | Default |
|------|------|---------|
| items | `BreadcrumbItem[]` | `() => ...` |
| separator | `String` | `'/'` |

> 源码: packages/components/tt-breadcrumb/props.ts
> 实现: packages/components/tt-breadcrumb/tt-breadcrumb.vue

---

### tt-index-bar

| Prop | Type | Default |
|------|------|---------|
| indexList | `string[]` | `() => ...` |
| activeIndex | `String` | `''` |

> 源码: packages/components/tt-index-bar/props.ts
> 实现: packages/components/tt-index-bar/tt-index-bar.vue

---

### tt-pagination

**PaginationMode**: `'simple' | 'number'`

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Number` | `1` |
| totalItems | `Number` | `0` |
| itemsPerPage | `Number` | `10` |
| mode | `PaginationMode` | `'number'` |
| showPageSize | `Number` | `5` |

> 源码: packages/components/tt-pagination/props.ts
> 实现: packages/components/tt-pagination/tt-pagination.vue

---

### tt-steps

| Prop | Type | Default |
|------|------|---------|
| active | `Number` | `0` |
| direction | `'horizontal' | 'vertical'` | `'horizontal'` |
| items | `StepItem[]` | `() => ...` |

> 源码: packages/components/tt-steps/props.ts
> 实现: packages/components/tt-steps/tt-steps.vue

---
