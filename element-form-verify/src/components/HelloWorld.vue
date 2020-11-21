<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item prop="name" label="Activity name" ref="test" hasFeedback verify url>
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item label="Activity zone">
      <a-select v-model="form.region" placeholder="please select your zone">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Activity time">
      <a-date-picker
        v-model="form.date1"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item label="Instant delivery">
      <a-switch v-model="form.delivery" />
    </a-form-model-item>
    <a-form-model-item label="Activity type">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="1" name="type">
          Online
        </a-checkbox>
        <a-checkbox value="2" name="type">
          Promotion
        </a-checkbox>
        <a-checkbox value="3" name="type">
          Offline
        </a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="Resources">
      <a-radio-group v-model="form.resource">
        <a-radio value="1">
          Sponsor
        </a-radio>
        <a-radio value="2">
          Venue
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="Activity form">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''     
      },
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ]  
    };
  },
  mounted () {
    // let rule = this.$refs.test.getRules()
    // rule.push(this.name)
    // console.log(rule)
    // console.log(this.$refs.test)
    // rule[0].required = true
    // this.$refs.test.validate({name: "muji"}, (errors, fields) => {
    //   console.log(errors)
    //   console.log(fields)
    //   if(errors) {
    //     console.log('验证成功')
    //     return new Error(errors, fields);
    //   }

    //   console.log('验证失败')
    // })
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
  },
};
</script>