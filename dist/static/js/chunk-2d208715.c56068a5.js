(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d208715"],{a58c:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{ref:"form",attrs:{model:e.form,inline:""}},[l("el-form-item",{attrs:{label:"类别"}},[l("el-input",{attrs:{placeholder:"请输入编码/类别"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"商品"}},[l("el-input",{attrs:{placeholder:"请输入编码/名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"审核状态"}},[l("el-select",{attrs:{placeholder:"请选择审核状态"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[l("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),l("el-option",{attrs:{label:"未审核",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"已审核",value:"1"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"创建时间"}},[l("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"success",icon:"el-icon-search"}},[e._v("查询")])],1),e._v(" "),l("el-row",{staticStyle:{float:"right"}},[l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editMachine()}}},[e._v("新增")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.delMachine}},[e._v("删除")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.examineMachine}},[e._v("审核")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.$router.push("category")}}},[e._v("类别设置")])],1)],1)],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[l("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"商品编码"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"商品名称"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"图片"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"单价"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"进价"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"供应商"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"规格"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"类型"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"保质期"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"时间"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"商品审核"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"说明"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"num",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(l){return e.editMachine(t.index)}}},[e._v("修改")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:e.machineTit,visible:e.dialogEditVisible,width:"700px"},on:{"update:visible":function(t){e.dialogEditVisible=t}}},[l("el-form",{attrs:{model:e.form,inline:"","label-position":"right","label-width":"110px"}},[l("el-form-item",{attrs:{label:"商品编码"}},[l("el-input",{attrs:{maxlength:"12"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"商品名称"}},[l("el-input",{attrs:{maxlength:"20"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"规格"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"单价"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"供应商"}},[l("el-select",{staticStyle:{width:"180px"},attrs:{placeholder:"--请选择--"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[l("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),l("el-option",{attrs:{label:"未审核",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"已审核",value:"1"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"类型"}},[l("el-select",{staticStyle:{width:"180px"},attrs:{placeholder:"--请选择--"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[l("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),l("el-option",{attrs:{label:"未审核",value:"0"}}),e._v(" "),l("el-option",{attrs:{label:"已审核",value:"1"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"进价"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"保质期"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"说明"}},[l("el-input",{staticStyle:{width:"495px"},attrs:{type:"textarea",maxlength:"200"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogEditVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogEditVisible=!1}}},[e._v("保 存")])],1)],1)],1)},o=[],n={name:"Information",data:function(){return{list:null,listLoading:!1,form:{name:"",region:"",date:new Date,date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},dialogEditVisible:!1,machineTit:"新增商品信息"}},created:function(){},methods:{editMachine:function(e){this.machineTit=e?"编辑商品信息":"新增商品信息",this.dialogEditVisible=!this.dialogEditVisible},examineMachine:function(){var e=this;this.$confirm("商品审核后在货道中可以编辑，确定审核么?","提示",{confirmButtonText:"确定",cancelButtonText:"关闭",type:"warning"}).then(function(){e.$message({type:"success",message:"审核成功!"})}).catch(function(){e.$message({type:"info",message:"已取消审核"})})},delMachine:function(){var e=this;this.$confirm("商品删除后不可恢复，确定删除么?","提示",{confirmButtonText:"确定",cancelButtonText:"关闭",type:"warning"}).then(function(){e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}}},r=n,i=l("2877"),s=Object(i["a"])(r,a,o,!1,null,null,null);t["default"]=s.exports}}]);