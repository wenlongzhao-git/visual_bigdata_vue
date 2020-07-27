<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-key="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item key="1">
          <Icon type="ios-navigate"></Icon>
          导航一
        </Menu-item>
        <Menu-item key="2">
          <Icon type="ios-keypad"></Icon>
          导航二
        </Menu-item>
        <Menu-item key="3">
          <Icon type="ios-analytics"></Icon>
          导航三
        </Menu-item>
        <Menu-item key="4">
          <Icon type="ios-paper"></Icon>
          导航四
        </Menu-item>
      </div>
      <div class="layout-user">
        <MenuItem key="5">
          <Icon type="ios-navigate"></Icon>
          Item 1
        </MenuItem>
      </div>
    </Menu>
    <Menu class="layout-second-nav" mode="horizontal" :active-key="1">
      <div class="layout-assistant">
        <Menu-item key="1">二级导航</Menu-item>
        <Menu-item key="2">二级导航</Menu-item>
        <Menu-item key="3">二级导航</Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <Row>
        <i-col span="5">
          <Menu active-key="1-2" width="auto" :open-keys="['1']">
            <div style="height: 700px;overflow: auto;">
              <siderbar></siderbar>
            </div>


            <!--<Submenu key="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                导航一
              </template>
              <Menu-item key="1-1">选项 1</Menu-item>
              <Menu-item key="1-2">选项 2</Menu-item>
              <Menu-item key="1-3">选项 3</Menu-item>
            </Submenu>
            <Submenu key="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                导航二
              </template>
              <Menu-item key="2-1">选项 1</Menu-item>
              <Menu-item key="2-2">选项 2</Menu-item>
            </Submenu>
            <Submenu key="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                导航三
              </template>
              <Menu-item key="3-1">选项 1</Menu-item>
              <Menu-item key="3-2">选项 2</Menu-item>
            </Submenu>-->
          </Menu>
        </i-col>
        <i-col style="min-height: 700px" span="19">
          <div style="margin: 5px;padding: 5px; min-height: 690px;">

            <!--<div style="height: 40px;" class="layout-content-main">内容区域</div>-->
            <div style="height: 30px;">
              <Tag closable v-for="item in count" :key="item" :name="item"  @on-close="handleClose2">标签{{ item + 1 }}</Tag>
              <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
            </div>
            <div style="min-height: 540px; float-displace: 0px;background: #3F3F3F;">
              <!--<iframe src="../../../static/demo.html" width="1200" height="300" frameborder="0" scrolling="auto" style="position:absolute;top: 0px;left: 0px;"></iframe>-->
            </div>
          </div>

        </i-col>
      </Row>
    </div>
    <div class="layout-copy">
      2011-2016 &copy; TalkingData
    </div>
  </div>
</template>
<script>
  import siderbar from '../tree/siderbar.vue'
  export default {
    name : 'BdiHome',
    components: {siderbar},
    data () {
      return {
        count: [0, 1, 2]
      };
    },
    methods: {
      handleAdd () {
        if (this.count.length) {
          this.count.push(this.count[this.count.length - 1] + 1);
        } else {
          this.count.push(0);
        }
      },
      handleClose2 (event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
      }
    }
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 430px;
    margin: 0 auto;
  }
  .layout-user{
    width: 105.89px;
    float: right;
  }
  .layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    margin: 7px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    min-height: 700px;
  }
  .layout-content-main{
    /*padding: 10px;*/
    /*min-height: 700px;*/
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
