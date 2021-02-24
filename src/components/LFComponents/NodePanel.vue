<template>
  <div class="node-panel">
    <div class="node-item"
      v-for="item in nodeList"
      :key="item.text"
      @mousedown="$_dragNode(item)">
    <div class="node-item-icon" :class="item.class">
      <div v-if="item.type === 'user' || item.type === 'time'" class="shape"></div>
    </div>
    <span class="node-label">{{item.text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodePanel',
  props: {
    lf: Object
  },
  data () {
    return {
      nodeList: [
        {
          text: '开始',
          type: 'start',
          class: 'node-start'
        },
        {
          text: '矩形',
          type: 'rect',
          class: 'node-rect'
        },
        {
          type: 'user',
          text: '用户',
          class: 'node-user'
        },
        {
          type: 'push',
          text: '推送',
          class: 'node-push'
        },
        {
          type: 'download',
          text: '位置',
          class: 'node-download'
        },
        {
          type: 'end',
          text: '结束',
          class: 'node-end'
        }
      ]
    }
  },
  methods: {
    $_dragNode (item) {
      this.$props.lf.dnd.startDrag({
        type: item.type,
        text: item.label
      })
    }
  }
}
</script>
<style>
.node-panel {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 70px;
  padding: 20px 10px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 20px;
}
.node-item-icon {
  width: 30px;
  height: 30px;
  margin-left: 20px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.node-start{
  background: url('../background/start.png') no-repeat;
  background-size: cover;
}
.node-rect{
  border: 1px solid black;
}
.node-user{
  background: url('../background/user.png') no-repeat;
  background-size: cover;
}
.node-time{
  background: url('../background/time.png') no-repeat;
  background-size: cover;
}
.node-push{
  background: url('../background/push.png') no-repeat;
  background-size: cover;
}
.node-download{
  background: url('../background/download.png') no-repeat;
  background-size: cover;
}
.node-click{
  background: url('../background/click.png') no-repeat;
  background-size: cover;
}
.node-end{
  background: url('../background/end.png') no-repeat;
  background-size: cover;
}
</style>
