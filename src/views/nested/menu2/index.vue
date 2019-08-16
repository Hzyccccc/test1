<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input placeholder="" v-model="userName"/>
      </el-form-item>

      <!-- <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="登陆名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog> -->

      <el-form-item>
<<<<<<< HEAD
        <el-button type="primary" @click="getInfo(userName)">查询</el-button>
        <el-button type="primary" @click="getInfo(userName='')">重置</el-button>
        <el-button type="primary">分配功能</el-button>
        <el-button type="primary">分配按钮</el-button>
        <el-button type="primary" @click="logFormVisible = true">新增</el-button>
        <el-button v-show="bFlag" type="primary" @click="deleteMoreUser">删除</el-button>
=======
        <el-button type="primary" @click="typeOfr">查询</el-button>
        <el-button type="primary" @click="moveNull">查询</el-button>
        <el-button type="primary" >重置</el-button>
        <el-button type="primary">分配功能</el-button>
        <el-button type="primary">分配按钮</el-button>
        <el-button v-show="flag" type="primary">删除</el-button>
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      </el-form-item>
    </el-form>

    <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible">
<<<<<<< HEAD
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
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :disabled=flag @click="dialogFormVisible = false, putName(this.classId,this.form.name)" >保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增角色信息" :visible.sync="logFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="角色名称" 
        :label-width="formLabelWidth"
        prop='name'
        :rules="[
              { required: true, message: '角色名称不能为空'}
            ]"
            >
          <el-input v-model="form.name" autocomplete="off" @blur ="testName(classId,form.name)"/>
=======
      <el-form :model="form">
        <el-form-item label="登陆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
<<<<<<< HEAD
        <el-button type="primary" :disabled=flag @click="logFormVisible = false, putUser(this.form.name)" >保存</el-button>
=======
        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      </div>
    </el-dialog>
    <!-- 表单 -->

    <el-table
      ref="multipleTable"
<<<<<<< HEAD
      :data="tableData"
=======
      :data="tableData3"
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      fixed
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
<<<<<<< HEAD
     
      <el-table-column
        prop="name"
        label="角色名称"
        width="700"
=======
      <el-table-column
        label="品名"
        width="120"
      />
      <el-table-column
        prop="name"
        label="型号"
        width="120"
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      />

      <el-table-column
        prop="address"
        label="操作"
<<<<<<< HEAD
        fixed="right"
=======
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
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
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :page-count="total">
    </el-pagination>
  </div>
</template>

<script>
// import { getTo } from '@/api/table'

export default {
  name: 'Menu3',
  data() {
    return {
      userName:'',
<<<<<<< HEAD
      lastName:'',
      classId:'',
      delId:'',
      delMore:[],
      tableData: [],
=======
      tableData3: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      search: '',
      logFormVisible:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
      },
      formLabelWidth: '120px',
<<<<<<< HEAD
      flag: true,
      bFlag:false,
=======
      flag: false,
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      checkDom: '',
      idArray: [],
      // 第几页
      currentPage: 1,
      //默认每页显示页码
      pageSize:10,
      currentPage2:1,
      //总页码数
      total : null

    }
  },
  created() {
<<<<<<< HEAD
    this.getInfo()
  },
  methods: {
    //验证用户名否改边
    editName() {
      if(this.form.name  === this.lastName) return
      if(this.form.name == '') return 
      this.testName(this.classId,this.form.name)
    },
    //验证用户名
    testName(id,name){
      this.$http.get('/role/checkIsNameExist',{
        id,
        name,
      }).then(res=>{
        if(res.data.status === false) {
          alert('用户名已存在，请重新输入')
        }else {
          this.flag = true;
          
        }
        
      })
    },
    //修改用户
    putName(id,name){
      this.$http.post('/role/update',{
        info:{"id":id,name:"name"}

      })
    },
    // 新增用户
    putUser(name) {
      this.$http.post('/role/add',{
        info:{'name':name}
      })
    },
=======
    this.getUserList()
  },
  methods: {
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
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
<<<<<<< HEAD
      this.$http.get('/role/list',{
=======
      this.$http.get('/organization/getOrganizationTree',{
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
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
    // 查询
    typeOfr(){

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //分页功能
    getInfo() {
        
        this.$http.get('/user/getUserList',{
          search: {"userName":"","loginName":""},
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }).then(res =>{
          this.tableData = res.data.page.rows
          this.total = Math.ceil(res.data.page.total / this.pageSize)
<<<<<<< HEAD
          console.log(res.data.page.rows);                   
=======
                   
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
        })
    },
      handleSelectionChange(val) {
      this.multipleSelection = val
<<<<<<< HEAD
      console.log(this.multipleSelection);
      
      if (this.multipleSelection.length >= 2) {
        this.bFlag = true;
      } else {
        this.bFlag = false;
      }
      
      
=======
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
      
      },  
      handleSizeChange(val) {     
        this.pageSize = val
        console.log(this.pageSize);
<<<<<<< HEAD
        console.log('======');
=======
>>>>>>> 74efbb1e198afcfc3aca0e247773133d6f4c570a
        
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

