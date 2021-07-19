<template>
  <div class="connect">
    <p>{{name}}</p>
    <p>您好，请问需要买保险吗？</p>
    <div class="button-list">
      <button @mousedown.stop="done(1)">有保险了</button>
      <button @mousedown.stop="done(2)">不需要</button>
      <button @mousedown.stop="done(3)">需要</button>
      <button @mousedown.stop="done(4)">特殊</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    done(type) {
      this.$emit('select-button', type)
    }
  }
}
</script>

<style scoped>
.connect {
  width: 100%;
  height: 100%;
  background: #FFF;
  border: 1px solid #9a9a9b;
  box-sizing: border-box;
  padding: 10px;
}
.connect p {
  margin: 0;
}
.button-list {
  position: absolute;
  bottom: 10px;
}
</style>