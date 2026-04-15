# EMAS 云服务

## 概述

EMAS (Enterprise Mobile Application Studio) 是阿里云 Serverless 服务。tt-shaduni 封装了 EMAS SDK，通过 `cloud-emas` 子路径按需加载。

## 初始化

在项目的 `api/emas.js` 中统一初始化：

```javascript
import MPServerless from '@alicloud/mpserverless-sdk'
import { setupEmas } from '@/uni_modules/tt-shaduni/cloud-emas/index'
import { EMAS_CONFIG, WX_APPID } from '@/config/index'

const {
  initEmas, getMpServerless, isEmasReady, getDb,
  db, dbCmd, command,
  anonymousAuth, isAuthorized, resetAuthState,
  wechatAuth, isWechatAuthorized, resetWechatAuthState,
} = setupEmas({
  sdk: MPServerless,          // SDK 必须显式传入
  config: { appId: WX_APPID, ...EMAS_CONFIG },
  mockDb: DEV_MODE ? mockDb : undefined,  // 开发模式使用 mock
})

export {
  initEmas, getMpServerless, isEmasReady, getDb,
  db, dbCmd, command,
  anonymousAuth, isAuthorized, resetAuthState,
  wechatAuth, isWechatAuthorized, resetWechatAuthState,
  COLLECTIONS,
}
```

**关键规则**：SDK 必须通过 `setupEmas({ sdk })` 显式传入，不可用 `require()` 或动态 import。

## 数据库操作

### 查询

```javascript
import { db, COLLECTIONS } from '@/api/emas'

const res = await db.collection(COLLECTIONS.PROJECTS)
  .where({ accountId, archived: false })
  .orderBy('sortOrder', 'asc')
  .get()
const list = res.data || []
```

### 创建

```javascript
const doc = { accountId, name, createTime: now, updateTime: now }
const addRes = await db.collection(COLLECTIONS.PROJECTS).add(doc)
doc._id = addRes.id || addRes._id
```

### 更新

```javascript
await db.collection(COLLECTIONS.PROJECTS)
  .where({ _id: id, accountId })
  .update({ name, updateTime: now })
```

### 删除

```javascript
await db.collection(COLLECTIONS.PROJECTS)
  .where({ _id: id, accountId })
  .remove()
```

### 条件查询

```javascript
import { db, dbCmd, COLLECTIONS } from '@/api/emas'

// in 查询
const res = await db.collection(COLLECTIONS.RECORDS)
  .where({ projectId: dbCmd.in(projectIds) })
  .get()
```

## Schema 集中定义

在 `api/schema.js` 中定义所有集合常量和类型：

```javascript
export const COLLECTIONS = {
  USERS: 'dk-users',
  PROJECTS: 'dk-projects',
  RECORDS: 'dk-records',
}

/**
 * @typedef {Object} DakaProject
 * @property {string} _id
 * @property {string} accountId
 * @property {string} name
 * ...
 */
```

## 认证

- **匿名认证**：`anonymousAuth()` — 无需登录即可使用
- **微信认证**：`wechatAuth()` — 微信小程序环境自动获取 openid
- 认证状态检查：`isAuthorized()` / `isWechatAuthorized()`

## API 返回格式规范

所有 API 函数统一返回：

```javascript
// 成功
{ success: true, data: {...} }
{ success: true, list: [...], todayRecords: [...] }

// 失败
{ success: false, error: '错误信息' }

// 缓存兜底
{ success: true, list: [...], fromCache: true }
```

> 源码: packages/cloud-emas/index.ts
> 项目示例: api/emas.js, api/schema.js
