<template>
  <div>
    测试
    <el-button @click="goto">流程</el-button>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {}
  },
  methods: {
    goto () {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
</style>
