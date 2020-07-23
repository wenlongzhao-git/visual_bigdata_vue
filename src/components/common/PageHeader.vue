<template>
  <el-header>
    <el-button type="success" size="small" style="float: left;margin-top: 1%;margin-left: 1%" @click="tclogin">退出登录</el-button>
    <div style="margin-left: 70%">
      <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" title="添加用户信息" @click="addUserInfoBtn">
        添加用户
      </el-button>
      <span style="margin-left: 10%">当前登录人：<font color="#ff3818">{{loginuser}}</font></span>

    </div>

    <div>
      <el-dialog title="添加用户信息" :visible="addUserInfo" :modal-append-to-body='false' :before-close="closeAddDialog" style="background-color: #ffedd7" >
        <el-form ref="addUserInfoForm" :model="addUserInfoForm" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="addUserInfoForm.username" @blur ="uservility" max-length="10" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addUserInfoForm.password" size="small"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="addUserInfoForm.age" size="small"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select style="margin-left: 0px;float: left" v-model="value">
              <el-option v-for="sex in sexs" :value="sex.value" :key="sex.value" :label="sex.sexname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addUserInfoForm.email" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userInfoAdd()">确定</el-button>
            <el-button @click="addUserInfo = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div>
        <page-side :datas="datatable" v-if="datatable.length" style="background-image: url('../../../static/images/db281a4d66e0ed5832927cf930130f91.jpg')"></page-side>
      </div>

    </div>
  </el-header>
</template>
<script>
  import PageSide from "./PageSide";
  export default {
    name: 'PageHeader',
    components: {PageSide},
    //获取当前登录人的信息
    props:{
      loginuser:{
        type:String ,
        default: () => ''
      }

    },
    data() {
      return {
        addUserInfoForm: {
          username: '',
          password: '',
          age: '',
          sex: '',
          email: '',
          login:'/login'
        },
        addUserInfo: false,
        value: '',
        sexs: this.GLOBAL.sexs,
        datatable:[]
      }
    },

    mounted: function () {
      this.$axios.get("http://localhost:8085/findAll").then(response => {
        var detail = response.data.detail
        if (response.data.detail.length > 0) {
          for (var i = 0; i < response.data.detail.length; i++) {
            if (response.data.detail[i].sex != null) {
              if (response.data.detail[i].sex == 0) {
                response.data.detail[i].sex = '男';
              } else {
                response.data.detail[i].sex = '女';
              }
            }

          }
          this.datatable = response.data.detail;
        }
      });

    },
    methods: {
      uservility:function(){
        this.$axios.post("http://localhost:8085/verifyExist", this.$qs.stringify({username:this.addUserInfoForm.username}))
          .then(result => {
            if (result.data.success) {
              alert("用户名已存在！")
            } else {
              alert("用户名可以使用")
            }
          })
      },
      addUserInfoBtn: function () {
        this.addUserInfo = true;
      },
      closeAddDialog: function () {
        this.addUserInfo = false;
      },
      userInfoAdd: function () {
        this.addUserInfoForm.sex = this.value;

        var param = {
          username: this.addUserInfoForm.username,
          password: this.addUserInfoForm.password,
          age: this.addUserInfoForm.age,
          sex: this.addUserInfoForm.sex,
          email: this.addUserInfoForm.email
        }

        //向后台提交请求
        this.$axios({
            method : 'post',
            url :"http://localhost:8085/adduser",
            data :JSON.stringify(param) ,
            headers:{
              'Content-Type':"application/json",
              'charset':'UTF-8'}
          }).then(Reponse => {
          this.addUserInfo = false;
          let success = Reponse.data.success
          if (success) {
            this.datatable.unshift(Reponse.data.data);
            this.$alert("添加成功")
          } else {
            this.$alert("添加失败")
          }
        })
          .catch(e =>{
            alert(e.data)
          })
      },
      tclogin:function () {
        this.$axios.post("http://localhost:8085/logout").then(Reponse => {
          let success = Reponse.data.success
          if (success) {
            this.$alert("退出成功")
            this.$router.replace({path:'/login'})
          } else {
            this.$alert("退出失败")
          }
        })
          .catch(a => {
            alert("提交失败了")
          })
      }
    },

  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
</style>
