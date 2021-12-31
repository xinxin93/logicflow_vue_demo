import { h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'

// 开始
class StartModel extends RectResize.model {
  constructor(data, graphData) {
    super(data, graphData)
    this.width = 40
    this.height = 40
  }
}

class StartView extends RectResize.view {
  getResizeShape() {
    const {
      x,
      y,
      width,
      fill,
      stroke,
      strokeWidth
    } = this.props.model

    // 文字
    const textAttrs = {
      fill: '#000000',
      fontSize: 12,
      x: x - 12,
      y: y + 4,
      width: 50,
      height: 25
    }
    // 外圆
    const circleAttrs = {
      cx: x,
      cy: y,
      r: 1/2 * width,
      fill,
      stroke,
      strokeWidth
    }

    return h('g', {}, [
      h('circle', { ...circleAttrs }),
      h('text', { ...textAttrs }, 'Start')
    ])
  }
}

export default {
  type: 'start',
  view: StartView,
  model: StartModel
}