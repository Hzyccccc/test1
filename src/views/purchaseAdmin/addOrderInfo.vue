<template>
  <div class="addOrderInfo" id="addOrderInfo">
    <div class="serach-wrap">
      <el-form class="titForm" ref="form" v-model="searchForm" label-width="100px" size="medium">
        <el-form-item label="供应商：" >
          <el-select :disabled="typeStatus == 1" v-model="supplierId" filterable placeholder="请选择">
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.supplier"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="text" style="margin-left:15px;" @click="addSupplierInfoDialog=true;" v-if="typeStatus != 1">添加供应商</el-button>
        <el-form-item label="单据日期：" :title="searchForm.contactName">
          <el-date-picker :disabled="typeStatus == 1" v-model="dataPicker" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="单据编号：" :title="oderNumber">
          <el-input v-model="oderNumber" :disabled="true" placeholder="单据编号"></el-input>
        </el-form-item>
         <el-form-item label="关联订单：" :title="linknumber">
          <el-input v-model="linknumber" :disabled="true" placeholder="关联订单"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button type="primary" @click="add" v-if="typeStatus != 1">增加</el-button>
      <el-button type="primary" v-if="typeStatus != 1" @click="remove">删除</el-button>
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
        <el-table-column v-if="typeStatus != 1" prop="date" label="操作" width="55">
            <template slot-scope="scope">
              <el-button type="text" @click="editDetails(scope.row,scope.$index)">编辑</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="DepotName" label="仓库名称"></el-table-column>
        <el-table-column prop="MaterialName" label="品名(型号)(扩展信息)(单位) " width="210">
          <template slot-scope="scope">
            <span
              v-if="scope.row.MaterialName && scope.row.MaterialName.length<=10">{{scope.row.MaterialName}}</span>
            <el-popover
              v-else
              placement="bottom"
              trigger="hover"
              :content="scope.row.MaterialName?scope.row.MaterialName:'--'">
              <span slot="reference">{{$method.beautySub(scope.row.MaterialName,10)}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="Stock" label="库存"></el-table-column>
        <el-table-column prop="Unit" label="单位"></el-table-column>
        <el-table-column prop="OperNumber" label="数量"></el-table-column>
        <el-table-column prop="UnitPrice" label="单价"></el-table-column>
        <el-table-column prop="TaxUnitPrice" label="含税单价"  v-if="pageName == 'rk'"  >
          <template slot-scope="scope">
              {{scope.row.TaxUnitPrice ? scope.row.TaxUnitPrice :0}}
          </template>
        </el-table-column>
        <el-table-column prop="AllPrice" label="金额">
          <template slot-scope="scope">
              {{scope.row.AllPrice ? scope.row.AllPrice :0}}
          </template>
        </el-table-column>
        <el-table-column prop="TaxRate" label="税率"  v-if="pageName == 'rk'">
           <template slot-scope="scope">
              {{scope.row.TaxRate ? scope.row.TaxRate :0}}
          </template>
        </el-table-column>
        <el-table-column prop="TaxMoney" label="税额"  v-if="pageName == 'rk'">
           <template slot-scope="scope">
              {{scope.row.TaxMoney ? scope.row.TaxMoney :0}}
          </template>
        </el-table-column>
        <el-table-column prop="TaxLastMoney" label="价税合计"  v-if="pageName == 'rk'">
          <template slot-scope="scope">
              {{scope.row.TaxLastMoney ? scope.row.TaxLastMoney :0}}
          </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="remarks">
      <el-input v-if="typeStatus != 1"  type="textarea" placeholder="请输入内容" resize="none" v-model="remarks"></el-input>
      <div style="margin-left:20px;" v-if="typeStatus == 1">单据备注: {{remarks}}</div>
    </div>
    <!-- 产品参数相关 -->
    <div class="parameter-wrapper" v-if="pageName != 'order'">
        <el-form
          :rules="oderules"
          ref="form"
          v-model="searchForm"
          label-width="110px"
          size="medium"
        >
            <el-form-item label="优惠率：" class="youhuiForm"  prop="contactName">
              <el-input v-model="Discount" placeholder="库存"></el-input>
              <span class="fuhao">%</span>
            </el-form-item>
            <el-form-item label="退款优惠：">
              <el-input style="display:inline-block;" v-model="DiscountMoney" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="优惠后金额："  >
              <el-input :disabled="true" v-model="DiscountLastMoney" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="本次退款："  >
              <el-input v-model="Changeamount" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="结算账户：">
               <el-select  v-model="Accountid"  filterable placeholder="请选择">
                  <el-option
                    v-for="item in userAccountList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              <!-- userAccountList -->
            </el-form-item>
            　
            <el-form-item label="本次欠款：" >
              <el-input :disabled="true" v-model="Arrears" placeholder="库存"></el-input>
            </el-form-item>
            <el-form-item label="采购费用：">
              <el-input :disabled="true" v-model="OtherMoney" placeholder="库存"></el-input>
            </el-form-item>
            <span class="icon iconwenjian"></span>
        </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="save" v-if="typeStatus == 0">保存</el-button>
      <el-button type="primary" @click="editSave" v-if="typeStatus == 2">保存</el-button>
      <el-button @click="$router.back(-1)">取消</el-button>
    </div>
    <!-- 新增一条数据弹框 -->
    <el-dialog class="oderDialog" title="新增订单信息" :close-on-click-modal="false" :visible.sync="oderDialogVisible">
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
          <div class="form_item" v-if="pageName=='rk'">
            <el-form-item label="含税单价：" :title="oderForm.TaxUnitPrice" prop="TaxUnitPrice">
              <el-input v-model="oderForm.TaxUnitPrice" placeholder="含税单价"></el-input>
            </el-form-item>
            <el-form-item label="税率(%)：" :title="oderForm.TaxRate" prop="TaxRate">
              <el-input v-model="oderForm.TaxRate" placeholder="税率"></el-input>
            </el-form-item>
          </div>
          <div class="form_item" v-if="pageName=='rk'">
            <el-form-item label="税额：" :title="oderForm.TaxUnitPrice" prop="TaxUnitPrice">
              <el-input v-model="oderForm.TaxUnitPrice" placeholder="税额"></el-input>
            </el-form-item>
            <el-form-item label="税价合计：" :title="oderForm.TaxRate" prop="TaxRate">
              <el-input v-model="oderForm.TaxRate" placeholder="税价合计"></el-input>
            </el-form-item>
          </div>
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
    <el-dialog class="addSupplierInfo" :close-on-click-modal="false" title="增加供应商信息" :visible.sync="addSupplierInfoDialog">
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
import { log } from 'util';
export default {
  data() {
    return {
      supplierId:'',  //供应商id

      dataPicker:new Date,
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
        TaxRate:"0",
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
      linknumber:'',   //关联订单
      supplierList:[], //供应商list
      commodityList:[],//商品名list
      warehouseList:[],//仓库list

      userAccountList:[], //用户账户

      stockInfo:{},
      unitList:[],
      price:0,  //金额
      oderPrice:0, //合计金额
      TaxLastMoney:0, //价税合计

      typeStatus:0,  //0 = 新增, 1 = 查看, 2 = 编辑
      OderSaveStatus:0, //0 = 新增,1 = 编辑
      currentIndex:0,  //编辑选中索引
      preTotalPrice:0, //之前总价
      pageName:'',    //页面跳转字段,用于判断从哪个页面跳转过来的

      /*备注下面的相关字段 */
      Discount: 0,            //优惠率
      DiscountMoney:0,        //付款优惠
      DiscountLastMoney:0,    //优惠后金额
      Changeamount:0,         //付款
      Accountid:'',            //账户ID
      Arrears:0,              //欠款
      OtherMoney:'',           //采购费用
      OtherMoneyList:'',       //多支出, id组成的字符串用逗号分隔
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    console.log('this.$route.params')
    console.log(this.$route.query)
    
    this.pageName = this.$route.query.page; //上一个页面参数
    this.linknumber = this.$route.query.linknumber ? this.$route.query.linknumber : ''; //关联订单字段

    if(this.$route.query.type != 1) {
       /*仓库选择下拉框查询接口*/
      this.warehouseSelect();
      /*商品名选择下拉框查询接口*/
      this.commoditySelect();
    }
    /*供应商选择下拉框查询接口*/
    this.supplierSelect();
    if(this.$route.query.id) {  //根据id查询详情数据
       this.getDetai(this.$route.query.id);
       this.supplierId = this.$route.query.organid;
       this.oderNumber = this.$route.query.defaultnumber;
       this.dataPicker = this.$route.query.opertimeStr;
       this.remarks = this.$route.query.remarks;
       if(this.$route.query.type == 1) {//查看
          this.typeStatus = 1;
       } else if(this.$route.query.type == 2) { //编辑
         this.typeStatus = 2;
       }
    } else {
      // 新增
      this.typeStatus = 0;
      /*订单编号*/
      this.seeOderNumber();
    }
    /*判断从哪个页面进来的*/
    if(this.$route.query.page == 'odrer') {  //采购订单页面
    } else {  //采购入库页面,采购订单页面
      /*查询用户账户*/
      this.getuserAccount();
      this.Discount = this.$route.query.discount;
      this.DiscountMoney = this.$route.query.discountMoney;
      this.DiscountLastMoney = this.$route.query.discountLastMoney;
      this.Changeamount = this.$route.query.changeamount;
      this.Accountid = this.$route.query.accountid;
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
  },
  methods: {
    editDetails(item,index) {
      console.log('编辑');
      console.log(item);
      this.currentIndex = index;
      this.OderSaveStatus = 1;
      this.oderForm = JSON.parse(JSON.stringify(item));
      this.oderDialogVisible = true;
    },
    getOderPrice(){
       this.oderPrice = 0;
       this.tableData.map((item,index) => {
            this.oderPrice = this.oderPrice + parseFloat(item.AllPrice); 
            this.TaxLastMoney = this.TaxLastMoney + parseFloat(item.TaxLastMoney); 
         })
    },
    /*查看采购订单详细*/
    async getDetai(id) {
        let data = {
          headerId:id,
          mpList:'规格,颜色,制造商,自定义1,自定义2'
        }
        await this.$http.get('/depotItem/getDetailList',data).then(res=>{
            console.log('查看采购订单详细');
            console.log(res);
            if(res.code == 200) {
              this.tableData = res.data.rows;
              this.preTotalPrice = 0;
              res.data.rows.map((item,index) => {
                 this.preTotalPrice = this.preTotalPrice + parseFloat(item.AllPrice);
              })
              this.getOderPrice();
            } 
        })
    },
    /*查询用户账户*/
    async getuserAccount() {
        let data = {
        }
        await this.$http.get('/account/getAccount',data).then(res=>{
            console.log('查询用户账户');
            console.log(res);
            if(res.code == 200) {
               this.userAccountList = res.data.accountList;
            } 
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
              "OperTime":this.$method.getSTime1(this.dataPicker),
              "OrganId":this.supplierId,
              "HandsPersonId":"",
              "Salesman":"",
              "AccountId":"",
              "ChangeAmount":0,
              "TotalPrice":this.oderPrice,
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
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.back(-1);
              },1500)
            } 
        })

    },
    /*修改保存 */
    async editSave() {
       if(!this.supplierId) {
         this.$message.error('请选择供应商');
         return;
       }
       if(!this.tableData.length) {
         this.$message.error('请输入明细信息');
         return;
       }
        let data = {
          id:this.$route.query.id,
          info:{
              "Type":"其它",
              "SubType":"采购订单",
              "ProjectId":null,
              "AllocationProjectId":null,
              "DefaultNumber":this.oderNumber,
              "Number":this.oderNumber,
              "LinkNumber":"",
              "OperTime": this.$route.query.opertimeStr == this.dataPicker ?  this.$route.query.opertimeStr : this.$method.getSTime1(this.dataPicker),
              "OrganId":this.supplierId,
              "HandsPersonId":"",
              "Salesman":"",
              "AccountId":"",
              "ChangeAmount":0,
              "TotalPrice":this.oderPrice,
              "PayType":"现付",
              "Remark":this.remarks,
              "AccountMoneyList":"",
              "Discount":"",
              "DiscountMoney":"",
              "DiscountLastMoney":"",
              "OtherMoney":""
        },
        inserted:JSON.stringify([]),
        deleted:JSON.stringify([]),
        updated:JSON.stringify(this.tableData),
        preTotalPrice:this.preTotalPrice
      }
        console.log('上传数据');
        console.log(data);
        await this.$http.post('/depotHead/updateDepotHeadAndDetail',data).then(res=>{
            console.log('保存信息');
            console.log(res);
            if(res.code == 200) {
               this.$message({
                message: '保存成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.back(-1);
              },1500)
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

          console.log('this.oderForm');
          console.log(this.oderForm);
          if (valid) {
            if(this.OderSaveStatus == 0) {
                let obj = JSON.parse(JSON.stringify(this.oderForm))
                this.tableData.push(obj);
                console.log('this.tableData');
                console.log(this.tableData);

            } else {
                console.log('编辑表格');
                // currentIndex
                 let obj = JSON.parse(JSON.stringify(this.oderForm))
                this.tableData.splice(this.currentIndex,1,obj);
                console.log(this.tableData);
            }

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
      console.log(val);
    },
    add() {
      this.oderDialogVisible = true;
      this.OderSaveStatus = 0;
    },
    remove() {
      if(!this.tableInfo.length) {
        this.$message.error('请选择订单');
        return;
      }
      for(let i=0;i<this.tableInfo.length;i++) {
          for(let j=0;j<this.tableData.length;j++) {
             if(this.tableInfo[i].Id == this.tableData[j].Id) {
                this.tableData.splice(j,1);
             }
          }
      }
// typeStatus
    },
    getSummaries(param) {
      console.log("param");
      console.log(param);
      const { columns, data } = param;
      const sums = [];
      let sumIndex;
      if(this.typeStatus == 1) {
        sumIndex = 7;
      } else {
        sumIndex = 8;
      }
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === sumIndex) {
          sums[sumIndex] = this.oderPrice;
          return;
        } if (index === 12 && this.pageName == 'rk') {
          sums[index] = this.TaxLastMoney;
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
    .youhuiForm {
      position: relative;
      .fuhao {
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
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