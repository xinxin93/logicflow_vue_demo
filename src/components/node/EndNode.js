import { h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'

class EndModel extends RectResize.model {
  constructor(data, graphData) {
    data.text = {
      value: (data.text && data.text.value) || '',
      x: data.x,
      y: data.y + 35
    }
    super(data, graphData)
    this.width = 40
    this.height = 40
  }
  getConnectedSourceRules () {
    const rules = super.getConnectedSourceRules()
    const notAsTarget = {
      message: '终止节点不能作为连线的起点',
      validate: () => false
    }
    rules.push(notAsTarget)
    return rules
  }
}

class EndView extends RectResize.view {
  getResizeShape() {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke,
      strokeWidth
    } = this.props.model
    const svgAttrs = {
      x: x - width / 2,
      y: y - height / 2,
      width,
      height,
      viewBox: '0 0 1024 1024'
    }
    const rectAttrs = {
      x: x - width / 6,
      y: y - height / 6,
      width: width / 3,
      height: height / 3
    }
    const circleAttrs = {
      cx: x,
      cy: y,
      r: width / 2,
      fill,
      stroke,
      strokeWidth
    }

    return h('g', {}, [
      h('circle', { ...circleAttrs }),
      h('svg', { ...svgAttrs }),
      h('rect', { ...rectAttrs })
    ])
  }
}

export default {
  type: 'end',
  view: EndView,
  model: EndModel
}
