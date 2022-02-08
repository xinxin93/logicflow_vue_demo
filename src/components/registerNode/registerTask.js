export default function registerTask (lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getShape() {
        const {model} = this.props
        const {width, height, x, y} = model
        const position = {
          x: x - width / 2,
          y: y- height / 2,
        }
        const style = model.getNodeStyle()
        return h("rect", {
          ...style,
          ...position,
        });
      }
    }
    class Model extends RectNodeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
        this.radius = 20;
      }
    }
    return {
      view: View,
      model: Model
    }
  })
}
