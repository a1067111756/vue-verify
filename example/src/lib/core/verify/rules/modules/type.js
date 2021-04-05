// 类型校验策略
const typeStrategy = {
  // 数字类型, 包括(正、负、0)整数&&(正、负、0)浮点数
  number: {
    message: '请输入整数或者小数!',
    check: (value) => /^-?\d*\.?\d+$/.test(value)
  },
  // 整数类型, 这里判断包括(正、负、0)整数
  int: {
    message: '请输入整数!',
    check: (value) => /^-?[0-9]\d*$/.test(value)
  },
  // 正整数类型
  pint: {
    message: '请输入正整数!',
    check: (value) => /^[1-9]\d*$/.test(value)
  },
  // 正整数类型(包括0)
  pintw0: {
    message: '请输入0或正整数!',
    check: (value) => /^[0-9]\d*$/.test(value)
  },
  // 负整数类型
  nint: {
    message: '请输入负整数!',
    check: (value) => /^-[1-9]\d*$/.test(value)
  },
  // 负整数类型(包括0)
  nintw0: {
    message: '请输入0或负整数!',
    check: (value) => /^((-\d+)|(0+))$/.test(value)
  },
  // 小数类型, 这里判断包括(正、负、0)浮点数
  float: {
    message: '请输入小数!',
    check: (value) => /^\d*\.\d+$/.test(value)
  },
  // 英文字母(包括大小写)
  engChar: {
    message: '请输入英文字符!',
    check: (value) => /^[a-zA-Z]+$/.test(value)
  },
  // 小写英文字母
  engLowerChar: {
    message: '请输入小写英文字符!',
    check: (value) => /^[a-z]+$/.test(value)
  },
  // 大写英文字母
  engUpperChar: {
    message: '请输入大写英文字符!',
    check: (value) => /^[A-Z]+$/.test(value)
  },
  // 数字、英文组合
  engAndNum: {
    message: '请输入英文和数字字符!',
    check: (value) => /^[0-9a-zA-Z]+$/.test(value)
  },
}


// 类型校验
export const type = (type, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()  

    const strategy = typeStrategy[type]
    return strategy.check(value)
      ? callback()
      : callback(new Error(strategy.message))
  }
})
