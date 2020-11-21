/* 规则构造类 */
import rulesTemplate from './index'
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
  constructor (props) {
    this.vueProps = props
    this.rules = {}
  }

  // 添加校验规则
  /**
   * 
   * @param { String } ruleKey - 规则策略key
   * @param { Any } ruleValue - 规则策略value
   * @param { Object } [option] - 其它选项，需要传递给校验模板的信息(canBeEmpty、alise等)
   */
  addRule (ruleKey, ruleValue, option) {
    Object.prototype.hasOwnProperty.call(rulesTemplate, ruleKey)
      ? this.rules[ruleKey] = rulesTemplate[ruleKey](ruleValue, option)
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
