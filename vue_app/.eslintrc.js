module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // 规则配置
  /**
   *“off”或0：不启用该规则。
    “warn”或1：违反时警告。
    “error”或2：违反时报错。
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'pro' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'pro' ? 'error' : 'off',
    // 函数定义的时候不允许出现重复的参数
    "no-dupe-args": 2, 
    // 对象中不允许出现重复的键
    "no-dupe-keys": 2,
    // 不允许出现空的代码块
    "no-empty": 2,
    // 不允许出现不必要的分号
    "no-extra-semi": 2,
    // 禁止语句分号结尾
    "semi": [2, "never"],
     // 分后前不空格，后空格
    "semi-spacing": [2, {"before": false, "after": true}],
    // 不允许出现多余的空格
    "no-multi-spaces": 2,
    // 允许使用tab
    "no-tabs": [0],
    // 强制一致的缩进风格:tab
    "indent": [2, "tab"],
    // 不允许使用var
    "no-var": 2, 
    // 使用单引号
    "quotes": [2, "single"],
    // 不强制驼峰命名规则 
    "camelcase": [2, 
      {"properties": "never"}, 
      {"ignoreImports": true}, 
      {"ignoreDestructuring": true}, 
      {"ignoreGlobals": true}
    ],
    // 不强制驼峰命名规则 "ignoreImports": false
    "camelcase": [2, {"ignoreImports": true}]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}