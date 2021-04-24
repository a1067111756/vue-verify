// 数组长度校验
export const arrayNotEmpty = (alise, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(value) !== "[object Array]") {
      console.error('arrayEmpty: 检测的内容必须为数组，当前内容：${value}，该条校验规则失效已忽略')
      return
    }

    if (value.length <= 0) {
      return callback(new Error(alise))
    }

    return callback()
  }
})