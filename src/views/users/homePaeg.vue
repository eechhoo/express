<template>
  <div>
      <div class="tools">

        <div class="search">
          <el-input
            placeholder="查询快递单号"
            prefix-icon="el-icon-search"
            v-model="search"
            class="search-input"
            @change="this.searchChange"
          >
          </el-input>

            <el-table
                v-if="searchData"
                :data="searchData"
                style="width: 100%">
                <el-table-column
                  prop="AcceptTime"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="AcceptStation"
                  label="地址"
                  min-width="400">
                </el-table-column>
              </el-table>
        </div>
      </div>


      <el-collapse>
        <el-collapse-item title="待签收包裹">
          <div>{{ pack.awaitSigned }}</div>
        </el-collapse-item>
        <el-collapse-item title="在途包裹" name="2">
          <div></div>
        </el-collapse-item>
        <el-collapse-item title="寄出包裹" name="3">
          <div></div>
        </el-collapse-item>
      </el-collapse>


        <div class="list">
          <el-table :data="tableData" stripe style="width: 100%; margin-top:100px" class="el-table"  >
            <el-table-column prop="msg" label="消息通知："> </el-table-column>
            <el-table-column prop="time" width="180"> </el-table-column>
          </el-table>

      </div>

  </div>


</template>

<script>
const axios = require('axios')
// const md5Hex = require('md5-hex');
var md5Hex = require("blueimp-md5");
const querystring = require('querystring')
//请求url --正式地址
const Url = 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx'
//用户ID，快递鸟提供，注意保管，不要泄漏
const EBusinessID = '1739637';//即用户ID，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx 
//API key，快递鸟提供，注意保管，不要泄漏
const ApiKey = '46e87f88-f949-4b2b-8714-92d4efcdaae1';//即API key，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx
import goodsApi from "@/api/goods";
  export default {
    data() {
      return {
        search:'',
        searchMap:{phone:'18724534985'},
        pack:{
          all:'',
          onroad:'',
          awaitSigned:'',
          send:''
        },
        searchData: [ 
  //         {
  //   "AcceptStation" : "【牡丹江东京城镇】，【张宇/13141294446】已揽收",
  //   "AcceptTime" : "2021-11-05 12:13:52"
  // }, {
  //   "AcceptStation" : "【牡丹江东京城镇】，正发往【JM牡丹江集散仓A】",
  //   "AcceptTime" : "2021-11-05 12:13:53"
  // }, {
  //   "AcceptStation" : "到【JM牡丹江集散仓A】",
  //   "AcceptTime" : "2021-11-05 17:48:23"
  // }, {
  //   "AcceptStation" : "【JM牡丹江集散仓A】，正发往【哈尔滨转运中心】",
  //   "AcceptTime" : "2021-11-05 17:48:27"
  // }, {
  //   "AcceptStation" : "到【哈尔滨转运中心】",
  //   "AcceptTime" : "2021-11-06 17:36:07"
  // }, {
  //   "AcceptStation" : "到【哈尔滨转运中心】",
  //   "AcceptTime" : "2021-11-06 18:20:36"
  // }, {
  //   "AcceptStation" : "【哈尔滨转运中心】，正发往【广州番禺转运中心】",
  //   "AcceptTime" : "2021-11-06 18:22:36"
  // }, {
  //   "AcceptStation" : "到【广州番禺转运中心】",
  //   "AcceptTime" : "2021-11-11 03:04:38"
  // }, {
  //   "AcceptStation" : "【广州番禺转运中心】，正发往【广州天河区十三部】",
  //   "AcceptTime" : "2021-11-11 08:46:57"
  // }, {
  //   "AcceptStation" : "到【广州天河区十三部】",
  //   "AcceptTime" : "2021-11-11 14:39:40"
  // }, {
  //   "AcceptStation" : "【陶进京/13143535761】正在派件，【广州天河区十三部/网点电话19925698937     020-38818765】",
  //   "AcceptTime" : "2021-11-11 14:40:40"
  // }, {
  //   "AcceptStation" : "快件已暂存至广州天河兴华街道伍仙桥直街54号店菜鸟驿站，如有疑问请联系18122770488，投诉电话：13143535761、19925698937     020-38818765",
  //   "AcceptTime" : "2021-11-11 17:03:02"
  // }, {
  //   "AcceptStation" : "已签收，签收人凭取货码签收。 风里来，雨里去，不求服务惊天地，只为用户您满意。",
  //   "AcceptTime" : "2021-11-12 13:02:35"
  //       }
        ],
        tableData: [{
            msg: '【通知】中区驿站今晚3停止营业',
            time:'2021.4.3'
          }, {
            msg: '【好消息】今日寄快递免费！！',
            time:'2020.12.9'
          } ],
      }
    },
    created(){
    this.fetchData();
    },
    methods:{
      fetchData() {
        // console.log(this.searchMap,"searchMap");
        goodsApi
          .search(this.currentPage, this.pageSize, this.searchMap)
          .then((response) => {
            const resp = response.data;
            // this.total = resp.data.total;
            this.pack.awaitSigned = resp.data.rows;
            // console.log(this,pack.awaitSigned,"this.awaitSigned");
          });
      },

      searchChange(){
        this.post(Url,this.getParams()).then(res=>{
            console.log(res.data)
            this.searchData=res.data.Traces
        })
      },
      getParams(){
             //请求接口指令
          const RequestType  = '1002';//免费即时查询接口指令1002/在途监控即时查询接口指令8001/地图版即时查询接口指令8003
          // 组装应用级参数
          const RequestData = {
          'CustomerName': '',
          'OrderCode': '',
          'ShipperCode': 'HTKY',
          'LogisticCode': this.search,
          };
          const DataSign = Buffer.from(md5Hex(JSON.stringify(RequestData)+ApiKey)).toString('base64')
          const reqParams = {
              RequestType,
              EBusinessID,
              DataSign,
              RequestData:JSON.stringify(RequestData),
              DataType:2
          }
          return reqParams
      },
      async  post(url,data){
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            const res = await axios.post(url,querystring.stringify(data))
            return res
      }
    }
  };
</script>


<style>
.el-table__row--striped{
  background-color: #fff;
}
.search{
  margin-left: 10px;
}
.el-icon-takeaway-box:before {
    font-size: 40px;
}
.pack-card{
  height: 100px;
  line-height: 50px;
}
.tools {
    display: flex;
    margin: 15px 0;
  }
  .el-badge {
      width: 100%;
    display: block;
}

</style>