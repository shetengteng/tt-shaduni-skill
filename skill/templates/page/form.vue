<!--
  范例：表单页（新增/编辑复用）
  源自：tt-daka-mp/pages/project/sub/add/index.vue
  同步版本：2026-04-15（tt-daka-mp commit: 2c88783）

  模式要点：
  1. isEdit 标识新增/编辑模式，onLoad 中通过 query.id 判断
  2. reactive 表单对象，编辑时从 API 回填
  3. 提交前校验必填字段
  4. Store 的 add/edit 方法封装 API 调用
  5. 成功后 navigateBack
  6. 编辑模式底部显示删除按钮
-->

<template>
  <view class="page px-xl" :style="themeStore.themeStyle">
    <TtNavbar :title="isEdit ? '编辑' : '新建'" />

    <!-- 表单字段 -->
    <view class="section">
      <text class="text-xs text-muted mb-sm block">名称</text>
      <tt-input v-model="form.name" placeholder="请输入名称" :maxlength="20" clearable />
    </view>

    <!-- 更多字段... -->

    <!-- 底部保存 -->
    <view class="save-section mt-xl">
      <tt-button variant="default" block :loading="saving" @click="onSave">
        {{ saving ? '保存中...' : (isEdit ? '保存修改' : '创建') }}
      </tt-button>
    </view>

    <!-- 删除按钮（编辑模式） -->
    <view v-if="isEdit" class="mt-md">
      <tt-button variant="ghost" @click="onDelete">
        <text style="color: var(--tt-error)">删除</text>
      </tt-button>
    </view>

    <tt-safe-area position="bottom" />

    <tt-dialog
      v-model:show="showDeleteDialog"
      title="删除"
      message="删除后不可恢复。"
      confirm-text="确定"
      cancel-text="取消"
      @confirm="confirmDelete"
    />
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useThemeStore } from '@/stores/theme'
import { useProjectStore } from '@/stores/project'
import { goBack } from '@/route/index'

const themeStore = useThemeStore()
const projectStore = useProjectStore()
const isEdit = ref(false)
const editId = ref('')
const saving = ref(false)
const showDeleteDialog = ref(false)

const form = reactive({
  name: '',
  icon: 'ri-run-line',
  color: '#3B82F6',
  frequency: 'daily',
  customDays: [],
})

async function onSave() {
  if (!form.name.trim()) {
    uni.showToast({ title: '请输入名称', icon: 'none' })
    return
  }

  saving.value = true
  const res = isEdit.value
    ? await projectStore.editProject(editId.value, form)
    : await projectStore.addProject(form)
  saving.value = false

  if (res.success) {
    uni.showToast({ title: isEdit.value ? '已保存' : '创建成功', icon: 'success' })
    setTimeout(() => goBack(), 500)
  } else {
    uni.showToast({ title: res.error || '操作失败', icon: 'none' })
  }
}

function onDelete() { showDeleteDialog.value = true }

async function confirmDelete() {
  const res = await projectStore.removeProject(editId.value)
  if (res.success) {
    uni.showToast({ title: '已删除', icon: 'success' })
    setTimeout(() => goBack(), 500)
  }
}

onLoad(async (options) => {
  if (options?.id) {
    isEdit.value = true
    editId.value = options.id
    const res = await projectStore.fetchProjectById(options.id)
    if (res.success) Object.assign(form, res.data)
  }
})
</script>
