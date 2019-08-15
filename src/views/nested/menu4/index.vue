<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input placeholder="" />
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
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">分配功能</el-button>
        <el-button type="primary">分配按钮</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="编辑角色信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登陆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
      </div>
    </el-dialog>
    <!-- 表单 -->

    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      size="medium"
    >
      <th>
        <input type="checkbox">

      </th>

      <el-table-column
        label="角色列表"
        prop="date"
      >
        <input type="checkbox">
      </el-table-column>
      <el-table-column
        align="right"
      >

        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            <span @click="dialogFormVisible = true">修改</span>
          </el-button>
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
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :page-count="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Menu4',
  data() {
    return {
      tableData: [{
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
      search: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      // 第几页
      currentPage: 1,
      //默认每页显示页码
      pageSize:10,
      currentPage2:1,
      //总页码数
      total : null

    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
                   
        })
    },
      handleSelectionChange(val) {
      this.multipleSelection = val
      
      },  
      handleSizeChange(val) {     
        this.pageSize = val
        console.log(this.pageSize);
        
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
