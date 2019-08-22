<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登录名称">
        <el-input v-model="searchName" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="searchUser" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getInfo(searchUser,searchName)">查询</el-button>
        <el-button type="primary" @click="moveNull">重置</el-button>
        <el-button type="primary" @click="AssignmentRoles = distribution">分配角色</el-button>
        <el-button type="primary" @click="DistributionWarehouse = true">分配仓库</el-button>
        <el-button type="primary" @click="DistributionCustomers = distribution, takeWarehouse()">分配客户</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
        <el-button type="danger" @click="deleteMoreUser" v-show="flager">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item
          label="登录名称"
          prop="loginame"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '登录名称不能为空',trigger: 'blur'},             
              { max: 60, message: '长度不能大于60'}
            ]"
        >
          <el-input v-model="form.loginame" autocomplete="off" />
        </el-form-item>
        
        <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
         
        >
          <el-select no-data-text="请选择公司名称" :disabled="testName" v-model="form.companyName">
            <el-option
              v-for="item in this.userCompanyName"
              :key="item.tenantId"
              :label="item.companyName"
              size="mini"
              :value="item.tenantId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="orgParentName" :label-width="formLabelWidth">
          <el-cascader
            :options="requerts"
            :props="props"
            :show-all-levels="false"
            change-on-select
            v-model="form.orgParentName"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          label="用户名称"
          prop="username"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '用户名称不能为空'},             
              { max: 60, message: '长度不能大于60'}
            ]"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="用户排序" :label-width="formLabelWidth">
          <el-input v-model="form.userBlngOrgaDsplSeq" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phonenum"
          :label-width="formLabelWidth"
          :rules="[ 
        {required: true, message:'手机号码不能为空'},
        {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message:'手机号码有误，请重新输入',trigger: 'blur'}
        ]"
        >
          <el-input v-model.number="form.phonenum" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="电子邮箱"
          prop="email"
          :label-width="formLabelWidth"
          :rules="[
              { type: 'email', message: '电子邮箱格式错误'}
            ]"
        >
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="description"
          :rules="[
          {
            max: 200, message: '输入过长，只允许输入200个字符'
          }]"
        >
          <el-input
            type="textarea"
            v-model="form.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="暂无备注信息"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = true, submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改用户" :visible.sync="reviseFromdata">
      <el-form :model="formTest" ref="formTest">
        <el-form-item
          label="登录名称"
          prop="loginame"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '登录名称不能为空'},             
              { max: 60, message: '长度不能大于60'}
            ]"
        >
          <el-input v-model="formTest.loginame" autocomplete="off" />
        </el-form-item>
        
          <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
        >
          <el-select no-data-text="请选择公司名称" :disabled="testName" v-model="formTest.companyName">
            <el-option
              v-for="item in this.userCompanyName"
              :key="item.tenantId"
              :label="item.companyName"
              size="mini"
              :value="item.tenantId">
            </el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item label="部门" prop="orgParentName" :label-width="formLabelWidth">
          <el-cascader
            :options="requerts"
            :props="props"
            :show-all-levels="false"
            change-on-select
            v-model="formTest.orgParentName"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="用户排序" :label-width="formLabelWidth">
          <el-input v-model="formTest.userBlngOrgaDsplSeq" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="formTest.position" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phonenum"
          :label-width="formLabelWidth"
          :rules="[ 
        {required: true, message:'手机号码不能为空'},
        
        {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,message:'手机号码有误，请重新输入'}
        ]"
        >
          <el-input v-model.number="formTest.phonenum" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="电子邮箱"
          prop="email"
          :label-width="formLabelWidth"
          :rules="[
           
              { type: 'email', message: '电子邮箱格式错误'}
            ]"
        >
          <el-input v-model="formTest.email" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="description"
          :rules="[
          {
            max: 200, message: '输入过长，只允许输入200个字符'
          }]"
        >
          <el-input
            type="textarea"
            v-model="formTest.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="暂无备注信息"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reviseFromdata = false, cancel()" >取 消</el-button>
        <el-button type="primary" @click="reviseFromdata = false ,reviseForm('formTest')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配客户 -->
    <el-dialog title="分配客户" :visible.sync="DistributionCustomers">
        <el-button type="primary" round @click="keepCustomers">保存</el-button>

        <el-tree
        :data="customers"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
         @check-change="handleCheckChange"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
    <!--  分配仓库-->
    <el-dialog title="分配客户" :visible.sync="DistributionWarehouse">
        <el-tree
        :data="warehouse"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </el-dialog>
    <!--  分配角色-->
    <el-dialog title="分配客户" :visible.sync="AssignmentRoles">
        <el-button type="primary" @>保存</el-button>
        <el-tree
        :data="roles"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </el-dialog>
    <!-- 表单 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      fixed
      height="500"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="loginame" label="登录名称" width="120" />
      <el-table-column prop="username" label="用户名称" width="120" />
      <el-table-column prop="position" label="职位" width="120" />
      <el-table-column prop="orgAbr" label="部门" width="120" />
      <el-table-column prop="companyName" label="所属公司" width="120" />
      <el-table-column prop="email" label="电子邮箱" width="120" />
      <el-table-column prop="phonenum" label="电话号码" width="120" />
      <el-table-column prop="userBlngOrgaDsplSeq" label="用户排序" width="120" />
      <el-table-column prop="description" label="描述" width="120" />

      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),reviseFromdata = reviseData"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row),open2()"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :page-count="total"
    ></el-pagination>
  </div>
</template>

<script>
import { log } from "util";
import { mapState } from 'vuex'
export default {
  name: "Menu2",
  data() {
    return {
      
      //分配开启按钮
      distribution:false,
      flager: false,
      searchName: "",
      requerts: [],
      searchUser: "",
      id: "",
      //删除id
      delId: [],
      //多选删除
      delMore: [],
      // 公司列表
      options: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }],
      value: null,
      tableData: [],
      search: "",
      reviseData: false,
      reviseFromdata: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      testName:'',
      formTest:{},
      form: {
        
      },
      props: {
        value: "id",
        label: "text",
        children: "children"},
      formLabelWidth: "120px",
      // 第几页
      currentPage: 1,
      //默认每页显示页码
      pageSize: 10,
      currentPage2: 1,
      //总页码数
      total: null,
      userCompanyName:'',
      LoginName:'',
      LoginId:'',
      userId:'',
      //分配客户
      customers:[],
      defaultProps: {
          children: 'children',
          label: 'text',
          value:'attributes'
        },
        DistributionCustomers: false,
        //分配仓库
        warehouse:[],
        props:{
          children: 'children',
          label: 'label'
        },
        DistributionWarehouse: false,
        //分配角色
        roles:[],
        rolesProps:{
          children: 'children',
          label: 'label'
        },
        AssignmentRoles: false,
    };
  },
  created() {
    this.getInfo();
     this.loginUser()
     this.getOrganizationTree()
     this.getCustomers()
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    //点击分配客户的按钮
    takeWarehouse(){
      console.log(this.multipleSelection);
      
      // if(this.multipleSelection === ''){
      //   this.$confirm("请选择一个用户！！！", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {}).catch(() => {});
      // }else{
      //   if(this.multipleSelection.length > 1){
      //     this.$confirm("只能选择一个用户！！！", "提示", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning"
      // }).then(() => {}).catch(() => {});
      //   }else{
      //     this.distribution = true;
      //   }
      // }
    },
    //效验用户的新增状态
    keepCustomers(id){
      // this.$http.get(`/userBusiness/checkIsValueExist?type=UserCustomer&keyId=${}`)
    },
    //分配客户的复选框状态
    handleCheckChange(data, checked, indeterminate) {
      console.log('*****************');
      
      console.log(data);
      console.log(checked);
      console.log(indeterminate);
      console.log('*****************');

      // if (this.dataLink.length >= 2) {
      //   this.flager = true;
      // } else {
      //   this.flager = false;
      // }
    },
    //获取分配客户数据
    getCustomers(){
      this.$http.post('/supplier/findUserCustomer',{
        UBType: 'UserCustomer',
        UBKeyId: this.userId

      }).then(res=>{
        
        this.customers = res.data.children
      
      })
    },
    //点击复选框选择。
     handleChange(value) {
      
      this.form.orgParentNo = value[value.length-1];
      
    },
    loginUser(){
      this.userId = this.user.userInfo.id

      
      this.LoginName = this.user.userInfo.loginame

      this.userCompanyName = this.user.userInfo.companyName
      if(this.LoginName === 'admin') {
        this.testName = false
        this.$http.get('/tenant/tenantSelect').then(res=>{
          this.userCompanyName = res.data
          console.log(this.userCompanyName);
          // console.log(res);    
        })

      }else {
        this.testName = true
        this.form.companyName = this.userCompanyName
        this.LoginId = this.user.userInfo.tenantId
       
        
      }
    },
    cancel(){
      for(let i in this.form){
            this.form[i] = ''
          }
    },
    //删除
    deleteUser(ids) {

      this.$http
        .post("/user/deleteUser", {
          ids
        })
        .then(res => {
          this.getInfo()
        });
    },
    //多删
    deleteMoreUser() {
      let Link 
      this.multipleSelection.forEach(element => {
        if (this.delMore.indexOf(element.id) < 0) {
          this.delMore.push(element.id);
        }
      });
        this.$confirm('确定删除选中的公司数据么？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          Link = this.delMore.join(',')
          this.deleteUser(Link);
          this.delMore = [];
          this.$message({
              type: "success",
              message: "删除成功!"
            });
 
          }).catch(req => {

          })
      
    },
    open1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(this.delId);
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
    },
    open2() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(this.delId);
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
    },
    //修改
    handleEdit(index, row) {
      let obj = JSON.parse(JSON.stringify(row));
      this.formTest = obj
      this.reviseData = true;
      this.id = obj.id;
      console.log('=====');
      
      console.log(this.formTest);
      
    },
    handleDelete(index, row) {
      // console.log(row.id);
      this.delId = row.id;
    },

    //分页功能
    getInfo(userName, loginName) {
      this.$http
        .get("/user/getUserList", {
          search: { userName, loginName },
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.tableData = res.data.page.rows;
    
          
           
          
          
          this.total = Math.ceil(res.data.page.total / this.pageSize);
        
        });
    },
    getOrganizationTree() {
      
      this.$http
        .post("organization/getOrganizationTree", {
          id: -1
        })
        .then(res => {
          this.requert = res.data;

          this.requerts = res.data;
           console.log('******************');
          console.log(this.requerts);
          
           console.log('******************');
        })
        .catch(req => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.displayDel();
      console.log(this.multipleSelection);
      
    },
    handleSizeChange(val) {
      this.pageSize = val;

      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    
      this.getInfo()
      
    },
    //添加功能
    addAdmin() {
      if(this.LoginName === 'admin'){
      this.form.tenantId = this.form.companyName
      }else {
        this.form.tenantId = this.LoginId
      }
          this.form.orgaId = this.form.orgParentName[this.form.orgParentName.length -1 ]

      this.$http
        .post("/user/addUser", {
          info: this.form
        })
        .then(res => {
          this.form = {}
          this.getInfo()
        });
    },
    //清空搜索框内容
    moveNull() {
      this.searchName = "";
      this.searchUser = "";
      this.getInfo();
    },
    //显示多选删除按钮
    displayDel() {
      // console.log(this.multipleSelection.length);

      if (this.multipleSelection.length >= 2) {
        this.flager = true;
      } else {
        this.flager = false;
      }
    },
    //新增点击提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
              type: "success",
              message: "新增成功!"
            }); 
          this.dialogFormVisible = false;
          this.addAdmin();
          
        } else {
          this.$message({
              type: "error",
              message: "新增失败"
            }); 
          return false;
        }

      });
    },
    //修改点击提交
    reviseForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
              type: "success",
              message: "修改成功!"
            }); 
          this.dialogFormVisible = false;
          if(this.LoginName === 'admin'){
            this.form.tenantId = this.form.companyName
            }else {
              this.form.tenantId = this.LoginId
            }
          this.formTest.orgaId = this.formTest.orgParentName[this.formTest.orgParentName.length -1 ]
          this.reviseUser(this.id, this.formTest);
          
        } else {
          this.$message({
              type: "error",
              message: "修改失败"
            });
          return false;
        }
      });
    },
    //点击修改
    reviseUser(id, info) {
      this.$http
        .post(`user/updateUser/?id=${id}`, {
          info
        })
        .then(res => {
          // for (let key in info) {
          //   info[key] = "";
          // }
          this.getInfo();
        });
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

