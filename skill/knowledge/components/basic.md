# 基础组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-button

**ButtonVariant**: `| 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`

**ButtonSize**: `'sm' | 'md' | 'lg' | 'icon'`

| Prop | Type | Default |
|------|------|---------|
| variant | `ButtonVariant` | `'default'` |
| size | `ButtonSize` | `'md'` |
| disabled | `Boolean` | `false` |
| loading | `Boolean` | `false` |
| block | `Boolean` | `false` |
| openType | `String` | `''` |

> 源码: packages/components/tt-button/props.ts
> 实现: packages/components/tt-button/tt-button.vue

---

### tt-icon

| Prop | Type | Default |
|------|------|---------|
| name | `String` | `''` |
| svg | `String` | `''` |
| size | `string | number` | `48` |
| color | `String` | `''` |

> 源码: packages/components/tt-icon/props.ts
> 实现: packages/components/tt-icon/tt-icon.vue

---

### tt-image

| Prop | Type | Default |
|------|------|---------|
| src | `String` | `''` |
| mode | `String` | `'aspectFill'` |
| width | `String` | `'100%'` |
| height | `String` | `'auto'` |
| radius | `String` | `'0'` |
| lazyLoad | `Boolean` | `true` |

> 源码: packages/components/tt-image/props.ts
> 实现: packages/components/tt-image/tt-image.vue

---

### tt-typography

**TypographyType**: `'text' | 'title' | 'link'`

**TypographyLevel**: `1 | 2 | 3 | 4 | 5`

| Prop | Type | Default |
|------|------|---------|
| type | `TypographyType` | `'text'` |
| level | `TypographyLevel` | `3` |
| ellipsis | `[Boolean, Number]` | `false` |
| bold | `Boolean` | `false` |
| underline | `Boolean` | `false` |
| delete | `Boolean` | `false` |
| disabled | `Boolean` | `false` |
| href | `String` | `''` |

> 源码: packages/components/tt-typography/props.ts
> 实现: packages/components/tt-typography/tt-typography.vue

---

### tt-space

| Prop | Type | Default |
|------|------|---------|
| direction | `'horizontal' | 'vertical'` | `'horizontal'` |
| size | `[String, Number]` | `8` |
| wrap | `Boolean` | `false` |
| align | `'start' | 'center' | 'end' | 'baseline'` | `'start'` |

> 源码: packages/components/tt-space/props.ts
> 实现: packages/components/tt-space/tt-space.vue

---

### tt-divider

| Prop | Type | Default |
|------|------|---------|
| direction | `'horizontal' | 'vertical'` | `'horizontal'` |
| contentPosition | `'left' | 'center' | 'right'` | `'center'` |

> 源码: packages/components/tt-divider/props.ts
> 实现: packages/components/tt-divider/tt-divider.vue

---
