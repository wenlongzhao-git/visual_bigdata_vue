<template>
  <div style="margin-top: 15%;background-color: #fcb59c">
    <el-container>
      <el-header>注册</el-header>
      <el-container>
        <el-main>
          <div>
            <div class="input">
              用户名：
              <el-input size="mini" v-model="spduser.username" clearable></el-input>
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
    name: "BlogRegist",
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
      /*vility: function () {
        //后台验证当前用户名是否存在
        this.$axios.get('/regist/' + this.username
        ).then(successResponse => {
          if (successResponse.data.code === 400) {
            this.$alert(successResponse.data.message)
          } else {
          }
        })
      },*/
      cancle: function () {
        this.$router.replace('/cancle')
      },
      regist: function () {
        this.$axios.post("/regist/addRegistInfo", {
          username: this.spduser.username,
          password: this.spduser.password,
          email: this.spduser.email,
          age: this.spduser.age,
          sex: this.value
        }).then(Reponse => {
          if (Reponse.data.code == 200) {
            this.$message({
              message: Reponse.data.message,
              type: 'success'
            });
            this.$router.replace("/login")

          } else {
            this.$alert(Reponse.data.message);
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
