/* 规则构造类 */
import buildInRulesTemplate from './index'
import RulesHandler from './RulesHandler'

class Rules {
  constructor (builder: RulesBuilder) {
    Object
      .keys(builder.rules)
      .map((key: string) => (this[key] = builder.rules[key]))
  }

  getRules() {
    return Object.values(this)
  }
}

class RulesBuilder {
  // 规则集合
  rules: { [key: string]: any } = {}
  // 组件注入的props
  private readonly vueProps: VERIFY_TYPE.IVerifyProps
  // 插件注入的全局选项
  private readonly globalOptions: VERIFY_TYPE.IGlobalOption
  // 校验规则
  private readonly rulesTemplate: VERIFY_TYPE.IVerifyRule
  
  constructor (props: VERIFY_TYPE.IVerifyProps, globalOptions: VERIFY_TYPE.IGlobalOption) {
    this.vueProps = props
    this.globalOptions = globalOptions
    this.rulesTemplate = this.__getRulesTemplate()
  }

  // 获取校验规则模板
  __getRulesTemplate () {
    const customRules: VERIFY_TYPE.IVerifyRule | undefined = this.globalOptions.customRules

    // 未定义
    if (!customRules) {
      return buildInRulesTemplate
    }

    // 检查类型
    if (Object.prototype.toString.call(customRules) !== '[object Object]') {
      console.warn('form-verify全局自定义规则字段customRules只能是一个object, 自定义规则失效')
      return buildInRulesTemplate
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
  addRule (ruleKey: string, ruleValue?: any, option?: Record<string, any>) {
    // 校验模板中无该选项，直接返回，不做处理
    if (!this.rulesTemplate[ruleKey]) {
      console.log(`校验器中无此验证选项：${ ruleKey }，请检查，该条校验被忽略!`)
      return this
    }

    // 组合规则选项和全局的选项
    const mergeOptions = { 
      ...option,
      errorAlias: this.globalOptions.errorAlias 
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
