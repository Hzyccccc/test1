<template>
  <div class="addOrderInfo" id="addOrderInfo">
    <div class="serach-wrap">
      <el-form class="titForm" ref="form" v-model="searchForm" label-width="100px" size="medium">
        <el-form-item label="供应商：" >
          <el-select v-model="supplierId" filterable placeholder="请选择">
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.supplier"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="text" style="margin-left:15px;" @click="addSupplierInfoDialog=true;">添加供应商</el-button>
        <el-form-item label="单据日期：" :title="searchForm.contactName">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="单据编号：" :title="oderNumber">
          <el-input v-model="oderNumber" :disabled="true" placeholder="单据编号"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button type="primary" @click="add">增加</el-button>
      <el-button type="primary">删除</el-button>
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
        <el-table-column prop="DepotName" label="仓库名称"></el-table-column>
        <el-table-column prop="MaterialName" label="品名(型号)(扩展信息)(单位) "></el-table-column>
        <el-table-column prop="Stock" label="库存"></el-table-column>
        <el-table-column prop="Unit" label="单位"></el-table-column>
        <el-table-column prop="OperNumber" label="数量"></el-table-column>
        <el-table-column prop="UnitPrice" label="单价"></el-table-column>
        <el-table-column prop="AllPrice" label="金额"></el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="remarks">
      <el-input type="textarea" placeholder="请输入内容" resize="none" v-model="remarks"></el-input>
    </div>
    <!-- 产品参数相关 -->
    <div class="parameter-wrapper" v-if="false">
        <el-form
          :rules="oderules"
          ref="form"
          v-model="searchForm"
          label-width="110px"
          size="medium"
        >
            <el-form-item label="优惠率：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="退款优惠：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="优惠后金额：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="本次退款：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="结算账户：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="本次欠款：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="采购费用："  :title="searchForm.contactName" prop="contactName">
              <el-input :disabled="true" v-model="searchForm.contactName" placeholder="库存"></el-input>
            </el-form-item>
            <span class="icon iconwenjian"></span>
        </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button>取消</el-button>
    </div>
    <!-- 新增一条数据弹框 -->
    <el-dialog class="oderDialog" title="新增订单信息" :visible.sync="oderDialogVisible">
      <div class="wrap">
        <el-form
          :rules="oderules"
          ref="oderules"
          :model="oderForm"
          label-width="100px"
          size="medium"
        >
          <el-form-item label="仓库名称：" :title="oderForm.MaterialName" prop="DepotId">
            <el-select @change="changeStock(1)" v-model="oderForm.DepotId" filterable placeholder="请选择">
              <el-option
                v-for="item in warehouseList"
                :key="item.id"
                :label="item.depotName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="品名："
            :title="oderForm.MaterialId"
            prop="MaterialId"
          >
            <el-select @change="changeStock(2)" v-model="oderForm.MaterialId" filterable placeholder="请选择">
              <el-option
                v-for="item in commodityList"
                :key="item.Id"
                :label="item.MaterialName"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="form_item">
            <el-form-item label="库存：" :title="oderForm.Stock" prop="Stock">
              <el-input   :disabled="true" v-model="oderForm.Stock" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="单位：" :title="oderForm.Unit" prop="Unit">
              <!-- <el-input  v-model="oderForm.Unit" placeholder="单位"></el-input> -->
              <el-select class="danwei" v-model="oderForm.Unit" filterable placeholder="请选择">
                  <el-option
                    v-for="item in unitList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form_item">
            <el-form-item label="数量：" :title="oderForm.OperNumber" prop="OperNumber">
              <el-input v-model="oderForm.OperNumber" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item label="单价：" :title="oderForm.UnitPrice" prop="UnitPrice">
              <el-input v-model="oderForm.UnitPrice" placeholder></el-input>
            </el-form-item>
          </div>

          <el-form-item label="金额：" :title="oderForm.AllPrice" prop="AllPrice">
            <el-input v-model="oderForm.AllPrice" placeholder="金额"></el-input>
          </el-form-item>
          <el-form-item label="备注：" :title="oderForm.Remark" prop="Remark">
            <el-input type="textarea" v-model="oderForm.Remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('oderules')">确 定</el-button>
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
           <el-form-item style="width:612px;display:block;" label="地址：" :title="searchForm.contactName" prop="contactName">
              <el-input v-model="searchForm.contactName" placeholder="地址"></el-input>
            </el-form-item>
          <el-form-item style="width:612px;display:block;" label="备注：" :title="searchForm.contactName" prop="contactName">
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      supplierId:'',  //供应商id

      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      searchForm: {
        contactName: "1"
      },
      oderForm: {
        DepotId:'',
        DepotName:'',
        MaterialName:'',
        MaterialId:'',
        MType:"",
        Stock:'',
        AnotherDepotId:'',
        Unit:'',
        OperNumber:'',
        UnitPrice:'',
        AllPrice:'',
        Remark:'',

        TaxUnitPrice:'0.00',
        TaxRate:"5",
        TaxMoney:"0.00",
        TaxLastMoney:"0.00",
        OtherField1:"",
        OtherField2:"",
        OtherField3:"",
        OtherField4:"",
        OtherField5:""
      },
      oderules: {
        DepotId: [
          { required: true, message: "请选择仓库名称", trigger: "change" }
        ],
        MaterialId: [
          { required: true, message: "请选择品名", trigger: "change" }
        ],
        Stock: [
          { required: true, message: "请填写库存", trigger: "blur" }
        ],
        Unit: [
          { required: true, message: "请填写单位", trigger: "blur" }
        ],
        OperNumber: [
          { required: true, message: "请填写数量", trigger: "blur" }
        ],
        UnitPrice: [
          { required: true, message: "请填写单价", trigger: "blur" }
        ],
        AllPrice: [
          { required: true, message: "请填写金额", trigger: "blur" }
        ],
      },
      value1: "",
      value: "",
      tableInfo: [],
      tableData: [],
      remarks: "",
      oderDialogVisible: false,
      addSupplierInfoDialog:false,

      oderNumber:'',   //订单编号
      supplierList:[], //供应商list
      commodityList:[],//商品名list
      warehouseList:[],//仓库list

      stockInfo:{},
      unitList:[],
      price:0,  //金额
      oderPrice:0, //合计金额

    };
  },
  computed: {
  
    ...mapState(['user'])
  },
  created() {
    console.log('this.$route.params')
    console.log(this.$route)
    /*订单编号*/
    this.seeOderNumber();
    /*供应商选择下拉框查询接口*/
    this.supplierSelect();
    /*仓库选择下拉框查询接口*/
    this.warehouseSelect();
    /*商品名选择下拉框查询接口*/
    this.commoditySelect();
    
    if(this.$route.params.id) {
       if(this.$route.params.type == 1) {//查看
         console.log(this.$route.params)
       } else if(this.$route.params.type == 2) {
         
       }
    }
  },
  watch:{
    oderDialogVisible() {
      if(!this.oderDialogVisible) {
          this.oderForm = {
            DepotId:'',
            DepotName:'',
            MaterialName:'',
            MaterialId:'',
            MType:"",
            Stock:'',
            AnotherDepotId:'',
            Unit:'',
            OperNumber:'',
            UnitPrice:'',
            AllPrice:'',
            Remark:'',
            TaxUnitPrice:'0.00',
            TaxRate:"5",
            TaxMoney:"0.00",
            TaxLastMoney:"0.00",
            OtherField1:"",
            OtherField2:"",
            OtherField3:"",
            OtherField4:"",
            OtherField5:""
          },
          this.$refs['oderules'].resetFields();
      }
    }
    // tableData:{
    //   handler(newValue, oldValue) {
    //      this.tableData.map((item,index) => {
    //         this.oderPrice = this.oderPrice + parseFloat(item.AllPrice); 
    //      })
    //   },
    //   deep: true
    // }
  },
  methods: {
    getOderPrice(){
       this.oderPrice = 0;
       this.tableData.map((item,index) => {
            this.oderPrice = this.oderPrice + parseFloat(item.AllPrice); 
         })
    },
    /*保存信息 */
    async save() {
       if(!this.supplierId) {
         this.$message.error('请选择供应商');
         return;
       }
       if(!this.tableData.length) {
         this.$message.error('请输入明细信息');
         return;
       }

        let data = {
          info:{
              "Type":"其它",
              "SubType":"采购订单",
              "ProjectId":null,
              "AllocationProjectId":null,
              "DefaultNumber":this.oderNumber,
              "Number":this.oderNumber,
              "LinkNumber":"",
              "OperTime":"2019-08-20 18:21:02",
              "OrganId":this.supplierId,
              "HandsPersonId":"",
              "Salesman":"",
              "AccountId":"",
              "ChangeAmount":0,
              "TotalPrice":0,
              "PayType":"现付",
              "Remark":this.remarks,
              "AccountMoneyList":"",
              "Discount":"",
              "DiscountMoney":"",
              "DiscountLastMoney":"",
              "OtherMoney":""
        },
        inserted:JSON.stringify(this.tableData),
        deleted:JSON.stringify([]),
        updated:JSON.stringify([])
      }
        console.log('上传数据');
        console.log(data);
        await this.$http.post('/depotHead/addDepotHeadAndDetail',data).then(res=>{
            console.log('保存信息');
            console.log(res);
            if(res.code == 200) {
            } 
        })

    },
    changeStock(type) {
      if(this.oderForm.DepotId && this.oderForm.MaterialId ) {
       /*查库存 */
       this.seeStockNumber();
       /*单位 */
       this.seeStockCompany();
      }
      if(type == 1) { //仓库
         this.warehouseList.map((item,index) => {
              if(item.id == this.oderForm.DepotId) {
                this.$set(this.oderForm,'DepotName',item.depotName);
              }   
         })
      } else { //商品名
         this.commodityList.map((item,index) => {
              if(item.Id == this.oderForm.MaterialId) {
                this.$set(this.oderForm,'MaterialName',item.MaterialName);
              }   
         })
      }
    },
     /*新增一条订单信息*/
      submitForm1(formName) {
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.accountCreationBtn()
            let obj = JSON.parse(JSON.stringify(this.oderForm))
            this.tableData.push(obj);
            console.log('this.tableData');
            console.log(this.tableData);
            this.oderDialogVisible = false;
            this.getOderPrice();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    /*供应商选择下拉框查询接口*/
      async supplierSelect() {
        let data = {
          supplierId:'其他'
        }
        await this.$http.post('/supplier/findBySelect_sup',data).then(res=>{
            console.log('供应商选择下拉框查询接口');
            console.log(res);
            if(res.code == 200) {
              this.supplierList = res.data;
            } 
        })
      },
     /*订单编号查询*/
      async seeOderNumber() {
        let data = {
        }
        await this.$http.get('/depotHead/buildNumber',data).then(res=>{
            console.log('订单编号查询');
            console.log(res);
            if(res.code == 200) {
              this.oderNumber = 'CGDD'+res.data.DefaultNumber;
            } 
        })
      },
      /*仓库选择下拉框查询接口*/
      async warehouseSelect() {
        let data = {
          UBType:'UserDepot',
          UBKeyId:this.user.userInfo.id,
        }
        await this.$http.get('/depot/findDepotByUserId',data).then(res=>{
            console.log('仓库选择下拉框查询接口');
            console.log(res);
            if(res.code == 200) {
              this.warehouseList = res.data;
            } 
        })
      },
      /*商品名选择下拉框查询接口*/
      async commoditySelect() {
        let data = {
          mpList:'规格,颜色,制造商,自定义1,自定义2',
        }
        await this.$http.get('/material/findBySelect',data).then(res=>{
            console.log('商品名选择下拉框查询接口');
            console.log(res);
            if(res.code == 200) {
              this.commodityList = res.data;
            } 
        })
      },
      /*根据商品id和仓库id查询库存数量*/
      async seeStockNumber() {
          let now  = new Date();
          let monthn = now.getMonth() + 1;
          let yearn  = now.getFullYear();
          monthn = monthn < 10 ? '0'+monthn : monthn;
          let data = {
            projectId:this.oderForm.DepotId,
            materialId:this.oderForm.MaterialId,
            monthTime:`${yearn}-${monthn}`,
            currentPage:1,
            pageSize:10
        }
        await this.$http.get('/depotItem/findStockNumById',data).then(res=>{
            console.log('根据商品id和仓库id查询库存数量');
            console.log(res);
            if(res.code == 200) {
              this.stockInfo = res.data.page[0];
              // this.$set(this.oderForm,'MaterialId',res.data.page[0].MaterialId);
              this.$set(this.oderForm,'Stock',res.data.page[0].thisSum);
              
            } 
        })
      },
      /*根据商品id和仓库id查询单位*/
      async seeStockCompany() {
          let data = {
            id:this.oderForm.MaterialId,
        }
        await this.$http.get('/material/findById',data).then(res=>{
            console.log('根据商品id和仓库id查询单位');
            console.log(res);
            this.unitList = [];
            if(res.code == 200) {
              if(res.data[0].firstinunit != null) {
                this.unitList.push(res.data[0].firstinunit);
              } else if(res.data[0].firstoutunit != null) {
                this.unitList.push(res.data[0].firstoutunit);
              } else if(res.data[0].unit != '') {
                this.unitList.push(res.data[0].unit);
              }
              this.$set(this.oderForm,'OperNumber',1);
              if(res.data[0].presetpricetwo != null) {
                this.$set(this.oderForm,'UnitPrice',res.data[0].presetpricetwo);
              } else if(res.data[0].presetpriceone != null ) {
                this.$set(this.oderForm,'UnitPrice',res.data[0].presetpriceone);
              } else {
                this.$set(this.oderForm,'UnitPrice',0);
              }

              this.$set(this.oderForm,'otherfield1',res.data[0].otherfield1);
              this.$set(this.oderForm,'otherfield2',res.data[0].otherfield2);
              this.$set(this.oderForm,'otherfield3',res.data[0].otherfield3);
              if(res.data[0].otherfield4) {
                this.$set(this.oderForm,'otherfield4',res.data[0].otherfield4);
              }
              if(res.data[0].otherfield5) {
                this.$set(this.oderForm,'otherfield5',res.data[0].otherfield5);
              }

              this.$set(this.oderForm,'AllPrice',this.oderForm.OperNumber * parseFloat(this.oderForm.UnitPrice));
              // this.stockInfo = res.data.page[0];
              // this.$set(this.oderForm,'MaterialId',res.data.page[0].MaterialId);
              // this.$set(this.oderForm,'Stock',res.data.page[0].thisSum);
            } 
        })
      },
      /*跟据供应商ID查询税率*/
      async seeSuppliertaxRate() {
        let data = {
          id: this.supplierId,
        }
        await this.$http.get('/depot/findDepotByUserId',data).then(res=>{
            console.log('仓库选择下拉框查询接口');
            console.log(res);
            if(res.code == 200) {
              this.warehouseList = res.data;
            } 
        })
      },
      
    /*多选*/
    handleSelectionChange(val) {
      this.tableInfo = val;
    },
    add() {
      this.oderDialogVisible = true;
    },
    getSummaries(param) {
      console.log("param");
      console.log(param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 7) {
          sums[index] = this.oderPrice;
          return;
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  }
};
</script>
<style lang="scss" scoped>
#addOrderInfo {
  margin: 20px;
  background-color: #fff;
  padding: 20px;
  .serach-wrap {
    margin: 20px 0;
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
  .parameter-wrapper {
      margin-top: 20px;
  }
}
</style>

<style lang="scss">
#addOrderInfo {
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
      .danwei {
        width:120px;
      }
    }
}
</style>