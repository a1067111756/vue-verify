// 类型校验策略
const typeStrategy = {
  // 数字类型, 包括(正、负、0)整数&&(正、负、0)浮点数
  '数字': {
    message: '请输入整数或者小数!',
    check: (value) => /^-?\d*\.?\d+$/.test(value)
  },
  // 整数类型, 这里判断包括(正、负、0)整数
  '正数': {
    message: '请输入整数!',
    check: (value) => /^-?[0-9]\d*$/.test(value)
  },
  // 整数类型, 这里判断包括(正、负)整数, 但不包括0
  intr0: {
    message: '请输入整数!',
    check: (value) => /^-?[1-9]\d*$/.test(value)
  },
  // 正整数类型(不包括0)
  '正整数': {
    message: '请输入正整数!',
    check: (value) => /^[1-9]\d*$/.test(value)
  },
  // 正整数类型(包括0)
  pintw0: {
    message: '请输入0或正整数!',
    check: (value) => /^[0-9]\d*$/.test(value)
  },
  // 负整数类型(不包括0)
  '负整数': {
    message: '请输入负整数!',
    check: (value) => /^-[1-9]\d*$/.test(value)
  },
  // 负整数类型(包括0)
  nintw0: {
    message: '请输入0或负整数!',
    check: (value) => /^(0|-[0-9]\d*)$/.test(value)
  },
  // 小数类型, 这里判断包括(正、负)浮点数
  '小数': {
    message: '请输入小数!',
    check: (value) => /^-?([0-9]\d*)\.(\d+)$/.test(value)
  },
  // 小数类型, 这里判断包括(正、负)浮点数，且包括0
  floatw0: {
    message: '请输入小数!',
    check: (value) => /^-?(0|([0-9]\d*\.\d+))$/.test(value)
  },
  // 正小数类型(不包括0)
  '正小数': {
    message: '请输入小数!',
    check: (value) => /^([0-9]\d*)\.(\d+)$/.test(value)
  },
  // 正小数类型(包括0)
  pfloatw0: {
    message: '请输入小数!',
    check: (value) => /^(0|([0-9]\d*\.\d+))$/.test(value)
  },
  // 负小数类型(不包括0)
  '负小数': {
    message: '请输入小数!',
    check: (value) => /^-([0-9]\d*)\.(\d+)$/.test(value)
  },
  // 负小数类型(包括0)
  nfloatw0: {
    message: '请输入小数!',
    check: (value) => /^(0|(-[0-9]\d*\.\d+))$/.test(value)
  },
  // 英文字母(包括大小写)
  '字母': {
    message: '请输入英文字符!',
    check: (value) => /^[a-zA-Z]+$/.test(value)
  },
  // 小写英文字母
  '小写字母': {
    message: '请输入小写英文字符!',
    check: (value) => /^[a-z]+$/.test(value)
  },
  // 大写英文字母
  '大写字母': {
    message: '请输入大写英文字符!',
    check: (value) => /^[A-Z]+$/.test(value)
  },
  // 中文
  '中文': {
    message: '请输入中文字符!',
    check: (value) => /^[\u4e00-\u9fa5]+$/.test(value)
  },
  // 特殊字符
  '特殊字符': {
    message: '请输入[.,!#$%^&*@_+-?]等特殊字符!',
    check: (value) => /^[.,!#$%^&*@_+-/?]+$/.test(value)
  }
}

// 固定类型校验
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

// 自选类型组合 - 提供基本类型组合验证，过于复杂的请使用自定义正则校验
export const typeOptions = (paramsArray, { canBeEmpty }) => ({
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

    const [canUse, needContain] = paramsArray

    // 可选的字符类型验证 - 可选的字符类型是必填项
    if (!canUse || canUse === '') {
      console.error('typeOptions:可选类型参数是必填选项，该条校验规则失效已忽略')
      return
    }
    const canUseStr = canUse.split('|').map(item => strategy[item]).join('')
    const canUseReg = new RegExp(`^[${canUseStr}]+$`)
    if (!canUseReg.test(value)) {
      return callback(new Error(`只允许输入${canUse.replace(/\|/g, '、')}类型字符`))
    }

    // 必须包含的字符类型验证 - 可选类型不填和为空时，默认为不需要包含任何指定类型
    if (!needContain || needContain === '') {
      return callback()
    }
    const needContainStr = needContain.split('|').map(item => `([${strategy[item]}])+`).join('')
    const needContainReg = new RegExp(`${needContainStr}`)
    if (!needContainReg.test(value)) {
      return callback(new Error(`必须包含${needContain.replace(/\|/g, '、')}字符`))
    }

    return callback()
  }
})
