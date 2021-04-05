// 验证规则自动注册脚本
//  - 规则: 1. 读取modules文件夹下所有.js注册模块
//         2. index.js导出项必须以export形式(因为一个文件可能会有多个导出项)


// 查找文件
const modules = import.meta.glob('./modules/*.js')

// 匹配注册插件
let rulesList = {}
for (const path in modules) {
  const config = await modules[path]()
  rulesList = { ...rulesList,  ...config }
}

export default rulesList

