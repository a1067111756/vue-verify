/* 插件类型校验相关测试 */
import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.min'
import InputComponent from '@/components/InputComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('插件 -> 类型校验相关测试', () => {
  // 数字类型, 包括(正、负、0)整数 && (正、负、0)浮点数
  it('数字类型', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'number' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()
    expect(eventCollecte[1][2]).toEqual('请输入整数或者小数!')

    // 4. 正确内容校验, 正整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()

    // 5. 正确内容校验, 负整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()
    
    // 6. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()    

    // 7. 正确内容校验, 正小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()

    // 8. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()    
  });

  // 整数类型, 包括(正、负、0)整数
  it('整数类型', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'int' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 正确内容校验, 正整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()

    // 5. 正确内容校验, 负整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()
    
    // 6. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  });  

  // 整数类型, 包括(正、负)整数, 不包括0
  it('整数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'intr0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 正确内容校验, 正整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()

    // 5. 正确内容校验, 负整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()
    
    // 6. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  });  

  // 正整数类型, 不包括0
  it('正整数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'pint' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 正确内容校验, 正整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()

    // 5. 错误内容校验, 负整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()
    
    // 6. 错误内容校验, 0 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  });  

  // 正整数类型, 包括0
  it('正整数类型(包括0)', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'pintw0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 正确内容校验, 正整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()

    // 5. 错误内容校验, 负整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()
    
    // 6. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  });  
  
  it('负整数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'nint' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 正整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()
    
    // 6. 错误内容校验, 0 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 7. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  }); 
  
  it('负整数类型(包括0)', async () => {
    // 变量定义
    let zero = 0
    let posIntData = 2987
    let navIntData = -3500
    let posFloatData = 31.75
    let navFloatData = -2.75
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'nintw0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 正整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负整数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: navIntData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()
    
    // 6. 正确内容校验, 0 - 校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()    

    // 7. 错误内容校验, 正小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: posFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 错误内容校验, 负小数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: navFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()    
  });   

  // 浮点数类型(正、负)，不包括0
  it('小数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'float' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 错误内容校验, 0 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
  });  

  // 浮点数类型, 包括(正、0、负)
  it('小数类型(包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'floatw0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
  });  

  // 正浮点数类型, 不包括0
  it('正小数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'pfloat' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()  

    // 7. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
  }); 

  // 正浮点数类型, 包括0
  it('正小数类型(包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'pfloatw0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()  

    // 7. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
  }); 
  
  // 负浮点数类型, 不包括0
  it('负小数类型(不包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'nfloat' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 错误内容校验, 0 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeFalsy()
  });   

  // 负浮点数类型, 包括0
  it('负小数类型(包括0)', async () => {
    // 变量定义
    let zero = 0
    let intData = 2987
    let oneFloatData = -0.23
    let twoFloatData = -10.23
    let threeFloatData = 0.01
    let fourFloatData = 888.01
    let strData = '字符串数据abc'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'nfloatw0' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()

    // 4. 错误内容校验, 整数 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: intData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 5. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: oneFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()

    // 6. 正确内容校验, 负小数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: twoFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 正确内容校验, 0 - 期望：校验通过
    InputWrapper.setData({ form__: { value: zero } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()

    // 8. 正确内容校验, 正小数 - 校验通过
    InputWrapper.setData({ form__: { value: threeFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()
    
    // 9. 正确内容校验, 负浮点数 - 期望：校验通过
    InputWrapper.setData({ form__: { value: fourFloatData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeFalsy()
  });  

  it('英文字母(包括大小写)', async () => {
    // 变量定义
    let numberData = 3
    let engCharData = 'AabcdBCD'
    let upperEngCharData = 'ABCD'
    let lowerEngCharData = 'abcd'
    let chineseData = '中文字符串数据'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'engChar' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 数字型数据 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  

    // 4. 正确内容校验, 大小写英文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: engCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy()  

    // 5. 正确内容校验, 大写英文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: upperEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()  

    // 6. 正确内容校验, 小写英文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: lowerEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 错误内容校验, 中文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()
  });   
  
  it('小写英文字母', async () => {
    // 变量定义
    let numberData = 3
    let engCharData = 'AabcdBCD'
    let upperEngCharData = 'ABCD'
    let lowerEngCharData = 'abcd'
    let chineseData = '中文字符串数据'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'engLowerChar' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 数字型数据 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  

    // 4. 错误内容校验, 大小写英文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: engCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()  

    // 5. 错误内容校验, 大写英文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: upperEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()  

    // 6. 正确内容校验, 小写英文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: lowerEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  

    // 7. 错误内容校验, 中文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()
  });  
  
  it('大写英文字母', async () => {
    // 变量定义
    let numberData = 3
    let engCharData = 'AabcdBCD'
    let upperEngCharData = 'ABCD'
    let lowerEngCharData = 'abcd'
    let chineseData = '中文字符串数据'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'engUpperChar' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 数字型数据 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  

    // 4. 错误内容校验, 大小写英文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: engCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()  

    // 5. 错误内容校验, 大写英文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: upperEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()  

    // 6. 正确内容校验, 小写英文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: lowerEngCharData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()  

    // 7. 错误内容校验, 中文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()
  });   
  
  it('中文字符', async () => {
    // 变量定义
    let numberData = 3
    let strData = 'AabcdBCD123'
    let chineseData = '中文字符串数据'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'chineseChar' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 数字型数据 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  

    // 4. 错误内容校验, 非中文文字符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: strData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()  

    // 5. 正确内容校验, 中文字符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()  
  });

  // 特殊字符(.,!#$%^&*@_+-?)
  it('特殊字符', async () => {
    // 变量定义
    let numberData = 2.3
    let oneStrData = '中文字符abcd'
    let twoStrData = 'abc_+-?'
    let threeStrData = '.,!#$%^&*@_+-?'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { type: 'specialChar' } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误内容校验, 数字型数据 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  

    // 4. 错误内容校验, 不包含特殊字符符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: oneStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()  

    // 5. 错误内容校验, 包含部分特殊字符符串 - 期望：校验不通过
    InputWrapper.setData({ form__: { value: twoStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy()  

    // 6. 正确内容校验, 全部特殊字符符串 - 期望：校验通过
    InputWrapper.setData({ form__: { value: threeStrData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy()  
  }); 

  // 类型自选
  it('类型自选', async () => {
    // 变量定义
    let numberData = 3
    let chineseData = '中文字符串数据'
    let charAndNumberData = 'aaa123bbb'
    let charAndChineseAndNumberData = 'aaa123中文bbb'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { typeOptions: ['数字|字母'] } })

    // 1. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 2. 验证canUse参数存在，needContain参数不存在
    // 期望不通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeTruthy()  

    // 期望不通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()

    // 期望通过
    InputWrapper.setData({ form__: { value: charAndNumberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy()    

    // 期望不通过
    InputWrapper.setData({ form__: { value: charAndChineseAndNumberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()

    // 3. 验证canUse参数不存在，needContain参数存在 - 校验不生效，检测不到事件
    FormItemWrapper.setProps({ verify: { typeOptions: [undefined, '数字|字母'] } })
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)

    // 4. 验证canUse参数存在，needContain参数存在
    FormItemWrapper.setProps({ verify: { typeOptions: ['数字|字母|中文', '数字'] } })

    // 期望通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()  

    // 期望不通过
    InputWrapper.setData({ form__: { value: chineseData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy() 
    
    // 期望通过
    InputWrapper.setData({ form__: { value: charAndNumberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()   
    
    // 期望不通过
    InputWrapper.setData({ form__: { value: charAndChineseAndNumberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(9)
    expect(eventCollecte[8][1]).toBeTruthy()
    
    // 5. 验证canUse参数存在，needContain参数不存在
    FormItemWrapper.setProps({ verify: { typeOptions: ['数字|字母'] } })

    // 期望通过
    InputWrapper.setData({ form__: { value: numberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(10)
    expect(eventCollecte[9][1]).toBeTruthy()  
    
    // 期望不通过
    InputWrapper.setData({ form__: { value: charAndChineseAndNumberData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(11)
    expect(eventCollecte[10][1]).toBeFalsy()      
  });
});
