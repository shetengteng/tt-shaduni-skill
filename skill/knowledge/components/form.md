# 表单组件

> 自动生成自 tt-shaduni 源码，运行 `node scripts/gen-component-docs.mjs` 更新

### tt-input

**InputType**: `'text' | 'password' | 'number' | 'digit' | 'tel'`

| Prop | Type | Default |
|------|------|---------|
| modelValue | `string | number` | `''` |
| type | `InputType` | `'text'` |
| placeholder | `String` | `''` |
| disabled | `Boolean` | `false` |
| readonly | `Boolean` | `false` |
| clearable | `Boolean` | `false` |
| maxlength | `Number` | `-1` |

> 源码: packages/components/tt-input/props.ts
> 实现: packages/components/tt-input/tt-input.vue

---

### tt-textarea

| Prop | Type | Default |
|------|------|---------|
| modelValue | `String` | `''` |
| placeholder | `String` | `''` |
| maxlength | `Number` | `-1` |
| disabled | `Boolean` | `false` |
| autoHeight | `Boolean` | `false` |
| showCount | `Boolean` | `false` |

> 源码: packages/components/tt-textarea/props.ts
> 实现: packages/components/tt-textarea/tt-textarea.vue

---

### tt-switch

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Boolean` | `false` |
| disabled | `Boolean` | `false` |
| activeColor | `String` | `''` |
| size | `'sm' | 'md'` | `'md'` |

> 源码: packages/components/tt-switch/props.ts
> 实现: packages/components/tt-switch/tt-switch.vue

---

### tt-checkbox

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Boolean` | `false` |
| label | `String` | `''` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-checkbox/props.ts
> 实现: packages/components/tt-checkbox/tt-checkbox.vue

---

### tt-checkbox-group

> ⚠️ 需手动补充（无 props.ts）

> 源码: packages/components/tt-checkbox-group/tt-checkbox-group.vue

---

### tt-radio

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Boolean` | `false` |
| label | `String` | `''` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-radio/props.ts
> 实现: packages/components/tt-radio/tt-radio.vue

---

### tt-slider

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Number` | `0` |
| min | `Number` | `0` |
| max | `Number` | `100` |
| step | `Number` | `1` |
| disabled | `Boolean` | `false` |
| activeColor | `String` | `''` |
| inactiveColor | `String` | `''` |

> 源码: packages/components/tt-slider/props.ts
> 实现: packages/components/tt-slider/tt-slider.vue

---

### tt-rate

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Number` | `0` |
| count | `Number` | `5` |
| disabled | `Boolean` | `false` |
| readonly | `Boolean` | `false` |
| size | `[String, Number]` | `20` |

> 源码: packages/components/tt-rate/props.ts
> 实现: packages/components/tt-rate/tt-rate.vue

---

### tt-number-box

| Prop | Type | Default |
|------|------|---------|
| modelValue | `Number` | `0` |
| min | `Number` | `0` |
| max | `Number` | `99999` |
| step | `Number` | `1` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-number-box/props.ts
> 实现: packages/components/tt-number-box/tt-number-box.vue

---

### tt-search

| Prop | Type | Default |
|------|------|---------|
| modelValue | `String` | `''` |
| placeholder | `String` | `'Search'` |
| showCancel | `Boolean` | `false` |
| disabled | `Boolean` | `false` |

> 源码: packages/components/tt-search/props.ts
> 实现: packages/components/tt-search/tt-search.vue

---

### tt-picker

| Prop | Type | Default |
|------|------|---------|
| modelValue | `string | number | (string | number)[]` | `''` |
| columns | `Array<{ text: string; value: string | number; children?: any[] }` | `() => ...` |
| title | `String` | `''` |
| confirmText | `String` | `'Confirm'` |
| cancelText | `String` | `'Cancel'` |
| show | `Boolean` | `false` |

> 源码: packages/components/tt-picker/props.ts
> 实现: packages/components/tt-picker/tt-picker.vue

---

### tt-date-picker

**DatePickerMode**: `'date' | 'time' | 'datetime'`

| Prop | Type | Default |
|------|------|---------|
| modelValue | `String` | `''` |
| mode | `DatePickerMode` | `'date'` |
| title | `String` | `''` |
| show | `Boolean` | `false` |
| minDate | `String` | `''` |
| maxDate | `String` | `''` |
| locale | `'en' | 'zh'` | `'en'` |
| minYear | `Number` | `2000` |
| maxYear | `Number` | `2040` |

> 源码: packages/components/tt-date-picker/props.ts
> 实现: packages/components/tt-date-picker/tt-date-picker.vue

---

### tt-upload

| Prop | Type | Default |
|------|------|---------|
| fileList | `UploadFile[]` | `() => ...` |
| maxCount | `Number` | `9` |
| maxSize | `Number` | `10 * 1024 * 1024` |
| accept | `String` | `'image'` |
| disabled | `Boolean` | `false` |
| previewImage | `Boolean` | `true` |
| deletable | `Boolean` | `true` |

> 源码: packages/components/tt-upload/props.ts
> 实现: packages/components/tt-upload/tt-upload.vue

---

### tt-form

| Prop | Type | Default |
|------|------|---------|
| model | `Object` | `() => ...` |
| rules | `Object` | `() => ...` |
| labelWidth | `String` | `'80px'` |

> 源码: packages/components/tt-form/props.ts
> 实现: packages/components/tt-form/tt-form.vue

---

### tt-form-item

| Prop | Type | Default |
|------|------|---------|
| label | `String` | `''` |
| prop | `String` | `''` |
| required | `Boolean` | `false` |

> 源码: packages/components/tt-form-item/props.ts
> 实现: packages/components/tt-form-item/tt-form-item.vue

---
