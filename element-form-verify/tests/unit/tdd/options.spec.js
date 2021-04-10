import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.js'
import InputComponent from '@/components/InputComponent.vue'
import customRules from '../customRules'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify, {
  errorAlias: '测试必填项',
  customRules: customRules
})

describe('全局选项注入测试', () => {
  it('errorAlias必填项错误提示', async () => {
    // 变量定义
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: true })

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('测试必填项')
  });

  it('customRules自定义校验', async () => {
    // 变量定义
    let testData = 'abc123ABC'
    let phone = '18408241059'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { newRule: true } })

    // 1. 空内容校验 - 期望：必填项，校验不通过
    expect(FormWrapper.emitted('validate')).toBeFalsy()
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('测试必填项')

    // 2. 验证新注入的规则是否生效
    InputWrapper.setData({ form__: { value: testData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('只允许输入数字、小写字母')

    // 3. 验证覆盖的规则是否生效
    FormItemWrapper.setProps({ verify: { phone: true } })
    InputWrapper.setData({ form__: { value: phone } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()
    expect(eventCollecte[2][2]).toEqual('手机号应该为12位数字')
  });  
});
