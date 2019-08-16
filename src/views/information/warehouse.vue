<template>
  <div id="warehouse">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="仓库名称：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <el-button type="primary" @click="">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="cont">
      <div class="operation">
        <el-button>增加</el-button>
        <el-button>删除</el-button>
        <el-button>设为默认</el-button>
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
            label="仓库名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓库地址"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="仓储费"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="搬运费"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="负责人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="排序"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否默认"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change=""
        @current-change=""
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <el-dialog
      title="增加仓库信息"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="addBox">
        <el-form label-position="right" label-width="120px" :model="addFrom">
          <el-form-item label="仓库名称：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址	：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="仓储费：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="搬运费：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="addFrom.name"
              maxlength="30"
              show-word-limit
            >
            </el-input>
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
    name: 'warehouse',
    data() {
      return {
        /*添加弹出框信息*/
        addVisible: true,
        activeIndex: 1,
        addFrom: {},
        serialList: [
          {
            id: 1,
            name: '禁用'
          },
          {
            id: 2,
            name: '启用'
          }
        ],
        serialNum: '',

        pageNum: 1,
        pageSize: 15,
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
  #warehouse {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .nav {
      .el-input {
        width: 100px;
      }
    }
    .operation {
      margin-bottom: 20px;
    }
    .table {
      .oper {
        span {
          font-size: 16px;
          color: #409EFF;
          cursor: pointer;
          margin: 0 5px;
        }
      }
    }
    .addCont {
      width: 600px;
      .tab {
        margin-bottom: 20px;
      }
      .btn {
        text-align: center;
      }

    }
  }
</style>
<style lang="scss" type="text/scss">
  #warehouse {
    .addCont.el-dialog {
      width: 600px;
      .el-form-item:nth-last-child(-n+2) {
        width: 100%;
      }
      .el-input {
        width: 400px;
      }
      .el-textarea{
        width: 400px;
      }
    }
  }
</style>
