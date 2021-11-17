<template>
  <div>
    <!-- 条件查询控件 -->
    <el-form
      :inline="true"
      :model="searchMap"
      ref="searchForm"
      style="margin-top: 20px"
    >
      <el-form-item prop="expressNumber">
        <el-input
          v-model="searchMap.expressNumber"
          placeholder="快递单号"
          v-if="!isDialog"
        ></el-input>
      </el-form-item>
      <el-form-item prop="expressPhone">
        <el-input v-model="searchMap.expressPhone" placeholder="电话"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button v-if="!isDialog" type="primary" @click="handleAdd()"
          >新增</el-button
        >
        <el-button
          v-if="!isDialog"
          type="primary"
          @click="resetForm('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table
      :data="list"
      height="400"
      border
      style="width: 100%"
      :highlight-current-row="isDialog"
      @current-change="clickCurrentChange"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="expressNumber" label="快递单号"> </el-table-column>
      <el-table-column prop="expressStatus" label="快递状态"> </el-table-column>
      <!-- <el-table-column prop="role" label="所属驿站" v-if="!isDialog">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="phone" label="手机号码"> </el-table-column> -->
      <el-table-column label="操作" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >查看更多信息</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模板 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :layout="
        !isDialog
          ? 'total, sizes, prev, pager, next, jumper'
          : ' prev, pager, next'
      "
      :total="total"
    >
    </el-pagination>

    <!-- 新增弹窗 -->
    <!-- <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="employee"
        ref="employeeForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="工号" prop="jobnumber">
          <el-input v-model="employee.jobnumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employee.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属驿站" prop="role">
          <el-select v-model="employee.role" placeholder="请点击选择">
            <el-option
              v-for="option in roleOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="entrydate" label="入职时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="employee.entrydate"
            type="date"
            placeholder="入职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="employee.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            employee._id === null
              ? addData('employeeForm')
              : updateData('employeeForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import expressApi from "@/api/employee";
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        expressNumber: "",
        expressPhone: "",
      },
      dialogFormVisible: false,
      // roleOptions,
      express: {
        _id: null,
        expressNumber: "",
        expressPhone: "",
      },
      rules: {
        jobnumber: [
          { required: true, message: "请输入单号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
    };
  },
  props: {
    isDialog: false,
  },
  created() {
    this.fetchData();
  },
  components: {},
  // filters: {
  //   roleFilter(type) {
  //     const obj = roleOptions.find(function (item) {
  //       if (item.type === type) {
  //         return item;
  //       }
  //     });
  //     return obj ? obj.name : null;
  //   },
  // },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    searchData() {
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
     expressApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const resp = response.data;
          this.total = resp.data.total;
          this.list = resp.data.rows;
        });
    },
    handleEdit(id) {
      this.handleAdd();
      expressApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.express = resp.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确定要删除此条信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          expressApi.deleteById(id).then((response) => {
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["employeeForm"].resetFields();
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          expressApi.add(this.express).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          expressApi.update(this.express).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clickCurrentChange(currentRow){
      console.log(currentRow);
      this.$emit("option-express",currentRow)
    }
  },
};
</script>

<style scoped>
</style>


