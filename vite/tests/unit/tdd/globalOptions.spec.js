import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.js'
import InputComponent from '@/components/InputComponent.vue'
import WatchComponent from '@/components/WatchComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('全局选项注入测试', () => {
  it('verify开关测试', async () => {
    // 变量定义
    let testData = '测试内容'
    let eventCollecte = undefined

    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })
    const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
    const SubmitBut = InputWrapper.find('.input-component-but__submit')

    // 设置校验相关参数
    FormItemWrapper.setProps({ verify: true })

    // 1. 验证form组件从未抛出校验事件
    expect(FormWrapper.emitted('validate')).toBeFalsy()

    // 2. 空内容校验 - 期望：必填项，校验不通过
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(1)
    expect(eventCollecte[0][2]).toEqual('必填项')

    // 3. 设置表单内容，再进行一次校验
    InputWrapper.setData({ form__: { value: testData } })
    await SubmitBut.trigger('click')
    eventCollecte = FormWrapper.emitted('validate')
    expect(eventCollecte.length).toBe(2)
    expect(eventCollecte[1][1]).toBeTruthy()  
  });
});
