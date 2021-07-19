<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="文案">
        <el-input v-model="formData.text"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formData.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formData.type"></el-input>
      </el-form-item>
      <el-form-item label="A">
        <el-input v-model="formData.a.a1"></el-input>
        <el-input v-model="formData.a.a2"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  mounted() {
    const { properties, text } = this.$props.nodeData
    if (properties) {
      this.$data.formData = Object.assign({}, this.$data.formData, properties)
    }
    if (text && text.value) {
      this.$data.formData.text = text.value
    }
    if (text && text.value) {
      this.$data.text = text.value
    }
  },
  data () {
    return {
      text: '',
      formData: {
          text: '',
          name: '',
          region: '',
          type: '',
          a: {
            a1: '',
            a2: ''
          }
        }
    }
  }, 
  methods: {
    onSubmit() {
      const { id } = this.$props.nodeData
      this.$props.lf.setProperties(id, {
        ...this.$data.formData
      });
      console.log(6666, this.$data.formData);
      this.$props.lf.updateText(id, this.$data.formData.text);
      this.$emit('onClose')
    },
  }
}
</script>
<style scoped>
</style>
