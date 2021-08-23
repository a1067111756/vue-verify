// 验证规则自动注册脚本
// 查找文件
const modules = import.meta.globEager('./modules/*.js')

// 匹配注册
let rulesList = {}
for (const fileName in modules) {
  const config = modules[fileName]
  rulesList = {...rulesList,  ...config}
}

// 导出规则列表
export default rulesList


