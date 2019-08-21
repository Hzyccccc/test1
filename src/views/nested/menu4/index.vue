<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="公司名称">
        <el-input placeholder v-model="companyname" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getInfo(companyname)">查询</el-button>
        <el-button type="primary" @click="moveNull">重置</el-button>
        <el-button type="primary" @click="xiuFormVisible = true">新增</el-button>
        <el-button type="danger" @click="deleteMoreUser()" v-show="flager">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增公司页面 -->
    <el-dialog title="新增公司信息" :visible.sync="xiuFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '公司名称不能为空'},
              { max: 60, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="form.companyName" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="联系人姓名"
          prop="companyContacts"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '姓名不能为空'},
              { max: 30, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="form.companyContacts" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="联系人手机号码"
          prop="contactnumber"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'号码不能为空',trigger: 'blur'},
            {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,message: '手机号码格式错误', trigger: 'blur' },
          
            ]"
        >
          <el-input v-model.number="form.contactnumber" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司电话"
          prop="companyTel"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.companyTel" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司地址"
          prop="companyAddress"
          :label-width="formLabelWidth"
          :rules="[
              {  max: 200, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="form.companyAddress" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司邮编"
          prop="companyPostCode"
          :label-width="formLabelWidth"
          :rules="[
              { pattern: /^\d{6}$/, message: '格式有误，请重新输入'}
            ]"
        >
          <el-input v-model="form.companyPostCode" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="服务结束时间"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择日期'}
            ]"
        >
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="form.data1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">--</el-col>
          <el-col :span="8">
            <el-form-item
              prop="date2"
              :rules="[
              { required: true, message: '请选择时间'}
            ]"
            >
              <el-time-picker
                type="fixed-time"
                placeholder="选择时间"
                value-format="HH:mm:ss"
                v-model="form.date2"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择状态'}
            ]"
        >
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁止" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiuFormVisible = false">取消</el-button>
        <el-button type="primary" @click="xiuFormVisible = flag, addForm('form')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑公司表单 -->
    <el-dialog title="编辑公司信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '公司名称不能为空'},
              { max: 60, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="ruleForm.companyName" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="联系人姓名"
          prop="companyContacts"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '姓名不能为空'},
              { max: 30, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="ruleForm.companyContacts" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="联系人手机号码"
          prop="contactnumber"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'号码不能为空',trigger: 'blur'},
            {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,message: '手机号码格式错误', trigger: 'blur' },
          
           
            ]"
        >
          <el-input v-model.number="ruleForm.contactnumber" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司电话"
          prop="companyTel"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="ruleForm.companyTel" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司地址"
          prop="companyAddress"
          :label-width="formLabelWidth"
          :rules="[
              {  max: 200, message: '超出最大长度'}
            ]"
        >
          <el-input v-model="ruleForm.companyAddress" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司邮编"
          prop="companyPostCode"
          :label-width="formLabelWidth"
          :rules="[
              { pattern: /^\d{6}$/, message: '格式有误，请重新输入'}
            ]"
        >
          <el-input v-model.number="ruleForm.companyPostCode" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="服务结束时间"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择日期'}
            ]"
        >
          <el-col :span="8">
            <el-form-item prop="date1"
           
            >
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">--</el-col>
          <el-col :span="8">
            <el-form-item
              prop="date2"
              :rules="[
              { required: true, message: '请选择时间'}
            ]"
            >
              <el-time-picker
                type="fixed-time"
                placeholder="选择时间"
                value-format="HH:mm:ss"
                v-model="ruleForm.date2"
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="statue"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择状态'}
            ]"
        >
          <el-select placeholder="请选择状态" v-model="ruleForm.statue">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁止" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = flage, submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 表单 -->

    <el-table
      ref="multipleTable"
      :data="tableData"
      fixed
      height="500"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="companyName" label="公司名称" width="120" />
      <el-table-column prop="companyContacts" label="联系人" width="120" />
      <el-table-column prop="companyAddress" label="公司地址" width="120" />
      <el-table-column prop="companyTel" label="公司电话" width="120" />
      <el-table-column prop="companyFax" label="公司传真" width="120" />
      <el-table-column prop="companyPostCode" label="公司邮编" width="120" />
      <el-table-column prop="expiresTime" label="服务结束时间" width="120" />
      <!-- <el-table-column prop="statue" label="启用" width="120">
        <template slot-scope="scope">
        <el-checkbox  v-model="scope.row.statue">
        123
        </el-checkbox>
        </template>
      </el-table-column> -->
      <el-table-column prop="statue" label="启用" align="center">
        <template slot-scope="scope">
        <!-- <el-checkbox :model="scope.row.statue == 2 ? true : false"></el-checkbox>
        {{scope.row.statue == 1 ? 'true' : 'false'}} -->
        <el-checkbox  @change="changeCheckbox(scope.row)" :checked="scope.row.statue == 1 ? true : false"></el-checkbox>
        </template>
        
      </el-table-column>

      <el-table-column prop="address" label="操作" show-overflow-tooltip >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :page-count="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Menu4",
  data() {
    return {
     
      ruleForm: {
        companyName: "",
        companyContacts: "",
        contactnumber: "",
        companyTel: "",
        companyAddress: "",
        companyPostCode: "",
        expireTime: "",
        status: "",
        id: "",
        data1: "",
        data2: "",
        expireTime: ""
      },
      // 公司名
      resuLogo:'',
      ruleFormt: {},
      companyname: "",
      tableData: [],
      search: "",
      delId: "",
      delMore: [],
      flag:true,
      flager: false,
      flage:true,
      xiuTableVisible: false,
      xiuFormVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        companyName: "",
        companyContacts: "",
        contactnumber: "",
        companyTel: "",
        companyAddress: "",
        companyPostCode: "",
        expireTime: "",
        status: "",
        id: "",
        tenantId:'',
        data1: "",
        data2: "",
        expireTime: ""
      },
      checked:'',
      // 公司依赖项
      companyList:[],
      formLabelWidth: "120px",
      // 第几页
      pageNum: 1,
      //默认每页显示页码
      pageSize: 10,
      //总页码数
      total: null
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //启用状态
    changeCheckbox(e){
      
      e.statue = e.statue == 1 ? 2 : 1;
      console.log(e)
      this.$http.post('/tenant/updateTenantStatus',{
        info:{
          id:e.id,
          status:e.statue
        }
      }).then(res=>{
        console.log(res);
        
      })
      
    },
    //新增
    addForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.flag = false;
          this.$message({
            type: "success",
            message: "新增成功!"
          });
        } else {
          return false;
        }
      });
      //提交
      this.form.expireTime = this.form.data1 + " " + this.form.date2;
      this.$http
        .post("/tenant/addTenant", {
          info: {
            companyName: this.form.companyName,
            companyContacts: this.form.companyContacts,
            contactnumber: this.form.contactnumber,
            companyTel: this.form.companyTel,
            companyAddress: this.form.companyAddress,
            companyPostCode: this.form.companyPostCode,
            expireTime: this.form.expireTime,
            status: this.form.status,
            id: this.form.id,
            expireTime: this.form.expireTime
          }
        })
        .then(res => {
          this.flage = false
          this.getInfo()
          for (let key in this.form) {
            this.form[key] = "";
          }
        });
    },

    //修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.flage = false
          this.$message({
            type: "success",
            message: "修改成功!"
            
          });
          this.getInfo()
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
      //提交
      this.ruleForm.expireTime =
        this.ruleForm.date1 + " " + this.ruleForm.date2;
      // console.log(this.ruleForm.expireTime);
      
      this.$http
        .post("/tenant/editTenant", {
          info: {
            companyName: this.ruleForm.companyName,
            companyContacts: this.ruleForm.companyContacts,
            contactnumber: this.ruleForm.contactnumber,
            companyTel: this.ruleForm.companyTel,
            companyAddress: this.ruleForm.companyAddress,
            companyPostCode: this.ruleForm.companyPostCode,
            expireTime: this.ruleForm.expireTime,
            status: this.ruleForm.statue,
            id: this.ruleForm.id,
            tenantId:this.ruleForm.tenantId,
            expireTime: this.ruleForm.expireTime
          }
        })
        .then(res => {
          this.ruleForm = {}
        });
    },
    //校验当前租户是否已有单据
   IsDependenced(ids){
     if(ids.length > 1) {
       ids = ids.join(',')
     }
     
     this.$http.post('/tenant/checkTenantIsDependenced',{
       ids
     }).then(res=>{
      if(res.data.code === 200) {
          this.$confirm('确定删除选中的公司数据么？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          
          this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.deleteUser(ids);  
          }).catch(req => {

            
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
       }else {
         this.companyList = res.data.companyList
         console.log(this.companyList);
         
         this.$confirm(`检测到选中的公司"${this.companyList}"中存在依赖数据，确定强制删除？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            this.deleteUser(ids);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
       }
     
       
     }).catch(req=>{
       console.log(req);
       console.log(111);
       
     })
   },
    handleEdit(index, row) {  
      this.ruleForm = row;

      
      
      this.ruleForm.date1 = this.ruleForm.expiresTime.slice(0,9)
      this.ruleForm.date2 = this.ruleForm.expiresTime.slice(9).trim()
  
    },
    handleDelete(index, row) {
      this.delId = row.tenantId;
      this.IsDependenced(this.delId)

      // console.log(this.delId);
    },
    //删除
    deleteUser(id) {
      // if(id.)
      // id = id.join(",")

      
      this.$http
        .get('/tenant/deleteTenant/',{
          ids : id 
        })
        .then(res => {
          console.log('shanchu ');
          
          this.getInfo();
        });
    },
    displayDel() {
      if (this.multipleSelection.length >= 2) {
        this.flager = true;
      } else {
        this.flager = false;
      }
    },
    //多删
    deleteMoreUser() {

      this.multipleSelection.forEach(element => {
        if (this.delMore.indexOf(element.tenantId) < 0) {
          this.delMore.push(element.tenantId);
        }
      });
      
      this.IsDependenced(this.delMore)

    },
    
    //分页功能
    getInfo(companyname) {
      // console.log(companyname);

      this.$http
        .post("/tenant/tenantList", {
          info: {
            companyName: companyname,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.tableData = res.data.rows;
          this.total = Math.ceil(res.data.total / this.pageSize);
          
          for(let key in this.tableData){
            this.tableData[key].expiresTime = this.$method.getSTime2(this.tableData[key].expiresTime)
           
          }
          console.log('=======');
          
          console.log(this.tableData);
          

        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      this.displayDel();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(this.pageSize);

      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInfo();
    },
    //清空搜索框内容
    moveNull() {
      this.companyname = "";
      this.getInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-form-inline {
  margin-top: 10px;
  margin-left: 10px;
}
.pagin {
  padding-top: 10px;
  float: right;
}
</style>
