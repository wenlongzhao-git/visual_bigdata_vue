<template>
  <div >
    <page-header :loginuser="loginuser"></page-header>
    <page-footer style="margin-top: 38%;height: 50px"></page-footer>
  </div>
</template>

<script>
  import PageHeader from '@/components/common/PageHeader.vue'
  import PageFooter from '@/components/common/PageFooter.vue'

  export default {
    name: 'BdiIndex',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: {PageHeader, PageFooter},
    data() {
      return {
        loginuser:'',
        token:''
      }
    },
    created(){

      if(this.$route.params.username != null){
        this.loginuser = this.$route.params.username;
      }else{
        this.loginuser = this.utils.getCookie("username")
      }
      if(this.$route.params.token != null){
        this.token = this.$route.params.token;
      }else{
        this.token = this.utils.getCookie("token")
      }

    }
  }
</script>
<style scoped>
  *{
    margin-top: 0px;
    padding: 0px;
  }
  .el-table .success-row {
    background-color: oldlace;
  }

  .el-table .warning-row {
    background-color: #f0f9eb;
  }

</style>
