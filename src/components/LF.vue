<template>
  <div class="logic-flow-view">
    <h3 class="demo-title">LogicFlow Vue demo</h3>
    <!-- 辅助工具栏 -->
    <Control class="demo-control" v-if="lf" :lf="lf" @catData="$_catData"></Control>
    <!-- 节点面板 -->
    <NodePanel :lf="lf"></NodePanel>
    <!-- 画布 -->
    <div id="LF-view"></div>
    <!-- 用户节点自定义操作面板 -->
    <AddPanel
      v-if="showAddPanel"
      class="add-panel"
      :style="addPanelStyle"
      :lf="lf"
      :nodeData="addClickNode"
      @addNodeFinish="hideAddPanel"
      >
    </AddPanel>
    <!-- 属性面板 -->
    <el-drawer
      title="设置节点属性"
      :visible.sync="dialogVisible"
      direction="rtl"
      size="500px"
      :before-close="closeDialog">
      <PropertyDialog
        v-if="dialogVisible"
        :nodeData="clickNode"
        :lf="lf"
        @setPropertiesFinish="closeDialog"
      ></PropertyDialog>
    </el-drawer>
    <!-- 数据查看面板 -->
    <el-dialog
      title="数据"
      :visible.sync="dataVisible"
      width="50%">
      <DataDialog :graphData="graphData"></DataDialog>
    </el-dialog>
  </div>
</template>
<script>
import LogicFlow from '@logicflow/core'
import { Menu, Snapshot } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import NodePanel from './LFComponents/NodePanel'
import AddPanel from './LFComponents/AddPanel'
import Control from './LFComponents/Control'
import PropertyDialog from './PropertySetting/PropertyDialog'
import DataDialog from './LFComponents/DataDialog'

import {
  registerStart,
  registerUser,
  registerEnd,
  registerPush,
  registerDownload,
  registerPolyline,
} from './registerNode'

const demoData = require('./data.json')

export default {
  name: 'LF',
   components: { NodePanel, AddPanel, Control, PropertyDialog, DataDialog },
  data () {
    return {
      lf: null,
      showAddPanel: false,
      addPanelStyle: {
        top: 0,
        left: 0
      },
      addClickNode: null,
      clickNode: null,
      dialogVisible: false,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$_initLf()
  },
  methods: {
    $_initLf () {
      // 画布配置
      const config = {
        container: document.querySelector('#LF-view'),
        background: {
          color: '#f7f9ff'
        },
        grid: {
          size: 10,
          visible: false
        },
        keyboard: {
          enabled: true
        },
        edgeTextDraggable: true,
        guards: {
          beforeClone (data) {
            console.log('beforeClone', data)
            return true
          },
          beforeDelete (data) {
            // 可以根据data数据判断是否允许删除，允许返回true,不允许返回false
            // 文档： http://logic-flow.org/guide/basic/keyboard.html#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%88%A0%E9%99%A4%E6%88%96%E8%80%85%E6%8B%B7%E8%B4%9D%E8%A1%8C%E4%B8%BA
            console.log('beforeDelete', data)
            // _this.$message('不允许删除', 'error')
            return true
          }
        }
      }
      // 使用插件
      LogicFlow.use(Menu)
      LogicFlow.use(Snapshot)
      const lf = new LogicFlow({...config})
      this.lf = lf
      // 菜单配置文档：http://logic-flow.org/guide/extension/extension-components.html#%E8%8F%9C%E5%8D%95
      // 重置，增加，节点自由配置(以user节点为示例)
      lf.setMenuConfig({
        nodeMenu: [],
        edgeMenu: []
      })
      lf.addMenuConfig({
        nodeMenu: [
          {
            text: '分享',
            callback () {
              alert('分享成功！')
            }
          },
          {
            text: '属性',
            callback (node) {
              alert(`
                节点id：${node.id}
                节点类型：${node.type}
                节点坐标：(x: ${node.x}, y: ${node.y})`
              )
            }
          }
        ],
        edgeMenu: [
          {
            text: '属性',
            callback (edge) {
              alert(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`
              )
            }
          }
        ]
      })
      // 设置主题
      lf.setTheme({
        circle: {
          r: 20,
          stroke: '#000000',
          outlineColor: '#88f',
          strokeWidth: 1
        },
        rect: {
          outlineColor: '#88f',
          strokeWidth: 1
        },
        polygon: {
          strokeWidth: 1
        },
        polyline: {
          stroke: '#000000',
          hoverStroke: '#000000',
          selectedStroke: '#000000',
          outlineColor: '#88f',
          strokeWidth: 1
        },
        nodeText: {
          color: '#000000'
        },
        edgeText: {
          color: '#000000',
          background: {
            fill: '#f7f9ff'
          }
        }
      })
      this.$_registerNode()
    },
    // 自定义
    $_registerNode () {
      registerStart(this.lf)
      registerUser(this.lf)
      registerEnd(this.lf)
      registerPush(this.lf, this.clickPlus, this.mouseDownPlus)
      registerDownload(this.lf)
      registerPolyline(this.lf)
      this.$_render()
    },
    $_render () {
      this.lf.render(demoData)
      this.$_LfEvent()
    },
    $_getData () {
      const data = this.lf.getGraphData()
      console.log(JSON.stringify(data))
    },
    $_LfEvent () {
      this.lf.on('node:click', ({data}) => {
        console.log('node:click', data)
        this.$data.clickNode = data
        this.$data.dialogVisible = true
      })
      this.lf.on('edge:click', ({data}) => {
        console.log('edge:click', data)
         this.$data.clickNode = data
          this.$data.dialogVisible = true
      })
      this.lf.on('element:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('blank:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('connection:not-allowed', (data) => {
        this.$message({
          type: 'error',
          message: data.msg
        })
      })
      this.lf.on('node:mousemove', () => {
        console.log('on mousemove')
      })
    },
    clickPlus (e, attributes) {
      e.stopPropagation()
      console.log('clickPlus', e, attributes)
      const { clientX, clientY } = e
      console.log(clientX, clientY)
      this.$data.addPanelStyle.top = (clientY - 40) + 'px'
      this.$data.addPanelStyle.left = clientX + 'px'
      this.$data.showAddPanel = true
      this.$data.addClickNode = attributes
    },
    mouseDownPlus (e, attributes) {
      e.stopPropagation()
      console.log('mouseDownPlus', e, attributes)
    },
    hideAddPanel () {
      this.$data.showAddPanel = false
      this.$data.addPanelStyle.top = 0
      this.$data.addPanelStyle.left = 0
      this.$data.addClickNode = null
    },
    closeDialog () {
      this.$data.dialogVisible = false
    },
     $_catData(){
      this.$data.graphData = this.$data.lf.getGraphData();
      this.$data.dataVisible = true;
    }
  }
}
</script>
<style>
.logic-flow-view {
  height: 100vh;
  position: relative;
}
.demo-title{
  text-align: center;
  margin: 20px;
}
.demo-control{
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 2;
}
#LF-view{
  width: calc(100% - 100px);
  height: 80%;
  outline: none;
  margin-left: 50px;
}
.time-plus{
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}
</style>

