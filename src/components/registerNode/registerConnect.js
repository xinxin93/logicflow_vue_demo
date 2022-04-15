import Vue from 'vue'
import Connect from './Connect.vue'

export default function registerConnect (lf) {
  lf.register('connect', ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      setHtml(rootEl) {
        const { properties } = this.props.model;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
        const Profile = Vue.extend({
          render: function (h) {
            return h(Connect, {
              props: {
                name: properties.name
              },
              on: {
                'select-button': (type) => {
                  console.log('select-button', type)
                }
              }
            })
          }
        })
        new Profile().$mount(el)
      }
    }
    class ConnectNodeModel extends HtmlNodeModel {
      initNodeData(data) {
        if (data.text) {
          data.text.editable = false
        }
        super.initNodeData(data)
        const width = 300
        const height = 150
        this.width = width
        this.height = height
        this.anchorsOffset = [
          [width / 2, 0],
          [0, height / 2],
          [-width / 2, 0],
          [0, -height/2],
        ]
      }
    }
    return {
      view: ConnectNode,
      model: ConnectNodeModel
    }
  })
}
