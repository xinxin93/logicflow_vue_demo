import Vue from 'vue'
import Connect from './Connect.vue'

export default function registerConnect (lf) {
  lf.register('connect', ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      shouldUpdate() {
        const { properties } = this.getAttributes();
        if (this.currrentProperties && this.currrentProperties === JSON.stringify(properties)) return false;
        this.currrentProperties = JSON.stringify(properties)
        return true;
      }
      setHtml(rootEl) {
        // todo: 和react不一样，还没有找到合适的利用vue内置的diff算法来计算节点是否需要更新。
        if (!this.shouldUpdate()) return;
        const { properties } = this.getAttributes();
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
      setAttributes() {
        this.text.editable = false;
        const width = 300;
        const height = 150;
        this.width = width;
        this.height = height;

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
