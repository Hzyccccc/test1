<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登陆名称">
        <el-input placeholder="审批人" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input placeholder="审批人" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">分配角色</el-button>
        <el-button type="primary">分配仓库</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登陆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择公司">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户排序" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
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
    <!-- 修改 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登陆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择公司">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户排序" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
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
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        label="登陆名称"
        prop="date"
      />
      <el-table-column
        label="用户名称"
        prop="name"
      />
      <el-table-column
        label="用户名称"
        prop="name"
      />
      <el-table-column
        label="职业"
        prop="name"
      />
      <el-table-column
        label="部门"
        prop="name"
      />
      <el-table-column
        label="所属公司"
        prop="name"
      />
      <el-table-column
        label="电子邮箱"
        prop="name"
      />
      <el-table-column
        label="电话号码"
        prop="name"
      />
      <el-table-column
        label="用户排序"
        prop="name"
      />
      <el-table-column
        label="描述"
        prop="name"
      />
      <el-table-column
        label="描述"
        prop="name"
      />
      <el-table-column
        id="rightTab"
        align="right"
        width="200px"
      >
        <!-- <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template> -->
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
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="pagin"
    />
  </div>
</template>

<script>
import { getUserList } from '@/api/table'
export default {
  name: 'Menu2',
  data() {
    return {
      tableData: [],
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
      formLabelWidth: '120px'

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    fetchData() {
      getUserList().then(response => {
        console.log(response)
      })
      // this.$axios.get('/user/getUserList?search=&currentPage=1&pageSize=15').then((res) => {
      //   console.log(res);

      // })
    }
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

