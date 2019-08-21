<template>
  <div id="supplier">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="navFrom.supplier"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="navFrom.phonenum"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="navFrom.telephone"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="navFrom.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型：">
           <el-select v-model="navFrom.type" placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="queryFuncBtn">查询</el-button>
          <el-button type="primary" @click="resetFuncBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cont">
      <div class="operation">
        <el-button @click="addType='add';addVisible=true">增加</el-button>
        <el-button @click="removesupplier(2)">删除</el-button>
        <el-button @click="enablesupplier(1)">启用</el-button>
        <el-button @click="enablesupplier(2)">禁用</el-button>
        <el-button @click="dataImport">导入</el-button>
        <el-button @click="dataExport">导出</el-button>
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
                <span class="iconfont iconshanchu" @click="removesupplier(1,scope.row.id)"></span>
                <span class="iconfont iconbianji" @click="addType='edit';editsupplier(scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="手机号码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phonenum"
            label="联系电话"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fax"
            label="传真"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="advancein"
            label="预付款"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="beginneedget"
            label="期初应收"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="beginneedpay"
            label="期初应付"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="allneedget"
            label="期末应收"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="allneedpay"
            label="期末应付"
            show-overflow-tooltip>

          </el-table-column>
          <el-table-column
            prop="taxrate"
            label="税率(%)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="enabled"
            label="状态"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.enabled?'启用':'禁用'}}
            </template>
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
      :title="addType=='add'?'增加供应商信息':'编辑供应商信息'"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="addBox">
        <el-form :inline="true" :rules="rules" ref="addFrom" label-position="right" label-width="120px"
                 :model="addFrom">
          <el-form-item label="名称：" prop="supplier">
            <el-input v-model="addFrom.supplier"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model="addFrom.contacts"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="addFrom.phonenum"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <el-input v-model="addFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="addFrom.telephone"></el-input>
          </el-form-item>
          <el-form-item label="传真：">
            <el-input v-model="addFrom.fax"></el-input>
          </el-form-item>
          <el-form-item label="期初应收：">
            <el-input v-model="addFrom.BeginNeedGet"></el-input>
          </el-form-item>
          <el-form-item label="期初应付：">
            <el-input v-model="addFrom.BeginNeedPay"></el-input>
          </el-form-item>
          <el-form-item label="累计应收：">
            <el-input v-model="addFrom.AllNeedGet"></el-input>
          </el-form-item>
          <el-form-item label="累计应付：">
            <el-input v-model="addFrom.AllNeedPay"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号	：">
            <el-input v-model="addFrom.taxNum"></el-input>
          </el-form-item>
          <el-form-item label="税率(%)：">
            <el-input v-model="addFrom.taxRate"></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="addFrom.bankName"></el-input>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input v-model="addFrom.accountNumber"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="addFrom.address"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="addFrom.description"
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
    name: 'supplier',
    data() {
      return {
        addType: '', //新增(add) ,编辑(edit)
        editInfo: {}, //编辑时候数据暂存
        /*添加弹出框信息*/
        addVisible: false,
        activeIndex: 1,
        addFrom: {
          supplier: '',
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
          type: '供应商',
          enabled: 1
        },
        serialList: [
          {
            id: 1,
            name: '禁用'
          },
          {
            id: 2,
            name: '启用'
          }
        ],
        serialNum: '',
        rules: {
          supplier: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        },

        pageNum: 1,
        pageSize: 10,
        total: 0,
        activeList: [],
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '启用'
        }, {
          value: '3',
          label: '禁用'
        }],
        navFrom: {
          supplier: '',
          type: '供应商',
          phonenum: '',
          telephone: '',
          description: ''
        },
        tableData: [],
        read: '' //导入文件暂存处
      }
    },
    created() {
      this.getsupplierList()
    },
    watch: {
      'addVisible': function() {
        if (!this.addVisible) {
          this.$refs['addFrom'].resetFields()
          this.addFrom = {
            supplier: '',
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
            type: '供应商',
            enabled: 1
          }
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageNum = 1
        this.pageSize = val
        this.getsupplierList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getsupplierList()
        console.log(`当前页: ${val}`)
      },
      /*查询*/
      queryFuncBtn() {
        this.pageNum = 1
        this.getsupplierList()
      },
      /*重置*/
      resetFuncBtn() {
        this.pageNum = 1
        this.pageSize = 10
        this.navFrom = {
          supplier: '',
          type: '',
          phonenum: '',
          telephone: '',
          description: ''
        },
          this.getsupplierList()
      },
      /*查询供应商列表*/
      async getsupplierList() {
        let data = {
          search: JSON.stringify({
            supplier: this.navFrom.supplier,
            type: this.navFrom.type,
            phonenum: this.navFrom.phonenum,
            telephone: this.navFrom.telephone,
            description: this.navFrom.description
          }),
          currentPage: this.pageNum,
          pageSize: this.pageSize
        }
        let res = await this.$http.get('/supplier/list', data)
        if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
          console.log(this.tableData)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*验证新增供应商表单*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.addType == 'add') {
              this.querysupplie()
            } else if (this.addType == 'edit') {
              this.editsupplierFunc()
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
      /*查询是否新增供应商名称是否重复*/
      async querysupplie() {
        let data = {
          id: 0,
          name: this.addFrom.supplier
        }
        let res = await this.$http.get('/supplier/checkIsNameExist', data)
        if (res.code == 200) {
          console.log(res)
          if (!res.data.status) {
            this.addsupplier()
          } else {
            this.$method.message(this, '供应商名称已存在', 500)
          }
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*增加供应商*/
      async addsupplier() {
        let data = {
          info: JSON.stringify({
            supplier: this.addFrom.supplier,
            contacts: this.addFrom.contacts,
            telephone: this.addFrom.telephone,
            email: this.addFrom.email,
            phonenum: this.addFrom.phonenum,
            fax: this.addFrom.fax,
            BeginNeedGet: this.addFrom.BeginNeedGet,
            BeginNeedPay: this.addFrom.BeginNeedPay,
            AllNeedGet: this.addFrom.AllNeedGet,
            AllNeedPay: this.addFrom.AllNeedPay,
            taxNum: this.addFrom.taxNum,
            taxRate: this.addFrom.taxRate,
            bankName: this.addFrom.bankName,
            accountNumber: this.addFrom.accountNumber,
            address: this.addFrom.address,
            description: this.addFrom.description,
            type: this.addFrom.type,
            enabled: 1
          })
        }
        let res = await this.$http.post('/supplier/add', data)
        if (res.code == 200) {
          this.$method.message(this, '新增成功', 200)
          this.getsupplierList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*变换表格选择的数组*/
      handleSelectionChange(val) {
        this.activeList = val
      },
      /*编辑供应商信息*/
      editsupplier(row) {
        this.editInfo = row
        this.addVisible = true
        this.addFrom = {
          supplier: row.supplier,
          contacts: row.contacts,
          telephone: row.telephone,
          email: row.email,
          phonenum: row.phonenum,
          fax: row.fax,
          BeginNeedGet: row.beginneedget,
          BeginNeedPay: row.beginneedpay,
          AllNeedGet: row.allneedget,
          AllNeedPay: row.allneedpay,
          taxNum: row.taxnum,
          taxRate: row.taxrate,
          bankName: row.bankname,
          accountNumber: row.accountnumber,
          address: row.address,
          description: row.description,
          type: '供应商',
          enabled: row.enabled
        }
      },
      /*编辑供应商信息*/
      async editsupplierFunc() {
        let data = {
          info: JSON.stringify({
            supplier: this.addFrom.supplier,
            contacts: this.addFrom.contacts,
            telephone: this.addFrom.telephone,
            email: this.addFrom.email,
            phonenum: this.addFrom.phonenum,
            fax: this.addFrom.fax,
            BeginNeedGet: this.addFrom.BeginNeedGet,
            BeginNeedPay: this.addFrom.BeginNeedPay,
            AllNeedGet: this.addFrom.AllNeedGet,
            AllNeedPay: this.addFrom.AllNeedPay,
            taxNum: this.addFrom.taxNum,
            taxRate: this.addFrom.taxRate,
            bankName: this.addFrom.bankName,
            accountNumber: this.addFrom.accountNumber,
            address: this.addFrom.address,
            description: this.addFrom.description,
            type: this.addFrom.type,
            enabled: 1
          })
        }
        console.log('/supplier/update?id=' + this.editInfo.id)
        let res = await this.$http.post('/supplier/update?id=' + this.editInfo.id, data)
        if (res.code == 200) {
          this.$method.message(this, '编辑成功', 200)
          this.getsupplierList()
          this.addVisible = false
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*删除数组内容
      * type:1 删除单条数据
      * type:2 删除多条数据*/
      async removesupplier(type, id) {
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
          this.defineRemovesupplier(list)
        }).catch(() => {

        })
      },
      /*确定删除*/
      async defineRemovesupplier(list) {
        let data = {
          ids: list.join(',')
        }
        let res = await this.$http.post('/supplier/batchDeleteSupplierByIds', data)
        if (res.code == 200) {
          console.log(res)
          this.getsupplierList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*启用禁用
      * type:1 启用
      * type:2 禁用*/
      async enablesupplier(type) {
        let list = []
        if (!this.activeList.length) {
          this.$method.alertBox(this, '没有记录被选中！')
          return
        }
        this.activeList.map((v) => {
          list.push(v.id)
        })
        this.$confirm(`确定要${type == 1 ? '启用' : '禁用'}选中的${list.length}条信息吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.defineEnablesupplier(list, type)
        }).catch(() => {

        })
      },
      /*确定启用(禁用)
      list: 选中的id数组
      * * type:1 启用
      * type:2 禁用*/
      async defineEnablesupplier(list, type) {
        let data = {
          enabled: type == 1 ? true : false,
          supplierIDs: list.join(',')
        }
        let res = await this.$http.post('/supplier/batchSetEnable', data)
        if (res.code == 200) {
          console.log(res)
          this.getsupplierList()
        } else if (res.code == 601) {
          this.$method.alertBox(this, res.msg)
        } else {
          this.$method.message(this, res.msg, 500)
        }
      },
      /*数据导入*/
      async dataImport() {
        this.$alert('<div id="imporBox">\n' +
          '<div class="file">\n' +
          '<label for="" @click="changeFile">文件名称</label>\n' +
          '<input id="fileBtn" type="file">\n' +
          '</div>\n' +
          '<p class="imporp">导入注意 （预收款、期初应收、期初应付、税率均为数值且要大于0；另外期初应收、期初应付不能同时输入）</p>\n' +
          '</div>', '导入供应商信息', {
          confirmButtonText: '导入',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true,
          customClass: 'imporCont'
        }).then(() => {
          this.dataExportIng()
        }).catch(() => {

        })
        setTimeout(() => {
          let that = this
          document.querySelector('#fileBtn').onchange = function(e) {
            /*上传图片*/
            // 创建文件读取对象
            let reader = new FileReader()
            // 通过当前的file标签 获取选择的文件
            // 调用该对象的方法读取文件 文件
            // 读取文件是一个耗时操作 不一定什么时候读取完毕
            reader.readAsDataURL(e.target.files[0])
            // 添加事件
            // 耗时操作 通过事件的方式进行注册 并且回调
            reader.onload = function() {
              // 使用读取完毕的文件
              //使用返回的结果 即可
              that.read = e.target.files[0]
              console.log(that.read)

              let suffix = that.read.name.split('.')[that.read.name.split('.').length - 1]
              /*let arr = ['png', 'jpg', 'PNG', 'JPG', 'jpeg', 'JPEG', 'bmp', 'BMP', 'webp', 'WEBP']
              if (arr.indexOf(suffix) != -1) {
                that.$message.error('上传图片格式为png、jpg、jpeg、bmp或者webp')
                return
              }*/
              console.log('----------')
            }
          }

        }, 200)
      },
      /*导入接口*/
      async dataExportIng() {
        let that = this
        let data = new FormData()
        data.append('files', that.read)
        let res = await this.$http.filePost('/supplier/importExcelVendor', data)
        if (res.code == 200) {
          this.$method.message(this, '导入成功', 200)
        }
      },
      /*数据导出*/
      async dataExport() {
        let data = {
          supplier: this.navFrom.supplier,
          type: this.navFrom.type,
          phonenum: this.navFrom.phonenum,
          telephone: this.navFrom.telephone,
          description: this.navFrom.description
        }
        let res = await this.$http.filePost('/supplier/exportExcel', data, { 'responseType': 'blob' })
        console.log(res)
        this.$http.exportExcel(res, '信息报表')
      }

    }
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #supplier {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .nav {
      .el-input {
        width: 100px;
      }
    }
    .cont {
      width: 100%;
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
  #supplier {
    .addCont.el-dialog {
      width: 800px;
      .el-form-item:nth-last-child(-n+2) {
        width: 100%;
        .el-input, .el-textarea {
          width: 535px;
        }
      }
      .el-input {
        width: 200px;
      }
    }
  }

  .imporCont {
    .el-message-box__status.el-icon-warning {
      display: none;
    }
    .el-message-box__message {
      padding-left: 10px;
    }
    #imporBox {
      .file {
        margin-bottom: 15px;
        display: flex;
        display: -webkit-box;
        justify-content: flex-start;
        label {
          margin-right: 5px;
        }
        input {
          width: 250px;
        }
      }
    }
  }
</style>
