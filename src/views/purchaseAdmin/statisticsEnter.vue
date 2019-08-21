<template>
    <div class="statisticsEnter" id="statisticsEnter">
        <div class="serach-wrap">
            <span>月份:</span>
            <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月">
            </el-date-picker>
            <el-button type="primary" class="btn" @click="handleSearch">查询</el-button>
            <span>当前销售总额：6515.5 </span>
            <span style="color:red;">注：此处包含零售+批发销售</span>
         </div>
        <div class="table">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="organName"
                  label="名称 "
                 >
                </el-table-column>
                <el-table-column
                  prop="defaultnumber"
                  label="单据编号">
                </el-table-column>
                <el-table-column
                  prop="materialsList"
                  label="型号">
                </el-table-column>
                <el-table-column
                  prop="opertimeStr"
                  label="扩展信息">
                </el-table-column>
                <el-table-column
                  prop="operpersonname"
                  label="单位">
                </el-table-column>
                 <el-table-column
                  prop="totalprice"
                  label="销售数量">
                </el-table-column>
                 <el-table-column
                  prop="discountlastmoney"
                  label="销售金额">
                </el-table-column>
                 <el-table-column
                  prop="discountlastmoney"
                  label="退货数量">
                </el-table-column>
                 <el-table-column
                  prop="discountlastmoney"
                  label="退货金额">
                </el-table-column>
                  <el-table-column
                  prop="discountlastmoney"
                  label="实际销售金额">
                </el-table-column>
              </el-table>
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
    data() {
        return {
            date:'',
            tableData:[],
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    methods:{
        /*查询用户商品ID 根据月份*/
        async seeUserMonth() {
            let data = {
            monthTime:this.monthTime,
            }
            await this.$http.get('/depotHead/findByMonth',data).then(res=>{
                console.log('查询用户商品ID 根据月份');
                console.log(res);
                if(res.code == 200) {
               
                } 
            })
        },
        /*进货统计表 查询列表 */
        async statistics() {
            let data = {
            monthTime:this.monthTime,
            headIds: '',
            materialIds:'',
            mpList:'规格,颜色,制造商,自定义1,自定义2',
            currentPage:this.pageNum,
            pageSize:this.pageSize
            }
            await this.$http.get('/depotItem/buyIn',data).then(res=>{
                console.log('进货统计表');
                console.log(res);
                if(res.code == 200) {
               
                } 
            })
        },
        handleSearch() {

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
#statisticsEnter {
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
.btn {
    margin: 0 20px;
}
.el-form-item {
    display: inline-block;
}
</style>
