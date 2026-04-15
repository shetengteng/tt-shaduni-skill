/**
 * 范例：Pinia Store
 * 源自：tt-daka-mp/stores/project.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. Composition API 风格（setup store）
 * 2. restore/persist/markDirty/markFresh 缓存管理
 * 3. dataTs 时间戳驱动页面新鲜度检查
 * 4. API 封装：成功后 markDirty 或 markFresh
 * 5. 乐观更新：updateSort 先改本地再同步云端
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAccountId } from '@/utils/auth'
import { setLocal, getLocal, getStoreKey } from '@/utils/local-store'
import { getActiveProjects } from '@/api/project/getActiveProjects'
import { getProjectList as fetchProjectListApi } from '@/api/project/getProjectList'
import { createProject as createProjectApi } from '@/api/project/createProject'
import { updateProject as updateProjectApi } from '@/api/project/updateProject'
import { deleteProject as deleteProjectApi } from '@/api/project/deleteProject'
import { archiveProject as archiveProjectApi } from '@/api/project/archiveProject'
import { batchUpdateSort as batchUpdateSortApi } from '@/api/project/batchUpdateSort'
import { getArchivedProjects as getArchivedProjectsApi } from '@/api/project/getArchivedProjects'
import { getProjectDetail as getProjectDetailApi } from '@/api/project/getProjectDetail'
import { getProjectById as getProjectByIdApi } from '@/api/project/getProjectById'

const CACHE_KEY = 'cache_projects'

export const useProjectStore = defineStore('project', () => {
  const list = ref([])
  const dataTs = ref(0)
  const lastFetchTime = ref(0)

  const activeList = computed(() =>
    list.value.filter(p => !p.archived).sort((a, b) => a.sortOrder - b.sortOrder)
  )

  function restore() {
    const accountId = getAccountId()
    if (!accountId) return
    const entry = getLocal(getStoreKey(accountId, CACHE_KEY))
    if (entry?.data?.length > 0) list.value = entry.data
  }

  function persist() {
    const accountId = getAccountId()
    if (!accountId) return
    setLocal(getStoreKey(accountId, CACHE_KEY), list.value)
  }

  function markDirty() { dataTs.value = Date.now() }

  function markFresh() {
    dataTs.value = Date.now()
    lastFetchTime.value = Date.now()
    persist()
  }

  function setList(data) { list.value = data; persist() }
  function clear() { list.value = []; lastFetchTime.value = 0; dataTs.value = 0 }
  function isStale(pageTs) { return pageTs !== dataTs.value }

  async function fetchActiveProjects() {
    const res = await getActiveProjects()
    if (res.success) { setList(res.list); markFresh() }
    return res
  }

  async function fetchProjectList() {
    const res = await fetchProjectListApi()
    if (res.success) markFresh()
    return res
  }

  async function addProject(data) {
    const res = await createProjectApi(data)
    if (res.success) markDirty()
    return res
  }

  async function editProject(id, data) {
    const res = await updateProjectApi(id, data)
    if (res.success) markDirty()
    return res
  }

  async function removeProject(id) {
    const res = await deleteProjectApi(id)
    if (res.success) {
      list.value = list.value.filter(p => p._id !== id)
      persist()
    }
    return res
  }

  async function archive(id, archived) {
    const res = await archiveProjectApi(id, archived)
    if (res.success) {
      const p = list.value.find(p => p._id === id)
      if (p) p.archived = archived
      persist()
    }
    return res
  }

  async function updateSort(items) {
    items.forEach(u => {
      const p = list.value.find(p => p._id === u._id)
      if (p) p.sortOrder = u.sortOrder
    })
    persist()
    return await batchUpdateSortApi(items)
  }

  async function fetchArchivedProjects() { return await getArchivedProjectsApi() }
  async function fetchProjectDetail(id) { return await getProjectDetailApi(id) }
  async function fetchProjectById(id) { return await getProjectByIdApi(id) }

  return {
    list, activeList, dataTs,
    restore, persist, markDirty, markFresh,
    setList, clear, isStale, lastFetchTime,
    fetchActiveProjects, fetchProjectList,
    addProject, editProject, removeProject, archive, updateSort,
    fetchArchivedProjects, fetchProjectDetail, fetchProjectById,
  }
})
