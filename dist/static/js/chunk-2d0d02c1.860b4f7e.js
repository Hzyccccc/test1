(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d02c1"],{"679c":function(e,t,l){"use strict";l.r(t);var o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{ref:"form",attrs:{inline:""}},[l("el-form-item",[l("el-input",{attrs:{placeholder:"请输入机器名称/编号"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"success",icon:"el-icon-search"}},[e._v("查询")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"}},[e._v("在线数：13")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"warning"}},[e._v("离线数：13")])],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"danger"}},[e._v("停运：152")])],1)],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"Loading",border:"","highlight-current-row":""}},[l("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"商家"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器编号"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"机器位置"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"状态"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"网络状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("在线")]),e._v(" "),l("el-button",{attrs:{size:"warning",type:"danger"}},[e._v("离线")])]}}])}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"网络延时"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"货道"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"温度"}}),e._v(" "),l("el-table-column",{attrs:{"header-align":"center","show-overflow-tooltip":"",prop:"num",label:"最后更新时间"}})],1)],1)},a=[],n={name:"MachineStatus",data:function(){return{list:null,listLoading:!1,name:""}},created:function(){},methods:{}},r=n,i=l("2877"),s=Object(i["a"])(r,o,a,!1,null,null,null);t["default"]=s.exports}}]);