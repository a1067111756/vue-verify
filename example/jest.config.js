module.exports = {
  // 测试文件中引入的文件类型推断
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  // 测试文件转换插件声明
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  // 测试覆盖率文件配置
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/assets/**',
    '!src/store/**',
    '!src/main.js',
    '!src/router/**',
    '!**/node_modules/**'
  ],
  // 转换忽略
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  // 特殊符号映射， eg：@ ~等vue特殊路径的 映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 测试命令执行时查找匹配的测试文件正则匹配
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  // jest测试模拟环境的地址
  testURL: 'http://localhost/',
  // jest测试监听提示插件
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}