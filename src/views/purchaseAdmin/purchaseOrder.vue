<template>
    <div class="purchaseOrder" id="purchaseOrder">
         <div class="serach-wrap">
               <el-form class="titForm" ref="form" v-model="searchForm" label-width="100px" size="medium">
                <el-form-item label="单据编号：" :title="searchForm.contactName">
                    <el-input v-model="searchForm.contactName" placeholder="单据编号"></el-input>
                </el-form-item>
               <el-form-item label="商品信息：" :title="searchForm.contactName">
                    <el-input v-model="searchForm.contactName" placeholder="商品信息"></el-input>
                </el-form-item>
               <el-form-item label="单据日期：" :title="searchForm.contactName">
                    <el-date-picker
                        v-model="searchForm.startPeriod"
                        class="selectDate"
                        type="month"
                        @change="cahngeData(1)"
                        placeholder="选择月">
                    </el-date-picker>
                    <span class="kong">-</span>
                    <el-date-picker
                        v-model="searchForm.endPeriod"
                        class="selectDate"
                        type="month"
                        @change="cahngeData(2)"
                        placeholder="选择月">
                    </el-date-picker>
                    </el-form-item>
                <el-form-item class="lastItem">
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
               </el-form>
         </div>
         <div class="cont">
            <div class="operation">
              <el-button type="primary" @click="add">增加</el-button>
              <el-button type="primary">删除</el-button>
              <el-button type="primary">审核</el-button>
              <el-button type="primary">反审核</el-button>
            </div>
            <div class="table">
              <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                border
                style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                <el-table-column
                  prop="date"
                  label="操作"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="供应商名称"
                 >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="单据编号">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="商品信息">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="单据日期">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作员">
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="金额合计">
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="状态">
                </el-table-column>
              </el-table>
            </div>
                <!--工具条-->
              <el-pagination
                :page-size="pageSize"
                :current-page.sync="pageNum"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15, 20,50,100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
         </div>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
      return {
          searchForm:{
              startPeriod:'',
              endPeriod:'',
              contactName:'',
          },
          value:'',
          tableData:[],
          tableInfo:[],
          pageNum: 1,
          pageSize: 10,
          total: 0,
      }
  },
  methods: {
      add() {
        this.$router.push({path:'addOrderInfo'});
      },
      reset() {
        
      },
      handleSearch() {

      },
      /*多选*/
      handleSelectionChange(val) {
        this.tableInfo = val;
      },
      /*日期 */
      cahngeData(type) {
        if (this.searchForm.startPeriod && this.searchForm.endPeriod) {
          let start = new Date(this.searchForm.startPeriod).getTime()
          let end = new Date(this.searchForm.endPeriod).getTime()
          console.log(start);
          console.log(end);
          if (start > end) {
            this.$message.error('终止时间不能小于开始时间')
            if (type == 1) {
              this.searchForm.startPeriod = '';
            } else if (type == 2) {
              this.searchForm.endPeriod = '';
            }
          }
        }
      },
       /*切换分页*/
      handleCurrentChange() {
        // this.quotationList();
      },
      /*切换每页多少条*/
      handleSizeChange(val) {
        this.pageNum = 1
        this.pageCount = val
        // this.quotationList()
      },
  }
}
</script>

<style lang="scss" scoped>
  #purchaseOrder {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    .serach-wrap {
    margin: 20px 0;
    }
    .operation {
      margin-bottom: 20px;
    }

  }
</style>

<style lang="scss">

.el-form-item {
    display: inline-block;
}
</style>
