/**
 * @Description : 全局配置数据 $config 挂载到 window
 * @Author      : chenjianmin
 * @Date        : 2023-04-03 17:02:46
 */

// Browser environment
const inBrowser: boolean = typeof window !== 'undefined'
const inWeex: boolean = typeof window.WXEnvironment !== 'undefined' && !!window.WXEnvironment.platform
const weexPlatform: string = inWeex ? window.WXEnvironment.platform.toLowerCase() : ''
const UA: string = inBrowser ? window.navigator.userAgent.toLowerCase() : ''

let env: string = '' // local dev prod 本地开发环境、测试环境
const hostname: string = location.hostname || ''
if (hostname.includes('fe.pkucare')) {
  // 正式环境
  env = 'prod'
} else if (hostname.includes('fetest.pkucare')) {
  // 测试环境
  env = 'dev'
} else {
  // 本地开发环境
  env = 'local'
}

window.$config = {
  env,
  system: {
    isIE: /msie|trident/.test(UA),
    isWeixin: UA.includes('micromessenger'),
    isAndroid: UA.includes('android') || weexPlatform === 'android',
    isIphoneX:
      /iphone/gi.test(navigator.userAgent) &&
      screen.height === 812 &&
      screen.width === 375,
  },
}
