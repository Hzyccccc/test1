<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input placeholder="" v-model="userName"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getInfo(userName)">查询</el-button>
        <el-button type="primary" @click="getInfo(userName='')">重置</el-button>
        <el-button type="primary" @click="DistributionCustomers = false,takecustomers()">分配功能</el-button>
        <el-button type="primary" @click="AssignmentRoles = false">分配按钮</el-button>
        <el-button type="primary" @click="logFormVisible = true">新增</el-button>
        <el-button v-show="bFlag" type="danger" @click="deleteMoreUser">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 分配功能 -->
    <el-dialog title="分配功能" :visible.sync="DistributionCustomers">
        <el-button type="primary" round @click="keepCustomers">保存</el-button>
        <el-tree
        :data="customers"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :default-checked-keys=expanded
         @check-change="handleCheckChange"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
  <!--  修改角色-->
    <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="角色名称" 
        :label-width="formLabelWidth"
        prop='name'
        :rules="[
              { required: true, message: '角色名称不能为空'}
            ]"
            >
          <el-input v-model="form.name" autocomplete="off" @blur ="testName(classId,form.name)"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false, form.name = ''">取消</el-button>
        <el-button type="primary" :disabled=flag @click="dialogFormVisible = false, putName(classId,form.name)" >保存</el-button>
      </div>
    </el-dialog>
  <!-- 新增角色 -->
    <el-dialog title="新增角色信息" :visible.sync="logFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="角色名称" 
        :label-width="formLabelWidth"
        prop='name'
        :rules="[
              { required: true, message: '角色名称不能为空'}
            ]"
            >
          <el-input v-model="form.name" autocomplete="off" @blur ="testName(0,form.name)"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logFormVisible = false">取消</el-button>
        <el-button type="primary" :disabled=flag @click="logFormVisible = false, putUser(form.name)" >保存</el-button>
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
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
     
      <el-table-column
        prop="name"
        label="角色名称"
        width="700"
      />
     

      <el-table-column
        prop="address"
        label="操作"
        width="700"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            
          >
            <span @click="dialogFormVisible = true">
              修改
            </span>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row), open2()"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :page-count="total">
    </el-pagination>
    <!-- 分配 -->
  </div>
</template>

<script>
// import { getTo } from '@/api/table'

export default {
  name: 'Menu3',
  data() {
    return {
      //分配功能
      customers:[],
      expanded:[],
      defaultProps: {
          children: 'children',
          label: 'text',
          value:'attributes'
      },
      DistributionCustomers: false,
      customersId:[],

      userName:'',
      lastName:'',
      classId:'',
      delId:'',
      delMore:[],
      tableData: [],
      search: '',
      logFormVisible:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
      },
      formLabelWidth: '120px',
      flag: true,
      bFlag:false,
      checkDom: '',
      idArray: [],
      // 第几页
      currentPage: 1,
      //默认每页显示页码
      pageSize:10,
      // currentPage2:1,
      //总页码数
      total : null

    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    //点击分配客户的按钮
    takecustomers(){
      console.log(this.multipleSelection);
      
      if(this.multipleSelection === undefined){
        this.$confirm("请选择一个用户！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {}).catch(() => {});
      }else{
        if(this.multipleSelection.length > 1){
          this.$confirm("只能选择一个用户！！！", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
      }).then(() => {}).catch(() => {});
        }else if(this.multipleSelection.length === 1){
          this.DistributionCustomers = true;
          this.getCustomers()
          
        }
      }
    },
    //效验点击新增的新增状态
    keepCustomers(){
        let cant  
        cant = this.customersId
   
        
        let str=""
        for(var i=0;i <= cant.length-1;i++){
          str+="["+cant[i]+"]";
        }
        
      this.$http.get(`/userBusiness/checkIsValueExist`,{
        type:'UserCustomer',
        keyId: this.multipleSelection[0].id
      }).then(res=>{
        console.log(res);
        if(res.data.id){
          console.log(111);
          
          //修改
          this.$http.post(`/userBusiness/update?id=${res.data.id}`,{
            info:{
              type:"UserCustomer",
              keyid:this.multipleSelection[0].id,
              value:str
            }
          }).then(res=>{
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.DistributionCustomers = false;

          })
        }else {          
          //新增
        this.$http.post('/userBusiness/add',{
          info:{
              type:"UserCustomer",
              keyid:this.multipleSelection[0].id,
              value:str
            }
        }).then(res=>{
          this.$message({
            type: "success",
            message: "分配成功"
          });
          this.DistributionCustomers = false;
        })
        }
      })
      
      
    },
    //分配功能的复选框状态
    handleCheckChange(data, checked, indeterminate) {
      
        if(checked === true) {
          this.customersId.push(data.id)
        }else {
          this.customersId.splice(this.customersId.findIndex(item => item.id === data.id), 1)  
        }
        console.log(this.customersId);
        
    },
    //获取分配功能数据
    getCustomers(){
      this.customersId = []
      this.expanded=[]
      this.$http.post('/functions/findRoleFunctions',{
        
        UBType: 'RoleFunctions',
        UBKeyId: this.multipleSelection[0].id

      }).then(res=>{
        
        this.customers = res[0].children
       
       
        for (let i = 0; i < this.customers.length; i++) {
          console.log(1111);
          if(this.customers[i].checked){
            this.expanded.push(this.customers[i].id)
            this.customersId.push(this.customers[i].id)
          }
          console.log(this.customers[i]);
          if(this.customers[i].children){
            for (let j = 0; j < this.customers[i].children.length; j++) {

            if(this.customers[i].children[j].checked){
              this.expanded.push(this.customers[i].children[j].id)
              this.customersId.push(this.customers[i].children[j].id)
              console.log(1111);
            
            }
            for (let k = 0; k < this.customers[i][j].length; k++) {
              if(this.customers[i][j][k].checked){
                this.expanded.push(this.customers[i][j][k].id)
                this.customersId.push(this.customers[i][j][k].id)
                console.log(2222);
            
              }
              
            }
          }
          }
          
        }
        
        this.distribution = true;
      })
    },


    //验证用户名否改边
 


    //验证用户名
    testName(id,name){
      this.$http.get('/role/checkIsNameExist',{
        id,
        name,
      }).then(res=>{
        if(res.data.status === true) {
          alert('用户名已存在，请重新输入')
        }else {
          this.flag = false;
          
        }
        
      })
    },
    //修改用户
    putName(id,name){
      
      
      this.$http.post(`/role/update?id=${id}`,{
        info:{"id":id,name:name}

      }).then(res=>{
        this.form.name = ''
        this.getInfo()
      })
    },
    // 新增用户
    putUser(name) {
      this.$http.post('/role/add',{
        info:{'name':name}
      }).then(res=>{
        this,form.name = ''
        this.getInfo()
      })
    },
    // 修改
    handleEdit(index, row) {
      console.log(index, row)
      this.form.name = row.name;
      //用户原名字
      this.lastName = row.name;
      //用户id
      this.classId = row.id
      
      
    },
    // 删除
    handleDelete(index, row) {
      
      this.delId = row.id;

    },
   // 请求用户数据
    getUserList() {
      this.$http.get('/role/list',{
        id: 1
      }).then(res => {
        console.log(res)
        console.log('11')
      })
    },
    //清空搜索列表
    moveNull(){
      this.userName = ''
    },
    deleteUser(ids) {
      this.$http.post("/role/batchDeleteRoleByIds", {
          ids:ids 
          }).then(res => {
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
   
    handleSelectionChange(val) {
      this.multipleSelection = val  
    
          
    },
    //分页功能
    getInfo(name) {      
        this.$http.get('/role/list',{
          search: {"name":name || ''},
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }).then(res =>{
          this.tableData = res.data.page.rows
          this.total = Math.ceil(res.data.page.total / this.pageSize)
          console.log(res.data.page.rows);                   
        })
    },
      handleSelectionChange(val) {
      this.multipleSelection = val
      
      if (this.multipleSelection.length >= 2) {
        this.bFlag = true;
      } else {
        this.bFlag = false;
      }
      
      
      
      },  
      handleSizeChange(val) {     
        this.pageSize = val
     
        
        this.getInfo()
      },
      handleCurrentChange(val) {     
        this.currentPage = val;
        
        
        this.getInfo()
      },
  }
}
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

