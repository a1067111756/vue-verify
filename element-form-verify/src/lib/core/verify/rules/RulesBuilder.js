/* 规则构造类 */
import buildInRulesTemplate from './index'
import RulesHandler from './RulesHandler'

class Rules {
  constructor (builder) {
    Object
      .keys(builder.rules)
      .map((key) => (this[key] = builder.rules[key]))
  }

  getRules() {
    return Object.values(this)
  }
}

class RulesBuilder {
  constructor (props, globalOptions) {
    this.rules = {} // 规则集合
    this.vueProps = props // vue模板上注入的字段
    this.globalOptions = globalOptions // 插件注入的全局选项
    this.rulesTemplate = this.__getRulesTemplate() // 校验规则模板
  }

  // 获取校验规则模板
  __getRulesTemplate () {
    const customRules = this.globalOptions.customRules
    
    // 未定义
    if (!customRules) {
      return
    }

    // 检查类型
    if (Object.prototype.toString.call(customRules) !== '[object Object]') {
      console.warn(`form-verify全局自定义规则字段customRules只能是一个object, 自定义规则失效`)
    }

    // 全局自定义优先级高于内置
    return {
      ...buildInRulesTemplate,
      ...customRules
    } 
  }

  // 添加校验规则
  /**
   * 
   * @param { String } ruleKey - 规则策略key
   * @param { Any } ruleValue - 规则策略value
   * @param { Object } [option] - 其它选项，需要传递给校验模板的信息(canBeEmpty、alise等)
   */
  addRule (ruleKey, ruleValue, option) {
    // 校验模板中无该选项，直接返回，不做处理
    if (!this.rulesTemplate[ruleKey]) {
      return this
    }

    // 组合规则选项和全局的选项
    const mergeOptions = { 
      ...option,
      alias: this.globalOptions.alias 
    }

    // 将选项值与选项注入模板规则中
    Object.prototype.hasOwnProperty.call(this.rulesTemplate, ruleKey)
      ? this.rules[ruleKey] = this.rulesTemplate[ruleKey](ruleValue, mergeOptions)
      : console.log(`校验器中无此验证选项：${ ruleKey }，请检查!`)
 
    return this
  }

  // 生成校验规则 - 责任链模式，后期好维护
  build () {
    const rulesHandler = new RulesHandler(this)
    rulesHandler.handle(this.vueProps)
    return new Rules(this)
  }
}

export default RulesBuilder
