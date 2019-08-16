<template>
  <div id="metering">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="计量单位：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <el-button type="primary" @click="">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="meteringCont">
      <div class="operation">
        <el-button>增加</el-button>
        <el-button>删除</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="oper">
                <span class="iconfont iconshanchu"></span>
                <span class="iconfont iconbianji"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="计量单位">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="增加计量单位"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="addBox">
        <el-form label-position="right" label-width="120px" :model="addFrom">
          <el-form-item label="基本单位：">
            <el-input v-model="addFrom.name"></el-input>
            <span>基本单位应为最小度量单位</span>
          </el-form-item>
          <el-form-item label="副单位：">
            <el-input v-model="addFrom.name"></el-input>
            <span>=</span>
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'metering',
    data() {
      return {
        /*添加弹出框信息*/
        addVisible: true,
        activeIndex: 1,
        addFrom: {},

        navFrom: {
          name: ''
        },
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }]
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #metering {
    .nav {
      margin-bottom: 20px;
    }
    .meteringCont {
      .operation {
        margin-bottom: 20px;
      }
      .table {
        .oper {
          span {
            font-size: 16px;
            color: #409EFF;
            margin: 0 5px;
          }
        }
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  #metering {
    .addBox {
      .el-input {
        width: 100px;
      }
    }
    .btn {
      text-align: center;
    }
  }
</style>
