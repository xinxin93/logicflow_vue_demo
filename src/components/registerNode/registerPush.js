export default function registerPush (lf, clickPlus, mouseDownPlus) {
  lf.register('push', ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getIconShape () {
        const {model} = this.props
        const {
          stroke
        } = model.getNodeStyle()
        return h(
          'svg',
          {
            x: 18,
            y: 18,
            width: 30,
            height: 30,
            viewBox: '0 0 1024 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M866.461538 39.384615H393.846154c-43.323077 0-78.769231 35.446154-78.769231 78.769231v1.969231c0 13.784615 7.876923 27.569231 19.692308 35.446154 5.907692 3.938462 80.738462 78.769231 80.738461 78.769231 5.907692 5.907692 15.753846 0 15.753846-7.876924 0-15.753846 13.784615-31.507692 29.538462-31.507692h334.769231c15.753846 0 31.507692 15.753846 31.507692 31.507692v531.692308c0 15.753846-15.753846 27.569231-31.507692 27.569231h-334.769231c-15.753846 0-27.569231-11.815385-27.569231-27.569231v-1.969231c0-7.876923-9.846154-11.815385-15.753846-5.907692 0 0-74.830769 74.830769-82.707692 78.769231-11.815385 7.876923-19.692308 19.692308-19.692308 35.446154v39.384615c0 43.323077 33.476923 78.769231 76.8 78.769231h472.615385c43.323077 0 80.738462-35.446154 80.738461-78.769231V118.153846c0-43.323077-35.446154-78.769231-78.769231-78.769231zM630.153846 945.230769c-33.476923 0-59.076923-25.6-59.076923-59.076923s25.6-59.076923 59.076923-59.076923 59.076923 25.6 59.076923 59.076923-25.6 59.076923-59.076923 59.076923z m-86.646154-474.584615L297.353846 224.492308c-11.815385-11.815385-29.538462-11.815385-41.353846 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l90.584615 90.584615c11.815385 11.815385 3.938462 33.476923-13.784615 33.476923H29.538462c-15.753846 1.969231-29.538462 15.753846-29.538462 31.507693v59.076923c0 15.753846 13.784615 29.538462 29.538462 29.538461h259.938461c17.723077 0 25.6 21.661538 13.784615 33.476923l-90.584615 90.584616c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L543.507692 512c9.846154-9.846154 9.846154-29.538462 0-41.353846z'
            }
          )
        )
      }
      getPulsShape () {
        const {model} = this.props
        // 判断当前节点是否子节点
        const graphData = lf.getGraphData()
        const edges = graphData.edges
        let hasChildNode = false
        edges.some(item => {
          if (item.sourceNodeId === model.id) {
            hasChildNode = true
            return true
          }
        })
        if (hasChildNode) {
          return
        }
        return h(
          'svg',
          {
            x: 70,
            y: 20,
            width: 30,
            height: 30,
            viewBox: '0 0 1024 1024',
            class: 'time-plus',
            onClick: (e) => clickPlus(e, model),
            onMousedown: (e) => mouseDownPlus(e, model),
            onMouseUp: (e) => mouseDownPlus(e, model)
          },
          h(
            'path',
            {
              fill: '#f17611',
              d: 'M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z'
            }
          ),
          h(
            'path',
            {
              fill: '#ffffff',
              d: 'M448 298.666667h128v426.666666h-128z'
            }
          ),
          h(
            'path',
            {
              fill: '#ffffff',
              d: 'M298.666667 448h426.666666v128H298.666667z'
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
            this.getIconShape(),
            this.getPulsShape()
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
        const lenght = 35
        this.points = [
          [lenght, 0],
          [lenght * 2, lenght],
          [lenght, lenght * 2],
          [0, lenght]
        ]
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
