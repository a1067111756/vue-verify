/* 规则构造类 */
import RulesHandler from './RulesHandler'
import buildInRulesTemplate from './index'

// 规则实体类
class Rules {
  constructor (builder: RulesBuilder) {
    Object
      .keys(builder.rules)
      .map((key: string) => (this[key] = builder.rules[key]))
  }

  // 生成规则
  getRules() {
    return Object.values(this)
  }
}

// 规则构建类
class RulesBuilder {
  // 选入的规则集合
  rules: { [key: string]: any } = {}
  // 组件注入的props
  private readonly vueProps: VERIFY_TYPE.IVerifyProps
  // 插件注入的全局选项
  private readonly globalOptions: VERIFY_TYPE.IGlobalOption
  // 校验规则模板集合
  private readonly rulesTemplate: VERIFY_TYPE.IVerifyRule
  
  constructor (props: VERIFY_TYPE.IVerifyProps, globalOptions: VERIFY_TYPE.IGlobalOption) {
    this.vueProps = props
    this.globalOptions = globalOptions
    this.rulesTemplate = this.__getRulesTemplate()
  }

  // 获取校验规则模板集合
  __getRulesTemplate (): VERIFY_TYPE.IVerifyRule {
    // 插件全局选项注入的规则模板
    const customRules: VERIFY_TYPE.IVerifyRule | undefined = this.globalOptions.customRules

    // 未定义 - 直接返回内置模板
    if (!customRules) {
      return buildInRulesTemplate
    }

    // 检查注入的规则模板参数合法性 - 只支持对象形式
    if (Object.prototype.toString.call(customRules) !== '[object Object]') {
      console.error('form-verify验证插件全局自定义规则字段customRules只能是一个object, 当前传入customRules非object类型, 自定义规则失效')
      return buildInRulesTemplate
    }
    
    // 返回内置模板和自定义模板 - 全局自定义优先级高于内置
    return {
      ...buildInRulesTemplate,
      ...customRules
    } 
  } 

  /** 添加校验规则
   * @param { String } ruleKey - 规则策略key
   * @param { any } ruleValue - 规则策略value
   * @param { Object } [option] - 其它选项，需要传递给校验模板的信息(canBeEmpty、alise等)
   */
  addRule (ruleKey: string, ruleValue?: any, option?: Record<string, any>): RulesBuilder {
    // 检查校验器模板是否支持校验选项
    if (!this.rulesTemplate[ruleKey]) {
      console.warn(`校验器模板中无此验证选项：${ ruleKey }，请检查，该条校验被忽略!`)
      return this
    }

    // 筛选出传递给校验规则的注入选项（组件内部维护的属性选项 && 插件全局注入的属性选项）
    const mergeOptions: Record<string, any> = {
      ...option,
      errorAlias: this.globalOptions.errorAlias 
    }

    // 将ruleKey && ruleValue && mergeOptions注入获取校验规则
    this.rules[ruleKey] = this.rulesTemplate[ruleKey](ruleValue, mergeOptions)
 
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
