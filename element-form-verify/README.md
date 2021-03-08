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
#### 插件的开关和入口（verify）
```
概述： 1. verify字段是插件的总开关，该字段存在，插件功能才会生效. 2. verify的另一个作用是表示
          该表单字段是必填字段
使用实例：
      <el-form-item label="示例" prop="name" verify>
        <el-input v-model="form__.name"></el-input>
      </el-form-item>
```

#### 常规校验
```
概述： 常规校验则是指常见的普通校验，这些校验都归属到verify字段选项下面(这样做的目的是为了不让字段过于分散，
      毕竟都是同一个功能)，常规校验为校验的核心功能，插件内置了常见场景的校验，后期会随着搜集越来越丰富，也
      希望大家踊跃提供自己需要的校验场景
      
verify字段注明: verify接收类型包括boolean、Object，boolean类型时候表示开关插件以及该表单字段是否必填，
      Object类型时表示支持的常规校验选项. 当前常规校验共分为以下四类       
      
1. 类型相关：检查输入内容类型的校验
  a. 数字类型: 包括(正、负、0)整数&&(正、负、0)浮点数，使用 - :verify="{type: 'number'}"
    <el-form-item label="手机号码" prop="phone" :verify="{type: 'number'}">
      <el-input v-model="form__.phone"></el-input>
    </el-form-item> 
    
  b. 整数类型, 这里判断包括(正、负、0)整数，使用 - :verify="{type: 'int'}"
  
  c. 正整数类型，使用 - :verify="{type: 'pint'}"
  
  d. 正整数类型(包括0)，使用 - :verify="{type: 'pintw0'}"
  
  e. 负整数类型，使用 - :verify="{type: 'nint'}"
  
  f. 负整数类型(包括0)，使用 - :verify="{type: 'nintw0'}"
  
  g. 小数类型, 这里判断包括(正、负、0)浮点数，使用 - :verify="{type: 'float'}"
  
  h. 英文字母(包括大小写)，使用 - :verify="{type: 'engChar'}"
  
  i. 小写英文字母，使用 - :verify="{type: 'engLowerChar'}"
  
  j. 大写英文字母，使用 - :verify="{type: 'engUpperChar'}"
  
  k. 数字、英文组合，使用 - :verify="{type: 'engAndNum'}"

2. 数字比较相关：对输入内容与预期大小比较的校验(只支持数字)
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
  a. 正则验证，可以解决很多场景的验证，使用 - :verify="{regexp：正则字面量}"
    <el-form-item label="手机号码" prop="phone" :verify="{regexp: /^1[0-9]{10}$/}">
      <el-input v-model="form__.phone"></el-input>
    </el-form-item>    
    
  b. 手机号弱校验(1开头、11位、全数字)，使用 - :verify="{wphone：true}"
  
  c. 手机号一般校验(弱校验基础上、第二位3-9)，使用 - :verify="{wphone：true}"
  
  d. 手机号强校验(弱校验基础上、号段限制)，使用 - :verify="{phone：true}"
    1、移动号段有134,135,136,137, 138,139,147,150,151,152,157,158,159,178,182,183,184,187,188。
    2、联通号段有130，131，132，155，156，185，186，145，176。
    3、电信号段有133，153，177，180，181，189。  
      这个号段名单随反馈增量更新
  
  e. 邮箱，使用 - :verify="{email：true}"
  
  f. 一般url链接，使用 - :verify="{url：true}"
  
  g. 固定开头url链接，使用 - :verify="{surl：xxx}"
  
  i. 身份证一般校验(15位或18位、全数字、最后一位为数字或X或x)，使用 - :verify="{idCard：true}"
  
  j. 密码正则匹配，使用 - :verify="{passwordRegexp：[正则字面量，错误提示]}"
    <el-form-item label="密码" prop="password" :verify="{passwordRegexp: [/^[0-9a-zA-Z]{8-16}$/, '请输入8-16位由字母和数字组成密码!']}">
      <el-input v-model="form__.password"></el-input>
    </el-form-item>   
    
  k. 密码选项匹配，使用 - :verify="{password：[最小长度, 最大长度, 可选的选项, 必须存在的选项]}"
    <el-form-item label="密码" prop="password" :verify="{password: [6, 18, ['字母', '数字', '特殊字符'], ['字母', '数字']]}">
      <el-input v-model="form__.password"></el-input>
    </el-form-item>  
    
    注：可选的选项 - 表示密码中可以存在哪些类型的内容，比如上面示例表示密码中可以存在字母、数字、特殊字符。 必须存在的选项 - 则表示密码
        中必须存在的类型的内容，比如上面示例表示密码中必须存在字母、数字两种类型。 所有选项策略如下：
        
    const strategy = {
      '大写字母': 'A-Z',
      '小写字母': 'a-z',
      '字母': 'A-Za-z',
      '数字': '0-9',
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
      
使用场景：联动校验的使用场景比较业务型，大多是基于业务来考虑.
  watch eg: 注册账号的密码二次确认校验
  <el-form-item label="请输入密码" prop="password" :verify="{passwordRegexp: [/^[0-9a-zA-Z]{8-16}$/}">
    <el-input v-model="form__.password"></el-input>
  </el-form-item>      
  
  <el-form-item label="请二次输入密码确认" prop="repassword" watch="password" :verify="{xxxx}">
    <el-input v-model="form__.repassword"></el-input>
  </el-form-item>  
  效果：当password字段改变，会触发repassword自身的校验
  
  triiger eg: 一个商品表单填写，其原价高于了销售价时，需要校验清空销售价要求用户重新填写
  <el-form-item label="售价" prop="salePrice" :verify="{xxxxx}">
    <el-input v-model="form__.salePrice"></el-input>
  </el-form-item>      
  
  <el-form-item label="原价" prop="originalPrice" trigger="salePrice" :verify="{type: 'number'}">
    <el-input v-model="form__.originalPrice"></el-input>
  </el-form-item>  
  效果：当originalPrice字段改变，会触发salePrice字段的校验  
```
