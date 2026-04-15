/**
 * 范例：创建 API
 * 源自：tt-daka-mp/api/project/createProject.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. requireAccountId() 获取用户身份
 * 2. 计算 sortOrder（当前记录数 + 1）
 * 3. 构造完整文档（含 accountId/createTime/updateTime）
 * 4. db.collection().add(doc)，返回 { success: true, data: doc }
 * 5. 文件名：create{Module}.js
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { db, COLLECTIONS } from '@/api/emas'
import { requireAccountId } from '@/utils/auth'
import { dayjs } from '@/utils/date'

export async function createProject(data) {
  try {
    const accountId = await requireAccountId()
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

    const countRes = await db.collection(COLLECTIONS.PROJECTS)
      .where({ accountId, archived: false })
      .count()
    const sortOrder = (countRes?.total || 0) + 1

    const doc = {
      accountId,
      name: data.name,
      icon: data.icon,
      color: data.color,
      frequency: data.frequency || 'daily',
      customDays: data.customDays || [],
      archived: false,
      sortOrder,
      createTime: now,
      updateTime: now,
    }

    const addRes = await db.collection(COLLECTIONS.PROJECTS).add(doc)
    doc._id = addRes.id || addRes._id
    return { success: true, data: doc }
  } catch (error) {
    console.error('[API] createProject 失败:', error)
    return { success: false, error: error.message }
  }
}
