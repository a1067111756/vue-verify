<template>
  <el-form :model="formData" :rules="rules">
    <el-form-item-verify ref="formRef" label="活动名称" prop="input1" verify :rules="rules">
      <el-input v-model="formData.input1" />
    </el-form-item-verify>

    <el-button @click="test">测试</el-button>
  </el-form>
</template>

<script lang="ts">
import {reactive, defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'App',
  setup () {
    const formRef = ref()
    const formData = reactive({
      input1: ''
    })

    const rules = { required: true, message: '请输入活动名称', trigger: 'blur' }

    const test = () => {
      console.log(formRef.value)
    }

    return {
      test,
      rules,
      formRef,
      formData
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
