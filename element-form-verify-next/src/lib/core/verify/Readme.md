### 说明
该文件夹是async-validator校验器扩展功能相关，表单校验主要功能由此目录负责

### 支持功能
```
  1. 内置常见校验   √                       
  2. 支持非必须校验(非必填项且有输入时校验) √
  3. 支持watch关联校验 √
  4. 支持正则自定义校验 √
  5. 支持校验自定义提示 ×
  6. 添加配置项目 ×
```

### 目录架构
```
verify
    ├── index              校验插件注册入口
    ├── mixins             ui框架混入（负责将插件校验规则注入到ui框架）
    ├── rules              校验规则相关文件夹
       ├── index           校验规则脚本注册入口
       ├── RulesBuilder    校验规则生成构建类（负责生成async-validator使用的校验规则）
       ├── modules         校验规则分类文件夹（定义插件校验规则）
          ├── common       常用校验规则
          ├── number       数字校验规则
          ├── text         文本校验规则
          ├── type         类型校验规则
          ├── verify       必须校验规则
          ├── xxx        
    └── ...
``` 

### 功能解释

### 一些答疑

### 期望