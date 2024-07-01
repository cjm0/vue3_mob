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
        reporters: ['default', 'html'],
        outputFile: {
          html: './vite_config/unit-ui/index.html', // html 报告器
        },
        coverage: {
          enabled: true, // 启用收集测试覆盖率
          reportsDirectory: './vite_config/unit-coverage',
        }
      }
    })
  )
)
