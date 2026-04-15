/**
 * 范例：页面新鲜度 Composable
 * 源自：tt-daka-mp/composables/usePageFresh.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. 每个页面通过唯一 key 存储上次加载时的 dataTs
 * 2. onShow 时对比 Store 的 dataTs，不同则需刷新
 * 3. 超过 TTL(5min) 还会查云端 dataVersion
 * 4. 暴露 needRefresh / forceCheck / markLoaded 三个方法
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { useProjectStore } from '@/stores/project'
import { getAccountId } from '@/utils/auth'
import { checkDataVersion, updateLocalVersion } from '@/utils/version-check'

const CACHE_TTL = 5 * 60 * 1000
const TS_PREFIX = 'dk_pageTs_'

function _getPageTs(key) {
  try { return Number(uni.getStorageSync(TS_PREFIX + key)) || 0 }
  catch (_) { return 0 }
}

function _setPageTs(key, ts) {
  try { uni.setStorageSync(TS_PREFIX + key, String(ts)) }
  catch (_) {}
}

async function _checkCloud(force = false) {
  const projectStore = useProjectStore()
  if (!force && Date.now() - projectStore.lastFetchTime < CACHE_TTL) return false
  const accountId = getAccountId()
  if (!accountId) return true
  const { needRefresh: need, version } = await checkDataVersion(accountId)
  if (need) { updateLocalVersion(accountId, version); return true }
  projectStore.lastFetchTime = Date.now()
  return false
}

export function usePageFresh(pageKey) {
  const projectStore = useProjectStore()

  async function needRefresh() {
    const pageTs = _getPageTs(pageKey)
    if (pageTs === 0) return true
    if (projectStore.isStale(pageTs)) return true
    return await _checkCloud()
  }

  async function forceCheck() {
    const pageTs = _getPageTs(pageKey)
    if (pageTs === 0) return true
    if (projectStore.isStale(pageTs)) return true
    return await _checkCloud(true)
  }

  function markLoaded() {
    _setPageTs(pageKey, projectStore.dataTs)
  }

  return { needRefresh, forceCheck, markLoaded }
}
