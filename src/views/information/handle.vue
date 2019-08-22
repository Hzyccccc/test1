<template>
  <div id="handle">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="navFrom.type" placeholder="请选择类型">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="业务员" value="业务员"></el-option>
            <el-option label="仓管员" value="仓管员"></el-option>
            <el-option label="财务员" value="财务员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryFuncBtn">查询</el-button>
          <el-button type="primary" @click="resetFuncBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cont">
      <div class="operation">
        <el-button @click="addType='add';addVisible=true">增加</el-button>
        <el-button @click="removehandle(2)">删除</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="oper">
                <span class="iconfont iconshanchu" @click="removehandle(1,scope.row.id)"></span>
                <span class="iconfont iconbianji" @click="addType='edit';edithandle(scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="addType=='add'?'增加经收人信息':'编辑经收人信息'"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="addBox">
        <el-form :inline="true" :rules="rules" ref="addFrom" label-position="right" label-width="120px"
                 :model="addFrom">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="类型：" prop="type">
            <el-select v-model="addFrom.type" placeholder="请选择类型">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="业务员" value="业务员"></el-option>
              <el-option label="仓管员" value="仓管员"></el-option>
              <el-option label="财务员" value="财务员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="resetForm('addFrom')">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'handle',
    data() {
      return {
        addType: '', //新增(add) ,编辑(edit)
        editInfo: {}, //编辑时候数据暂存
        /*添加弹出框信息*/
        addVisible: false,
        activeIndex: 1,
        addFrom: {},
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入选择类型', trigger: 'change' }
          ]
        },

        pageNum: 1,
        pageSize: 10,
        total: 0,
        navFrom: {
          name: '',
          type: '全部'
        },
        tableData: []
      }
    },
    created() {
      this.gethandleList()
    },
    watch: {
      'addVisible': function() {
        if (!this.addVisible) {
          this.$refs['addFrom'].resetFields()
          this.addFrom = {
            handle: '',
            contacts: '',
            telephone: '',
            email: '',
            phonenum: '',
            fax: '',
            BeginNeedGet: '',
            BeginNeedPay: '',
            AllNeedGet: '',
            AllNeedPay: '',
            taxNum: '',
            taxRate: '',
            bankName: '',
            accountNumber: '',
            address: '',
            description: '',
            type: '经手人',
            enabled: 1
          }
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageNum = 1
        this.pageSize = val
        this.gethandleList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.gethandleList()
        console.log(`当前页: ${val}`)
      },
      /*变换表格选择的数组*/
      handleSelectionChange(val) {
        this.activeList = val
      },
      /*查询经手人列表*/
      async gethandleList() {
        let data = {
          search: JSON.stringify({
            name: this.navFrom.name,
            type: this.navFrom.type == '全部' ? '' : this.navFrom.type
          }),
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
        let res = await this.$http.get('/person/list', data)
        if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
          console.log(this.tableData)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*查询*/
      queryFuncBtn() {
        this.pageNum = 1
        this.gethandleList()
      },
      /*重置*/
      resetFuncBtn() {
        this.pageNum = 1
        this.pageSize = 10
        this.navFrom = {
          name: '',
          type: '全部'
        },
          this.gethandleList()
      },
      /*验证新增经手人表单*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addType == 'add') {
              this.addhandle()
            } else if (this.addType == 'edit') {
              this.edithandleFunc()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /*重置新增经手人表单*/
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.addVisible = false
      },
      /*增加经手人*/
      async addhandle() {
        let data = {
          info: JSON.stringify({
            Name: this.addFrom.name,
            Type: this.addFrom.type
          })
        }
        let res = await this.$http.post('/person/add', data)
        if (res.code == 200) {
          this.$method.message(this, '新增成功', 200)
          this.gethandleList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*编辑经手人信息*/
      edithandle(row) {
        console.log(row)
        this.editInfo = row
        this.addVisible = true
        this.addFrom = {
          name: row.name,
          type: row.type
        }
      },
      /*编辑经手人信息*/
      async edithandleFunc() {
        let data = {
          info: JSON.stringify({
            Name: this.addFrom.name,
            Type: this.addFrom.type
          })
        }
        let res = await this.$http.post('/person/update?id=' + this.editInfo.id, data)
        if (res.code == 200) {
          this.$method.message(this, '编辑成功', 200)
          this.gethandleList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*删除数组内容
      * type:1 删除单条数据
      * type:2 删除多条数据*/
      async removehandle(type, id) {
        let list = []
        if (type == 1) {
          list.push(id)
        } else if (type == 2) {
          if (!this.activeList.length) {
            this.$method.alertBox(this, '没有记录被选中！')
            return
          }
          this.activeList.map((v) => {
            list.push(v.id)
          })
        }
        this.$confirm(type == 1 ? '确定要删除此条信息吗？' : `确定要删除选中的${list.length}条信息吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.defineRemovehandle(list)
        }).catch(() => {

        })
      },
      /*确定删除*/
      async defineRemovehandle(list) {
        let data = {
          ids: list.join(',')
        }
        let res = await this.$http.post('/person/batchDeletePersonByIds', data)
        if (res.code == 200) {
          console.log(res)
          this.gethandleList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      }
    }
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #handle {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .nav {
      .el-input {
        width: 100px;
      }
    }
    .operation {
      margin-bottom: 20px;
    }
    .table {
      .oper {
        .iconfont {
          font-size: 16px;
          color: #409EFF;
          cursor: pointer;
          margin: 0 5px;
        }
      }
    }
    .addCont {
      width: 600px;
      .tab {
        margin-bottom: 20px;
      }
      .btn {
        text-align: center;
      }

    }
  }
</style>
<style lang="scss" type="text/scss">
  #handle {
    .nav {
      .el-input {
        width: 120px;
      }
    }
    .addCont.el-dialog {
      width: 600px;
      .el-form-item:nth-last-child(-n+2) {
        width: 100%;
      }
      .el-input {
        width: 400px;
      }
      .el-textarea {
        width: 400px;
      }
    }
  }
</style>
