// 验证规则自动注册脚本
//  - 规则: 1. 读取modules文件夹下所有.js注册模块
//         2. index.js导出项必须以export形式(因为一个文件可能会有多个导出项)


// 查找文件
const requirRules = require.context(
  // 指令目录
  './modules',
  // 不查找子目录
  true,
  // js文件
  /.js$/
)

// 匹配注册插件
let rulesList = {}
requirRules.keys().forEach(fileName => {
  const config = requirRules(fileName)
  rulesList = { ...rulesList,  ...config }
})

export default rulesList

