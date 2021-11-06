<template>

<div>
  <!-- <el-row>
    <el-col :span="24"><div class="title"> 校园快递信息管理平台 </div></el-col>
  </el-row> -->
    <Header/>

  <el-tabs :tab-position="tabPosition" style="weight: 100%;" type="border-card">
    <el-tab-pane label="首页">
      <Home-page></Home-page>
    </el-tab-pane>
    <el-tab-pane label="入库"><In-storage></In-storage></el-tab-pane>
    <el-tab-pane label="出库"><Out-storage></Out-storage></el-tab-pane>
    <el-tab-pane label="订单"><Order></Order></el-tab-pane>
  </el-tabs>
  </div>




</template>

<style>
/* .title{
  height: 50px;
  position: fixed;
  z-index: 11;
  top: 0;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 30px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 10%);
} */
.el-tabs{
  margin-top: 65px;
  width: 100%;
  height: 1000px;
}

</style>

<script>
import HomePage from './homePage.vue';
import InStorage from './inStorage';
import OutStorage from './outStorage.vue';
import Order from './order.vue';
import Header from '../../components/Header';
  export default {
  components: { HomePage,InStorage,OutStorage,Order,Header },
    data() {
      return {

        tabPosition: 'left',

      }
    },
    methods:{

    }
  };
</script>