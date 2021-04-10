/* 插件通用常见校验相关测试 */
import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.js'
import InputComponent from '@/components/InputComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('插件 -> 通用常见校验相关测试', () => {
  it('电话号码:弱校验', async () => {
    // 变量定义
    let mockPhoneData1 = '23155515' // 位数不够
    let mockPhoneData2 = '23155515151512' // 超出位数
    let mockPhoneData3 = 'sss1515as12' // 非全数字
    let mockPhoneData4 = '00000000000' // 不符合手机号码规律的
    let mockPhoneData5 = '31111111112'
    let mockPhoneData6 = '12111111112' // 正确号码
    let mockPhoneData7 = '13981317056' 
    let mockPhoneData8 = '15981317058'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数 
    FormItemWrapper.setProps({ verify: { wphone: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，位数不够11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('手机号应该为11位数字')
    
    // 4. 错误校验内容，位数超过11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy() 
    expect(eventCollecte[2][2]).toEqual('手机号应该为11位数字')

    // 5. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('手机号应该为11位数字')

    // 6. 错误校验内容，不符合手机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy() 
    expect(eventCollecte[4][2]).toEqual('请输入正确的手机号')
    
    // 7. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData5 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()     
    expect(eventCollecte[5][2]).toEqual('请输入正确的手机号')

    // 8. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData6 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()
    
    // 9. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData7 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
    
    // 10. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData8 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(9)
    expect(eventCollecte[8][1]).toBeTruthy()    
  });

  it('电话号码:一般校验', async () => {
    // 变量定义
    let mockPhoneData1 = '23155515' // 位数不够
    let mockPhoneData2 = '23155515151512' // 超出位数
    let mockPhoneData3 = 'sss1515as12' // 非全数字
    let mockPhoneData4 = '00000000000' // 不符合手机号码规律的
    let mockPhoneData5 = '31111111112'
    let mockPhoneData6 = '12111111112' 
    let mockPhoneData7 = '13981317056' // 正确号码
    let mockPhoneData8 = '15981317058'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { phone: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，位数不够11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('手机号应该为11位数字')
    
    // 4. 错误校验内容，位数超过11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy() 
    expect(eventCollecte[2][2]).toEqual('手机号应该为11位数字')

    // 5. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('手机号应该为11位数字')

    // 6. 错误校验内容，不符合手机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy() 
    expect(eventCollecte[4][2]).toEqual('请输入正确的手机号')
    
    // 7. 错误校验内容，不符合手机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData5 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()     
    expect(eventCollecte[5][2]).toEqual('请输入正确的手机号')

    // 8. 错误校验内容，不符合手机号码，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData6 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()
    expect(eventCollecte[5][2]).toEqual('请输入正确的手机号')
    
    // 9. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData7 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
    
    // 10. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData8 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(9)
    expect(eventCollecte[8][1]).toBeTruthy()    
  });  

  it('电话号码:强校验', async () => {
    // 变量定义
    let mockPhoneData1 = '23155515' // 位数不够
    let mockPhoneData2 = '23155515151512' // 超出位数
    let mockPhoneData3 = 'sss1515as12' // 非全数字
    let mockPhoneData4 = '00000000000' // 不符合手机号码规律的
    let mockPhoneData5 = '31111111112'
    let mockPhoneData6 = '12111111112' 
    let mockPhoneData7 = '13981317056' // 正确号码
    let mockPhoneData8 = '15981317058'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { sphone: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，位数不够11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('手机号应该为11位数字')
    
    // 4. 错误校验内容，位数超过11个字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy() 
    expect(eventCollecte[2][2]).toEqual('手机号应该为11位数字')

    // 5. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('手机号应该为11位数字')

    // 6. 错误校验内容，不符合手机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy() 
    expect(eventCollecte[4][2]).toEqual('请输入正确的手机号')
    
    // 7. 错误校验内容，不符合手机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData5 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()     
    expect(eventCollecte[5][2]).toEqual('请输入正确的手机号')

    // 8. 错误校验内容，不符合手机号码，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData6 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()
    expect(eventCollecte[5][2]).toEqual('请输入正确的手机号')
    
    // 9. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData7 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(8)
    expect(eventCollecte[7][1]).toBeTruthy()
    
    // 10. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData8 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(9)
    expect(eventCollecte[8][1]).toBeTruthy()    
  });  

  it('座机号码', async () => {
    // 变量定义
    let mockPhoneData1 = '2584965' // 位数不够
    let mockPhoneData2 = '23155515151512' // 超出位数
    let mockPhoneData3 = 'sss1515as12' // 非全数字
    let mockPhoneData4 = '00000000000' // 不符合号码规律的
    let mockPhoneData5 = '08512596378' // 正确号码
    let mockPhoneData6 = '0851-2596378'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { telphone: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    
    // 4. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy() 

    // 5. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('国内座机号码是以数字0开头')

    // 6. 错误校验内容，不符合座机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockPhoneData4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy() 
    expect(eventCollecte[4][2]).toEqual('地区码与号码之间需要使用-符号连接')
    
    // 7. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData5 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeFalsy()
    expect(eventCollecte[5][2]).toEqual('地区码与号码之间需要使用-符号连接')
    
    // 8. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockPhoneData6 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeTruthy()    
  });  
  
  it('email:一般校验', async () => {
    // 变量定义
    let mockData0 = '1067111756@com'
    let mockData1 = 'www.1067111756@qq.com'
    let mockData2 = '1067111756@outlook.com'
    let mockData3 = '1067111756@gmail.com'
    let mockData4 = '1067111756@sina.com'
    let mockData5 = '1067111756@163.com'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { email: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeTruthy() 
    
    // 4. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 

    // 5. 错误校验内容，非全数字字符，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy() 

    // 6. 错误校验内容，不符合座机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy() 
    
    // 7. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockData5 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()

    // 7. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData0 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(7)
    expect(eventCollecte[6][1]).toBeFalsy()   
  });
  
  it('email:强校验', async () => {
    // 变量定义
    let mockData0 = '1067111756@com'
    let mockData1 = '1067111756@outlook.com'
    let mockData2 = '1067111756@gmail.com'
    let mockData3 = '1067111756@sina.com'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { semail: ['@outlook.com', '@gmail.com'] } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData0 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('请输入正确的邮箱号')
    
    // 4. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 

    // 5. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeTruthy() 

    // 6. 错误校验内容，不符合座机号规律，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy() 
    expect(eventCollecte[4][2]).toEqual('只允许输入@outlook.com,@gmail.com等域名的邮箱')
  });  

  it('身份证:支持1代/2代', async () => {
    // 变量定义
    let mockData0 = '511102199412317' // 15错误
    let mockData1 = '130503670401001' // 15位
    let mockData2 = '511102199412317717' // 18位错误
    let mockData3 = '511102199412317718' // 18位
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { idCard: true } })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData0 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy() 
    expect(eventCollecte[1][2]).toEqual('请输入正确的身份证号')
    
    // 4. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeTruthy() 

    // 5. 错误校验内容，期望：校验不通过
    InputWrapper.setData({ form__: { value: mockData2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('请输入正确的身份证号')

    // 6. 正确校验内容，期望：校验通过
    InputWrapper.setData({ form__: { value: mockData3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeTruthy() 
  });  

  it('密码自选', async () => {
    // 变量定义
    let password0 = '14abc' // 长度不足
    let password1 = '147258369abcqwertyu' // 长度超过
    let password2 = '147258abAB,中文' // 类型不在可选项
    let password3 = '147258abc' // 类型不存在必选项
    let password4 = '147258abcABC,.' // 长度6-16位，由数字|字母|特殊符合组成，且必须包含大写字母和特殊符号 
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { passwordOptions: [6, 16, '数字|字母|特殊字符', '大写字母|特殊字符'] } })

    // 1. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 期望不通过 - 长度不足
    InputWrapper.setData({ form__: { value: password0 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeFalsy()  
    expect(eventCollecte[1][2]).toEqual('密码长度应为6-16位') 

    // 期望不通过 - 长度超过
    InputWrapper.setData({ form__: { value: password1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(3)
    expect(eventCollecte[2][1]).toBeFalsy()
    expect(eventCollecte[2][2]).toEqual('密码长度应为6-16位')

    // 期望通过 - 类型不在可选项
    InputWrapper.setData({ form__: { value: password2 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(4)
    expect(eventCollecte[3][1]).toBeFalsy() 
    expect(eventCollecte[3][2]).toEqual('密码只能包含数字、字母、特殊字符类型字符')   

    // 期望不通过 - 类型不存在必选项
    InputWrapper.setData({ form__: { value: password3 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(5)
    expect(eventCollecte[4][1]).toBeFalsy()
    expect(eventCollecte[4][2]).toEqual('密码必须包含大写字母、特殊字符类型字符')

    // 期望通过
    InputWrapper.setData({ form__: { value: password4 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(6)
    expect(eventCollecte[5][1]).toBeTruthy()
  });

  it('正则校验', async () => {
    // 变量定义
    let mockData0 = '中文数据'
    let mockData1 = '123abcABC'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: { regexp: 'test' } })

    // 1. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 2. 参数错误 - 期望：校验事件未发出，忽略
    InputWrapper.setData({ form__: { value: mockData1 } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)

    // 3. 设置校验相关参数，参数错误 - 期望：校验事件未发出，忽略
    FormItemWrapper.setProps({ verify: { regexp: ['test'] } })   
    InputWrapper.setData({ form__: { value: mockData1 } })
    await SubmitBut.trigger('click')
    expect(eventCollecte.length).toBe(1)    

    // 4. 输入不符合要求 - 期望：校验不通过
    FormItemWrapper.setProps({ verify: { regexp: [/^[0-9a-zA-Z]*$/, '只能输入数字和字母'] } })  
    InputWrapper.setData({ form__: { value: mockData0 } }) 
    await SubmitBut.trigger('click')
    expect(eventCollecte.length).toBe(2)    
    expect(eventCollecte[1][1]).toBeFalsy()  
    expect(eventCollecte[1][2]).toEqual('只能输入数字和字母')

    // 5. 校验通过
    FormItemWrapper.setProps({ verify: { regexp: [/^[0-9a-zA-Z]*$/] } }) 
    InputWrapper.setData({ form__: { value: mockData1 } }) 
    await SubmitBut.trigger('click')
    expect(eventCollecte.length).toBe(3)      
    expect(eventCollecte[2][1]).toBeTruthy()  
  });  
});
