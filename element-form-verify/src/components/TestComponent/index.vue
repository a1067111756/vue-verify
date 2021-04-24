<template>
  <div class="input-component__container">
    <el-form :model="form__" ref="form" label-width="100px">
      <el-form-item ref="formItem" label="测试项" prop="value" :verify="{ arrayNotEmpty: '图片数量不能为0' }">
        <span>{{ form__.value }}</span>
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
        form__: { value: [] }
      }
    },
    methods: {
      onSubmit () {
        this.$refs.form.validate().catch(() => {})
      }
    }
  }
</script>