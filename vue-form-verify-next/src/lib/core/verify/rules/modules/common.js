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

// 座机号码
export const telphone = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (!value.startsWith('0')) {
      return callback(new Error('国内座机号码是以数字0开头'))
    }

    if (!value.includes('-')) {
      return callback(new Error('地区码与号码之间需要使用-符号连接'))
    }    

    if (!/^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(value)) {
      return callback(new Error('请输入正确的座机号码'))
    }
    return callback()
  }
})

// 邮箱：一般校验
export const email = () => ({
  type: 'email',
  trigger: 'blur',
  message: '请输入正确的邮箱号',
})

// 邮箱：强校验
export const semail = (emialList, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()

    if (!Array.isArray(emialList)) {
      console.error('semail的参数应该是数组，该条校验失效被忽略')
      return
    }
    
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      return callback(new Error('请输入正确的邮箱号'))
    }

    const res = emialList.some(item => value.includes(item))
    if (!res) {
      return callback(new Error(`只允许输入${emialList}等域名的邮箱`))
    }

    return callback()
  }
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

// 身份证 - 支持1代和2代
export const idCard = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkUnitStrategy = { 
      0: '1', 1: '0', 2: 'X', 3: '9', 4: '8',
      5: '7', 6: '6', 7: '5', 8: '4', 9: '3', 10: '2'
    }

    if (canBeEmpty && !value) return callback()

    if (!/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(value)) {
      return callback(new Error('请输入正确的身份证号'))
    }

    // 对于18位身份证进行最后一位校验位计算
    if (value.length === 18) {
      let checkUnitTotal = 0
      let valueArray = value.split('')
      valueArray.forEach((charValue, index) => {
        if (index === 17) return
        checkUnitTotal += parseInt(charValue) * coefficient[index]
      })

      let checkUnit = checkUnitStrategy[checkUnitTotal % 11]

      if (valueArray[valueArray.length - 1].toUpperCase() !== checkUnit) {
        return callback(new Error('请输入正确的身份证号'))
      }
    }
    return callback()
  }
})

// 密码正则匹配 - 解决80%的常用密码校验，过于复杂的请使用regexp验证
export const passwordOptions = (paramsArray, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    const strategy = {
      '大写字母': 'A-Z',
      '小写字母': 'a-z',
      '字母': 'A-Za-z',
      '数字': '0-9',
      '中文': '\u4e00-\u9fa5',
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
      return callback(new Error(`密码长度应为${min}-${max}位`))
    }

    // 可选的字符类型验证 - 可选的字符类型是必填项
    if (!canUse || canUse === '') {
      console.error('passwordOptions:可选类型参数是必填选项，该条校验规则失效已忽略')
      return
    }
    const canUseStr = canUse.split('|').map(item => strategy[item]).join('')   
    const canUseReg = new RegExp(`^[${canUseStr}]+$`)
    if (!canUseReg.test(value)) {
      return callback(new Error(`密码只能包含${canUse.replace(/\|/g, '、')}类型字符`))
    }

    // 必须包含的字符类型验证 - 可选类型不填和为空时，默认为不需要包含任何指定类型
    if (!needContain || needContain === '') { 
      return callback()
    }    
    const needContainStr = needContain.split('|').map(item => `([${strategy[item]}])+`).join('')
    const needContainReg = new RegExp(`${needContainStr}`)   
    if (!needContainReg.test(value)) {
      return callback(new Error(`密码必须包含${needContain.replace(/\|/g, '、')}类型字符`))
    }

    return callback()
  }
})

// 正则验证 - 当前只支持字面量
export const regexp = (paramsArray, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (!Array.isArray(paramsArray)) {
      console.error('regexp校验的参数是含两个变量的数组 - ["正则字面量", "错误提示"]，此条校验无效被忽略')
      return
    }

    const [regexp, alias] =  paramsArray
    if (Object.prototype.toString.call(regexp) !== '[object RegExp]') {
      console.error('regexp校验的参数是含两个变量的数组 - ["正则字面量", "错误提示"]，此条校验无效被忽略')
      return
    }

    if (canBeEmpty && !value) return callback()

    if (!regexp.test(value)) {
      return callback(new Error(alias || '输入不符合要求'))
    }

    callback()
  }
})

const __isNumber = (value) => /^-?\d*\.?\d+$/.test(value)