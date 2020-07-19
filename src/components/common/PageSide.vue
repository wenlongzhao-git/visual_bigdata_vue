<template>
  <el-container>
    <el-aside width="1080px" >
      <el-table border :data="dataTable" :row-class-name="changeRowColor" max-height="550"
                @sort-change="changeSort" >
        <el-table-column fixed type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓名：" style="margin-top: -20px">
                <span >{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="年龄：">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.cjsj }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column fixed sortable label="序号" type="index" width="80px"></el-table-column>
        <el-table-column sortable label="账号" prop="username" width="150px">
          <template slot-scope="users">
            <el-popover trigger="hover" placement="right">
              <p>账号：{{users.row.username}}</p>
              <p>性别：{{users.row.sex}}</p>
              <p>年龄：{{users.row.age}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="success">{{users.row.username }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column sortable label="密码" prop="password" width="150px"></el-table-column>
        <el-table-column sortable label="电子邮箱" prop="email" width="160px"></el-table-column>
        <el-table-column sortable label="年龄" prop="age"></el-table-column>
        <el-table-column sortable label="性别" prop="sex">

        </el-table-column>
        <el-table-column sortable label="创建时间" prop="cjsj" width="160px"></el-table-column>
        <el-table-column sortable label="修改时间" prop="xgsj" width="150px"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit"
                       @click="updateUserInfo(scope.$index,scope.row)"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" style="float: right"
                       @click="deleteUserInfo(scope.$index,scope.row,dataTable)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑用户信息" :visible="editstudentForm" :modal-append-to-body='false' :before-close="closeDialog">
        <el-form ref="editsForm" :model="editsForm" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="editsForm.username" max-length="10" disabled size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editsForm.password" disabled size="small"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="editsForm.age" size="small"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select style="margin-left: 0px;float: left" v-model="value">
              <el-option v-for="sex in sexs" :value="sex.value" :key="sex.value" :label="sex.sexname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editsForm.email" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userInfoEdit()">确定</el-button>
            <el-button @click="editstudentForm = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-aside>
  </el-container>

</template>

<script >
  export default {
    name: "PageSide",
    props: {
      datas: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        dataTable: this.datas,
        editstudentForm: false,
        editsForm: {
          username: '',
          password: '',
          age: '',
          sex: '',
          email: ''
        },
        sexs: this.GLOBAL.sexs,
        value: ''
      }
    },
    methods: {
      changeRowColor: function ({row, rowIndex}) {
        if ((rowIndex % 2) == 0) {
          return 'success-row';
        } else {
          return 'warning-row';
        }
      },
      updateUserInfo: function (index, row) {
        if (row.sex === '男') {
          this.value = '0';
        } else if (row.sex === '女') {
          this.value = '1'
        }
        row.sex = this.value;
        //跳转到更新页
        this.editstudentForm = true;

        this.editsForm = row

      },
      deleteUserInfo: function (index, rowinfo, dataTable) {
        this.$alert('您确定删除用户名为【' + rowinfo.username + "】的用户信息吗？删除之后将不可恢复", '删除用户信息', {
          confirmButtonText: '确定',
          callback: action => {
            //向后台发送请求
            this.$axios.delete('/user/delete/' + rowinfo.id, {
              params: {}
            }).then(response => {
              if (response.data.code == 200) {
                //注意此处的index的值并不对应数组中的下标，这与排序方式有关，可以使用下面的方法来实现页面的动态更新，但为了有更好的适用性，建议用第二种方式
                //第一种方式
                /* index = dataTable.length - index - 1;*/
                //第二种方式
                for (var i = 0; i < dataTable.length; i++) {
                  if (dataTable[i].id == rowinfo.id) { //寻找指定数据的索引
                    index = i;
                    break;
                  }
                }
                dataTable.splice(index, 1)
                this.$message({
                  message: response.data.message,
                  type: 'success'
                })
              } else {
                this.$message(response.data.message)
              }
            })
          }
        });
      },
      userInfoEdit: function () {
        this.editsForm.sex = this.value
        //提交后台进行修改
        this.$axios.put("/user/update", this.editsForm).then(reponse => {
          if (reponse.data.code == 200) {
            if (this.editsForm.sex == 0) {
              this.editsForm.sex = '男'
            } else if (this.editsForm.sex == 1) {
              this.editsForm.sex = '女'
            }
            this.$message({
              message: reponse.data.message,
              type: 'success'
            });
          } else {
            this.$message({
              message: reponse.data.message,
              type: 'warning'
            });
          }
          this.editstudentForm = false;
        })
      },
      closeDialog: function () {
        this.editstudentForm = false;
      },
      changeSort: function (column, order, prop) {
        this.sortPros = {prop: 'cjsj', order: 'descending'}
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    margin-top: 1.7%;
    margin-left: 16%;
    margin-bottom: 3%;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    margin-top: -20px;
  }

  .demo-table-expand .el-form-item {
    margin-right: -10%;
    width: 50%;
    height: 30px;
    margin-bottom: 0px;
  }
</style>
