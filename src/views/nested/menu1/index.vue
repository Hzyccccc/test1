<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登陆名称">
        <el-input v-model="searchName" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="searchUser" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getInfo(searchUser,searchName)">查询</el-button>
        <el-button type="primary" @click="moveNull">重置</el-button>
        <el-button type="primary">分配角色</el-button>
        <el-button type="primary">分配仓库</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
        <el-button type="primary" @click="deleteMoreUser" v-show="flager">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item 
          label="登陆名称" 
          prop="loginame"
          :label-width="formLabelWidth" 
          :rules="[
              { required: true, message: '登陆名称不能为空'},             
              { max: 60, message: '长度不能大于60'}
            ]"
        >
          <el-input v-model="form.loginame" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" 
        prop="companyName"
          :rules="[
              { required: true, message: '请选择所属公司'},             
            ]"
        
        >
          <el-select v-model="form.companyNam" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <span style="float: left">{{ }}</span>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.orgAbr" autocomplete="off" />
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
        <el-form-item label="手机号码" 
        prop="phonenum"
        :label-width="formLabelWidth"
        :rules="[ 
        {required: true, message:'手机号码不能为空'},
        {max: 11, message:'手机号码有误，请重新输入'},
        {pattern:'^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$'}
        ]"
        >
          <el-input v-model.number="form.phonenum" autocomplete="off" />
        </el-form-item>
        
        
        <el-form-item 
          label="电子邮箱" 
          prop="email"
          :label-width="formLabelWidth" 
          :rules="[
              { required: true, message: '电子邮箱不能为空'},
              { type: 'number', message: '电子邮箱格式错误'}
            ]"
        >
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth"
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
      <el-form :model="form" ref="form">
        <el-form-item 
          label="登陆名称" 
          prop="loginame"
          :label-width="formLabelWidth" 
          :rules="[
              { required: true, message: '登陆名称不能为空'},             
              { max: 60, message: '长度不能大于60'}
            ]"
        >
          <el-input v-model="form.loginame" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" 
        prop="companyName"
          :rules="[
              { required: true, message: '请选择所属公司'},             
            ]"
        
        >
          <el-select v-model="form.companyNam" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <span style="float: left">{{ }}</span>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.orgAbr" autocomplete="off" />
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
        <el-form-item label="手机号码" 
        prop="phonenum"
        :label-width="formLabelWidth"
        :rules="[ 
        {required: true, message:'手机号码不能为空'},
        {max: 11, message:'手机号码有误，请重新输入'},
        {pattern:'^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$'}
        ]"
        >
          <el-input v-model.number="form.phonenum" autocomplete="off" />
        </el-form-item>
        
        
        <el-form-item 
          label="电子邮箱" 
          prop="email"
          :label-width="formLabelWidth" 
          :rules="[
              { required: true, message: '电子邮箱不能为空'},
              { type: 'number', message: '电子邮箱格式错误'}
            ]"
        >
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth"
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      <el-table-column prop="loginame" label="登陆名称" width="120" />
      <el-table-column prop="username" label="用户名称" width="120" />
      <el-table-column prop="position" label="职位" width="120" />
      <el-table-column prop="orgAbr" label="部门" width="120" />
      <el-table-column prop="orgAbr" label="所属公司" width="120" />
      <el-table-column prop="email" label="电子邮箱" width="120" />
      <el-table-column prop="phonenum" label="电话号码" width="120" />
      <el-table-column prop="userBlngOrgaDsplSeq" label="用户排序" width="120" />
      <el-table-column prop="description" label="描述" width="120" />

      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row),reviseFromdata = reviseData">
            修改
          </el-button>
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
export default {
  name: "Menu2",
  data() {
    return {
      flager: false,
      searchName: '',
      searchUser: '',
      id:'',
      //删除id
      delId: [],
      //多选删除
      delMore: [],
      // 公司列表
      options: [],
      value: null,
      tableData: [],
      search: "",
      reviseData:false,
      reviseFromdata:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        loginame: "",
        orgAbr: "",
        orgaId: "",
        selectType: "",
        orgaUserRelId: "",
        id: "",
        companyNam:"",
        userBlngOrgaDsplSeq: "",
        username: "",
        position: "",
        phonenum: "",
        email: "",
        description: "",
        isystem: '',
        tenantId:''
      },
      formLabelWidth: "120px",
      // 第几页
      currentPage: 1,
      //默认每页显示页码
      pageSize: 10,
      currentPage2: 1,
      //总页码数
      total: null
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //修改
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //删除
    deleteUser(ids2) {
      console.log('ids2');
      console.log(ids2);
      this.$http.post("/user/deleteUser", {
          'ids':ids2
        })
        .then(res => {
          console.log(res);
        });
    },
    //多删
    deleteMoreUser() {
      console.log("多选删除");

      this.multipleSelection.forEach(element => {
        if (this.delMore.indexOf(element.id) < 0) {
          this.delMore.push(element.id);
        }
      });
      this.deleteUser(this.delMore);
      this.delMore = [];
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
          this.form.companyName = row.companyName
          this.form.description = row.description
          this.form.email = row.email
          this.form.id = row.id
          this.form.isystem = row.isystem
          this.form.loginame = row.loginame
          this.form.orgAbr = row.orgAbr
          this.form.orgaId = row.orgaId
          this.form.orgaUserRelId = row.orgaUserRelId
          this.form.phonenum = row.phonenum
          this.form.position = row.position
          this.form.tenantId = row.tenantId
          this.form.userBlngOrgaDsplSeq = row.userBlngOrgaDsplSeq
          this.form.username = row.username
          // console.log(this.form);
          this.reviseData = true
          this.id = row.id;
      
    },
    handleDelete(index, row) {
      // console.log(row.id);
      this.delId = row.id;
    },
    
    //分页功能
    getInfo(userName,loginName) {   
      
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.displayDel();
      console.log(111);
      
     
    },
    handleSizeChange(val) {
      this.pageSize = val;
      

      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //添加功能
    addAdmin() {
      this.$http
        .post("/user/addUser", {
          info: this.from
        })
        .then(res => {
          console.log(res.data);
        });
    },
    //清空搜索框内容
    moveNull() {
      this.searchName = ""
      this.searchUser = ""
      this.getInfo()
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('成功!');
            this.dialogFormVisible = false;
            this.addAdmin()
            
          } else {
            alert('提交失败，格式错误!!');
            return false;
          }
        });
      }, 
      //修改点击提交
      reviseForm(formName) {  
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('成功!');
            this.dialogFormVisible = false;
            this.reviseUser(this.id,this,form)       
          } else {
            alert('提交失败，格式错误!!');
            return false;
          }
        });
      },
      //点击修改
      reviseUser(id,info){
        this.$http.post(`user/updateUser/?id=${id}`,{
          
          info
        }).then(res=>{
          for(let key in info){
              info[key]  = ''
          }
          this.getInfo()
          
        })
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

