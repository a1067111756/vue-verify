/* 规则构造类 */
import rulesTemplate from '../core/verify/rules';

class Rules {
  constructor(builder) {
    Object
      .keys(builder.rules)
      .map((key) => (this[key] = builder.rules[key]));
  }

  getRules() {
    return Object.values(this);
  }
}

class RulesBuilder {
  constructor(props) {
    this.props = props;
    this.rules = {};
  }

  addRule(key, value, canBeEmpty) {
    this.rules[key] = rulesTemplate[key](value, canBeEmpty);
    return this;
  }

  build() {
    // 只存在verify字段
    if (this.props === '') {
      this.addRule('verify');
    } else {
      // 存在canEmpty属性
      const canBeEmpty = Object.prototype.hasOwnProperty.call(this.props, 'canBeEmpty');
      if (canBeEmpty) {
        // this.addRule('canBeEmpty')
      } else {
        this.addRule('verify');
      }

      Object
        .getOwnPropertyNames(this.props)
        .filter((key) => key !== 'canBeEmpty')
        .map((key) => (rulesTemplate[key] && this.addRule(key, this.props[key], canBeEmpty)));
    }

    return new Rules(this);
  }
}

export default RulesBuilder;
