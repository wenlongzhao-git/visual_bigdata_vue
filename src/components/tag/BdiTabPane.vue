<template>
  <Tabs type="card" :draggable="true" :animated="false" @on-drag-drop="handleDragDrop" v-model="activeName" @on-tab-remove="handleTabRemove" :before-remove="beforeRemove">
    <TabPane v-for="(tab, index) in tabDefult" :key="'defult'+index" :label="tab.label" :name="tab.name">{{ tab.label }}</TabPane>
    <TabPane v-for="(tab, index) in tabList" :key="tab.name" :label="tab.label" :name="tab.name" v-if="tab+tab.name" closable>{{ tab.label }}</TabPane>
  </Tabs>
</template>
<script>
  export default {
    data () {
      return {
        tabDefult:[{
          label: '标签',
          name: 'name'
        }],
        tabList: [
          {
            label: '标签一',
            name: 'name1'
          },
          {
            label: '标签二',
            name: 'name2',
            count:1
          },
          {
            label: '标签三',
            name: 'name3'
          },
          {
            label: '标签四',
            name: 'name4'
          },
          {
            label: '标签五',
            name: 'name5'
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
