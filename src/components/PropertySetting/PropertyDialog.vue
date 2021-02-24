<template>
  <div class="property-dialog">
    <User
      v-if="nodeData.type === 'user'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"/>
    <CommonProperty
      v-else
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"/>
  </div>
</template>
<script>
import CommonProperty from './CommonProperty'
import User from './User.vue'

export default {
  name: 'PropertyDialog',
  components: {
    CommonProperty,
    User
  },
  props: {
    nodeData: Object,
    lf: Object
  },
  data () {
    return {}
  },
  methods: {
    handleClose () {
      this.$emit('setPropertiesFinish')
    }
  }
}
</script>
<style>
.property-dialog{
  padding: 20px;
}
</style>
