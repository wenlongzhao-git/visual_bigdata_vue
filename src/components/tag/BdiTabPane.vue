<template xmlns:v-bind="http://java.sun.com/xml/ns/javaee">
  <Tabs type="card" :draggable="true" :animated="false" @on-drag-drop="handleDragDrop" v-model="activeName" @on-tab-remove="handleTabRemove" :before-remove="beforeRemove">
    <TabPane v-for="(tab, index) in tabDefult" :key="'defult'+index" :label="tab.label" :name="tab.name">
      <div style="height: 100%; min-height: 672px; border: 1px solid #dcdee2;">
        {{ tab.label }}
      </div>
    </TabPane>
    <TabPane v-for="(tab, index) in tabList" :key="tab.name" :label="tab.label" :name="tab.name" v-if="tab+tab.name" closable>
      <div style="min-height: 672px; border: 1px solid #dcdee2;">
        <!--{{ tab.label }}-->
        <div class="f-left" style="min-height: 30px;width: 100%;border: 1px solid #dcdee2;"></div>
        <div class="f-left" style="margin: 3px;float: left;min-height: 632px;width: 12%;border: 1px solid #dcdee2;"></div>
        <div class="f-center" style="margin-top: 3px; margin-bottom: 3px;float: left; min-height: 632px;width: 87%; border: 1px solid #dcdee2;">
          <div class="f-right" style="margin: 3px;float: right;min-height: 624px;width: 20%;border: 1px solid #dcdee2;"></div>
        </div>
      </div>
    </TabPane>
  </Tabs>
</template>
<script>
  export default {
    data () {
      return {
        activeName:null,
        tabDefult:[{
          label: '标签',
          name: 'name'
        }],
        tabList: [
          {
            label: '标签一',
            name: 'name1',
            src:'../../../static/html/iframe/a.html'
          },
          {
            label: '标签二',
            name: 'name2',
            src:'../../../static/html/iframe/b.html'
          },
          {
            label: '标签三',
            name: 'name3',
            src:'../../../static/html/iframe/c.html'
          },
          {
            label: '标签四',
            name: 'name4',
            src:'../../../static/html/iframe/d.html'
          },
          {
            label: '标签五',
            name: 'name5',
            src:'../../../static/html/iframe/e.html'
          }
        ]
      }
    },
    methods: {
      handleDragDrop (name, newName, a, b, names) {
        // names 为调整后的 name 集合
        this.tabList.splice(b,1,...this.tabList.splice(a, 1 , this.tabList[b]));
      },
      handleTabRemove(name) {
          if (name !== null) {
          this.tabList = this.tabList.filter(item => item.name !== name)
          this.activeName = this.tabList[0].name
        }
      },
      beforeRemove(){
        /*const that = this;
        if (that.tabList.length == 1) {
          return new Promise(function (resolve, reject) {
            that.$Message.warning('不可删除！');
            reject();
          })
        }*/
      }
    }
  }
</script>
