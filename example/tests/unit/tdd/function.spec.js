import { mount, createLocalVue } from '@vue/test-utils'

import ElementUI from 'element-ui'
import ElementFormVerify from '../../../../rollup/dist/bundle.es'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(ElementFormVerify)

import InputComponent from '@/components/InputComponent.vue'

describe('插件功能测试', () => {
  // 1. 空输入框验证 - 出现错误提示
  // 2. 输入内容 - 错误提示消失
  it('verify开关测试', async () => {
    // 组件定义
    const InputWrapper = mount(InputComponent, { localVue })

    const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })

    // console.log(FormItemWrapper.props())

    // const FormWrapper = InputWrapper.findComponent({ ref: 'form' })

    // 1. 验证form组件未抛出validate事件
    // expect(FormWrapper.emitted('validate')).toBeFalsy()

    // // 2. 触发validate事件
    const submitBut = InputWrapper.find('.input-component-but__submit')
    await submitBut.trigger('click')

    // // 3. 验证form组件抛出validate事件
    // expect(FormWrapper.emitted('validate')).toBeTruthy()
  });
});
