<template>
  <div style="margin-top: 15%;background-color: #fcb59c">
    <el-container>
      <el-header>注册</el-header>
      <el-container>
        <el-main>
          <div>
            <div class="input">
              用户名：
              <el-input size="mini" v-model="spduser.username" @blur ="uservility" clearable></el-input>
            </div>
            <div class="input">
              密码：
              <el-input size="mini" v-model="spduser.password" type="password" class="password" clearable></el-input>
            </div>
            <div class="input">
              邮箱：
              <el-input size="mini" v-model="spduser.email" class="password" clearable></el-input>
            </div>
            <div class="input">
              <p style="margin-right: 55%;margin-top:0px;margin-bottom:0px;padding:0px;"> 性别：</p>
              <div style="margin-left: 33%;width: 51%;margin-top: -30px">
                <el-select v-model="value" size="small" style="width:100%;">
                  <el-option v-for="sex in sexs" :key="sex.value" :label="sex.sexname" :value="sex.value"></el-option>
                </el-select>
              </div>

            </div>
            <div class="input">
              年龄：
              <el-input size="mini" v-model="spduser.age" class="password" clearable></el-input>
            </div>
            <div class="button">
              <el-button type="success" round v-on:click="regist">注册</el-button>
              <el-button type="info" round v-on:click="cancle">取消</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "BdiRegist",
    data() {
      return {
        spduser: {
          username: '',
          password: '',
          email: '',
          sex: '',
        },
        sexs: [
          {
            value: '0',
            sexname: '男'
          }, {
            value: '1',
            sexname: '女'
          }
        ], value: ''
      }
    },
    methods: {
      uservility:function(){
        this.$axios.post("http://localhost:8085/verifyExist", this.$qs.stringify({username:this.spduser.username}))
          .then(result => {
            if (result.data.isexist == 'true') {
              alert("用户名可以使用")
            } else {
              alert("用户名已存在！")
            }
          })
      },
      cancle: function () {
        this.$router.replace('/cancle')
      },
      regist: function () {

        this.$axios.post("http://localhost:8085/adduser", this.$qs.stringify({
          username: this.spduser.username,
          password: this.spduser.password,
          email: this.spduser.email,
          age: this.spduser.age,
          sex: this.value
        })).then(Reponse => {
          this.addUserInfo = false;
          let username = Reponse.data.username
          let isadd = Reponse.data.isadd
          if (isadd == 'true') {
            this.$alert("添加成功")
            this.$router.replace("/login")
          } else {
            this.$alert("添加失败")
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 50%;
    margin: 0.8%;
  }

  .el-container {
    width: 60%;
    margin-left: 20%;
  }

  .el-header {
    background-color: #fcd1c7;
    width: 60%;
    margin-left: 20%;
    text-align: center;
    padding-top: 20px;

  }

  .el-main {
    background-color: #fcf2d2;
    width: 100%;
  }

  .password {
    margin-left: 4.7%;
    width: 50%;
    margin-bottom: 5%;
  }

  .button {
    text-align: center;
  }

  .input {
    margin-left: 20%;
  }
</style>
