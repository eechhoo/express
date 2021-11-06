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
    <el-tab-pane label="寄件"><Send-express></Send-express></el-tab-pane>
    <el-tab-pane label="取件"><Take-express></Take-express></el-tab-pane>
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
import HomePage from './homePaeg.vue';
import SendExpress from './sendExpress';
import TakeExpress from './takeExpress';
import Header from '../../components/Header';
  export default {
  components: { HomePage,SendExpress,TakeExpress,Header },
    data() {
      return {
        tabPosition: 'left',
      }
    },
    methods:{

    }
  };
</script>