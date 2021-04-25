<template>
  <div class="input-component__container">
    <el-form :model="form__" ref="form" label-width="100px">
      <el-form-item ref="formItem" label="测试项" prop="value" verify>
        <el-checkbox-group v-model="form__.value">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用"></el-checkbox>
          <el-checkbox label="选中且禁用"></el-checkbox>
        </el-checkbox-group>
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