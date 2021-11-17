<template>

<div>
  <Header/>
  <el-tabs :tab-position="tabPosition" style="weight: 100%;" type="border-card">
    <el-tab-pane label="首页">
      <Home-page></Home-page>
    </el-tab-pane>
    <el-tab-pane label="寄件"><Send-express></Send-express></el-tab-pane>
    <!-- <el-tab-pane label="取件"><Take-express></Take-express></el-tab-pane> -->
  </el-tabs>
  </div>


</template>

<style>
.el-tabs{
  margin-top: 65px;
  width: 100%;
  height: 1000px;
}

</style>

<script>
import HomePage from './homePaeg.vue';
import SendExpress from './sendExpress';
import Header from '../../components/Header';
  export default {
  components: { HomePage,SendExpress,Header },
    data() {
      return {
        tabPosition: 'left',
      }
    },
    methods:{

    }
  };
</script>