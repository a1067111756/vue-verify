<template>
  <el-form  :model="formData">
    <el-form-item ref="formRef" label="活动名称" prop="input1" required>
      <el-input v-model="formData.input1" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive} from "vue";

  const formData = reactive({
    input1: ''
  })

  const rules = {
    input1: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
    ]
  }

  const formRef = ref()
  onMounted(() => {
    // console.log(formRef.value)
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
