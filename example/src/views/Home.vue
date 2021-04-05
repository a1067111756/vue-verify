<template>
  <div class="home-page__container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="密码" prop="password" :verify="{passwordRegexp: [/^[0-9a-zA-Z]{8,16}$/, '密码只能是字母数字组成8~16位字符']}">
        <el-input v-model="form.password"></el-input>
      </el-form-item>      
      <el-form-item label="密码确认" prop="repassword" watch="password" :rules="[
        {
            trigger: 'blur',
            required: true,
            message: '必填项'
        },
        {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.form.repassword !== this.form.password) {
                return callback('两次密码不一致')
              }
              return callback()
            }
        }
      ]">
        <el-input v-model="form.repassword"></el-input>
      </el-form-item>  
      <el-form-item label="售价" prop="salePrice" :verify="{ type: 'number' }" :rules="{
        trigger: 'blur',
        validator: (rule, value, callback) => {
          if (!this.form.salePrice || !this.form.originPrice) {
            return callback()
          }

          if (parseFloat(this.form.salePrice) < parseFloat(this.form.originPrice)) {
            return callback('售价不能低于卖价')
          }

          return callback()
        }
      }">
        <el-input v-model="form.salePrice"></el-input>
      </el-form-item> 
      <el-form-item label="原价" prop="originPrice" trigger="salePrice" :verify="{ type: 'number' }">
        <el-input v-model="form.originPrice"></el-input>
      </el-form-item> 
      <el-form-item label="活动名称" prop="name2" verify>
        <el-input v-model="form.name2" placeholder="活动名称2"></el-input>
      </el-form-item>      
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <InputComponent></InputComponent>
  </div>
</template>

<script>
  import InputComponent from '../components/InputComponent.vue'

  export default {
    name: 'Home',
    components: { InputComponent }, 
    data () {
      return {
        form: {
          password: undefined,
          repassword: undefined,
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            alert('表单校验通过!')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-page__container {
    width: 500px;
    margin: auto;
    margin-top: 100px;
  }
</style>