/* 该部分功能是mixins规则到不同的框架 */
import RulesBuilder from './rules/RulesBuilder'
import { hasCompPropValue } from '../../helper/utils'

// 注入到form-item中的属性
const ruleProps = {
  // 插件校验开关 - 默认关闭, 需要开启校验插件此字段必须开启
  verify: {
    type: Boolean | Object,
    default: false
  },
  // 非必要校验选项
  canBeEmpty: {
    type: Boolean | String,
    default: undefined
  },  
  // 插件校验关联监听 - 监听某个值触发自身
  watch: {
    type: String,
    default: undefined
  },
  // 插件校验关联监听 - 自身变化主动触发别人
  trigger: {
    type: String,
    default: undefined
  }  
}

// 混入
const verifyMixin = (globalOptions) => {
  return {
    props: {
      ...JSON.parse(JSON.stringify(ruleProps)),
    },
  
    mounted() {
      // 检测到trigger字段，添加校验监听
      if (this.watch) {
        this.elForm.$watch(`model.${this.watch}`, () => {
          this.elForm.validateField(this.prop)
        })
      }

      // 检测到watch字段，添加校验监听
      if (this.trigger) {
        this.elForm.$watch(`model.${this.prop}`, () => {
          this.elForm.validateField(this.trigger)
        })
      }      
    },
  
    methods: {
      // 复写ui框架获取验证规则方法 - 核心方法
      getRules() {
        return hasCompPropValue(this.verify) ? this.getMergeRules() : this.getFrameWorkRules()
      },
  
      // 合并rules - 插件规则优先级高于ui框架规则
      /* note
        插件默认非侵入式，不会影响原校验方式和规则，优先级为：框架校验等级 > 插件校验等级
       */
      getMergeRules() {
        const pluginRules = new RulesBuilder(this._props, globalOptions).build().getRules() || []
        return [...this.getFrameWorkRules(), ...pluginRules]
      },
  
      // 获取ui框架默认rules值
      /* note
         同时兼容框架注入校验的两种方式：1. 在form组件上注入rules 2. 在form-item上注入rules
       */
      getFrameWorkRules() {
        let formRules = this.form.rules // 表单form中存在的rules
        const selfRules = this.rules // form-item中存在的rules
        const requiredRule = this.required !== undefined ? { required: !!this.required } : [] // 是否存在required关键字
        formRules = formRules ? formRules[this.prop] : []
        return [].concat(selfRules || formRules || []).concat(requiredRule)
      }
    }
  }
}

export default verifyMixin
