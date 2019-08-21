<template>
    <div class="purchaseOrder" id="purchaseOrder">
         <div class="serach-wrap">
               <el-form class="titForm" ref="form" v-model="searchForm" label-width="100px" size="medium">
                <el-form-item label="单据编号：" :title="searchForm.number">
                    <el-input v-model="searchForm.number" placeholder="单据编号"></el-input>
                </el-form-item>
               <el-form-item label="商品信息：" :title="searchForm.materialParam">
                    <el-input v-model="searchForm.materialParam" placeholder="商品信息"></el-input>
                </el-form-item>
               <el-form-item label="单据日期：" >
                    <el-date-picker
                        v-model="searchForm.beginTime"
                        class="selectDate"
                        type="date"
                        @change="cahngeData(1)"
                        placeholder="选择月">
                    </el-date-picker>
                    <span class="kong">-</span>
                    <el-date-picker
                        v-model="searchForm.endTime"
                        class="selectDate"
                        type="date"
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
              <el-button type="primary" @click="batchRemove">删除</el-button>
              <el-button type="primary" @click="batchToexamine(0)">审核</el-button>
              <el-button type="primary" @click="batchToexamine(1)">反审核</el-button>
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
                  <template slot-scope="scope">
                      <el-button type="text" @click="seeDetails(scope.row)">查看</el-button>
                      <el-button type="text">编辑</el-button>
                      <el-button type="text" @click="tableInfo[0]=scope.row;batchRemove();">删除</el-button>
                      <el-button type="text">转采购入库</el-button>
                   </template>
                </el-table-column>
                <el-table-column
                  prop="organName"
                  label="供应商名称"
                 >
                </el-table-column>
                <el-table-column
                  prop="defaultnumber"
                  label="单据编号">
                </el-table-column>
                <el-table-column
                  prop="materialsList"
                  label="商品信息">
                </el-table-column>
                <el-table-column
                  prop="opertimeStr"
                  label="单据日期">
                </el-table-column>
                <el-table-column
                  prop="operpersonname"
                  label="操作员">
                </el-table-column>
                 <el-table-column
                  prop="totalprice"
                  label="金额合计">
                </el-table-column>
                 <el-table-column
                  prop="status"
                  label="状态">
                   <template slot-scope="scope">
                      <span v-if="scope.row.status == 0">未审核</span>
                      <span v-if="scope.row.status == 1">已审核</span>
                      <span v-if="scope.row.status == 2">已转采购</span>
                   </template>
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
import {mapState} from 'vuex'
export default {
  name: 'AppMain',
  data() {
      return {
          searchForm:{
              beginTime:'',
              endTime:'',
              number:'',
              materialParam:'',
          },
          value:'',
          tableData:[],
          tableInfo:[],
          pageNum: 1,
          pageSize: 10,
          total: 0,

          userBusinessValue:'',
      }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    console.log('user',this.user)
     /*查询用户仓库*/
    this.seeUserWarehouse().then(() => {
      this.seeOderList();
    });
    
  },
  methods: {
    seeDetails(item) {
      console.log(item);
      // this.$router.push({path:'addOrderInfo',params:{id:item.id,type:'1'}})
      //  this.$router.push({
      //     name: 'addOrderInfo',
      //     query: {
      //       id: item.id,
      //     }
      //   })
        this.$router.push({path: '/workbench/contract',query: {type:'1',id:row.id}})
    },
     /*查询用户仓库*/
      async seeUserWarehouse() {
        let data = {
          KeyId:this.user.userInfo.id,
          Type: 'UserDepot'
        }
        await this.$http.get('/userBusiness/getBasicData',data).then(res=>{
            console.log('查询用户仓库');
            console.log(res);
            if(res.code == 200) {
              let userBusinessList = res.data.userBusinessList[0].value.replace(/\[|]/g,',');
               userBusinessList = userBusinessList.split(',')
              let list =  userBusinessList.filter((item,index) => {
                    return item && item.trim();
              })
              this.userBusinessValue = list.join(',');
            } 
        })
      },
      /*采购订单列表 */ 
      async seeOderList() {
        let timeS,timeE;
        if (this.searchForm.beginTime && this.searchForm.endTime) {
          timeS = this.$method.getSTime1(this.searchForm.beginTime);
          timeE = this.$method.getSTime1(this.searchForm.endTime);
          timeS = timeS + ' '+ '00:00:00';
          timeE = timeE + ' '+ '23:59:59';
        } else {
          timeS = '';
          timeE = '';
        }
         let data = {
          "search": {
            "depotIds":this.userBusinessValue,
            "type": "",
            "subType": "",
            "state": "",
            "number": this.searchForm.number,
            "beginTime": timeS,
            "endTime": timeE,
            "materialParam": this.searchForm.materialParam,
          },
          "currentPage":this.pageNum,
          "pageSize":this.pageSize,
        }
        
        // 商品信息
        if(this.searchForm.materialParam) {
          const reg = /^([\u4e00-\u9fa5]{1,},){0,}([\u4e00-\u9fa5]{1,})$/; 
          if (!reg.test(this.searchForm.materialParam)) {
            this.$message.error('请用英文逗号分离');
            return;
          } 
        }   
        console.log('data');
        console.log(data);
        
        // data.search
        await this.$http.get('/depotHead/list',data).then(res=>{
            console.log('采购订单列表');
            console.log(res);
            if(res.code == 200) {
              this.tableData = res.data.page.rows;
              this.total = res.data.page.total;
            } 
        })
      },
      /*批量审核/反审核*/
      async batchToexamine(status) {
        if (this.tableInfo.length) {
            let statutList = [];
            await this.tableInfo.map((item) => {
               statutList.push(item.status);
            })
            statutList = [...new Set(statutList)];
            console.log(statutList);

            if(statutList.length > 1 ) {
              this.$message.error('请选择相同状态的订单!');
              return;
            } else {
               if(statutList[0]  != status) {
                 let tit = status == 0 ? '请选择未审核状态下的订单' : '请选择已审核状态下的订单'
                 this.$message.error(tit);
                 return;
               }
            }
            /*审核*/
            this.toexamine();

        } else {
          this.$message.error('请选择订单')
        }
      },
      /*审核接口*/
      async toexamine() {
        let reviewStatus =  this.tableInfo[0].status;
        let tit;
        if(reviewStatus == 0) {
            reviewStatus = 1;
            tit='审核成功';
        } else {
           reviewStatus = 0;
           tit='反审核成功';
        }
        let auditIds = [];
        await this.tableInfo.map((item) => {
            auditIds.push(item.id);
        })
        let data = {
          status: reviewStatus,
          depotHeadIDs : auditIds.join(',')
        }
        console.log('审核接口,data');
        console.log(data);
        await this.$http.post('/depotHead/batchSetStatus',data).then(res=>{
            console.log('批量审核/反审核');
            console.log(res);
            if(res.code == 200) {
              this.seeOderList();
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } 
        })
      },
      /*删除,批量删除*/
      async batchRemove() {
         if (this.tableInfo.length) {
          console.log(this.listInfo);
          let idList = [];  //符合条件id数组
          let noApi = false; 
          await this.tableInfo.map((item) => {
              if(item.status == 0) {
                  idList.push(item.id);
              } else {
                noApi = true;
              }
          })
          if(noApi) {
             this.$message.error('已审核和已转的单据不能删除!');
             return;
          }
          this.$confirm('确定要删除选中的单据吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              /*删除单据 */
               this.removeOder(idList);

            }).catch(() => {
                  
            });
            } else {
              this.$message.error('请选择客户')
            }
      },
      /*删除接口 */
      async removeOder(idList) {
        console.log('idList');
        console.log(idList);
        let data = {
          ids: idList.join(',')
        }
        await this.$http.get('/depotHead/batchDeleteDepotHeadAndDetail',data).then(res=>{
            console.log('批量删除接口');
            console.log(res);
            if(res.code == 200) {
              this.seeOderList();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } 
        })
      },
      add() {
        this.$router.push({path:'addOrderInfo'});
      },
      reset() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchForm = {
              beginTime:'',
              endTime:'',
              number:'',
              materialParam:'',
        };
        this.seeOderList();
      },
      handleSearch() {
        this.seeOderList();
      },
      /*多选*/
      handleSelectionChange(val) {
        console.log(val);
        this.tableInfo = val;
      },
      /*日期 */
      cahngeData(type) {
        if (this.searchForm.beginTime && this.searchForm.endTime) {
          let start = new Date(this.searchForm.beginTime).getTime()
          let end = new Date(this.searchForm.endTime).getTime()
          console.log(start);
          console.log(end);
          if (start > end) {
            this.$message.error('终止时间不能小于开始时间')
            if (type == 1) {
              this.searchForm.beginTime = '';
            } else if (type == 2) {
              this.searchForm.endTime = '';
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
