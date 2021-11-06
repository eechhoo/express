<template>
<div>
  <Header/>

  <el-tabs :tab-position="tabPosition" style="weight: 100%;" type="border-card">
    <el-tab-pane label="驿站管理">
      <Storages></Storages>
    </el-tab-pane>
    <el-tab-pane label="员工管理">
      <Employees></Employees>
    </el-tab-pane>
    <el-tab-pane label="快递管理">
      <Express></Express>
    </el-tab-pane>
    <el-tab-pane label="报表查询">
      <Report></Report>
    </el-tab-pane>
  </el-tabs>
</div>

</template>

<style>
.el-tabs{
  width: 100%;
  height: 1000px;
}

</style>

<script>
import Employees from './employees';
import Storages from './storages.vue';
import Express from './express.vue';
import Report from './report.vue';
import Header from '../../components/Header';


  export default {
  components: { Storages,Employees,Express,Header,Report },
    data() {
      return {
        tabPosition: 'left',
      }
    },
    methods:{

    }
  };
</script>