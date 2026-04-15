# 常见问题

## 组件相关

### Q: 为什么组件不需要 import？

tt-shaduni 使用 easycom 自动注册。在 `pages.json` 中配置后，`tt-` 前缀的组件会自动映射，template 中直接使用即可。

### Q: 样式为什么不用 scoped？

UniApp 小程序端 scoped 实现与 Web 端不同，可能导致样式穿透问题。tt-shaduni 统一使用 BEM 命名隔离（如 `.tt-button`、`.tt-button__text`），避免样式冲突。

### Q: 为什么用 rpx 而不是 px？

rpx 是 UniApp 的响应式单位，750rpx = 屏幕宽度。确保不同设备上的一致表现。例外：系统级属性（如 `status-bar-height`）使用 px。

### Q: 如何覆盖组件默认样式？

通过 CSS 变量覆盖：
```vue
<tt-cell style="--tt-cell-bg: transparent" />
```

或通过 `:deep()` 穿透（不推荐，优先用 CSS 变量）。

## EMAS 相关

### Q: 为什么 EMAS SDK 必须显式传入？

小程序环境不支持 `require()` 动态加载。`setupEmas({ sdk: MPServerless })` 确保 SDK 在编译时被正确引入。如果用 `require` 或动态 `import()`，在支付宝小程序等平台会报错。

### Q: 开发模式如何 mock 数据？

在 `api/emas.js` 中传入 `mockDb`：
```javascript
const { db, ... } = setupEmas({
  sdk: MPServerless,
  config: { ... },
  mockDb: DEV_MODE ? mockDb : undefined,
})
```

mock 数据定义在 `mock/db.js` 中。

### Q: API 为什么每个操作一个文件？

1. 职责单一，易于维护
2. 树摇优化：未使用的 API 不会打包
3. 命名清晰：`getProjectList.js` 一看就知道功能
4. 测试友好：每个文件可独立测试

## 架构相关

### Q: 为什么用 usePageFresh 而不是每次 onShow 都拉取数据？

避免不必要的 API 调用。usePageFresh 通过 dataTs 时间戳对比，只在数据确实变更时才刷新。TTL 机制（默认 5 分钟）防止频繁查询云端。

### Q: Store 的 markDirty 和 markFresh 有什么区别？

- `markDirty()`：本地操作后调用（如新增、编辑），只更新 `dataTs`
- `markFresh()`：API 拉取后调用，更新 `dataTs` + `lastFetchTime` + 执行 `persist()`

### Q: 路由为什么集中管理？

1. 避免硬编码路径字符串分散在各处
2. 修改路径只需改一处
3. 导航函数封装参数传递逻辑
4. IDE 可以全局搜索 `ROUTES.xxx` 找到所有引用

## 图标相关

### Q: 图标名为什么要用完整格式 ri-xxx-line？

tt-icon 组件通过名称去 `static/svg/` 目录查找对应文件。短名称（如 `home`）无法定位文件，必须用完整名（如 `ri-home-line`）。

### Q: 如何添加新图标？

1. 从 [Remix Icon](https://remixicon.com/) 下载 SVG
2. 放入 `static/svg/` 目录
3. 文件名保持 `ri-xxx-line.svg` / `ri-xxx-fill.svg` 格式
4. 使用：`<tt-icon name="ri-xxx-line" />`
