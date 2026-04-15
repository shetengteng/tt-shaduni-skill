/**
 * 范例：EMAS 统一入口
 * 源自：tt-daka-mp/api/emas.js
 * 同步版本：2026-04-15（tt-daka-mp commit: 2c88783）
 *
 * 模式要点：
 * 1. SDK 必须显式传入（setupEmas 的 sdk 参数）
 * 2. 从 config 导入环境配置
 * 3. 统一导出所有 EMAS 能力（db/dbCmd/auth 等）
 * 4. 开发模式可传 mockDb
 */

// ↓↓↓ 以下为 tt-daka-mp 真实代码 ↓↓↓

import MPServerless from '@alicloud/mpserverless-sdk'
import { setupEmas, isQuotaError, handleEmasError, checkEmasError } from '@/uni_modules/tt-shaduni/cloud-emas/index'
import { EMAS_CONFIG, WX_APPID, DEV_MODE } from '@/config/index'
import { mockDb } from '@/mock/db'
import { COLLECTIONS } from './schema'

const {
  initEmas, getMpServerless, isEmasReady, getDb,
  db, dbCmd, command,
  anonymousAuth, isAuthorized, resetAuthState,
  wechatAuth, isWechatAuthorized, resetWechatAuthState,
} = setupEmas({
  sdk: MPServerless,
  config: { appId: WX_APPID, ...EMAS_CONFIG },
  mockDb: DEV_MODE ? mockDb : undefined,
})

export {
  initEmas, getMpServerless, isEmasReady, getDb,
  db, dbCmd, command,
  anonymousAuth, isAuthorized, resetAuthState,
  wechatAuth, isWechatAuthorized, resetWechatAuthState,
  isQuotaError, handleEmasError, checkEmasError,
  COLLECTIONS,
}

export const loginWechatAuth = wechatAuth
