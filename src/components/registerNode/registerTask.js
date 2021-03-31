export default function registerTask (lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getShape() {
        const style = this.getShapeStyle();
        console.log(style);
        const { width, height } = style;
        const { x, y } = this.getAttributes();
        const position = {
          x: x - width / 2,
          y: y- height / 2,
        }
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
