/* 插件数字校验相关测试 */
import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.min'
import InputComponent from '@/components/InputComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('插件 -> 数字校验相关测试', () => {
  it('数字等于', async () => {
    // 变量定义
    let eqIntData = 2021
    let gtIntData = 2021.9
    let ltIntData = 2020.2
    let eqStrData = '2021'
    let gtStrData = '2022'
    let ltStrData = '2020'
    let charStrData = 'abc123ABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { eq: 2021 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，字母字符串，期望：不符合输入规范，不会发出校验事件
    InputWrapper.setData({ form__: { value: charStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][2]).toEqual('请输入数字字符')

    // 4. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)    
    expect(eventCollecte[2][1]).toBeFalsy()
    
    // 5. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)    
    expect(eventCollecte[3][1]).toBeTruthy() 
    
    // 6. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)    
    expect(eventCollecte[4][1]).toBeFalsy()  
    
    // 7. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)    
    expect(eventCollecte[5][1]).toBeFalsy()
    
    // 8. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)    
    expect(eventCollecte[6][1]).toBeTruthy() 
    
    // 9. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)    
    expect(eventCollecte[7][1]).toBeFalsy()    
  });

  it('数字大于', async () => {
    // 变量定义
    let eqIntData = 2021
    let gtIntData = 2021.9
    let ltIntData = 2020.2
    let eqStrData = '2021'
    let gtStrData = '2022'
    let ltStrData = '2020'
    let charStrData = 'abc123ABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { gt: 2021 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，字母字符串，期望：不符合输入规范，不会发出校验事件
    InputWrapper.setData({ form__: { value: charStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][2]).toEqual('请输入数字字符')

    // 4. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)    
    expect(eventCollecte[2][1]).toBeFalsy()
    
    // 5. 错误校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)    
    expect(eventCollecte[3][1]).toBeFalsy() 
    
    // 6. 正确校验内容，整形数字gt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)    
    expect(eventCollecte[4][1]).toBeTruthy()  
    
    // 7. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)    
    expect(eventCollecte[5][1]).toBeFalsy()
    
    // 8. 错误校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)    
    expect(eventCollecte[6][1]).toBeFalsy() 
    
    // 9. 正确校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)    
    expect(eventCollecte[7][1]).toBeTruthy()    
  });  

  it('数字大于等于', async () => {
    // 变量定义
    let eqIntData = 2021
    let gtIntData = 2021.9
    let ltIntData = 2020.2
    let eqStrData = '2021'
    let gtStrData = '2022'
    let ltStrData = '2020'
    let charStrData = 'abc123ABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { gte: 2021 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，字母字符串，期望：不符合输入规范，不会发出校验事件
    InputWrapper.setData({ form__: { value: charStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][2]).toEqual('请输入数字字符')

    // 4. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)    
    expect(eventCollecte[2][1]).toBeFalsy()
    
    // 5. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)    
    expect(eventCollecte[3][1]).toBeTruthy() 
    
    // 6. 正确校验内容，整形数字gt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)    
    expect(eventCollecte[4][1]).toBeTruthy()  
    
    // 7. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)    
    expect(eventCollecte[5][1]).toBeFalsy()
    
    // 8. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)    
    expect(eventCollecte[6][1]).toBeTruthy() 
    
    // 9. 正确校验内容，整形数字gt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)    
    expect(eventCollecte[7][1]).toBeTruthy()    
  }); 
  
  it('数字小于', async () => {
    // 变量定义
    let eqIntData = 2021
    let gtIntData = 2021.9
    let ltIntData = 2020.2
    let eqStrData = '2021'
    let gtStrData = '2022'
    let ltStrData = '2020'
    let charStrData = 'abc123ABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { lt: 2021 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，字母字符串，期望：不符合输入规范，不会发出校验事件
    InputWrapper.setData({ form__: { value: charStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][2]).toEqual('请输入数字字符')

    // 4. 正确校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)    
    expect(eventCollecte[2][1]).toBeTruthy()
    
    // 5. 错误校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)    
    expect(eventCollecte[3][1]).toBeFalsy() 
    
    // 6. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)    
    expect(eventCollecte[4][1]).toBeFalsy()  
    
    // 7. 正确校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)    
    expect(eventCollecte[5][1]).toBeTruthy()
    
    // 8. 错误校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)    
    expect(eventCollecte[6][1]).toBeFalsy() 
    
    // 9. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)    
    expect(eventCollecte[7][1]).toBeFalsy()    
  });  

  it('数字小于等于', async () => {
    // 变量定义
    let eqIntData = 2021
    let gtIntData = 2021.9
    let ltIntData = 2020.2
    let eqStrData = '2021'
    let gtStrData = '2022'
    let ltStrData = '2020'
    let charStrData = 'abc123ABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { lte: 2021 } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，字母字符串，期望：不符合输入规范，不会发出校验事件
    InputWrapper.setData({ form__: { value: charStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][2]).toEqual('请输入数字字符')

    // 4. 正确校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)    
    expect(eventCollecte[2][1]).toBeTruthy()
    
    // 5. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)    
    expect(eventCollecte[3][1]).toBeTruthy() 
    
    // 6. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)    
    expect(eventCollecte[4][1]).toBeFalsy()  
    
    // 7. 正确校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: ltStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)    
    expect(eventCollecte[5][1]).toBeTruthy()
    
    // 8. 正确校验内容，整形数字eq，期望：校验通过
    InputWrapper.setData({ form__: { value: eqStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)    
    expect(eventCollecte[6][1]).toBeTruthy() 
    
    // 9. 错误校验内容，整形数字lt，期望：校验不通过
    InputWrapper.setData({ form__: { value: gtStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)    
    expect(eventCollecte[7][1]).toBeFalsy()    
  });   
});

