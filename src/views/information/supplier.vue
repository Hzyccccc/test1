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
        <el-button @click="addVisible=true">增加</el-button>
        <el-button>删除</el-button>
        <el-button>启用</el-button>
        <el-button>禁用</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="oper">
                <span class="iconfont iconshanchu"></span>
                <span class="iconfont iconbianji"></span>
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
        @size-change=""
        @current-change=""
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="增加供应商信息"
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
        /*添加弹出框信息*/
        addVisible: false,
        activeIndex: 1,
        addFrom: {
          supplier: '杜远天供应商名称',
          contacts: '杜远天联系人',
          telephone: '18672093059',
          email: '3179082@qq.com',
          phonenum: '18672093059',
          fax: '021333222',
          BeginNeedGet: '100',
          BeginNeedPay: '8888.00',
          AllNeedGet: '300',
          AllNeedPay: '8',
          taxNum: '123123123',
          taxRate: '30',
          bankName: '湖北省关山大道渣打支行',
          accountNumber: '42044442032332',
          address: '湖北省关山大道光谷创意大厦1302室',
          description: '杜远天供应商备注',
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
        pageSize: 15,
        total: 0,
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
        tableData: []
      }
    },
    created() {
      this.getsupplierList()
    },
    methods: {
      /*查询*/
      queryFuncBtn() {
        this.pageNum = 1
        this.pageSize = 15
        this.getsupplierList()
      },
      /*重置*/
      resetFuncBtn() {
        this.pageNum = 1
        this.pageSize = 15
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
          currentPage: 1,
          pageSize: 10
        }
        let res = await this.$http.get('/supplier/list', data)
        if (res.code == 200) {
          this.total = res.data.page.total
          this.tableData = res.data.page.rows
          console.log(this.tableData)
        } else {

        }
      },
      /*验证新增供应商表单*/
      submitForm(formName) {
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.querysupplie()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /*重置新增供应商表单*/
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
          if (res.status) {
            this.addsupplier()
          } else {
            
          }
        } else {

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
          console.log(res)
        } else {

        }
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
</style>
