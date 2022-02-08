export default function registerEnd (lf) {
  lf.register('end', ({ CircleNode, CircleNodeModel, h }) => {
    class EndNode extends CircleNode {
      getIconShape () {
        const {model} = this.props
        const {
          x,
          y,
          width,
          height
        } = model
        const stroke = '#404040'
        return h(
          'svg',
          {
            x: x - width / 2,
            y: y - height / 2,
            width: 40,
            height: 40,
            viewBox: '0 0 1024 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M212.992 526.336 212.992 526.336 212.992 526.336 215.04 526.336 212.992 526.336Z'
            }
          ),
          // 圆形外框隐藏
          // h(
          //   'path',
          //   {
          //     fill: stroke,
          //     d: 'M817.152 202.752 817.152 202.752C737.28 122.88 628.736 75.776 509.952 75.776c-118.784 0-229.376 49.152-307.2 126.976l0 0c-77.824 77.824-126.976 186.368-126.976 307.2 0 118.784 49.152 229.376 126.976 307.2 77.824 79.872 188.416 126.976 307.2 126.976 120.832 0 229.376-49.152 307.2-126.976 79.872-77.824 126.976-186.368 126.976-307.2C946.176 389.12 897.024 280.576 817.152 202.752zM770.048 770.048c-65.536 65.536-157.696 108.544-260.096 108.544-102.4 0-194.56-40.96-260.096-108.544C184.32 704.512 141.312 612.352 141.312 509.952s40.96-194.56 108.544-260.096C317.44 184.32 409.6 141.312 509.952 141.312c100.352 0 192.512 40.96 258.048 106.496l2.048 2.048c65.536 65.536 108.544 157.696 108.544 260.096S837.632 704.512 770.048 770.048z'
          //   }
          // ),
          h(
            'path',
            {
              fill: stroke,
              d: 'M724.992 296.96 724.992 296.96 296.96 296.96 296.96 724.992 724.992 724.992 724.992 296.96Z'
            }
          )
        )
      }
      getShape () {
        const {model} = this.props
        const {x, y, r} = model
        const {fill, stroke, strokeWidth} = model.getNodeStyle()
        return h(
          'g',
          {
          },
          [
            h(
              'circle',
              {
                cx: x,
                cy: y,
                r,
                fill,
                stroke,
                strokeWidth
              }
            ),
            this.getIconShape()
          ]
        )
      }
    }
    class EndModel extends CircleNodeModel {
      initNodeData(data) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 35
        }
        super.initNodeData(data)
        this.r = 20
      }
      // 自定义锚点样式
      getAnchorStyle() {
        const style = super.getAnchorStyle();
        style.hover.r = 8;
        style.hover.fill = "rgb(24, 125, 255)";
        style.hover.stroke = "rgb(24, 125, 255)";
        return style;
      }
      // 自定义节点outline
      getOutlineStyle() {
        const style = super.getOutlineStyle();
        style.stroke = '#88f'
        return style
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
    return {
      view: EndNode,
      model: EndModel
    }
  })
}
