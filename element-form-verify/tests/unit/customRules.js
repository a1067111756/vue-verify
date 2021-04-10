// 新添加规则
const newRule = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()

    if (!/^[0-9a-z]*$/.test(value)) {
      return callback(new Error('只允许输入数字、小写字母'))
    }

    callback()
  }
})

// 覆盖旧规则
const phone = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (value.toString().length !== 12) {
      return callback(new Error('手机号应该为12位数字'))
    }

    if (!/^1[0-9]{11}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }
    return callback()
  }
})

export default {
  newRule,
  phone
}