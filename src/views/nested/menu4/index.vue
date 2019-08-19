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
        <el-button type="primary" @click="deleteMoreUser" v-show="flager">删除</el-button>
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
            {required: true, message:'手机号码不能为空'},
            {max: 11, message:'手机号码有误，请重新输入'},
           
            ]"
        >
          <el-input v-model.number="form.contactnumber" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司电话"
          prop="companyTel"
          :label-width="formLabelWidth"
          :rules="[
         
            {max: 11, message:'格式有误，请重新输入'},
            {pattern:'^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$',message:'手机号码有误，请重新输入'}
            ]"
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
              { pattern: '^\d{6}$', message: '格式有误，请重新输入'}
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
                value-format="HH:MM:dd"
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
        <el-button type="primary" @click="xiuFormVisible = false, addForm('form')">保存</el-button>
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
            {required: true, message:'手机号码不能为空'},
            {max: 11, message:'手机号码有误，请重新输入'},
           
            ]"
        >
          <el-input v-model.number="ruleForm.contactnumber" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="公司电话"
          prop="companyTel"
          :label-width="formLabelWidth"
          :rules="[
         
            {max: 11, message:'格式有误，请重新输入'},
            {pattern:'^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$',message:'手机号码有误，请重新输入'}
            ]"
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
              { pattern: '^\d{6}$', message: '格式有误，请重新输入'}
            ]"
        >
          <el-input v-model="ruleForm.companyPostCode" autocomplete="off" />
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
                v-model="ruleForm.data1"
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
                value-format="HH:MM:dd"
                v-model="ruleForm.date2"
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
          <el-select placeholder="请选择状态" v-model="ruleForm.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁止" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = true, submitForm('ruleForm')">保存</el-button>
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

      <el-table-column prop="address" label="操作" show-overflow-tooltip fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
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
      ruleFormt: {},
      companyname: "",
      tableData: [],
      search: "",
      delId: "",
      delMore: [],
      flager: false,
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
        data1: "",
        data2: "",
        expireTime: ""
      },
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
    //新增
    addForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
        .then(res => {});
    },

    //修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //提交
      this.ruleForm.expireTime =
        this.ruleForm.data1 + " " + this.ruleForm.date2;

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
            status: this.ruleForm.status,
            id: this.ruleForm.id,
            expireTime: this.ruleForm.expireTime
          }
        })
        .then(res => {});
    },

    handleEdit(index, row) {
      this.ruleForm = row;
    },
    handleDelete(index, row) {
      this.delId = row.id;
      // console.log(this.delId);
    },
    //删除
    deleteUser(id) {
      this.$http
        .get("/tenant/deleteTenant/", {
          id
        })
        .then(res => {
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
      console.log("多选删除");

      this.multipleSelection.forEach(element => {
        if (this.delMore.indexOf(element.id) < 0) {
          this.delMore.push(element.id);
        }
      });
      // console.log(this.delMore);

      this.deleteUser(this.delMore);
      // this.delMore = [];
    },
    //提醒
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
    //分页功能
    getInfo(companyname) {
      console.log(companyname);

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
          // console.log(this.tableData);
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
