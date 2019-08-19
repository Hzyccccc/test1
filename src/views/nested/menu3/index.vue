<template>
  <div>
    <!-- 树状结构 -->
    <div class="custom-tree-container">
      <div class="block">
        <p>商品类别列表</p>
        <el-tree
          :data="requert"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        ></el-tree>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <!-- 编辑公司表单 -->
    <!-- <el-dialog title="添加部门信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item
          label="公司名称"
          prop="status"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请选择状态'}
            ]"
        >
          <el-select placeholder="请选择状态" v-model="form.orgParentName">
            <el-option label="未营业" value="1"></el-option>
            <el-option label="正常营业" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="上级机构"
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
          label="全称"
          prop="contactnumber"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'全称不能为空'},
            {max: 60, message:'超过最大长度，请重新输入'},
           
            ]"
        >
          <el-input v-model.number="ruleForm.contactnumber" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="简称"
          prop="companyTel"
          :label-width="formLabelWidth"
          :rules="[
            {required: true, message:'简称不能为空'},         
            {max: 40, message:'超过最大长度，请重新输入'},
            
            ]"
        >
          <el-input v-model.number="ruleForm.companyTel" autocomplete="off" />
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
            <el-option label="未营业" value="1"></el-option>
            <el-option label="正常营业" value="2"></el-option>
            <el-option label="暂停营业" value="3"></el-option>
            <el-option label="终止营业" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="编号"
          prop="companyPostCode"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写编码'}
            ]"
        >
          <el-input v-model="ruleForm.companyPostCode" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="序号"
          prop="companyPostCode"
          :label-width="formLabelWidth"
          :rules="[
              { required: true, message: '请填写序号'}
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
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = true, submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog> -->
    <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
  </div>
</template>
<script>
import { log } from "util";
let id = 1000;

export default {
  name: "SettingsMenu1",
  data() {
    return {
      requert: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      search: "",
      flag:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
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
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getOrganizationTree();
  },
  methods: {
    append(data) {
      this.dialogFormVisible = true;
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
          this.flag = true
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.flag = false
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    remove(node, data) {
      this.open()
      if(this.flag){
        this.$http.post('/organization/batchDeleteOrganization',{
          ids:data.id
        }).then(res=>{
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        })
      }
      
    },
// ············<el-button
//               size="mini"
//               type="text"
//               on-click={() => this.append(data)}
//             >
//               添加
//             </el-button>
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>  
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
      console.log(11);

      this.$http
        .post("organization/getOrganizationTree", {
          id: -1
        })
        .then(res => {
          console.log(222);

          this.requert = res.data;
          console.log(this.requert);
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
