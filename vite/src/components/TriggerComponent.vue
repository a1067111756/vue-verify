<template>
  <div class="trigger-component__container">
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
  </div>
</template>

<script>
  export default {
    name: 'TriggerComponent',
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
    },
    methods: {
      onSubmit () {
        this.$refs.form.validate().catch(() => {})
      }
    }
  }
</script>