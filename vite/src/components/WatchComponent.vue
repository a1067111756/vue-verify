<template>
  <div class="watch-component__container">
    <el-form :model="form__" ref="form" label-width="100px" @validate="test">
      <el-form-item ref="originFormItem" label="原价" prop="originPrice" verify :rules="priceVerify">
        <el-input v-model="form__.originPrice" placeholder="请输入商品原价"></el-input>
      </el-form-item> 

      <el-form-item ref="saleFormItem" label="售价" prop="salePrice" verify>
        <el-input v-model="form__.salePrice" placeholder="请输入商品售价"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="watch-component-but__submit" type="primary" @click="onSubmit">注册</el-button> 
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'WatchComponent',
    data () {
      return {
        form__: { 
          salePrice: undefined, 
          originPrice: undefined
        },
        priceVerify: {
          trigger: 'blur',
          validator: (rule, originPrice, callback) => {
            if (!this.form__.salePrice) {
              return callback()
            }

            if (parseFloat(originPrice) > parseFloat(this.form__.salePrice)) {
              return callback(Error('注意!!!，原价高于了售价!'))
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