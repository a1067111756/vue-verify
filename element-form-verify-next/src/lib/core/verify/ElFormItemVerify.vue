<template>
  <el-form-item v-bind="$attrs" :rules="getRules">
    <slot></slot>
  </el-form-item>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import {ElFormItem} from 'element-plus';
import {hasCompPropValue} from '@/lib/helper/utils';
import RulesBuilder from './rules/RulesBuilder';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'ElFormItemVerify',
  components: { ElFormItem },
  props: {
    // 插件校验开关 - 默认关闭, 需要开启校验插件此字段必须开启
    verify: {
      type: [Boolean, Object] as PropType<VERIFY_TYPE.IVerifyProps.verify>,
      default: false
    },
    // 非必要校验选项
    canBeEmpty: {
      type: [Boolean, String] as PropType<VERIFY_TYPE.IVerifyProps.canBeEmpty>,
      default: undefined
    },
    // 插件校验关联监听 - 监听某个值触发自身
    watch: {
      type: String as PropType<VERIFY_TYPE.IVerifyProps.watch>,
      default: undefined
    },
    // 插件校验关联监听 - 自身变化主动触发别人
    trigger: {
      type: String as PropType<VERIFY_TYPE.IVerifyProps.trigger>,
      default: undefined
    }
  },
  setup (props, context) {
    // 选项 - 全局注入的插件选项
    const globalOption: VERIFY_TYPE.IGlobalOption = inject('elFormItemVerifyGlobalOption')

    // 核心方法 - 复写ui框架获取验证规则方法
    const getRules = computed(() => {
      return hasCompPropValue(props.verify) ? getMergeRules() : undefined
    })

    // 方法 - 合并rules - 插件规则优先级高于ui框架规则
    // note: 插件默认非侵入式，不会影响原校验方式和规则，优先级为：框架校验等级 > 插件校验等级
    const getMergeRules = () => {
      const pluginRules = new RulesBuilder(props, globalOption).build().getRules() || []
      const formItemRules = context.attrs.rules || []
      return [].concat(formItemRules).concat(pluginRules)
    }

    return {
      getRules
    }
  }
})
</script>
