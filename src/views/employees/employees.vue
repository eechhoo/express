<template>

<div>
  <Header/>
  <el-tabs :tab-position="tabPosition" style="weight: 100%;" type="border-card">
    <el-tab-pane label="快递管理">
      <manage></manage>
    </el-tab-pane>
    <el-tab-pane label="入库"><In-storage></In-storage></el-tab-pane>
    <el-tab-pane label="出库"><Out-storage></Out-storage></el-tab-pane>
    <el-tab-pane label="订单"><Order></Order></el-tab-pane>
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
import Manage from './manage.vue';
import InStorage from './inStorage';
import OutStorage from './outStorage.vue';
import Order from './order.vue';
import Header from '../../components/Header';
  export default {
  components: { Manage,InStorage,OutStorage,Order,Header },
    data() {
      return {

        tabPosition: 'left',

      }
    },
    methods:{

    }
  };
</script>