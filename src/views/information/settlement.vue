<template>
  <div id="settlement">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
          <el-input v-model="navFrom.serialNo"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="navFrom.remark"></el-input>
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
        <el-button @click="removesettlement(2)">删除</el-button>
        <el-button @click="defineEnablewarehouse">设为默认</el-button>
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
                <span class="iconfont icon00743" @click="documentsInfo=scope.row;detailsDocuments()"></span>
                <span class="iconfont iconshanchu" @click="removesettlement(1,scope.row.id)"></span>
                <span class="iconfont iconbianji" @click="addType='edit';editsettlement(scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="serialno"
            label="编号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="initialamount"
            label="期初金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="currentamount"
            label="当前余额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否默认"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.isdefault?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
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
      :title="addType=='add'?'增加结算账户':'编辑结算账户'"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="addBox">
        <el-form :inline="true" :rules="rules" ref="addFrom" label-position="right" label-width="120px"
                 :model="addFrom">
          <el-form-item label="名　　称：" prop="name">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="编　　号：" prop="serialNo">
            <el-input v-model="addFrom.serialNo"></el-input>
          </el-form-item>
          <el-form-item label="期初金额：">
            <el-input v-model="addFrom.initialAmount"></el-input>
          </el-form-item>
          <el-form-item label="当前余额：">
            <el-input v-model="addFrom.currentAmount" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="备　　注：">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="addFrom.remark"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="resetForm('addFrom')">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="查看账户流水"
      :visible.sync="detailsVisible"
      center>
      <el-table :data="documentsList">
        <el-table-column property="number" label="单据编号"></el-table-column>
        <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column property="supplierName" label="单位信息"></el-table-column>
        <el-table-column property="changeAmount" label="金额"></el-table-column>
        <el-table-column property="balance" label="余额"></el-table-column>
        <el-table-column property="operTime" label="入库出库日期"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-size="pageSize1"
          :current-page.sync="pageNum1"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'settlement',
    data() {
      return {
        addType: '', //新增(add) ,编辑(edit)
        editInfo: {}, //编辑时候数据暂存
        /*单据明细弹框*/
        documentsInfo:{},
        detailsVisible: false,
        pageNum1: 1,
        pageSize1: 5,
        total1: 0,
        documentsList: [],

        /*添加弹出框信息*/
        addVisible: false,
        activeIndex: 1,
        addFrom: {
          name: '',
          serialNo: '',
          initialAmount: '',
          currentAmount: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          serialNo: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        },

        pageNum: 1,
        pageSize: 10,
        total: 0,
        navFrom: {
          serialNo: '',
          name: '',
          remark: ''
        },
        tableData: []
      }
    },
    created() {
      this.getsettlementList()
    },
    watch: {
      'addVisible': function() {
        if (!this.addVisible) {
          this.$refs['addFrom'].resetFields()
          this.addFrom = {
            name: '',
            serialNo: '',
            initialAmount: '',
            currentAmount: '',
            remark: ''
          }
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageNum = 1
        this.pageSize = val
        this.getsettlementList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getsettlementList()
        console.log(`当前页: ${val}`)
      },
      handleSizeChange1(val) {
        this.pageNum1 = 1
        this.pageSize1 = val
        this.detailsDocuments()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange1(val) {
        this.pageNum1 = val
        this.detailsDocuments()
        console.log(`当前页: ${val}`)
      },
      /*变换表格选择的数组*/
      handleSelectionChange(val) {
        this.activeList = val
      },
      /*查询结算列表*/
      async getsettlementList() {
        let data = {
          search: JSON.stringify({
            serialNo: this.navFrom.serialNo,
            name: this.navFrom.name,
            remark: this.navFrom.remark
          }),
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
        let res = await this.$http.get('/account/list', data)
        if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*查询*/
      queryFuncBtn() {
        this.pageNum = 1
        this.getsettlementList()
      },
      /*重置*/
      resetFuncBtn() {
        this.pageNum = 1
        this.pageSize = 10
        this.navFrom = {
          settlement: '',
          type: '',
          phonenum: '',
          telephone: '',
          description: ''
        },
          this.getsettlementList()
      },
      /*验证新增结算表单*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addType == 'add') {
              this.querysupplie()
            } else if (this.addType == 'edit') {
              this.editsettlementFunc()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /*重置新增结算表单*/
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.addVisible = false
      },
      /*查询是否新增结算名称是否重复*/
      async querysupplie() {
        let data = {
          id: 0,
          name: this.addFrom.name
        }
        let res = await this.$http.get('/account/checkIsNameExist', data)
        if (res.code == 200) {
          console.log(res)
          if (!res.data.status) {
            this.addsettlement()
          } else {
            this.$method.message(this, '结算账户名称已经存在', 500)
          }
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*增加结算*/
      async addsettlement() {
        let data = {
          info: JSON.stringify({
            name: this.addFrom.name,
            serialNo: this.addFrom.serialNo,
            initialAmount: this.addFrom.initialAmount,
            currentAmount: this.addFrom.currentAmount,
            remark: this.addFrom.remark
          })
        }
        let res = await this.$http.post('/account/add', data)
        if (res.code == 200) {
          this.$method.message(this, '新增成功', 200)
          this.getsettlementList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*编辑结算信息*/
      editsettlement(row) {
        this.editInfo = row
        this.addVisible = true
        this.addFrom = {
          name: row.name,
          serialNo: row.serialno,
          initialAmount: row.initialamount,
          currentAmount: row.currentamount,
          remark: row.remark
        }
      },
      /*编辑结算信息*/
      async editsettlementFunc() {
        let data = {
          info: JSON.stringify({
            name: this.addFrom.name,
            serialNo: this.addFrom.serialNo,
            initialAmount: this.addFrom.initialAmount,
            currentAmount: this.addFrom.currentAmount,
            remark: this.addFrom.remarkrrentamount,
            remark: this.addFrom.remark
          })
        }
        console.log('/account/update?id=' + this.editInfo.id)
        let res = await this.$http.post('/account/update?id=' + this.editInfo.id, data)
        if (res.code == 200) {
          this.$method.message(this, '编辑成功', 200)
          this.getsettlementList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*删除数组内容
      * type:1 删除单条数据
      * type:2 删除多条数据*/
      async removesettlement(type, id) {
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
          this.defineRemovesettlement(list)
        }).catch(() => {

        })
      },
      /*确定删除*/
      async defineRemovesettlement(list) {
        let data = {
          ids: list.join(',')
        }
        let res = await this.$http.post('/account/batchDeleteAccountByIds', data)
        if (res.code == 200) {
          console.log(res)
          this.getsettlementList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*设置默认*/
      async defineEnablewarehouse() {
        if (!this.activeList.length) {
          this.$method.alertBox(this, '没有记录被选中！')
          return
        }
        if (this.activeList.length > 1) {
          this.$method.alertBox(this, '不可以选择多条！')
          return
        }
        let list = []
        this.activeList.map((v) => {
          list.push(v.id)
        })
        let data = {
          accountId: list.join(','),
          isDefault: true
        }
        let res = await this.$http.post('/account/updateAmountIsDefault', data)
        if (res.code == 200) {
          this.getsettlementList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*查询单据明细*/
      async detailsDocuments() {
        let data = {
          currentPage: this.pageNum1,
          pageSize: this.pageSize1,
          accountId: this.documentsInfo.id,
          initialAmount: this.documentsInfo.initialamount
        }
        let res = await this.$http.get('/account/findAccountInOutList', data)
        if (res.code == 200) {
          this.total1 = res.data.total
          this.documentsList = res.data.rows

          this.detailsVisible = true

          // this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      }
    }
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #settlement {
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
  #settlement {
    .nav {
      .el-input {
        width: 100px;
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
