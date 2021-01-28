### 项目初衷
```
在实际业务需求开发中，特别是使用element、antd框架时，对于表单校验是始终绕不开问题。随项目迭代我们
总是在写很多很臭很长的校验选项，导致代码结构臃肿不简洁，而且很多时候这种常见的校验选项很无意义。
由此想编写一个基于async-validator校验、基于常见业务的上层插件来减少对表单校验的开发负担（实际就是
不想写那些又臭又长的校验代码）
```

### 项目目标
```
1. 该插件定位为只解决表单校验的相关的问题，不做过多的其它功能的聚合
2. 对于原UI框架的校验实现无侵入式注入，不影响UI框架本身的校验使用
3. 希望插件做的更加纯粹，目标是解决80%的常见校验，剩余20%的复杂场景校验开发者需自己编写代码(在复杂
的校验场景下，插件不得不考虑提供过多的选项来解决，导致最后插件写法繁琐，这种自己去写自定义校验不香嘛，
浪费感情)
```

### 实现原理
```
实现原理很简单，核心方法是通过全局的mixins混入覆盖form-item组件的getRules方法将插件提供的校验规则注入。
参考到element、antd两个框架的form-item的校验规则获取几乎一样，如果想把此插件使用到antd上很容易实现，
代价很小，另外vant之类的框架应该也同样适用（具体未实验）。实现原理参考了element-ui-verify库，在此感谢
原作者^_^
```

### 插件功能方向
```
插件当前的功能方向主要是两个：1. 提供选项支持常见的业务表单校验 2. 提供指令支持常见业务的表单输入限制
当前主要工作：1. 收集完善更多常见的业务校验rule 2. 实现更多表单输入限制指令
```

### 版本控制
```
当前版本是0.0.1，经过几个项目的迭代测试，插件显而易见的bug已经剔除，但由于设计目标的功能还有部分未添加，
所以请使用者锁定安装版本。插件提供的选项不排除后期可能有重大变动导致不兼容的问题
```
