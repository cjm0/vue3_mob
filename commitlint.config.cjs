module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72], // 最大长度
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],

    // type
    'type-empty': [2, 'never'], // 不能为空
    'type-case': [2, 'always', 'lower-case'], // 小写格式
    'type-enum': [ // 类型字段
      2,
      'always',
      [
        'feat', // 增加新功能（feature）
        'fix', // 修复bug
        'test', // 添加测试或者修改现有测试
        'revert', // 回撤
        'release', // 正式,打包tag等发版

        'refactor', // 代码重构时使用
        'perf', // 优化了性能的代码改动
        'docs', // 只改动了文档相关的内容
        'style', // 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号

        'build', // 构造工具的或者外部依赖的改动，例如 webpack，npm
        'chore', // 不修改src或者test的其余修改，例如构建过程或辅助工具的变动
      ],
    ],

    // scope
    'scope-case': [2, 'always', 'lower-case'], // 小写格式

    // subject
    'subject-empty': [2, 'never'], // 不能为空
    'subject-case': [0], // 大小写不做校验
    'subject-full-stop': [2, 'never', '.'], // 标题不能以 . 结束
  },
}
