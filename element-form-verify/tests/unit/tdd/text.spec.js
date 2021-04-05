/* 插件文本校验相关测试 */
import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.min'
import InputComponent from '@/components/InputComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('插件 -> 文本校验相关测试', () => {
  it('文本固定长度', async () => {
    // 变量定义
    let lenFourData = '测试内容'
    let lenTenData = '测试内容123abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { length: 10 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，长度为四的字符串，期望：校验不通过
    InputWrapper.setData({ form__: { value: lenFourData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    
    // 4. 正确校验内容，长度为十的字符串，期望：校验通过
    InputWrapper.setData({ form__: { value: lenTenData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 
  });

  it('最小文本长度', async () => {
    // 变量定义
    let lenFourData = '测试内容'
    let lenFiveData = '测试内容1'
    let lenTenData = '测试内容123abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { minLen: 5 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，长度为四的字符串，期望：校验不通过
    InputWrapper.setData({ form__: { value: lenFourData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    
    // 4. 正确校验内容，长度为五的字符串，期望：校验通过
    InputWrapper.setData({ form__: { value: lenFiveData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 

    // 4. 正确校验内容，长度为十的字符串，期望：校验通过
    InputWrapper.setData({ form__: { value: lenTenData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy() 
  });

  it('最大文本长度', async () => {
    // 变量定义
    let lenFourData = '测试内容'
    let lenFiveData = '测试内容1'
    let lenTenData = '测试内容123abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { maxLen: 5 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，长度为四的字符串，期望：校验不通过
    InputWrapper.setData({ form__: { value: lenFourData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeTruthy() 
    
    // 4. 正确校验内容，长度为五的字符串，期望：校验通过
    InputWrapper.setData({ form__: { value: lenFiveData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 

    // 4. 正确校验内容，长度为十的字符串，期望：校验通过
    InputWrapper.setData({ form__: { value: lenTenData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
  });  
});
