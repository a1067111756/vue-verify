import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../dist/element-form-verify.umd.js'
import InputComponent from '@/components/InputComponent.vue'
import WatchComponent from '@/components/WatchComponent.vue'
import TriggerComponent from '@/components/TriggerComponent.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

describe('插件功能测试', () => {
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

  it('watch联动测试', async () => {
    // await localVue.nextTick()去强制刷新界面， 否则校验事件不能被捕获到

    // 定义变量
    let originPrice = 30
    let gtOriginPrice = 31
    let ltOriginPrice = 29

    // 组件定义
    const WatchWrapper = mount(WatchComponent, { localVue })
    const OriginFormItemWrapper = WatchWrapper.findComponent({ ref: 'originFormItem' })

    // salePrice > originPrice 无错误信息dom
    WatchWrapper.setData({ form__: { salePrice: gtOriginPrice, originPrice: originPrice } })
    await localVue.nextTick()
    let OriginErrorMsg = OriginFormItemWrapper.find('.el-form-item__error')
    expect(OriginErrorMsg.exists()).toBe(false)

    // salePrice字段改变触发originPrice进行校验 salePrice < originPrice出现错误信息dom
    WatchWrapper.setData({ form__: { salePrice: ltOriginPrice } })
    await localVue.nextTick()
    OriginErrorMsg = OriginFormItemWrapper.find('.el-form-item__error')
    expect(OriginErrorMsg.exists()).toBe(true)    

    // salePrice字段改变触发originPrice进行校验 salePrice > originPrice错误信息dom消失
    WatchWrapper.setData({ form__: { salePrice: gtOriginPrice } })
    await localVue.nextTick()
    OriginErrorMsg = OriginFormItemWrapper.find('.el-form-item__error')
    expect(OriginErrorMsg.exists()).toBe(false) 
  });

  it('trigger联动测试', async () => {
    // await localVue.nextTick()去强制刷新界面， 否则校验事件不能被捕获到

    // 定义变量
    let password = 'abc123'
    let sameRepassword = 'abc123'
    let notSameRepassword = 'aaabbb'

    // 组件定义
    const TriggerWrapper = mount(TriggerComponent, { localVue })
    const passwordFormItemWrapper = TriggerWrapper.findComponent({ ref: 'passwordFormItem' })

    // password === repassowrd 无错误信息dom
    TriggerWrapper.setData({ form__: { password: password, repassowrd: sameRepassword } })
    await localVue.nextTick()
    let passwordErrorMsg = passwordFormItemWrapper.find('.el-form-item__error')
    expect(passwordErrorMsg.exists()).toBe(false)

    // repassowrd字段改变触发password进行校验 password !== repassowrd出现错误信息dom
    TriggerWrapper.setData({ form__: { repassowrd: notSameRepassword } })
    await localVue.nextTick()
    passwordErrorMsg = passwordFormItemWrapper.find('.el-form-item__error')
    expect(passwordErrorMsg.exists()).toBe(true)    

    // repassowrd字段改变触发password进行校验 password === repassowrd错误信息dom消失
    TriggerWrapper.setData({ form__: { repassowrd: sameRepassword } })
    await localVue.nextTick()
    passwordErrorMsg = passwordFormItemWrapper.find('.el-form-item__error')
    expect(passwordErrorMsg.exists()).toBe(false) 
  });  
});
