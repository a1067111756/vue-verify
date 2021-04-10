# element-form-verify
### 支持功能
```
1. 内置常见校验 √
2. 支持非必须校验(非必填项且有输入时校验) √
3. 支持watch / trigger关联校验触发 √
4. 支持全局注入校验规则 √
5. 支持校验自定义提示 √
```

## 快速使用
```
import ElementFormVerify from 'element-form-verify'
Vue.use(ElementFormVerify)

<!-- verify - 表示该表单字段是必填字段 -->
<el-form-item label="示例" prop="name" verify>
  <el-input v-model="form__.name"></el-input>
</el-form-item>
```

## 关于插件与原生校验规则优先级问题
```
插件的校验是非侵入式的，不会影响原生校验规则，总体上其优先级是原生校验规则 > 插件校验规则，两者是可以同时使用的
```

### 插件验证相关使用
#### 1. 插件的开关和入口（verify）
```
概述： 1. verify字段是插件的总开关，该字段存在，插件功能才会生效. 2. verify的另一个作用是表示
          该表单字段是必填字段
使用实例：
      <el-form-item label="示例" prop="name" verify>
        <el-input v-model="form__.name"></el-input>
      </el-form-item>
``` 

#### 2. 常规校验
```
概述： 常规校验则是指常见的普通校验，这些校验都归属到verify字段选项下面(这样做的目的是为了不让字段过于分散，
      毕竟都是同一个功能)，常规校验为校验的核心功能，插件内置了常见场景的校验，后期会随着搜集越来越丰富，也
      希望大家踊跃提供自己需要的校验场景
      
verify字段注明: verify接收类型包括boolean、Object，boolean类型时候表示开关插件以及该表单字段是否必填，
      Object类型时表示支持的常规校验选项. 当前常规校验共分为以下四类       
      
1. 类型相关：检查输入内容类型的校验
  a. 数字类型: 包括(正、负)整数 && 0 && (正、负)浮点数，使用 - :verify="{type: 'number'}"
    <el-form-item label="手机号码" prop="phone" :verify="{type: 'number'}">
      <el-input v-model="form__.phone"></el-input>
    </el-form-item> 
    
  注明：便于类型选项好记忆，一般p代表正、n代表负，w0表示包括0，r0表示移除0

  b. 整数类型，包括(正、负、0)整数，使用 - :verify="{type: 'int'}"

  c. 整数类型，包括(正、负)整数，使用 - :verify="{type: 'intr0'}"
  
  d. 正整数类型，不包括0，使用 - :verify="{type: 'pint'}"

  e. 正整数类型，包括0，使用 - :verify="{type: 'pintw0'}"

  f. 负整数类型，不包括0，使用 - :verify="{type: 'nint'}"

  g. 负整数类型，包括0，使用 - :verify="{type: 'nintw0'}"

  h. 小数类型，包括(正、负)浮点数，使用 - :verify="{type: 'float'}"
  
  i. 小数类型，包括0 && (正、负)浮点数，使用 - :verify="{type: 'floatw0'}"
  
  j. 正小数类型，不包括0，使用 - :verify="{type: 'pfloat'}"

  k. 正小数类型，包括0，使用 - :verify="{type: 'pfloatw0'}"
  
  l. 负小数类型，不包括0，使用 - :verify="{type: 'nfloat'}"

  m. 负小数类型，包括0，使用 - :verify="{type: 'nfloatw0'}"

  n. 英文字母(包括大小写)，使用 - :verify="{type: 'engChar'}"

  o. 小写英文字母，使用 - :verify="{type: 'engLowerChar'}"
  
  p. 大写英文字母，使用 - :verify="{type: 'engUpperChar'}"

  q. 中文，使用 - :verify="{type: 'chineseChar'}"

  r. 特殊字符，使用 - :verify="{type: 'specialChar'}"
     注明：特殊字符包括常见的[.,!#$%^&*@_+-/?]

  s. 自选类型组合，使用 - :verify="{typeOptions: ['字母|数字', '数字']}"
    <el-form-item label="用户名" prop="username" :verify="{typeOptions: ['字母|数字', '数字']}">
      <el-input v-model="form__.username"></el-input>
    </el-form-item>

    注明：
      1. typeOptions是用来校验内容是几种类型组合的场景，例如用户密码输入。要求用户密码只能由大小写字母、数字、
         特殊符号组成，且必须包含大写字母，即可使用规则:verify="{typeOptions: ['字母|数字|特殊符号', '大写字母']}"。
         typeOptions接收一个数组作为参数，数组参数里包含两个变量['可选字符类型', '必须包含的字符类型']，可选字符类型
         表示用户可以输入哪些类型的字符，必须包含的字符类型表示用户输入内容必须包含此类型字符，多类型使用|进行分隔

      2. 可选字符类型是必填选项，必须包含的字符类型是选填选项，不填则表示没有必须包含的字符类型。

      3. 可选字符类型 / 必须包含的字符类型可填值有如下被支持：
         const strategy = {
           '大写字母': 'A-Z',
           '小写字母': 'a-z',
           '字母': 'A-Za-z',
           '数字': '0-9',
           '中文': '\u4e00-\u9fa5',
           '特殊字符': '/./,/!/#/$/%/^/&/*/@/_/+/(/)/-/?',
           '.': '/.',
           ',': '/,',
           '!': '/!',
           '#': '/#',
           '$': '/$',
           '%': '/%',
           '^': '/^',
           '&': '/&',
           '*': '/*',
           '@': '/@',
           '_': '/_',
           '+': '/+',
           '(': '/(',
           ')': '/)',
           '-': '/-',
           '?': '/?',
         }

2. 数字比较相关：对输入内容与预期大小比较的校验(只支持数字类型字符)
  a. 数字大于，使用 - :verify="{gt: 100}"
    <el-form-item label="价格" prop="price" :verify="{gt: 100}">
      <el-input v-model="form__.price"></el-input>
    </el-form-item> 
  
  b. 数字大于等于，使用 - :verify="{gte: 100}"
  
  c. 数字小于，使用 - :verify="{lt: 10}"
  
  d. 数字小于等于，使用 - :verify="{lte: 10}"
  
  e. 数字等于，使用 - :verify="{eq: 50}"

3. 文本相关：对文本长度相关的校验
  a. 文本长度，使用 - :verify="{length: xxx}"
    <el-form-item label="姓名" prop="name" :verify="{length: 5}">
      <el-input v-model="form__.name"></el-input>
    </el-form-item>   
    
  b. 最小文本长度，使用 - :verify="{minLen: xxx}"
  
  c. 最大文本长度，使用 - :verify="{maxLen: xxx}"
  
4. 常用相关：常见相关场景的校验
  注明：便于通用选项好记忆，一般w代表弱校验、s代表强校验

  a. 手机号弱校验(1开头、11位、全数字)，使用 - :verify="{wphone: true}"
  
  b. 手机号一般校验(弱校验基础上、第二位3-9)，使用 - :verify="{phone: true}"
  
  c. 手机号强校验(弱校验基础上、号段限制)，使用 - :verify="{sphone: true}"
    1、移动号段有134,135,136,137, 138,139,147,150,151,152,157,158,159,178,182,183,184,187,188。
    2、联通号段有130，131，132，155，156，185，186，145，176。
    3、电信号段有133，153，177，180，181，189。  
      这个号段名单随反馈增量更新
  
  d. 座机号码校验，使用 - :verify="{telphone: true}" 
     注明：a. 只针对国内座机号 b. 地区号以0开头 c. 地区号一般3~4位 d. 地区号与号码间用-符号连接 e. 号码一般7~8位

  e. 邮箱:一般校验，使用 - :verify="{email: true}"

  f. 邮箱:强校验，指定固定邮箱列表，使用 - :verify="{semail: ['@qq.com', '@outlook.com', '@gmail.com']}"
     注明：semail支持校正指定邮箱列表，接收一个邮箱列表的数组为参数
  
  g. url链接:一般校验，使用 - :verify="{url: true}"

  h. url链接:强校验，指定固定url开头链接，使用 - :verify="{surl: 'https://'}"
  
  i. 身份证校验(支持1/2代身份证)，使用 - :verify="{idCard: true}"
    注明：a. 对于1代15位身份证号码只会校验区域号 / 出身年月日是否符合规则
          b. 对于2代18位身份证号码除了校验区域号 / 出身年月日，还会最后计算检查最后一位校验位，可以避免90%以上假身份号码错误

  j. 密码选项匹配，使用 - :verify="{passwordOptions: [最小长度, 最大长度, 可选的选项, 必须存在的选项]}"
    <el-form-item label="密码" prop="password" :verify="{passwordOptions: [6, 18, '字母|数字|特殊字符', '大写字母|特殊字符']}">
      <el-input v-model="form__.password"></el-input>
    </el-form-item>  
    以上校验表示，输入一个长度为6 ~ 18位，只能由字母、数字、特殊字符组成，且必须包含大写字母、特殊字符的密码
    
    注明：
      1. passwordOptions专职用于密码校验，使用方法和typeOptions类似，唯一不同是passwordOptions接收的数组参数包含四个变量
         [最小长度, 最大长度, 可选字符类型, 必须包含的字符类型]

      2. 可选字符类型 / 必须包含的字符类型可填值有如下被支持：
         const strategy = {
           '大写字母': 'A-Z',
           '小写字母': 'a-z',
           '字母': 'A-Za-z',
           '数字': '0-9',
           '中文': '\u4e00-\u9fa5',
           '特殊字符': '/./,/!/#/$/%/^/&/*/@/_/+/(/)/-/?',
           '.': '/.',
           ',': '/,',
           '!': '/!',
           '#': '/#',
           '$': '/$',
           '%': '/%',
           '^': '/^',
           '&': '/&',
           '*': '/*',
           '@': '/@',
           '_': '/_',
           '+': '/+',
           '(': '/(',
           ')': '/)',
           '-': '/-',
           '?': '/?',
         }

  h. 正则校验，使用 - :verify="{regexp: [正则字面量, 错误提示]}"
    <el-form-item label="姓名" prop="name" :verify="{regexp: [/^[0-9a-z]$/, '只允许输入数字和小写字母']}">
      <el-input v-model="form__.name"></el-input>
    </el-form-item> 

    注明：
      1. regexp是留出的一个万能接口，主要是解决两个方面问题：a. 自定义校验规则 b. 自定义校验提示
      2. 但个人建议regexp还是适用于自定义简单的校验规则，毕竟复合校验的正则太过复杂，在模板上写一长串也不好看，
         这种复杂校验情况可以通过另一种方式，插件注入自定义选项的形式外部注入，然后模板上调用         
```

#### 非必须校验器(canBeEmpty)
```
概述： canBeEmpty意指可以为空，但不是不校验的意思. 当表单字段内容为空时不进行校验放行，当表单字段
      内容不为空时进行校验
      
使用场景： 非必须校验的使用场景虽然不是很常用，但是也是不少见的. eg: 手机号码字段，如果该字段不是很重要，
      既可以设置成非必填字段，但是一旦用户输入，手机号码本身存在规则(只有11位、全是数字等)，此时是需要
      进行校验的，非必须校验器就比较适合了
      
使用实例：
  <el-form-item label="手机号码" prop="phone" :verify="{phone: true}" canBeEmpty>
    <el-input v-model="form__.phone"></el-input>
  </el-form-item>      
```

#### 联动校验器(watch / triiger)
```
概述： 联动校验意指一个表单字段的变化引起另一个表单字段校验的触发，watch表示监听某个表单字段内容变化来触发自身的
      校验，trigger表示当自身内容发生了变化会去触发监听的表单字段的校验
      
使用场景：联动校验的使用场景比较业务型，大多是基于业务来考虑，以下例子使用场景可能不太贴合
  watch eg: 商品的原价不低于售卖价格
    <el-form :model="form__" ref="form" label-width="100px">
      <el-form-item ref="formItem" label="原价" prop="originalPrice" verify watch="salePrice" :rules="priceVerify">
        <el-input v-model="form__.originalPrice" placeholder="请输入商品原价"></el-input>
      </el-form-item> 

      <el-form-item ref="formItem" label="售价" prop="salePrice" verify>
        <el-input v-model="form__.salePrice" placeholder="请输入商品售价"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="watch-component-but__submit" type="primary" @click="onSubmit">注册</el-button> 
      </el-form-item> 
    </el-form>

    export default {
      data () {
        return {
          form__: { 
            salePrice: undefined, 
            originalPrice: undefined
          },
          priceVerify: {
            trigger: 'blur',
            validator: (rule, originalPrice, callback) => {
              if (!this.form__.salePrice) {
                return callback()
              }

              if (parseFloat(originalPrice) > parseFloat(this.form__.salePrice)) {
                return callback(Error('注意!!!，原价高于了售价!'))
              } 

              return callback()
            }
          }
        }
      }
    }    
  效果：当售价字段内容被改变时，会触发原价字段进行价格比价的校验，达到提醒售价设置不能低于原价的场景
  
  triiger eg: 用户注册第二次密码输入和第一次保持一致
    <el-form :model="form__" ref="form" label-width="100px">
      <el-form-item ref="passwordFormItem" label="密码" prop="password" verify :rules="passwordVerify">
        <el-input v-model="form__.password" placeholder="请输入密码"></el-input>
      </el-form-item> 

      <el-form-item ref="repassowrdFormItem" label="确认密码" prop="repassowrd" verify trigger="password">
        <el-input v-model="form__.repassowrd" placeholder="请再一次输入密码确认"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="watch-component-but__submit" type="primary" @click="onSubmit">注册</el-button> 
      </el-form-item> 
    </el-form>    
  
    export default {
      data () {
        return {
          form__: { 
            password: undefined, 
            repassowrd: undefined
          },
          passwordVerify: {
            trigger: 'blur',
            validator: (rule, password, callback) => {
              if (!this.form__.repassowrd) {
                return callback()
              }

              if (password !== this.form__.repassowrd) {
                return callback(Error('两次输入的密码不一致!'))
              } 

              return callback()
            }
          }
        }
      }
    }
  效果：当repassowrd字段改变，会触发password字段的校验  
```

#### 全局注入选项
```
概述： 全局注入选项是插件在注入Vue时提供的部分全局功能支持选项      

使用方法：
  import ElementFormVerify from 'element-form-verify'
  Vue.use(ElementFormVerify, options)

  options为选项对象，支持选项如下:
   ________________________________________________________________________________________________
  |     参数                   说明                        类型             可选值          默认值   |
  |------------------------------------------------------------------------------------------------|
  |   errorAlias      必填项校验未通过时的提示文案          string             ——            '必填项' |
  |------------------------------------------------------------------------------------------------|
  |   customRules         全局自定义校验规则               object             ——              ——     |
  |————————————————————————————————————————————————————————————————————————————————————————————————|

  customRules类型为object对象类型，形式大致如下
    {
      // 格式参考
      ruleKey: (val, { canBeEmpty }) => ({
        trigger: 'blur',
        validator: validatorFunction
      }),

      // 实际例子
      phone: (val, { canBeEmpty }) => ({
        trigger: 'blur',
        validator: (rule, value, callback) => {
          // 如果开启了非必须校验器，该条校验规则跳过
          if (canBeEmpty && !value) return callback()

          // 校验是否符合手机号逻辑
          if (!/^1[0-9]{10}$/.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }

          callback()
        }
      })
    }

    1. 其中ruleKey表示某条校验规则的唯一标识名，即模板调用中verify传入的规则名:verify="{ 规则标识名ruleKey: 规则传入值val }",
       需要注意的是自定义校验规则ruleKey优先级是高于内置校验模板的，两个出现名字相同则自定义校验规则会覆盖内置模板校验规则

    2. 其中ruleKey的值是一个函数，该函数返回的是async-validator的自定义校验。函数会携带两个传参，第一个参数val表示的是模板调用
       中verify传入的规则值:verify="{ 规则标识名ruleKey: 规则传入值val }"。第二个参数是一个对象，包含一系列框架传入得选项，之中
       需要自定义规则注意得是canBeEmpty这个参数项表示得就是非必须校验器，需要使用者在自定义的校验方法中进行处理，否则非必须校验器的
       功能不会生效

       ruleKey: (value, { canBeEmpty }) => ({
          trigger: 'blur',
          validator: (rule, value, callback) => {
            // 当canBeEmpty为真时，跳过此条校验
            if (canBeEmpty && !value) return callback()    

            // 规则校验逻辑
            ...
            callback()
          }
        })
    
    3. validatorFunction即就是async-validator的自定义校验函数，参考async-validator自定义校验例子
```

#### Q&A一些常见问题
```
  1. 校验规则选项为什么不提供错误提示修改选项？如何才能修改错误提示？
    答: 大致两个原因：
          a. 如果在选项上提供错误提示参数，那么模板上传入参数将会变得复杂且冗长，这个插件本身定位简洁相违背
          b. 有些校验规则会存在多种情况判断，错误提示也不一样(eg:手机号码验证校验分三个检查，1.是否是全数字 2. 长度是否是11位
             3. 是否是11开头符合手机号码规律)，如果提供错误提示修改选项，那么模板上就会写过于冗长的代码，也不好操作
        如何修改错误提示：
          当前版本提出的解决方案大致如下:
          a. 使用regexp: [正则字面量, 错误提示]，这个万能正则校验选项代替，其中第二个参数可以传入自定义的错误提示 - 不太建议
          b. 使用全局注入选项的customRules，覆盖需要替换内置校验，这样就可以自己定义规则和错误提示 - 建议

  2. 如何自定义校验规则？
    答：插件留给使用者自定义校验规则有以下两种方式，各自的适用场景不一：
        1. 使用regexp选项，该方法支持用户自定义正则来自定义校验规则，也支持提供自定义错误提示，比较适合于只需要修改简单的场景
        2. 使用全局注入选项的customRules，可以新增校验规则以及覆盖替换内置校验规则，比较适合于自定义复杂的校验规则。通常这些
           自定义校验规则可以归纳到一个文件中，便于集中管理，使用者可以根据实际业务归纳出自己的校验规则注入到插件中使用。

           xxx.js - 自定义校验文件 
            const rule1 = (val, { canBeEmpty }) => ({
              ...
            })

            const rule2 = (val, { canBeEmpty }) => ({
              ...
            })

            const rule3 = (val, { canBeEmpty }) => ({
              ...
            })

            export default {
              rule1,
              rule2,
              rule3
            }

          main.js - 插件注册文件
            import customRules from xxx.js
            import ElementFormVerify from 'element-form-verify'
            Vue.use(ElementFormVerify, { customRules: customRules })

          这样做既可以实现自定义规则、自定义覆盖错误提示，也很好的让使用者归纳和管理自己的校验规则，规则随项目迁移只需要移动
          这个自定义校验归纳文件即可
```

