# 项目架构

> 从 tt-daka-mp 打卡小程序提炼的 10 个经过验证的架构模式

## 分层架构

```
Pages → Components → Composables → Stores → API → Utils → tt-shaduni
```

每层只能调用下层，不可反向依赖。

## 10 个核心架构模式

### 1. EMAS 统一入口

所有 EMAS 能力通过 `api/emas.js` 统一导出，全项目通过此文件访问数据库和认证。

```javascript
// 其他文件只需：
import { db, COLLECTIONS, dbCmd } from '@/api/emas'
```

### 2. API 单文件模式

每个 API 操作一个文件，统一返回 `{ success, data?, error? }`：

```
api/
├── emas.js          # EMAS 入口
├── schema.js        # 集合常量 + 类型
└── project/
    ├── createProject.js
    ├── getProjectList.js
    ├── getProjectDetail.js
    ├── updateProject.js
    └── deleteProject.js
```

命名规则：`{action}{Module}.js`（camelCase）

### 3. Local-First 模式

Store 立即更新本地数据，异步同步到云端：

```
用户操作 → Store 立即更新 → persist 到 localStorage → 异步 API 调用云端
```

例：批量排序时先乐观更新本地 list + persist，再调用 batchUpdateSortApi。

### 4. 页面新鲜度 (usePageFresh)

每个页面通过 composable 判断是否需要重新加载数据：

```javascript
const { needRefresh, forceCheck, markLoaded } = usePageFresh('home')

onShow(async () => {
  if (await needRefresh()) {
    await loadData()
    markLoaded()
  }
})
```

机制：
1. 对比页面记录的 `pageTs` 与 Store 的 `dataTs`
2. 不同则需刷新（其他页面修改了数据）
3. 超过 TTL(5min) 还会查云端 `dataVersion`（其他设备修改）

### 5. Store 缓存模式

```
restore() → 从 localStorage 恢复
fetch()   → 从 API 拉取最新数据
persist() → 写入 localStorage
markDirty() → 更新 dataTs（本地操作后）
markFresh() → 更新 dataTs + lastFetchTime + persist（API 拉取后）
```

每个 Store 暴露：`list`、`restore`、`persist`、`markDirty`、`markFresh`、`isStale`。

### 6. easycom 双前缀

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "tt-(.*)": "@/uni_modules/tt-shaduni/components/tt-$1/tt-$1.vue",
      "Tt(.*)": "@/components/Tt$1.vue"
    }
  }
}
```

- `tt-` 前缀：自动映射 tt-shaduni 组件，无需 import
- `Tt` 前缀：自动映射业务包装组件

### 7. 业务包装组件

平台差异封装在业务组件层（`Tt` 前缀），内部使用 tt-shaduni 组件：

- `TtNavbar`：封装 tt-navbar + 返回按钮 + 状态栏适配
- `TtTabbar`：封装 tt-tabbar + selectedIcon + activeColor + placeholder

### 8. 路由集中管理

所有路径和导航函数在 `route/index.js` 中定义：

```javascript
export const ROUTES = {
  HOME: '/pages/index/index',
  PROJECT_ADD: '/pages/project/sub/add/index',
  PROJECT_DETAIL: '/pages/project/sub/detail/index',
}

export function goProjectDetail(id) {
  uni.navigateTo({ url: `${ROUTES.PROJECT_DETAIL}?id=${id}` })
}
```

页面中不硬编码路径，统一通过 `route/index.js` 导航。

### 9. 样式导入链

```
uni.scss
└── @import global.scss
    ├── @import 'tt-shaduni/styles/theme.css'    // CSS 变量
    └── @import 'tt-shaduni/styles/utilities.scss' // 工具类
```

### 10. Schema 集中定义

所有集合常量 + JSDoc 类型定义在 `api/schema.js`：

```javascript
export const COLLECTIONS = {
  USERS: 'dk-users',
  PROJECTS: 'dk-projects',
  RECORDS: 'dk-records',
}

/** @typedef {Object} DakaProject ... */
```

新增模块时，先在 schema.js 中添加集合常量和类型定义。

## 目录结构规范

```
project-root/
├── api/                    # API 层：emas.js + schema.js + 按模块拆分
├── components/             # 业务包装组件（Tt 前缀）
├── composables/            # usePageFresh 等可复用逻辑
├── config/                 # 项目配置 + 多环境
├── mock/                   # Mock 数据
├── pages/                  # 页面（按功能域分目录）
│   └── {module}/
│       ├── index.vue       # 列表页
│       ├── components/     # 页面私有组件
│       └── sub/            # 子页面（detail/add）
├── plugins/                # 插件
├── route/                  # 路由集中管理
├── stores/                 # Pinia Store（按业务域拆分）
├── styles/                 # 全局样式
├── utils/                  # 工具函数
└── uni_modules/            # tt-shaduni
```
