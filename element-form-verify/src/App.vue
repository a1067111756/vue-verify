<template>
  <div id="app">
    <el-row :gutter="80">
      <el-col :span="12">
        <p>不使用插件校验</p>
        <el-form ref="form1" :model="form__" label-width="80px">
          <el-form-item label="活动名称" prop="name" :verify="{ phone: true }">
            <el-input v-model="form__.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="form__.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" prop="test">
            <el-input v-model="form__.test"></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-row>
            <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form__.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" style="text-align: center" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form__.date2"
                  style="width: 100%"
                ></el-time-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form__.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form__.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form__.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form__.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>    
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      form__: {
        type: [],
        region: []
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.$refs.form1)
      this.$refs.form1.validate()
      // console.log('submit!')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 40px;
}
</style>
