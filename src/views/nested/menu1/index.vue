<template>
  <div>
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登陆名称">
        <el-input placeholder="审批人" v-model="namer.login" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input placeholder="审批人" v-model="namer.user" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="moveNull">重置</el-button>
        <el-button type="primary">分配角色</el-button>
        <el-button type="primary">分配仓库</el-button>
        <el-button type="primary" @click="dialogFormVisible = true, addAdmin()">新增用户</el-button>
        <el-button type="primary" @click="deleteMoreUser" v-show="flager">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登陆名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" equired>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <span style="float: left">{{ }}</span>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.loginame" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.orgAbr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户排序" :label-width="formLabelWidth">
          <el-input v-model="form.userBlngOrgaDsplSeq" autocomplete="off" />
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" required>
          <el-input v-model="form.phonenum" autocomplete="off" type="tel" />
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" type="email" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="dialogFormVisible = false, this.addAdmin()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <!-- <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
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
    </el-dialog>-->
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            <span @click="dialogFormVisible = true">修改</span>
          </el-button>
          <el-button
            id="id"
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
      namer: {
        login: "",
        user: ""
      },
      //删除id
      delId: [],
      //多选删除
      delMore: [],
      // 公司列表
      options: [],
      value: null,
      tableData: [],
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        loginame: "qweq",
        orgAbr: "",
        orgaId: "",
        selectType: "",
        orgaUserRelId: "",
        id: "",
        userBlngOrgaDsplSeq: "",
        username: "qweqeq",
        position: "",
        phonenum: "",
        email: "",
        description: ""
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
    // this.getTo()
    //
  },
  methods: {
    //删除
    deleteUser(ids) {
      this.$http
        .post("/user/deleteUser", {
          ids
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(row.id);
      this.delId = row.id;
    },
    fetchData() {
      getUserList().then(response => {
        console.log(response);
      });
    },
    //分页功能
    getInfo() {
      this.$http
        .get("/user/getUserList", {
          search: { userName: "", loginName: "" },
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
      // this.getInfo()
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(this.pageSize);

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
      (this.namer.login = ""), (this.namer.user = "");
    },
    //显示多选删除按钮
    displayDel() {
      console.log(this.multipleSelection.length);

      if (this.multipleSelection.length >= 2) {
        this.flager = true;
      } else {
        this.flager = false;
      }
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

