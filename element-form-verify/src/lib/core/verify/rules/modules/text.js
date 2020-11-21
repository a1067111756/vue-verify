
// 文本长度
export const length = (len) => ({
  type: 'string',
  trigger: 'blur',
  min: parseInt(len),
  max: parseInt(len),
  message: `请输入${len}个字符内容`
})

// 最小文本长度
export const minLen = (len) => ({
  type: 'string',
  trigger: 'blur',
  min: parseInt(len),
  message: `输入内容应大于${len}个字符`
})

// 最大文本长度
export const maxLen = (len) => ({
  type: 'string',
  trigger: 'blur',
  max: parseInt(len),
  message: `输入内容应小于${len}个字符`
})