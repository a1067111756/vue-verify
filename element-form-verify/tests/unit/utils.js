/* 关于测试的一些辅助函数 */
import { mount } from '@vue/test-utils'

// 创建一个测试组件实例
export const createTest = function (localVue) {
  const InputWrapper = mount(InputComponent, { localVue })
  const FormWrapper = InputWrapper.findComponent({ ref: 'form' })
  const FormItemWrapper = InputWrapper.findComponent({ ref: 'formItem' })
  const SubmitBut = InputWrapper.find('.input-component-but__submit')

  return InputWrapper
}