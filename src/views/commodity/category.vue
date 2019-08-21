<template>
  <div id="category">
    <div class="nav">
      <el-button type="primary">增加</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <div class="cont">
      <el-tree
        ref="tree"
        :data="chargeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        @check-change="checkActive"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        chargeData: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        activeArr: []
      }
    },
    created() {
      this.getCommodityTypes()
    },
    methods: {
      /*获取商品类型*/
      async getCommodityTypes() {
        let data = {}
        let res = await this.$http.get('/materialCategory/getMaterialCategoryTree?id=', data)
        console.log(res)
        this.chargeData = res

      },
      /*修改状态的时候修改数据*/
      checkActive() {
        let res = this.$refs.tree.getCheckedNodes()
        res.forEach((item) => {
          this.activeArr.push(item.id)
        })
        console.log(this.activeArr)
      },
      /**/
    }
  }
</script>

<style lang='scss' type='text/scss' scoped>
  #category {
    padding: 30px;
    .cont {
      margin-top: 20px;
    }
  }
</style>
