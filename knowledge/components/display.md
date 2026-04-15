# 展示组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-cell

| Prop | Type | Default |
|------|------|---------|
| title | `String` | `''` |
| value | `String` | `''` |
| label | `String` | `''` |
| icon | `String` | `''` |
| isLink | `Boolean` | `false` |
| border | `Boolean` | `true` |

> 源码: packages/components/tt-cell/props.ts
> 实现: packages/components/tt-cell/tt-cell.vue

---

### tt-card

**CardShadow**: `'always' | 'hover' | 'never'`

| Prop | Type | Default |
|------|------|---------|
| title | `String` | `''` |
| description | `String` | `''` |
| shadow | `CardShadow` | `'always'` |

> 源码: packages/components/tt-card/props.ts
> 实现: packages/components/tt-card/tt-card.vue

---

### tt-tag

| Prop | Type | Default |
|------|------|---------|
| type | `'default' | 'primary' | 'success' | 'warning' | 'danger'` | `'default'` |
| closeable | `Boolean` | `false` |
| round | `Boolean` | `false` |
| size | `'sm' | 'md'` | `'md'` |

> 源码: packages/components/tt-tag/props.ts
> 实现: packages/components/tt-tag/tt-tag.vue

---

### tt-badge

| Prop | Type | Default |
|------|------|---------|
| value | `[String, Number]` | `''` |
| max | `Number` | `99` |
| dot | `Boolean` | `false` |
| hidden | `Boolean` | `false` |

> 源码: packages/components/tt-badge/props.ts
> 实现: packages/components/tt-badge/tt-badge.vue

---

### tt-avatar

| Prop | Type | Default |
|------|------|---------|
| src | `String` | `''` |
| size | `[String, Number]` | `40` |
| shape | `'circle' | 'square'` | `'circle'` |
| text | `String` | `''` |

> 源码: packages/components/tt-avatar/props.ts
> 实现: packages/components/tt-avatar/tt-avatar.vue

---

### tt-list

| Prop | Type | Default |
|------|------|---------|
| loading | `Boolean` | `false` |
| finished | `Boolean` | `false` |
| loadingText | `String` | `'Loading...'` |
| finishedText | `String` | `'No more data'` |
| offset | `Number` | `300` |

> 源码: packages/components/tt-list/props.ts
> 实现: packages/components/tt-list/tt-list.vue

---

### tt-table

| Prop | Type | Default |
|------|------|---------|
| columns | `TableColumn[]` | `() => ...` |
| data | `Record<string, any` | `() => ...` |
| bordered | `Boolean` | `true` |
| striped | `Boolean` | `false` |

> 源码: packages/components/tt-table/props.ts
> 实现: packages/components/tt-table/tt-table.vue

---

### tt-descriptions

| Prop | Type | Default |
|------|------|---------|
| title | `String` | `''` |
| items | `DescriptionItem[]` | `() => ...` |
| column | `Number` | `2` |
| bordered | `Boolean` | `false` |

> 源码: packages/components/tt-descriptions/props.ts
> 实现: packages/components/tt-descriptions/tt-descriptions.vue

---

### tt-collapse

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Array` | `() => ...` |
| accordion | `Boolean` | `false` |

> 源码: packages/components/tt-collapse/props.ts
> 实现: packages/components/tt-collapse/tt-collapse.vue

---

### tt-collapse-item

| Prop | Type | Default |
|------|------|---------|
| title | `String` | `''` |
| name | `[String, Number]` | `''` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-collapse-item/props.ts
> 实现: packages/components/tt-collapse-item/tt-collapse-item.vue

---

### tt-count-down

| Prop | Type | Default |
|------|------|---------|
| time | `Number` | `0` |
| format | `String` | `'HH:mm:ss'` |
| autoStart | `Boolean` | `true` |

> 源码: packages/components/tt-count-down/props.ts
> 实现: packages/components/tt-count-down/tt-count-down.vue

---

### tt-progress

| Prop | Type | Default |
|------|------|---------|
| percentage | `Number` | `0` |
| strokeWidth | `Number` | `8` |
| color | `String` | `''` |
| showText | `Boolean` | `true` |

> 源码: packages/components/tt-progress/props.ts
> 实现: packages/components/tt-progress/tt-progress.vue

---

### tt-swiper

| Prop | Type | Default |
|------|------|---------|
| autoplay | `Boolean` | `false` |
| interval | `Number` | `3000` |
| duration | `Number` | `500` |
| circular | `Boolean` | `true` |
| indicatorDots | `Boolean` | `true` |
| indicatorColor | `String` | `'rgba(0,0,0,.3)'` |
| indicatorActiveColor | `String` | `''` |
| current | `Number` | `0` |

> 源码: packages/components/tt-swiper/props.ts
> 实现: packages/components/tt-swiper/tt-swiper.vue

---

### tt-calendar

| Prop | Type | Default |
|------|------|---------|
| modelValue | `String` | `''` |
| minDate | `String` | `''` |
| maxDate | `String` | `''` |
| firstDayOfWeek | `0 | 1` | `0` |
| readonly | `Boolean` | `false` |
| locale | `'en' | 'zh'` | `'en'` |
| formatter | `(day: CalendarDay) =` | `undefined` |
| showBottom | `Boolean` | `true` |

> 源码: packages/components/tt-calendar/props.ts
> 实现: packages/components/tt-calendar/tt-calendar.vue

---

### tt-drag

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Array` | `() => ...` |
| disabled | `Boolean` | `false` |
| shake | `Boolean` | `false` |
| mode | `String` | `'grid'` |
| keyName | `String` | `null` |
| columns | `Number` | `3` |
| singleItemHeight | `Number` | `120` |
| itemWidth | `Number` | `0` |
| itemHeight | `Number` | `0` |
| gap | `Number` | `20` |
| borderRadius | `Number` | `10` |
| scale | `Number` | `1.05` |
| opacity | `Number` | `0.8` |
| damping | `Number` | `40` |
| deletable | `Boolean` | `false` |
| deleteTop | `Number` | `0` |
| deleteRight | `Number` | `0` |
| showDragHandle | `Boolean` | `false` |
| dragHandlePosition | `String` | `'right'` |
| dragHandleStyles | `Object` | `() => ...` |
| onDelete | `Function` | `null` |
| longPressDuration | `Number` | `600` |
| swipeThreshold | `Number` | `10` |

> 源码: packages/components/tt-drag/props.ts
> 实现: packages/components/tt-drag/tt-drag.vue

---
