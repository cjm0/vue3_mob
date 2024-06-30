// 版本号日期，修改此值可强制更新缓存
const CACHE_VERSION = 'v20240402';

// 缓存文件的名称
const CACHE_STALE_NAME = `hwb_reader_stale_cache_${CACHE_VERSION}`;
const CACHE_FIRST_NAME = `hwb_reader_first_cache_${CACHE_VERSION}`;

// 缓存资源
const CACHE_DOC_NAME = 'hwb-reader.yuewen.com'; // document 先用缓存同时更新缓存-刷新页面更新
const CACHE_DOCUMENT = 'cache_document'; // 缓存 key
const CACHE_URL_LIST = ['novel-reader-kit', 'ppsads.js']; // 外部依赖 js 先用缓存同时更新缓存-刷新页面更新
const CACHE_FIRST_LIST = ['script', 'style', 'font']; // 用缓存，没有缓存用新的-发版去更新

// 安装后
self.addEventListener('install', () => {
  console.log('serviceWorker install')

  /*
    serviceWorker 更新：
    当在执行 register() 方法注册 Service Worker 的时候，浏览器通过自身 diff 算法能够检测 sw.js 的更新，一旦发现文件内容不一致，就会进入更新流程

    在默认情况下，Service Worker 必定会每24小时被下载一次，如果下载的文件是最新文件，那么它就会被重新注册和安装，但不会被激活，当不再有页面使用旧的 Service Worker 的时候，它就会被激活

    如果有一个旧版本的 serviceWorker 在运行，那么会进入 waiting 状态，等待页面关闭后再打开才会更新 serviceWorker 版本
  */

  // 让当前新版本的 serviceWorker 跳过等待直接用新的 serviceWorker
  self.skipWaiting()
});

// 激活后
self.addEventListener('activate', (event) => {
  console.log('serviceWorker activate')

  // 激活后马上作用于所有其他激活的终端
  // event.waitUntil(
  //   self.clients.claim().then(() => {
  //     // 返回处理缓存更新的相关事情的 Promise
  //   })
  // )

  // 根据策略将之前版本的缓存删除
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 如果当前版本和缓存版本不一致则删除旧的缓存
          if (!cacheName.includes(CACHE_VERSION)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
});

// 拦截全站请求
// 参考: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event
self.addEventListener('fetch', (event) => {
  // console.log('serviceWorker fetch request', event.request);

  // 127.0.0.1 和 localhost 可在本地调试
  // if (event.request.url.includes('127.0.0.1')) {
  //   return;
  // }

  const { url, method } = event.request;
  if (method === 'POST' || !(url.indexOf('https') === 0)) {
    return;
  }

  // document 处理
  if (url.includes(CACHE_DOC_NAME) && !url.includes('favicon')) {
    event.respondWith(
      (async () => {
        try {
          // url 含 readerVersion 则走灰度机器
          // url readerVersion=new 标识走强制更新逻辑
          if (url.includes('readerVersion=new')) {
            // 获取缓存标识
            let cacheVersion = await caches.match('readerVersion', { cacheName: CACHE_STALE_NAME });
            if (cacheVersion) {
              cacheVersion = await cacheVersion.text()
            }
            // 获取 url 标识
            const query = new URL(url).searchParams;
            const urlVersion = query && query.get('readerVersion');
            // 无缓存标识 || 缓存标识和 url 标识不一致，走网络请求，同时更新 serviceWorker 缓存
            if (!cacheVersion || cacheVersion !== urlVersion) {
              const networkRes = await fetch(event.request)
              const cache = await caches.open(CACHE_STALE_NAME)
              cache.put(CACHE_DOCUMENT, networkRes.clone());  // 存入缓存
              cache.put('readerVersion', new Response(urlVersion, { status: 200, statusText: 'ok' }));  // 存入缓存
              return networkRes
            }
          }
        } catch (error) { // 网络请求失败用缓存兜底
          console.log('serviceWorker fetch readerVersion err：', error);
          const cacheRes = await caches.match(CACHE_DOCUMENT, { cacheName: CACHE_STALE_NAME })
          return cacheRes
        }

        const cacheRes = await caches.match(CACHE_DOCUMENT, { cacheName: CACHE_STALE_NAME })
        return staleWhileRevalidateHandler(cacheRes, event, CACHE_DOCUMENT)
      })()
    )
    return;
  }
  // 外部依赖 js 处理
  if (CACHE_URL_LIST.find(val => url.indexOf(val) > -1)) {
    event.respondWith(
      (async () => {
        const cacheRes = await caches.match(event.request, { cacheName: CACHE_STALE_NAME })
        return staleWhileRevalidateHandler(cacheRes, event, event.request)
      })()
    )
    return;
  }
  // 静态资源类型处理
  if (CACHE_FIRST_LIST.includes(event.request.destination)) {
    event.respondWith(
      (async () => {
        const cacheRes = await caches.match(event.request, { cacheName: CACHE_FIRST_NAME })
        return cacheFirstHanler(cacheRes, event)
      })()
    )
    return;
  }
});

// 先用缓存，后台同步更新（频繁更换的资源）
function staleWhileRevalidateHandler(cacheRes, event, name) {
  const fetchResponse = fetch(event.request).then(networkRes => caches.open(CACHE_STALE_NAME).then(cache => {
    cache.put(name, networkRes.clone());  // 存入缓存
    return networkRes;
  }))
    .catch(() => cacheRes);

  return cacheRes || fetchResponse;
}

// 缓存优先
function cacheFirstHanler(cacheRes, event) {
  // 有缓存，就直接使用
  if (cacheRes) {
    return cacheRes;
  }
  // 没有缓存，再去请求服务端
  return fetch(event.request).then(networkRes => caches.open(CACHE_FIRST_NAME).then(cache => {
    cache.put(event.request, networkRes.clone()); // 存入缓存
    return networkRes;
  }))
    .catch(() => cacheRes);
}