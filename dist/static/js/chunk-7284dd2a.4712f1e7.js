(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7284dd2a"],{ad8f:function(e,t,l){"use strict";l.d(t,"b",function(){return n}),l.d(t,"a",function(){return a});var o=l("b775");function n(e){return Object(o["a"])({url:"/table/list",method:"get",params:e})}function a(e){return Object(o["a"])({url:"/user/base/getAll",method:"get",params:e})}},cff2:function(e,t,l){"use strict";l.r(t);var o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{ref:"form",attrs:{inline:"",model:e.sizeForm,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"机器组"}},[l("el-select",{attrs:{placeholder:"请选择机器组"},model:{value:e.sizeForm.region,callback:function(t){e.$set(e.sizeForm,"region",t)},expression:"sizeForm.region"}},[l("el-option",{attrs:{label:"小区",value:"xiaoqu"}}),e._v(" "),l("el-option",{attrs:{label:"办公楼",value:"bangonglou"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"机器"}},[l("el-input",{model:{value:e.sizeForm.name,callback:function(t){e.$set(e.sizeForm,"name",t)},expression:"sizeForm.name"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"success",icon:"el-icon-search"}},[e._v("查询")])],1),e._v(" "),l("el-form-item",{staticStyle:{float:"right"}},[l("el-button",{attrs:{type:"primary",icon:"el-icon-setting"},on:{click:function(t){return e.$router.push("machineGroup")}}},[e._v("机器组设置")])],1)],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器编号"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器名称"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器位置"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器组"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"商家"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"省市"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"经度"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"纬度"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"货道数"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center",align:"center","show-overflow-tooltip":"",prop:"num",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(l){return e.editMachine(t)}}},[e._v("修改")])]}}])})],1)],1)},n=[],a=l("ad8f"),r={name:"Machine",filters:{statusFilter:function(e){var t={published:"success",draft:"gray",deleted:"danger"};return t[e]}},data:function(){return{list:null,listLoading:!1,sizeForm:{name:"",region:""}}},created:function(){},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(a["b"])().then(function(t){e.list=t.data.items,e.listLoading=!1})}}},i=r,s=l("2877"),c=Object(s["a"])(i,o,n,!1,null,null,null);t["default"]=c.exports}}]);