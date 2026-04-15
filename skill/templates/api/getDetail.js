/**
 * 范例：获取详情 API
 * 源自：tt-daka-mp/api/project/getProjectDetail.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. 含关联查询：项目信息 + 打卡记录
 * 2. Promise.all 并行查询多个集合
 * 3. 业务逻辑：统计连续打卡天数
 * 4. 返回聚合数据：{ project, records, totalDays, currentStreak, longestStreak }
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { db, COLLECTIONS } from '@/api/emas'
import { requireAccountId } from '@/utils/auth'
import { dayjs, formatDate } from '@/utils/date'

export async function getProjectDetail(id) {
  try {
    const accountId = await requireAccountId()

    const [projectRes, recordRes] = await Promise.all([
      db.collection(COLLECTIONS.PROJECTS).where({ _id: id, accountId }).limit(1).get(),
      db.collection(COLLECTIONS.RECORDS).where({ accountId, projectId: id }).orderBy('date', 'desc').get(),
    ])
    const project = projectRes.data?.[0]
    if (!project) return { success: false, error: '项目不存在' }
    const records = recordRes.data || []

    const today = formatDate(new Date())
    const dateSet = new Set(records.map(r => r.date))
    const totalDays = dateSet.size

    let currentStreak = 0
    let longestStreak = 0
    let streak = 0
    let d = dayjs(today)

    for (let i = 0; i < 365; i++) {
      const dateStr = d.format('YYYY-MM-DD')
      if (dateSet.has(dateStr)) {
        streak++
        longestStreak = Math.max(longestStreak, streak)
        if (i <= currentStreak) currentStreak = streak
      } else if (i > 0) {
        streak = 0
      }
      d = d.subtract(1, 'day')
    }

    return {
      success: true,
      data: { project, records, totalDays, currentStreak, longestStreak }
    }
  } catch (error) {
    console.error('[API] getProjectDetail 失败:', error)
    return { success: false, error: error.message }
  }
}
