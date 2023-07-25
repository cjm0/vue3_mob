// 版本号日期，修改此值可强制更新缓存
const CACHE_VERSION = 'v20230531';

// 缓存文件的名称
const CACHE_STALE_NAME = `stale_cache_${CACHE_VERSION}`;
const CACHE_FIRST_NAME = `first_cache_${CACHE_VERSION}`;

// 缓存资源
const CACHE_DOC_NAME = 'hwb-reader.yuewen.com'; // document 先用缓存同时更新缓存-刷新页面更新
const CACHE_DOCUMENT = 'cache_document'; // 缓存 key
const CACHE_URL_LIST = ['novel-reader-kit', 'ppsads.js']; // 外部依赖 js 先用缓存同时更新缓存-刷新页面更新
const CACHE_FIRST_LIST = ['script', 'style', 'font']; // 用缓存，没有缓存用新的-发版去更新

// 安装后
self.addEventListener('install', () => {
  console.log('serviceWorker install')

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
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
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
  if (method === 'POST' || !(url.indexOf('http') === 0)) {
    return;
  }

  // document 处理
  if (url.includes(CACHE_DOC_NAME)) {
    event.respondWith(caches.open(CACHE_STALE_NAME).then(() => caches.match(CACHE_DOCUMENT).then((cacheResponse) => {
      return staleWhileRevalidateHandler(cacheResponse, event, CACHE_DOCUMENT)
    })));
    return;
  }
  // 外部依赖 js 处理
  if (CACHE_URL_LIST.find(val => url.indexOf(val) > -1)) {
    event.respondWith(caches.open(CACHE_STALE_NAME).then(() => caches.match(event.request).then((cacheResponse) => {
      return staleWhileRevalidateHandler(cacheResponse, event, event.request)
    })));
    return;
  }
  // 静态资源类型处理
  if (CACHE_FIRST_LIST.includes(event.request.destination)) {
    event.respondWith(caches.open(CACHE_FIRST_NAME).then(() => caches.match(event.request).then((cacheResponse) => {
      return cacheFirstHanler(cacheResponse, event)
    })));
    return;
  }

  // 未被命中的请求直接不处理，防止跨域问题
});

// 先用缓存，同时更新缓存（频繁更换的资源）
function staleWhileRevalidateHandler(cacheResponse, event, name) {
  const fetchResponse = fetch(event.request).then(networkResponse => caches.open(CACHE_STALE_NAME).then((cache) => {
    // 存入缓存
    cache.put(name, networkResponse.clone());
    return networkResponse;
  }))
    .catch(() => cacheResponse);

  return cacheResponse || fetchResponse;
}

// 有缓存用缓存，没有发请求
function cacheFirstHanler(cacheResponse, event) {
  // 有缓存，就直接使用
  if (cacheResponse) {
    return cacheResponse;
  }
  // 没有缓存，再去请求服务端
  return fetch(event.request).then(networkResponse => caches.open(CACHE_FIRST_NAME).then((cache) => {
    // 存入缓存
    cache.put(event.request, networkResponse.clone());
    return networkResponse;
  }))
    .catch(() => cacheResponse);
}
