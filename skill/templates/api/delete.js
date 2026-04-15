/**
 * 范例：删除 API
 * 源自：tt-daka-mp/api/project/deleteProject.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. 级联删除关联记录（先删 RECORDS 再删 PROJECTS）
 * 2. 通过 accountId 限制只删自己的数据
 * 3. 文件名：delete{Module}.js
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import { db, COLLECTIONS } from '@/api/emas'
import { requireAccountId } from '@/utils/auth'

export async function deleteProject(id) {
  try {
    const accountId = await requireAccountId()

    await db.collection(COLLECTIONS.RECORDS)
      .where({ accountId, projectId: id })
      .remove()

    await db.collection(COLLECTIONS.PROJECTS)
      .where({ _id: id, accountId })
      .remove()

    return { success: true }
  } catch (error) {
    console.error('[API] deleteProject 失败:', error)
    return { success: false, error: error.message }
  }
}
