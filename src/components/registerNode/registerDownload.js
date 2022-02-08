const NODE_COLOR = '#9932CC'
export default function registerDownload(lf) {
  lf.register('download', ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getIconShape () {
        return h(
          'svg',
          {
            x: 14,
            y: 13,
            width: 23,
            height: 23,
            viewBox: '0 0 1024 1024'
          },
          h(
            'path',
            {
              fill: NODE_COLOR,
              d: 'M831.513034 319.863005h-95.945189c-17.662265 0-31.980365 14.3181-31.980365 31.980365 0 17.662265 14.3181 31.980365 31.980365 31.980366h64.218604c17.520025 0 31.722492 14.202467 31.722492 31.722492V863.786065c0 17.520025-14.202467 31.722492-31.722492 31.722492H159.66442c-17.520025 0-31.722492-14.202467-31.722493-31.722492V415.546228c0-17.520025 14.202467-31.722492 31.722493-31.722492h64.218603c17.662265 0 31.980365-14.3181 31.980366-31.980366 0-17.662265-14.3181-31.980365-31.980366-31.980365H127.937834c-35.322483 0-63.956637 28.634154-63.956637 63.956637v511.693008c0 35.322483 28.634154 63.956637 63.956637 63.956638h703.5752c35.322483 0 63.956637-28.634154 63.956638-63.956638V383.819642c0-35.32146-28.634154-63.956637-63.956638-63.956637z'
            }
          ),
          h(
            'path',
            {
              fill: NODE_COLOR,
              d: 'M310.382073 521.036817c-12.388145-12.388145-32.473599-12.388145-44.862767 0l-0.364297 0.364297c-12.388145 12.388145-12.388145 32.473599 0 44.862767l190.186573 190.186574c5.818519 6.813173 14.465456 11.137665 24.126491 11.137664h0.515746c9.662057 0 18.307971-4.324492 24.12649-11.137664L694.296883 566.263881c12.388145-12.388145 12.388145-32.473599 0-44.862767l-0.364297-0.364297c-12.388145-12.388145-32.473599-12.388145-44.862767 0L511.706311 658.400325V95.743598c0-17.520025-14.202467-31.722492-31.722492-31.722492h-0.515746c-17.520025 0-31.722492 14.202467-31.722493 31.722492v562.656727L310.382073 521.036817z'
            }
          )
        )
      }
      getShape () {
        const {model} = this.props
        const {width, height, x, y, points} = model
        const {
          fill,
          fillOpacity,
          strokeWidth,
          stroke,
          strokeOpacity,
        } = model.getNodeStyle()
        const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        const pointsPath = points.map(point => point.join(',')).join(' ')
        return h(
          'g',
          {
            transform
          },
          [
            h(
              'polygon',
              {
                points: pointsPath,
                fill,
                stroke,
                strokeWidth,
                strokeOpacity,
                fillOpacity
              }
            ),
            this.getIconShape()
          ]
        )
      }
    }
    class Model extends PolygonNodeModel {
      constructor (data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 50
        }
        super(data, graphModel)
        const lenght = 25
        this.points = [
          [lenght, 0],
          [lenght * 2, lenght],
          [lenght, lenght * 2],
          [0, lenght]
        ]
      }
      getNodeStyle() {
        const style = super.getNodeStyle()
        style.stroke = NODE_COLOR
        return style
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
