<template>
  <div>
      <div class="tools">
        <div class="filter">
          <span>物流状态：</span>
          <el-select v-model="selectStatus" @change="handleStatusChange">
            <el-option label="所有" value=""></el-option>
            <el-option label="在途" value="1"></el-option>
            <el-option label="到达驿站" value="0"></el-option>
          </el-select>
        </div>

        <div class="search">
          <el-input
            placeholder="查询快递单号"
            prefix-icon="el-icon-search"
            v-model="search"
            class="search-input"
            @change="this.searchChange"
          >
          </el-input>
        </div>
      </div>

        <el-row :gutter="18">
          <el-col :span="6">
              <el-badge :value="12" class="item">
                <el-card shadow="hover" class='pack-card'>
                <i class="el-icon-box"></i>
                所有包裹
                </el-card>
            </el-badge>
          </el-col>
          <el-col :span="6">
            <el-badge :value="15" class="item">
            <el-card shadow="hover" class='pack-card'>
              <i class="el-icon-timer"></i>
              待签收包裹
            </el-card>
            </el-badge>
          </el-col>
          <el-col :span="6">
            <el-badge :value="3" class="item">
            <el-card shadow="hover" class='pack-card'>
              <i class="el-icon-s-promotion"></i>
              发送的包裹
            </el-card>
            </el-badge>
          </el-col>
        </el-row>

        <div class="list">
        <el-table :data="tableData" stripe style="width: 100%; margin-top:100px" class="el-table"  >
          <el-table-column prop="msg" label="消息通知："> </el-table-column>
          <el-table-column prop="time" width="180"> </el-table-column>
        </el-table>

      </div>

  </div>


</template>

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

<script>
  export default {
    data() {
      return {
        tableData: [{
            msg: '【通知】',
            time:'2021.4.3'
          }, {
            msg: '【好消息】',
            time:'2020.12.9'
          }, {
            msg: '【通知】',
            time:'2021.7.5'
          }, ],
        selectStatus:'',
        search:''
      }
    },
    methods:{
      handleStatusChange(){},
      searchChange(){}
    }
  };
</script>