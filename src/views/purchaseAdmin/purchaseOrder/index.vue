<template>
    <div class="purchaseOrder">
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
          value:''
      }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.serach-wrap {
    margin: 20px 0;
}
.el-form-item {
    display: inline-block;
}
</style>
