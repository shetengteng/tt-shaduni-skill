/**
 * 范例：Schema 集中定义
 * 源自：tt-daka-mp/api/schema.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. COLLECTIONS 常量集中定义所有集合名
 * 2. JSDoc @typedef 定义数据结构
 * 3. 新增模块时先在此文件添加常量和类型
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

export const COLLECTIONS = {
  USERS: 'dk-users',
  PROJECTS: 'dk-projects',
  RECORDS: 'dk-records',
}

/**
 * @typedef {Object} DakaUser
 * @property {string} _id
 * @property {string} accountId
 * @property {string} [openid]
 * @property {string} nickname
 * @property {string} avatar
 * @property {string} loginType - wechat / anonymous
 * @property {number} [dataVersion]
 * @property {string} createTime
 * @property {string} updateTime
 */

/**
 * @typedef {Object} DakaProject
 * @property {string} _id
 * @property {string} accountId
 * @property {string} name
 * @property {string} icon
 * @property {string} color
 * @property {string} frequency - daily / weekday / custom
 * @property {number[]} customDays - 0-6
 * @property {boolean} archived
 * @property {number} sortOrder
 * @property {string} createTime
 * @property {string} updateTime
 */

/**
 * @typedef {Object} DakaRecord
 * @property {string} _id
 * @property {string} accountId
 * @property {string} projectId
 * @property {string} date - YYYY-MM-DD
 * @property {string} completedAt
 * @property {boolean} isRetroactive
 * @property {string} createTime
 */
