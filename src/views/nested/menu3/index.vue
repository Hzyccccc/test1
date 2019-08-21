<template>
  <div>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增部门</el-button>
    <el-button type="danger" size="mini" v-show="flager" @click="delAll">删除</el-button>
    <!-- 树状结构 -->
    <div class="custom-tree-container">
      <div class="block">
        <p>部门列表</p>
        <el-tree
          :data="requert"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          @check-change="handleCheckChange"
        ></el-tree>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <!-- 添加公司表单 -->
    <el-dialog title="添加部门信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择公司名称'}
            ]"
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

        <el-form-item label="上级机构" prop="orgParentName" :label-width="formLabelWidth">
          <el-cascader
            :options="requerts"
            :props="props"
            :show-all-levels="false"
            v-model="form.orgParentName"
            change-on-select
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="全称"
          prop="orgFullName"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'全称不能为空'},
            {max: 60, message:'超过最大长度，请重新输入'},
           
            ]"
        >
          <el-input v-model="form.orgFullName" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="简称"
          prop="orgAbr"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'简称不能为空'},         
            {max: 40, message:'超过最大长度，请重新输入'},
            
            ]"
        >
          <el-input v-model="form.orgAbr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="orgStcd" :label-width="formLabelWidth">
          <el-select placeholder="请选择状态" v-model="form.orgStcd" label>
            <el-option label="未营业" value="1"></el-option>
            <el-option label="正常营业" value="2"></el-option>
            <el-option label="暂停营业" value="3"></el-option>
            <el-option label="终止营业" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="编号"
          prop="orgNo"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写编号'}
            ]"
        >
          <el-input v-model="form.orgNo" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="序号"
          prop="sort"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写序号'},
            ]"
        >
          <el-input v-model.number="form.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开创时间" prop="orgCreateTime" :label-width="formLabelWidth">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="form.orgCreateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="停业时间" prop="orgStopTime" :label-width="formLabelWidth">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="form.orgStopTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="remark"
          :rules="[
          {
            max: 200, message: '输入过长，只允许输入200个字符'
          }]"
        >
          <el-input
            type="textarea"
            v-model="form.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="暂无备注信息"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = flagers, submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑公司表单 -->
    <el-dialog title="编辑部门信息" :visible.sync="logFormVisible">
      <el-form :model="editId" ref="editId">
        <el-form-item
          label="公司名称"
          prop="companyName"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择公司名称'}
            ]"
        >
          <el-select no-data-text="请选择公司名称" :disabled="testName" v-model="editId.companyName">
            <el-option
              v-for="item in this.userCompanyName"
              :key="item.tenantId"
              :label="item.companyName"
              size="mini"
              :value="item.tenantId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上级机构" prop="orgParentName" :label-width="formLabelWidth">
          <el-cascader
            :options="requerts"
            :props="props"
            :show-all-levels="false"
            change-on-select
            v-model="editId.orgParentName"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="全称"
          prop="orgFullName"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'全称不能为空'},
            {max: 60, message:'超过最大长度，请重新输入'},
           
            ]"
        >
          <el-input v-model="editId.orgFullName" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="简称"
          prop="orgAbr"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'简称不能为空'},         
            {max: 40, message:'超过最大长度，请重新输入'},
            
            ]"
        >
          <el-input v-model="editId.orgAbr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="orgStcd" :label-width="formLabelWidth">
          <el-select placeholder="请选择状态" v-model="editId.orgStcd" label>
            <el-option label="未营业" value="1"></el-option>
            <el-option label="正常营业" value="2"></el-option>
            <el-option label="暂停营业" value="3"></el-option>
            <el-option label="终止营业" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="编号"
          prop="orgNo"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写编号'}
            ]"
        >
          <el-input v-model="editId.orgNo" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="序号"
          prop="sort"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写序号'},
              { max: 20, message: '超出最大长度，请重新输入'}
            ]"
        >
          <el-input v-model.number="editId.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开创时间" prop="orgCreateTime" :label-width="formLabelWidth">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="editId.orgCreateTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="停业时间" prop="orgStopTime" :label-width="formLabelWidth">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="editId.orgStopTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="remark"
          :rules="[
          {
            max: 200, message: '输入过长，只允许输入200个字符'
          }]"
        >
          <el-input
            type="textarea"
            v-model="editId.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="暂无备注信息"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logFormVisible = false">取消</el-button>
        <el-button type="primary" @click="logFormVisible = flagers, editForm('editId')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
  import { mapState } from 'vuex'
export default {
  name: "SettingsMenu1",
  data() {
    return {
      requert: [],
      defaultProps: {
        value:'attributes',
        children: "children",
        label: "text"
      },
      //编辑的保存数组
      editId: {},
      editID:'',
      search: "",
      flag: false,
      flager: false,
      flagers: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      logFormVisible: false,
      requerts: [],
      props: {
        value: "attributes",
        label: "text",
        children: "children"
      },
      companyContacts: "",
      form: {
        orgParentName: "",
        orgParentNo: "",
        selectType: "",
        orgFullName: "",
        id: "",
        orgAbr: "",
        orgStcd: "",
        orgNo: "",
        sort: "",
        orgCreateTime: "",
        orgStopTime: "",
        remark: ""
      },
      formLabelWidth: "120px",
      dataLink: [],
      value1: "",
      value2: "",
      userCompanyName:'',
      LoginName:''

    };
  },
  computed:{
    ...mapState(['user'])
  },
  created() {
    this.getOrganizationTree();
    this.loginUser()
  },

  methods: {
    loginUser(){
      
      
      this.LoginName = this.user.userInfo.loginame

      this.userCompanyName = this.user.userInfo.companyName
      if(this.LoginName === 'admin') {
        this.testName = false
        this.$http.get('/tenant/tenantSelect').then(res=>{
          console.log(res);
          console.log('0000000');
          // res.data.forEach(element => {
            
          // });
          this.userCompanyName = res.data
          console.log(this.userCompanyName);
          console.log(res);
          
          
          
        })

      }else {
        this.testName = true
        this.form.companyName = this.userCompanyName
      }
    },
    //选择上级机构的值
    handleChange(value) {
      
      this.form.orgParentNo = value[value.length-1];
      
    },

    //删除选中的部门
    delAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.flagers = false;
          let Link
          Link = this.dataLink.join(",")
          this.$http
            .post("/organization/batchDeleteOrganization", {
              ids: Link
            })
            .then(res => {
              this.getOrganizationTree();
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.flagers = true;

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击复选框提取ID
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.dataLink.push(data.id);
      } else {
        this.dataLink.splice(
          this.dataLink.findIndex(item => item.id === data.id),
          1
        );
      }

      console.log(this.dataLink);
      if (this.dataLink.length >= 2) {
        this.flager = true;
      } else {
        this.flager = false;
      }
    },
    //新增验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.editId.tenantId = this.editId.companyName
          this.$http
            .post("/organization/addOrganization", {
              info: this.form
            })
            .then(res => {
              // for (let key in this.form) {
              //   this.form[key] = "";
              // }
              this.form={}
              
              
              this.dialogFormVisible = false
              this.getOrganizationTree();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改部门信息
    append(data) {
      this.editID = data.id
      
     this.$http.post('/organization/findById',{
       id:this.editID
     }).then(res=>{
       this.editId = res.data
      // this.editId.companyName = this.userCompanyName[0]
      // this.editId.orgCreateTime

      
       this.logFormVisible = true;
     })
      
    },
    //修改提交
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          // this.editId.orgParentNo = this.editId.attributes
      
          this.editId.tenantId = this.editId.companyName
          this.$http.post("/organization/editOrganization", {
              info: this.editId
            })
            .then(res => {
              for (let key in this.editId) {
                this.editId[key] = "";
              }
              this.getOrganizationTree();
              this.logFormVisible = false
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加
    add(data) {
      if (!this.dialogFormVisible) {
        const newChild = { id: id++, label: this.userName, children: [] };
        if (!data.children) {
          this.$set(data, "children", []);
        }
        data.children.push(newChild);
      }
    },
    //提醒
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.flag = true;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.flag = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/organization/batchDeleteOrganization", {
              ids: data.id
            })
            .then(res => {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
            });
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
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              
              on-click={() => this.append(data)}
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    
    //请求部门列表
    getOrganizationTree() {
      
      this.$http
        .post("organization/getOrganizationTree", {
          id: -1
        })
        .then(res => {
          this.requert = res.data;

          this.requerts = res.data;
          console.log(this.requerts);
        })
        .catch(req => {});
    }
  }
};
</script>

<style lang="scss" >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.block {
  p {
    padding: 10px;
  }
}
</style>
