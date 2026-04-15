/**
 * 范例：获取列表 API
 * 源自：tt-daka-mp/api/project/getProjectList.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. 从 @/api/emas 导入 db、COLLECTIONS、dbCmd
 * 2. 使用 requireAccountId() 获取用户身份
 * 3. 返回格式：{ success: boolean, list: array, error?: string }
 * 4. try-catch 包裹，catch 中返回 { success: false }
 * 5. 支持关联查询（项目列表 + 今日打卡记录）
 * 6. API 失败时用 Store 缓存兜底
 *
 * 生成新模块时，替换以下内容：
 * - COLLECTIONS.PROJECTS → COLLECTIONS.{YOUR_COLLECTION}
 * - getProjectList → get{Module}List
 * - 业务字段和查询条件
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { db, COLLECTIONS, dbCmd } from '@/api/emas'
import { requireAccountId } from '@/utils/auth'
import { formatDate } from '@/utils/date'
import { useProjectStore } from '@/stores/project'
import { useRecordStore } from '@/stores/record'

export async function getProjectList() {
  try {
    const accountId = await requireAccountId()
    const today = formatDate(new Date())

    const projectRes = await db.collection(COLLECTIONS.PROJECTS)
      .where({ accountId, archived: false })
      .orderBy('sortOrder', 'asc')
      .orderBy('createTime', 'desc')
      .get()
    const projects = projectRes.data || []
    if (projects.length === 0) {
      const projectStore = useProjectStore()
      const recordStore = useRecordStore()
      projectStore.setList([])
      recordStore.setTodayRecords([])
      return { success: true, list: [], todayRecords: [] }
    }

    const projectIds = projects.map(p => p._id)
    const recordRes = await db.collection(COLLECTIONS.RECORDS)
      .where({ accountId, date: today, projectId: dbCmd.in(projectIds) })
      .get()
    const todayRecords = recordRes.data || []

    const projectStore = useProjectStore()
    const recordStore = useRecordStore()
    projectStore.setList(projects)
    recordStore.setTodayRecords(todayRecords)

    return { success: true, list: projects, todayRecords }
  } catch (error) {
    console.error('[API] getProjectList 失败:', error)

    const projectStore = useProjectStore()
    const recordStore = useRecordStore()
    if (projectStore.list.length > 0) {
      return {
        success: true,
        list: projectStore.list,
        todayRecords: recordStore.todayRecords,
        fromCache: true,
      }
    }

    return { success: false, list: [], todayRecords: [], error: error.message }
  }
}
