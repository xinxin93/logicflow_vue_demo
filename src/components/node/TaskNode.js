import { RectResize } from '@logicflow/extension'

class TaskModel extends RectResize.model {
  constructor(data, graphData) {
    super(data, graphData)
    this.zIndex = 0
  }
}

export default {
  type: 'rect',
  view: RectResize.view,
  model: TaskModel
}