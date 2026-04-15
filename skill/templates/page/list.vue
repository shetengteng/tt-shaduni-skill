<!--
  范例：列表页
  源自：tt-daka-mp/pages/index/index.vue
  同步版本：2026-04-15（tt-daka-mp commit: 2c88783）

  模式要点：
  1. onShow + usePageFresh：进入页面时检查数据新鲜度
  2. onPullDownRefresh + forceCheck：下拉刷新强制检查云端版本
  3. Store 驱动：computed 从 Store 读取列表数据
  4. 空状态：列表为空时展示引导创建
  5. 操作菜单：长按触发 tt-action-sheet
  6. 确认弹窗：危险操作使用 tt-dialog 二次确认
  7. 路由：通过 route/index.js 的导航函数跳转
-->

<template>
  <view class="page" :style="themeStore.themeStyle">
    <!-- 列表 -->
    <view class="list-section px-xl mt-md">
      <DakaCard
        v-for="p in activeProjects"
        :key="p._id"
        :projectId="p._id"
        @toggle="onToggle"
        @card-tap="onCardTap"
        @card-longpress="onCardLongpress"
      />

      <!-- 空状态 -->
      <view v-if="!loading && activeProjects.length === 0" class="empty-state flex-col flex-center">
        <tt-icon name="ri-checkbox-circle-line" :size="48" color="#D4D4D8" />
        <text class="text-sm text-muted mt-md mb-md">还没有打卡项目</text>
        <tt-button variant="default" @click="goAdd">+ 创建打卡项目</tt-button>
      </view>
    </view>

    <TtTabbar current="home" />

    <!-- 操作菜单 -->
    <tt-action-sheet
      v-model:show="showActionSheet"
      :actions="actionSheetActions"
      cancel-text="取消"
      @select="onActionSelect"
    />

    <!-- 确认删除 -->
    <tt-dialog
      v-model:show="showDeleteDialog"
      title="删除项目"
      message="删除后不可恢复。"
      confirm-text="确定"
      cancel-text="取消"
      @confirm="confirmDelete"
    />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { useThemeStore } from '@/stores/theme'
import { useProjectStore } from '@/stores/project'
import { useRecordStore } from '@/stores/record'
import { usePageFresh } from '@/composables/usePageFresh'
import { goToProjectAdd, goToProjectDetail, goToProjectEdit } from '@/route/index'
import DakaCard from './components/DakaCard.vue'

const themeStore = useThemeStore()
const projectStore = useProjectStore()
const recordStore = useRecordStore()
const { needRefresh, forceCheck, markLoaded } = usePageFresh('home')

const loading = ref(false)
const showActionSheet = ref(false)
const showDeleteDialog = ref(false)
const currentActionId = ref('')

const activeProjects = computed(() => projectStore.activeList)

const actionSheetActions = [
  { name: '编辑', value: 'edit' },
  { name: '归档', value: 'archive' },
  { name: '删除', value: 'delete', color: '#EF4444' },
]

onShow(async () => {
  if (await needRefresh()) await loadData()
})

onPullDownRefresh(async () => {
  if (await forceCheck()) await loadData()
  else uni.showToast({ title: '已是最新', icon: 'none' })
  uni.stopPullDownRefresh()
})

async function loadData() {
  loading.value = true
  const res = await projectStore.fetchProjectList()
  if (res.success) markLoaded()
  loading.value = false
}

function onCardTap(id) { goToProjectDetail(id) }
function onCardLongpress(id) { currentActionId.value = id; showActionSheet.value = true }
function goAdd() { goToProjectAdd() }

async function onActionSelect(item) {
  showActionSheet.value = false
  if (item.value === 'edit') goToProjectEdit(currentActionId.value)
  else if (item.value === 'delete') showDeleteDialog.value = true
}

async function confirmDelete() {
  await projectStore.removeProject(currentActionId.value)
  showDeleteDialog.value = false
}
</script>
