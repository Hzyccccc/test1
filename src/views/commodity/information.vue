<template>
  <div id="information">
    <div class="nav">
      <el-form :inline="true" :model="navFrom" class="demo-form-inline">
        <el-form-item label="类型：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="品号：">
          <el-input v-model="navFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
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
      title="提示"
      :visible.sync="addVisible"
      custom-class="addCont"
      center>
      <div class="tab">
        <el-radio-group v-model="activeIndex" size="small">
          <el-radio-button label="1">基本信息</el-radio-button>
          <el-radio-button label="2">价格信息</el-radio-button>
          <el-radio-button label="3">扩展信息</el-radio-button>
        </el-radio-group>
      </div>
      <div v-show="activeIndex==1" class="addBox">
        <el-form label-position="right" label-width="120px" :model="addFrom">
          <el-form-item label="品名：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="型号：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="序列号：">
            <el-select v-model="serialNum" placeholder="请选择">
              <el-option
                v-for="item in serialList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
      <div v-show="activeIndex==2"class="addBox">
        <el-form label-position="right" label-width="120px" :model="addFrom">
          <el-form-item label="安全存量：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="单位：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="零售价：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="预计采购价：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="批发价：">
            <el-input v-model="addFrom.type"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="activeIndex==3" class="addBox">
        <el-form label-position="right" label-width="80px" :model="addFrom">
          <el-form-item label="规格：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="颜色：">
            <el-input v-model="addFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="制造商：">
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
    name: 'information',
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
        serialNum:'',

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
  #information {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .operation {
      margin-bottom: 20px;
    }
    .table{
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
  #information {
    .addCont.el-dialog {
      width: 600px;
      .el-input__inner {
        width: 400px;
      }
      .el-input__inner {
        width: 400px;
      }
    }
  }
</style>
