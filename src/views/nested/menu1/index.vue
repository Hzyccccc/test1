<template>
  <div>
    <h2>新增商品</h2>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="公司名称">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="上级机构">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="全称">
        <el-col :span="11">
          <el-input v-model="sizeForm.allName" />
        </el-col>
      </el-form-item>
      <el-form-item label="简称">
        <el-col :span="11">
          <el-input v-model="sizeForm.smallName" />
        </el-col>
      </el-form-item>
      <el-form-item label="状态">
        <el-col :span="11">
          <el-input v-model="sizeForm.state" />
        </el-col>
      </el-form-item>
      <el-form-item label="编号">
        <el-col :span="11">
          <el-input v-model="sizeForm.state" />
        </el-col>
      </el-form-item>
      <el-form-item label="序号">
        <el-col :span="11">
          <el-input v-model="sizeForm.state" />
        </el-col>
      </el-form-item>
      <el-form-item label="开业时间">
        <el-col :span="11">
          <el-date-picker v-model="sizeForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>

      </el-form-item>
      <el-form-item label="停业时间">
        <el-col :span="11">
          <el-time-picker v-model="sizeForm.date2" placeholder="选择时间" style="width: 100%;" />
        </el-col>
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          v-model="sizeForm.textarea"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="暂无备注信息"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Menu1',

  data() {
    return {
      sizeForm: {
        name: '',
        allName: '',
        smallName: '',
        state: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        textarea: ''
      }
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>
<style lang="scss" scoped>
    h2 {
      padding-left: 20px
    }
</style>

