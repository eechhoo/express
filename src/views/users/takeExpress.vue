<template>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="取件地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="取件码">
      </el-table-column>
    </el-table>

</template>

<script>
export default {
  data() {
        return {
          tableData: [{
            date: '2016-05-02',
            address: '中区驿站',
            code: '56298'
          }, {
            date: '2016-05-04',
            address: '中区驿站',
            code: '562938'
          }, {
            date: '2016-05-01',
            address: '中区驿站',
            code: '562974'
          }]
        }
      }
}
</script>

<style>

</style>