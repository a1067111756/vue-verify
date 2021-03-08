// 必填项
export const verify = (value, { alias }) => ({
  required: true,
  trigger: ['blur', 'change'],
  message: alias || '必填项'
})

// 非必填项
/* note
   使用场景：当某字段为非必填项，且当有输入时需要进行校验
            eg：电话号码是非必填字段，但当用户输入时，需要校验电话格式
 */
export const canBeEmpty = () => ({
  required: false,
  trigger: 'blur'
});