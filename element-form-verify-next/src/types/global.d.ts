declare namespace VERIFY_TYPE {
  // 验证组件props接收参数
  export interface IVerifyProps {
    verify?: boolean | Record<string, any> | '',
    canBeEmpty?: boolean,
    watch?: string,
    trigger?: string
  }

  // 校验规则类型
  export type IVerifyRule  = Record<string, any>
  
  // 插件全局选项
  export interface IGlobalOption {
    errorAlias?: string,
    customRules?: IVerifyRule
  }
}
