# 生成模式 — 工作流与模式

## 模块生成工作流

生成新模块时，按以下顺序执行：

1. **分析需求** → 提取模块名（中英文）、字段列表、页面列表、功能点
2. **生成 Schema** → `api/schema.js` 中添加集合常量 + JSDoc 类型定义
3. **生成 API** → `api/{module}/*.js`（每个操作一个文件）
4. **生成 Store** → `stores/{module}.js`
5. **生成页面** → `pages/{module}/index.vue` + `sub/`
6. **生成组件** → `pages/{module}/components/`
7. **更新路由** → `route/index.js` 添加路径和导航函数
8. **更新配置** → `pages.json` 添加页面配置

## 字段类型 → tt-shaduni 组件映射

| 字段类型 | 组件 | 示例 |
|---------|------|------|
| string | `<tt-input>` | `<tt-input v-model="form.name" placeholder="请输入名称" />` |
| number | `<tt-input type="number">` | `<tt-input v-model="form.price" type="number" />` |
| boolean | `<tt-switch>` | `<tt-switch v-model="form.enabled" />` |
| date | `<tt-date-picker>` | `<tt-date-picker v-model="form.startDate" />` |
| enum | `<tt-radio>` | `<tt-radio v-model="form.status" :options="statusOptions" />` |
| textarea | `<tt-textarea>` | `<tt-textarea v-model="form.remark" :maxlength="500" />` |
| array | 自定义 | 根据业务场景选择组件 |

### 字段名推断规则

AI 根据字段名语义自动推断类型：

| 字段名特征 | 推断类型 | 默认组件 |
|-----------|---------|---------|
| name/title/desc 等文本 | string | `<tt-input>` |
| price/count/num 等数值 | number | `<tt-input type="number">` |
| remark/content 等长文本 | textarea | `<tt-textarea>` |
| date/time/start/end 等时间 | date | `<tt-date-picker>` |
| enabled/active/is_ 等开关 | boolean | `<tt-switch>` |
| status/type/level 等枚举 | enum | `<tt-radio>` |

## 参考范例

`templates/` 目录包含从 tt-daka-mp 提取的真实代码范例，每个文件顶部有模式要点注释。

### 范例索引

| 范例 | 文件 | 展示的模式 |
|------|------|-----------|
| 列表页 | `templates/page/list.vue` | onShow 刷新 + usePageFresh + Store 驱动 |
| 详情页 | `templates/page/detail.vue` | onLoad 获取 ID + fetchDetail |
| 表单页 | `templates/page/form.vue` | 新增/编辑复用 + 表单验证 |
| 列表查询 | `templates/api/getList.js` | db.collection().where().orderBy().get() |
| 详情查询 | `templates/api/getDetail.js` | 含关联数据 + 统计计算 |
| 创建 | `templates/api/create.js` | requireAccountId + sortOrder + db.add() |
| 更新 | `templates/api/update.js` | db.where().update() |
| 删除 | `templates/api/delete.js` | 级联删除关联记录 |
| 业务卡片 | `templates/component/Card.vue` | props + emit + tt-shaduni 组合 |
| Store | `templates/store/index.js` | restore/persist/markDirty/markFresh |
| Schema | `templates/schema/collection.js` | COLLECTIONS + JSDoc 类型 |
| 页面新鲜度 | `templates/composable/usePageFresh.js` | dataTs + TTL |
| 身份管理 | `templates/utils/auth.js` | accountId 持久化 |
| EMAS 入口 | `templates/config/emas.js` | setupEmas + 导出 |

### 使用方式

生成新模块时，AI 读取对应范例理解模式，然后用实际模块名和字段替换生成新代码。不做机械字符串替换，而是理解模式后生成。

## 页面模式

### 列表页模式
```vue
<script setup>
import { useXxxStore } from '@/stores/xxx'
import { usePageFresh } from '@/composables/usePageFresh'
import { onShow } from '@dcloudio/uni-app'

const store = useXxxStore()
const { needRefresh, markLoaded } = usePageFresh('xxx-list')

onShow(async () => {
  if (await needRefresh()) {
    await store.fetchList()
    markLoaded()
  }
})
</script>
```

### 详情页模式
```vue
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useXxxStore } from '@/stores/xxx'

const detail = ref(null)
const store = useXxxStore()

onLoad((query) => {
  loadDetail(query.id)
})

async function loadDetail(id) {
  const res = await store.fetchDetail(id)
  if (res.success) detail.value = res.data
}
</script>
```

### 表单页模式
```vue
<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useXxxStore } from '@/stores/xxx'

const isEdit = ref(false)
const form = reactive({ name: '', ... })
const store = useXxxStore()

onLoad(async (query) => {
  if (query.id) {
    isEdit.value = true
    const res = await store.fetchById(query.id)
    if (res.success) Object.assign(form, res.data)
  }
})

async function onSubmit() {
  const res = isEdit.value
    ? await store.edit(form._id, form)
    : await store.add(form)
  if (res.success) uni.navigateBack()
}
</script>
```
