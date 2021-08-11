<template>
  <div>
    <p v-bind="$attrs">测试</p>
  </div>
</template>

<script lang="ts">
import {reactive, defineComponent, ref, onMounted} from "vue";

export default defineComponent({
  name: 'Test',
})
</script>