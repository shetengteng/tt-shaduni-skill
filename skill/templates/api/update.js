/**
 * 范例：更新 API
 * 源自：tt-daka-mp/api/project/updateProject.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. 通过 where({ _id, accountId }) 确保只更新自己的数据
 * 2. 自动添加 updateTime
 * 3. 文件名：update{Module}.js
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { db, COLLECTIONS } from '@/api/emas'
import { requireAccountId } from '@/utils/auth'
import { dayjs } from '@/utils/date'

export async function updateProject(id, data) {
  try {
    const accountId = await requireAccountId()
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

    const updateData = {
      name: data.name,
      icon: data.icon,
      color: data.color,
      frequency: data.frequency,
      customDays: data.customDays || [],
      updateTime: now,
    }

    await db.collection(COLLECTIONS.PROJECTS)
      .where({ _id: id, accountId })
      .update(updateData)

    return { success: true }
  } catch (error) {
    console.error('[API] updateProject 失败:', error)
    return { success: false, error: error.message }
  }
}
