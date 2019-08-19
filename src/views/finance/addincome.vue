<template>
  <div class="addincome" id="addincome">
    <div class="serach-wrap">
      <el-form class="titForm" ref="form" v-model="searchForm" label-width="100px" size="medium">
        <el-form-item label="往来单位：" :title="searchForm.contactName">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="	经手人：" :title="searchForm.contactName">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据日期：" :title="searchForm.contactName">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="单据编号：" :title="searchForm.contactName">
          <el-input v-model="searchForm.contactName" :disabled="true" placeholder="单据编号"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button @click="add">增加</el-button>
      <el-button>删除</el-button>
      <el-button>撤销</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        show-summary
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="收入项目"></el-table-column>
        <el-table-column prop="address" label="金额"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="remarks">
      <el-input type="textarea" placeholder="请输入内容" resize="none" v-model="remarks"></el-input>
    </div>
    <div class="parameter-wrapper">
      <el-form
        label-position="left"
        :rules="oderules"
        ref="form"
        v-model="accountForm"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="收款账户：" :title="searchForm.contactName">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额：" :title="searchForm.contactName">
         <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </div>
    <!-- 新增数据弹框 -->
    <el-dialog class="oderDialog" title="新增订单信息" :visible.sync="oderDialogVisible">
      <div class="wrap">
        <el-form
          :rules="oderules"
          ref="form"
          v-model="searchForm"
          label-width="100px"
          size="medium"
        >
          <el-form-item label="收入项目：" :title="searchForm.contactName" prop="contactName">
            <el-select v-model="value" filterable placeholder="请选择">
              <el-input></el-input>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="金额："
            :title="searchForm.contactName"
            prop="contactName"
          >
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="备注：" :title="searchForm.contactName" prop="contactName">
            <el-input type="textarea" v-model="searchForm.contactName" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="oderDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加供应商弹框 -->
    <el-dialog class="addSupplierInfo" title="增加供应商信息" :visible.sync="addSupplierInfoDialog">
      <div class="wrap">
        <el-form
          :rules="oderules"
          ref="form"
          v-model="searchForm"
          label-width="120px"
          size="medium"
        >
          <div class="form_item">
            <el-form-item label="名称：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="单位"></el-input>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="手机号码：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder></el-input>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="联系电话：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="传真：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder></el-input>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="初期应收：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="初期应付：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder></el-input>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="纳税人识别号：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="税率(%)：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder></el-input>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="开户行：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="账号：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder></el-input>
            </el-form-item>
          </div>
          <el-form-item style="width:612px;display:block;" label="地址：" :title="searchForm.contactName"
                        prop="contactName">
            <el-input v-model="searchForm.contactName" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item style="width:612px;display:block;" label="备注：" :title="searchForm.contactName"
                        prop="contactName">
            <el-input v-model="searchForm.contactName" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSupplierInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSupplierInfoDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        searchForm:{
          contactName: '1'
        },
        accountForm: {
          contactName: '1'
        },
        oderhForm: {},
        oderules: {
          contactName: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        },
        value1: '',
        value: '',
        tableInfo: [],
        tableData: [],
        remarks: '',
        oderDialogVisible: false,
        addSupplierInfoDialog: false
      }
    },
    methods: {
      /*多选*/
      handleSelectionChange(val) {
        this.tableInfo = val
      },
      add() {
        this.oderDialogVisible = true
      },
      getSummaries(param) {
        console.log('param')
        console.log(param)
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          } else if (index === 4) {
            sums[index] = 0
            return
          } else {
            sums[index] = ''
          }
        })

        return sums
      }
    }
  }
</script>
<style lang="scss" scoped>
  #addincome {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .serach-wrap {
      margin: 20px 0;
      .el-input,.el-select{
        width: 120px;
      }
    }
    .operation {
      margin-bottom: 20px;
    }
    .remarks {
      margin-top: 10px;
    }
    .btn {
      margin-top: 20px;
    }
    .parameter-wrapper{
      margin-top: 20px;
    }
  }
</style>

<style lang="scss">
  #addincome{
    .parameter-wrapper .el-form-item {
      margin-right: 20px;
    }
    .el-dialog__header {
      background-color: #ddd;
    }

    .el-form-item {
      display: inline-block;
    }

    .oderDialog {
      .el-dialog {
        width: 500px;
      }
      .el-select {
        width: 344px;
      }
      .el-input {
        width: 344px;
      }
      .el-textarea__inner {
        width: 344px;
      }
      .form_item {
        .el-input {
          width: 120px;
        }
      }
      .el-dialog__footer {
        text-align: center;
      }
    }
  }

</style>
