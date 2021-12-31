import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core'

class Model extends PolylineEdgeModel {
  constructor(data, graphModel) {
    super(data, graphModel)
    this.strokeWidth = 1
  }
}

export default {
  type: 'polyline',
  view: PolylineEdge,
  model: Model
}