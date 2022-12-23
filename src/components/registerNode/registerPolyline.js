export default function registerPolyline (lf) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnnectionModel extends PolylineEdgeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
      }
      setHovered (isHovered) {
        super.setHovered(isHovered);
        this.isAnimation = isHovered;
      }
      getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle();
        style.animationName = "lf_animate_dash"
        return style;
      }
    }
    return {
      view: PolylineEdge,
      model: ConnnectionModel
    }
  })
}
