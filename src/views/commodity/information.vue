<template>
  <div id="information">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="类型">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="品号">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cont">
      <div class="operation">
        <el-button>增加</el-button>
        <el-button>删除</el-button>
        <el-button>启用</el-button>
        <el-button>禁用</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="品名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="型号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="扩展信息"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="单位"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="安全存量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="库存"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="零售价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="最低售价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="预计采购价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="批发价"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="序列号"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'information',
    data() {
      return {
        navFrom: {
          name: ''
        },
        tableData: [{
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
  #information {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .operation {
      margin-bottom: 20px;
    }

  }
</style>
