export default {
	printWidth: 120, // 超过 120 个字符换行
	useTabs: false, // 不使用 tab 缩进，使用空格缩进
	tabWidth: 2, // 缩进 2 个字符
	singleQuote: true, // 使用单引号，true-单引号、false-双引号
	semi: false, // 行尾不加分号

	eslintIntegration: true, // 开启 eslint 代码格式校验
	stylelintIntegration: true, // 开启 stylelint 代码格式校验
	tslintIntegration: true, // 开启 tslint 代码格式校验
	htmlWhitespaceSensitivity: 'ignore', // 根据显示样式决定 html 要不要折行
};
