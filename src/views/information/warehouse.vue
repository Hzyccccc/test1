<template>
  <div id="warehouse">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="仓库名称：">
          <el-input v-model="navFrom.name"></el-input>
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
        <el-button @click="removewarehouse(2)">删除</el-button>
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
                <span class="iconfont iconshanchu" @click="removewarehouse(1,scope.row.id)"></span>
                <span class="iconfont iconbianji" @click="addType='edit';editwarehouse(scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="仓库名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓库地址"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="warehousing"
            label="仓储费"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="truckage"
            label="搬运费"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="principalName"
            label="负责人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="isDefault"
            label="是否默认"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.isDefault?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="描述"
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
    <el-dialog :title="addType=='add'?'增加仓库信息':'编辑仓库信息'"
               :visible.sync="addVisible"
               custom-class="addCont"
               center>
      <el-dialog
        width="30%"
        title="负责人选择"
        :visible.sync="chargeVisible"
        append-to-body>
        <div class="chargeBox">
          <el-tree :data="chargeData" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
        </div>
      </el-dialog>
      <div class="addBox">
        <el-form :inline="true" :rules="rules" ref="addFrom" label-position="right" label-width="120px"
                 :model="addFrom">
          <el-form-item label="仓库名称：" prop="name">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址	：">
            <el-input v-model="addFrom.address"></el-input>
          </el-form-item>
          <el-form-item label="仓储费：">
            <el-input v-model="addFrom.warehousing"></el-input>
          </el-form-item>
          <el-form-item label="搬运费：">
            <el-input v-model="addFrom.truckage"></el-input>
          </el-form-item>
          <el-form-item label="负责人：">
            <div class="charge">
              <el-input v-model="addFrom.principalName"></el-input>
              <span @click="chargeVisible=true" class="iconfont iconsearch">查询</span>
            </div>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="addFrom.sort"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
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
  </div>
</template>

<script>
  export default {
    name: 'warehouse',
    data() {
      return {
        addType: '', //新增(add) ,编辑(edit)
        editInfo: {}, //编辑时候数据暂存
        /*添加弹出框信息*/
        addVisible: false,
        chargeVisible: false,
        activeIndex: 1,
        addFrom: {
          name: '',
          address: '',
          warehousing: '0',
          truckage: '',
          principalName: '',
          principal: '',
          selectType: '',
          sort: '',
          remark: '',
          type: 0
        },
        rules: {
          name: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        },
        chargeData: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        storagechargeInfo: '',
        activechargeInfo: {},

        pageNum: 1,
        pageSize: 10,
        total: 0,
        navFrom: {
          name: '',
          type: 0,
          remark: ''
        },
        tableData: [],
        activeList: []
      }
    },
    created() {
      this.getwarehouseList()
      this.getPersonCharge()
    },
    watch: {
      'addVisible': function() {
        if (!this.addVisible) {
          this.$refs['addFrom'].resetFields()
          this.addFrom = {
            name: '',
            address: '',
            warehousing: '',
            truckage: '',
            principalName: '',
            principal: '',
            selectType: '',
            sort: '',
            remark: '',
            type: 0
          }
        }
      },
      'storagechargeInfo': function() {
        setTimeout(() => {
          this.storagechargeInfo = ''
        }, 500)
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageNum = 1
        this.pageSize = val
        this.getwarehouseList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getwarehouseList()
        console.log(`当前页: ${val}`)
      },
      /*查询*/
      queryFuncBtn() {
        this.pageNum = 1
        this.getwarehouseList()
      },
      /*重置*/
      resetFuncBtn() {
        this.pageNum = 1
        this.pageSize = 10
        this.navFrom = {
          warehouse: '',
          type: '',
          phonenum: '',
          telephone: '',
          description: ''
        },
          this.getwarehouseList()
      },
      /*变换表格选择的数组*/
      handleSelectionChange(val) {
        this.activeList = val
      },
      /*查询供应商列表*/
      async getwarehouseList() {
        let data = {
          search: JSON.stringify({ name: this.navFrom.name, type: this.navFrom.type, remark: this.navFrom.remark }),
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
        let res = await this.$http.get('/depot/getDepotList', data)
        if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
          console.log(this.tableData)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*删除数组内容
      * type:1 删除单条数据
      * type:2 删除多条数据*/
      async removewarehouse(type, id) {
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
          this.defineRemovewarehouse(list)
        }).catch(() => {

        })
      },
      /*确定删除*/
      async defineRemovewarehouse(list) {
        let data = {
          ids: list.join(','),
          deleteType: 1
        }
        let res = await this.$http.post('/depot/batchDeleteDepotByIds', data)
        if (res.code == 200) {
          console.log(res)
          this.getwarehouseList()
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
          depotID: list.join(','),
          isDefault: true
        }
        let res = await this.$http.post('/depot/updateDepotIsDefault', data)
        if (res.code == 200) {
          this.getwarehouseList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*验证新增供应商表单*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addType == 'add') {
              this.addwarehouse()
            } else if (this.addType == 'edit') {
              this.editwarehouseFunc()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /*重置新增供应商表单*/
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.addVisible = false
      },
      /*增加供应商*/
      async addwarehouse() {
        let data = {
          info: JSON.stringify({
            name: this.addFrom.name,
            address: this.addFrom.address,
            warehousing: this.addFrom.warehousing,
            truckage: this.addFrom.truckage,
            principalName: this.addFrom.principalName,
            principal: this.addFrom.principal,
            selectType: this.addFrom.selectType,
            sort: this.addFrom.sort,
            remark: this.addFrom.remark,
            type: this.addFrom.type
          })
        }
        let res = await this.$http.post('/depot/add', data)
        if (res.code == 200) {
          this.$method.message(this, '新增成功', 200)
          this.getwarehouseList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*编辑供应商信息*/
      editwarehouse(row) {
        this.editInfo = row
        this.addVisible = true
        this.addFrom = {
          name: row.name,
          address: row.address,
          warehousing: row.warehousing,
          truckage: row.truckage,
          principalName: row.principalName,
          principal: row.principal,
          selectType: row.selectType,
          sort: row.sort,
          remark: row.remark,
          type: 0
        }
      },
      /*编辑供应商信息*/
      async editwarehouseFunc() {
        let data = {
          info: JSON.stringify({
            name: this.addFrom.name,
            address: this.addFrom.address,
            warehousing: this.addFrom.warehousing,
            truckage: this.addFrom.truckage,
            principalName: this.addFrom.principalName,
            principal: this.addFrom.principal,
            selectType: this.addFrom.selectType,
            sort: this.addFrom.sort,
            remark: this.addFrom.remark,
            type: this.addFrom.type
          })
        }
        let res = await this.$http.post('/depot/update?id=' + this.editInfo.id, data)
        if (res.code == 200) {
          this.$method.message(this, '编辑成功', 200)
          this.getwarehouseList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*获取负责人的层级数组*/
      async getPersonCharge() {
        let data = {
          search: JSON.stringify({ name: this.navFrom.name, type: this.navFrom.type, remark: this.navFrom.remark }),
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
        let res = await this.$http.get('/user/getOrganizationUserTree', data)
        console.log(res)
        this.chargeData = res
        /*if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
          console.log(this.tableData)
        } else {
          this.$method.message(this, res.msg, 500)
        }*/
      },
      /*选择节点*/
      handleNodeClick(data) {
        console.log(data)
        if (this.storagechargeInfo && data.iconCls == 'icon-user') {
          this.activechargeInfo = data
          this.addFrom.principalName = data.text
          this.addFrom.principal = data.id

          this.chargeVisible = false
        }
        this.storagechargeInfo = data
      }
    }
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #warehouse {
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
        span {
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
  #warehouse {
    .addCont.el-dialog {
      width: 600px;
      .charge {
        width: 400px;
        display: flex;
        display: -webkit-box;
        justify-content: flex-start;
        .el-input {
          width: 350px;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
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
