// 判断是否是纯对象，主要是区别Array 、Null
export const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]'

// 判断组件上某个属性是否赋值
/* note
    这里存在一个隐性问题是，当设置verify=""时也会开启插件验证，
    原因是vue组件设置属性只设置key不设置value（eg: <el-form-item label="活动名称" prop="test" verify>）时
    获取回的值是空字符串，要支持此种操作就只能妥协，暂时没想到好的解决方案
*/
export const hasCompPropValue = (value) => value === '' || value === true || isPlainObject(value)
