<!--
  范例：详情页
  源自：tt-daka-mp/pages/project/sub/detail/index.vue
  同步版本：2026-04-15（tt-daka-mp commit: 2c88783）

  模式要点：
  1. onLoad 获取路由参数中的 ID
  2. 调用 Store 的 fetchDetail 获取详情 + 关联数据
  3. 数据展示：统计卡片 + 日历 + 记录列表
  4. TtNavbar 导航栏
  5. 操作按钮：编辑跳转
-->

<template>
  <view class="page px-xl" :style="themeStore.themeStyle">
    <TtNavbar :title="project ? project.name : ''" />

    <!-- 统计卡片 -->
    <view v-if="project" class="stat-grid mb-xl">
      <view class="card flex-col flex-center p-md">
        <text class="text-xl font-bold text-foreground">{{ detail.totalDays }}</text>
        <text class="text-xs text-muted mt-xs">总打卡</text>
      </view>
      <view class="card flex-col flex-center p-md">
        <text class="text-xl font-bold text-foreground">{{ detail.longestStreak }}</text>
        <text class="text-xs text-muted mt-xs">最长连续</text>
      </view>
      <view class="card flex-col flex-center p-md">
        <text class="text-xl font-bold text-foreground">{{ detail.currentStreak }}</text>
        <text class="text-xs text-muted mt-xs">当前连续</text>
      </view>
    </view>

    <!-- 日历 -->
    <tt-calendar v-model="selectedDate" locale="zh" :max-date="today" :formatter="formatter" />

    <!-- 记录列表 -->
    <view class="records-section mb-xl">
      <view class="card overflow-hidden">
        <view v-for="record in records" :key="record._id" class="record-item flex-between p-md border-b">
          <text class="text-sm text-foreground">{{ record.date }}</text>
        </view>
        <view v-if="records.length === 0" class="text-center py-md">
          <text class="text-sm text-muted">暂无记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useThemeStore } from '@/stores/theme'
import { useProjectStore } from '@/stores/project'
import { formatDate } from '@/utils/date'

const projectId = ref('')
const project = ref(null)
const records = ref([])
const detail = ref({ totalDays: 0, currentStreak: 0, longestStreak: 0 })

const today = formatDate(new Date())
const selectedDate = ref(today)
const recordDateSet = computed(() => new Set(records.value.map(r => r.date)))

const themeStore = useThemeStore()
const projectStore = useProjectStore()

function formatter(day) {
  if (recordDateSet.value.has(day.dateStr)) {
    const color = project.value?.color || '#22C55E'
    day.style = { backgroundColor: `${color}25` }
  }
}

async function loadDetail() {
  const res = await projectStore.fetchProjectDetail(projectId.value)
  if (res.success) {
    project.value = res.data.project
    records.value = res.data.records
    detail.value = {
      totalDays: res.data.totalDays,
      currentStreak: res.data.currentStreak,
      longestStreak: res.data.longestStreak,
    }
  }
}

onLoad((options) => {
  if (options?.id) {
    projectId.value = options.id
    loadDetail()
  }
})
</script>
