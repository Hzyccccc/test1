(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aba7c"],{"15ce":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{ref:"form",attrs:{model:e.form,inline:""}},[l("el-form-item",{attrs:{label:"供应商"}},[l("el-input",{attrs:{placeholder:"请输入商家编码/名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"创建时间"}},[l("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"success",icon:"el-icon-search"}},[e._v("查询")])],1),e._v(" "),l("el-form-item",{staticStyle:{float:"right"}},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editMachine()}}},[e._v("新增")])],1)],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[l("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"编号"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"供应商"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"地址"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"电话号码"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"联系人"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"传真"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"Email"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"创建人"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"创建时间"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"num",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(l){return e.editMachine(t.index)}}},[e._v("修改")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.delMachine(t.index)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:e.machineTit,visible:e.dialogEditVisible,width:"700px"},on:{"update:visible":function(t){e.dialogEditVisible=t}}},[l("el-form",{attrs:{model:e.form,inline:"","label-position":"right","label-width":"120px"}},[l("el-form-item",{attrs:{label:"编号"}},[l("el-input",{attrs:{maxlength:"12"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{attrs:{maxlength:"20"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"合同编号"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"税号编号"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"邮政编码"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"营业电话"}},[l("el-input",{attrs:{type:"tel"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系人"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"传真"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"Email"}},[l("el-input",{attrs:{type:"email"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系电话"}},[l("el-input",{attrs:{type:"tel"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"营业地址"}},[l("el-input",{staticStyle:{width:"495px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"注册地址"}},[l("el-input",{staticStyle:{width:"495px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogEditVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogEditVisible=!1}}},[e._v("确 定")])],1)],1)],1)},o=[],n={name:"Supplier",data:function(){return{list:null,listLoading:!1,form:{name:"",region:"",date:new Date,date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},dialogEditVisible:!1,machineTit:"新增"}},created:function(){},methods:{editMachine:function(e){this.machineTit=e?"编辑":"新增",this.dialogEditVisible=!this.dialogEditVisible}}},i=n,r=l("2877"),m=Object(r["a"])(i,a,o,!1,null,null,null);t["default"]=m.exports}}]);