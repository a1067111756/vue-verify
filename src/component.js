import rulesTemplate from './rules'

const ruleProps = {
  // 插件验证开关 - 默认关闭
  verify: {
    type: Boolean,
    default: false
  },
  //文本类型
  type: {
    type: String,
    default: null      
  },
  // 文本指定长度
  length: {
    type: Number | String,
    default: null
  },
  // 文本最小长度
  minLen: {
    type: Number | String,
    default: null      
  },
  // 文本最大长度
  maxLen: {
    type: Number | String,
    default: null      
  },
  // 数字大于
  gt: {
    type: Number | String,
    default: null
  },
  // 数字大于等于
  gte: {
    type: Number | String,
    default: null
  },
  // 数字小于
  lt: {
    type: Number | String,
    default: null
  },
  // 数字小于等于
  lte: {
    type: Number | String,
    default: null
  },
  phone: {
    type: Boolean,
    default: null
  },
  email: {
    type: Boolean,
    default: null    
  },
  url: {
    type: Boolean,
    default: null    
  },  
  // 输入项为空时候不校验 - 主要用于有输入时校验，输入为空时不校验允许通过的情况
  // 比如邀请码这种一般可以为空，不为空又需要校验的输入项
  // canBeEmpty: {
  //   type: Boolean,
  //   default: null
  // } 
}

const verifyMixin = {
  props: {
    ...JSON.parse(JSON.stringify(ruleProps))
  },

  methods: {
    // 判断是否开启插件验证
    isOpenVerify () {
      return this.verify
    },

    // 获取ui框架默认rules值
    getDefaultRules () {
      return this.rules 
        ? this.rules
        : []
    },

    // 解析规则 - default为空用于判断是否有值，后期优化
    ParseRules () {
      return Object
        .keys(ruleProps)
        .filter(propKey => propKey !== 'verify')
        .filter(propKey => this[propKey] !== null)
        .map(propKey => rulesTemplate[propKey](this[propKey]))
    },

    // 合并rules - 插件规则优先级高于ui框架规则
    mergeRules () {
      return [...this.ParseRules(), ...this.getDefaultRules()]
    },

    // 复写ui框架获取验证规则方法
    getRules () {
      // 如果不开启插件验证，返回默认ui框架的默认rules
      return this.isOpenVerify() !== false
        ? this.mergeRules()
        : this.getDefaultRules()
    }    
  }
}

export default verifyMixin