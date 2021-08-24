/* 校验规则优先级处理 - 责任链模式，后期好维护
    note: 1. 只负责校验规则添加顺序的流程，添加的方式与形式由外部RulesBuilder负责
          2. 这里可能造成相互依赖(RulesBuilder依赖RulesHandler处理节点流程，RulesHandler依赖RulesBuilder后续处理方式),
             但是这样柑橘逻辑更清晰，RulesBuilder负责规则的生成已经添加形式，RulesHandler负责规则添加的优先级顺序(顺序逻辑随业务
              变动会很大，所以单独拆出来维护)
*/
import { hasCompPropValue } from '@/lib/helper/utils'
import type RulesBuilder from './RulesBuilder'

// 责任链处理对象
class RulesHandler {
  private readonly onlyRequiredHandler: Chain
  private readonly canBeEmptyHandler: Chain
  private readonly complexHandler: Chain
  
  constructor (callObj: RulesBuilder) {
    // 初始化节点
    this.onlyRequiredHandler = new OnlyRequiredHandler(callObj)
    this.canBeEmptyHandler = new CanBeEmptyHandler(callObj)
    this.complexHandler = new ComplexHandler(callObj)
    
    // 设置节点传递
    this.__setProcess()
  }

  // 设置节点传递方式
  /* note
      判断流程：
        判断是否是单纯必填 
          是 ---> onlyRequiredHandler
          否 ---> 是否包含非必填校验
            是 ---> canBeEmptyHandler
            否 ---> complexHandler         
  */
  __setProcess (): void {
    this.onlyRequiredHandler.setNextHandler(this.canBeEmptyHandler)
    this.canBeEmptyHandler.setNextHandler(this.complexHandler)
  }

  // 执行
  handle (vueProps: VERIFY_TYPE.IVerifyProps): void {
    this.onlyRequiredHandler.handle(vueProps)
  }
}

// 责任链抽象节点
abstract class Chain {
  protected readonly callObj: RulesBuilder
  protected nextHandler: Chain | null
  
  protected constructor(callObj: RulesBuilder) {
    this.nextHandler = null // 下一处理节点
    this.callObj = callObj // 执行对象
  }

  // 设置下一处理节点
  setNextHandler(handler: Chain) {
    this.nextHandler = handler
  }
  
  // 处理函数
  // eslint-disable-next-line no-unused-vars
  abstract handle(vueProps: VERIFY_TYPE.IVerifyProps): void
}

// 1. 必填校验处理节点
class OnlyRequiredHandler extends Chain {
  constructor(callObj: RulesBuilder) {
    super(callObj)
  }

  handle(vueProps: VERIFY_TYPE.IVerifyProps) {
    if (vueProps.verify === '' || vueProps.verify === true) {
      this.callObj.addRule('verify')
    } else {
      this.nextHandler && this.nextHandler.handle(vueProps)
    }
  }
}

// 2. 非必填校验处理节点
class CanBeEmptyHandler extends Chain {
  constructor(callObj: RulesBuilder) {
    super(callObj)
  }

  handle(vueProps: VERIFY_TYPE.IVerifyProps) {
    if (hasCompPropValue(vueProps.canBeEmpty)) {
      this.callObj.addRule('canBeEmpty')
    } else {
      this.callObj.addRule('verify')
    }

    this.nextHandler && this.nextHandler.handle(vueProps)
  }
}

// 3. 复合校验处理节点
class ComplexHandler extends Chain {
  constructor(callObj: RulesBuilder) {
    super(callObj)
  }

  handle(vueProps: VERIFY_TYPE.IVerifyProps) {
    Object
      .getOwnPropertyNames(vueProps.verify)
      .map((key: string) => {
        this.callObj.addRule(key, (vueProps.verify?.[key]), {
            canBeEmpty: hasCompPropValue(vueProps.canBeEmpty) 
          })
        }
      )

    this.nextHandler && this.nextHandler.handle(vueProps)
  }
}

export default RulesHandler