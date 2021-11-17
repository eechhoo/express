<template>
  <div>
      <el-collapse>
        <el-collapse-item title="未处理订单" name="1">
          <el-table
            :data="awaitOrders"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="寄件人姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="寄件地址"
              min-width="300">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="寄件人电话号码">
            </el-table-column>
            <el-table-column
              prop="sendName"
              label="收件人姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="sendAddress"
              label="收件地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="sendPhone"
              label="收件人电话号码">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text" size="small">处理订单</el-button>
                <el-button @click="handleDeleted(scope.row)" type="text" size="small">删除订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item title="所有订单" name="4">
           <el-table
            :data="allOrders"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="寄件人姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="寄件地址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="寄件人电话号码">
            </el-table-column>
            <el-table-column
              prop="sendName"
              label="收件人姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sendAddress"
              label="收获地址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sendPhone"
              label="收件人电话号码">
            </el-table-column>
                        <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <!-- <el-button @click="handleConfirm(scope.row)" type="text" size="small">处理完成</el-button> -->
                <el-button @click="handleDeleted(scope.row)" type="text" size="small">删除订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>

</div>


</template>

<style>

</style>

<script>

import OrderApi from "@/api/order";
  export default {
    data() {
      return {
        allOrders:[],
        awaitOrders:[],
        searchMap: {
          status: "0",
        },
      }
    },
    created(){
      this.fetchData()
    },
    methods:{
      fetchData() {
        OrderApi
            .search(this.currentPage, this.pageSize, this.searchMap)
            // .getOrderList()
          .then((response) => {
            const resp = response.data;
            // this.total = resp.data.total;
            this.awaitOrders = resp.data.rows;
          });
        OrderApi
            .search(this.currentPage, this.pageSize, { status: "1",})
            // .getOrderList()
          .then((response) => {
            const resp = response.data;
            // this.total = resp.data.total;
            this.allOrders = resp.data.rows;
          });
      },
      handleDetail(row){
        // console.log(row,"row");
        // this.handleAdd();
         this.$prompt('请输入金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
          });
          row.money=value
          row.status="1"
        })

        OrderApi.update(row).then((response) => {
          const resp = response.data;
          if (resp.flag) {
            this.storage = resp.data;
          }
        });
              console.log(row,"row");
      },



      handleDeleted(row){
        this.$confirm("确定要删除此条信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  OrderApi.deleteById(row._id).then((response) => {
                    const resp = response.data;
                    this.$message({
                      type: resp.flag ? "success" : "error",
                      message: resp.message,
                    });
                    if (resp.flag) {
                      this.fetchData();
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
      },
    }
  };
</script>