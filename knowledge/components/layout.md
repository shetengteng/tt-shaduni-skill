# 布局组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-row

**RowJustify**: `'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`

**RowAlign**: `'top' | 'middle' | 'bottom'`

| Prop | Type | Default |
|------|------|---------|
| gutter | `Number` | `0` |
| justify | `RowJustify` | `'start'` |
| align | `RowAlign` | `'top'` |
| wrap | `Boolean` | `true` |

> 源码: packages/components/tt-row/props.ts
> 实现: packages/components/tt-row/tt-row.vue

---

### tt-col

| Prop | Type | Default |
|------|------|---------|
| span | `Number` | `24` |
| offset | `Number` | `0` |

> 源码: packages/components/tt-col/props.ts
> 实现: packages/components/tt-col/tt-col.vue

---

### tt-grid

| Prop | Type | Default |
|------|------|---------|
| columnNum | `Number` | `4` |
| border | `Boolean` | `true` |
| square | `Boolean` | `false` |
| gutter | `Number` | `0` |

> 源码: packages/components/tt-grid/props.ts
> 实现: packages/components/tt-grid/tt-grid.vue

---

### tt-safe-area

| Prop | Type | Default |
|------|------|---------|
| position | `'top' | 'bottom'` | `'bottom'` |

> 源码: packages/components/tt-safe-area/props.ts
> 实现: packages/components/tt-safe-area/tt-safe-area.vue

---

### tt-sticky

| Prop | Type | Default |
|------|------|---------|
| offsetTop | `Number` | `0` |
| zIndex | `Number` | `99` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-sticky/props.ts
> 实现: packages/components/tt-sticky/tt-sticky.vue

---

### tt-scroll-view

| Prop | Type | Default |
|------|------|---------|
| scrollX | `Boolean` | `false` |
| scrollY | `Boolean` | `true` |
| refresherEnabled | `Boolean` | `false` |
| refresherTriggered | `Boolean` | `false` |
| lowerThreshold | `Number` | `50` |

> 源码: packages/components/tt-scroll-view/props.ts
> 实现: packages/components/tt-scroll-view/tt-scroll-view.vue

---
