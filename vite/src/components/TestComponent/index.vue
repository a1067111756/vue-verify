<template>
  <div class="input-component__container">
    <el-form :model="form__" ref="form" label-width="100px">
      <el-form-item ref="formItem" label="测试项" prop="value" :verify="{ regexp: [/^[0-9a-z]$/, '只能输入数字与字母'] }">
        <el-input v-model="form__.value" placeholder=""></el-input>
      </el-form-item> 

      <el-form-item>
        <el-button class="input-component-but__submit" @click="onSubmit">提交表单</el-button> 
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'InputComponent',
    data () {
      return {
        form__: { value: '' }
      }
    },
    methods: {
      onSubmit () {
        this.$refs.form.validate().catch(() => {})
      }
    }
  }
</script>