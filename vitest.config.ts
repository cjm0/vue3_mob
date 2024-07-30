import { fileURLToPath } from 'node:url'
import { mergeConfig, configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        // 测试报告器
        reporters: ['verbose', 'html'], // verbose-详细报告器
        outputFile: {
          html: './report/unit-ui/index.html', // html 报告器输出地址
        },
        // 测试覆盖率
        coverage: {
          enabled: false, // 启用收集测试覆盖率
          provider: 'v8', // v8、istanbul，默认 v8
          reporter: ['text', 'html', 'clover', 'json'], // clover-xml
          reportsDirectory: './report/unit-coverage',
        }
      }
    })
  )
)
