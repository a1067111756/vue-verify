// 正则验证 - 当前只支持字面量
export const regexp = (regexp, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(regexp) !== '[object RegExp]') {
      console.error('regexp校验的参数只能是字面量正则')
      return callback()
    }

    if (canBeEmpty && !value) return callback()

    if (!regexp.test(value)) {
      return callback(new Error('当前参数不合法'))
    }

    callback()
  }
})

// 手机号 - 弱校验
export const wphone = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (value.toString().length !== 11) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!__isNumber(value)) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!/^1[0-9]{10}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }
    return callback()
  }
})

// 手机号 - 普通校验
export const phone = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (value.toString().length !== 11) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!__isNumber(value)) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }
    return callback()
  }
})

// 手机号 - 强校验
/* note
  1、移动号段有134,135,136,137, 138,139,147,150,151, 152,157,158,159,178,182,183,184,187,188。
  2、联通号段有130，131，132，155，156，185，186，145，176。
  3、电信号段有133，153，177，180，181，189。
 */
export const sphone = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (value.toString().length !== 11) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!__isNumber(value)) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!/^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0-35689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }
    return callback()
  }
})

// 邮箱
export const email = () => ({
  type: 'email',
  trigger: 'blur',
  message: '请输入正确的邮箱号',
})

// url链接
export const url = () => ({
  type: 'url',
  trigger: 'blur',
  message: '请输入正确的url',
})

// url链接 - 固定开头
export const surl = (prefix, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (!/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(value)) {
      return callback(new Error('请输入正确的url'))
    }

    if (value.startsWith(prefix)) {
      return callback(new Error(`请输入以${prefix}开头的url`))
    }

    return callback()
  }
})

// 密码正则匹配
export const passwordRegexp = (paramsArray, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    const [regexp, alias] = paramsArray
    if (!regexp.test(value)) {
      return callback(new Error(alias))
    }
    return callback()
  }
})

// 密码正则匹配 - 解决80%的常用密码校验，过于复杂的请使用passwordRegexp验证
export const password = (paramsArray, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    const strategy = {
      '大写字母': 'A-Z',
      '小写字母': 'a-z',
      '字母': 'A-Za-z',
      '数字': '0-9',
      '特殊字符': '/./,/!/#/$/%/^/&/*/@/_/+/(/)/-/?',
      '.': '/.',
      ',': '/,',
      '!': '/!',
      '#': '/#',
      '$': '/$',
      '%': '/%',
      '^': '/^',
      '&': '/&',
      '*': '/*',
      '@': '/@',
      '_': '/_',
      '+': '/+',
      '(': '/(',
      ')': '/)',
      '-': '/-',
      '?': '/?',
    }

    if (canBeEmpty && !value) return callback()

    const [min, max, canUse, needContain] = paramsArray
    
    // 长度验证
    if (min > value.toString().length || value.toString().length > max) {
      return callback(new Error(`密码应为${min}-${max}位字符`))
    }

    // 可以使用的字符验证
    const canUseStr = canUse.split('|').map(item => strategy[item]).join('')
    const canUseReg = new RegExp(`^[${canUseStr}]*$`)
    if (!canUseReg.test(value)) {
      return callback(new Error(`密码只能包含${canUse}这些字符`))
    }

    // 必须包含的字符验证
    const needContainStr = needContain.split('|').map(item => `([${strategy[item]}])+`).join('')
    const needContainReg = new RegExp(`^${needContainStr}$`)   
    if (!needContainReg.test(value)) {
      return callback(new Error(`密码必须包含${needContain}`))
    }

    return callback()
  }
})

// 身份证
export const idCard = () => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      return callback(new Error('请输入正确的身份证号'))
    }
    return callback()
  }
})

const __isNumber = (value) => /^-?\d*\.?\d+$/.test(value)

export default {
  regexp,
  wphone,
  phone,
  sphone,
  email,
  url,
  surl,
  passwordRegexp,
  password,
  idCard
}