<template>
  <div>
    <el-form style="margin-top: 20px">
      <el-form-item>
        <el-button v-if="!isDialog" type="primary" @click="handleAdd()"
          >新增驿站</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 仓库列表 -->
    <el-table
      :data="list"
      height="400"
      border
      style="width: 100%"
      :highlight-current-row="isDialog"
      @current-change="clickCurrentChange"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="status" label="仓库位置"> </el-table-column>
      <el-table-column prop="name" label="仓库名称"> </el-table-column>
      <el-table-column prop="storage"  label="可存储容量" width="100"> </el-table-column>
      <!-- <el-table-column prop="use_storage"  label="已用容量"  width="100"> </el-table-column> -->
      <el-table-column label="操作" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
          <!-- <el-button size="mini" @click="handleSee(scope.row._id)">查看该驿站人员</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="storage"
        ref="storageForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="位置" prop="status">
          <el-input v-model="storage.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="storage.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可存储容量" prop="phone">
          <el-input v-model="storage.storage" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            storage._id === null
              ? addData('storageForm')
              : updateData('storageForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import storageApi from "@/api/storage";
export default {
  data() {
    return {
      list: [],
      total: 0,
      dialogFormVisible: false,
      storage: {
        _id: null,
        status: "",
        name: "",
        people: "",
        storage: "",
        use_storage:""
      },
      rules: {
        name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请输入仓库位置", trigger: "blur" }],
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
  methods: {
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // searchData() {
    //   this.currentPage = 1;
    //   this.fetchData();
    // },
    fetchData() {
      storageApi
        .getList()
        .then((response) => {
          const resp = response.data;
          this.total = resp.data.total;
          this.list = resp.data.rows;
          console.log(this.list,"list");
        });
    },
    handleEdit(id) {
      this.handleAdd();
      storageApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.storage = resp.data;
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
          storageApi.deleteById(id).then((response) => {
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["storageForm"].resetFields();
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          storageApi.add(this.storage).then((response) => {
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
          storageApi.update(this.storage).then((response) => {
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
      this.$emit("option-storage",currentRow)
    }
  },
};
</script>

<style scoped>
</style>


