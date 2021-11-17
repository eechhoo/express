<template>
<div>
     <el-select v-model="value" placeholder="请选择驿站">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <el-row :gutter="4">
  <el-col :span="10">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="收件人姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="收件人电话" prop="name">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="收件人地址" prop="desc">
                <el-input type="textarea" v-model="ruleForm.address"></el-input>
            </el-form-item>
        </el-form>
  </el-col>
  <el-col :span="10">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="寄件人姓名" prop="name">
                <el-input v-model="ruleForm.sendName"></el-input>
            </el-form-item>
            <el-form-item label="寄件人电话" prop="name">
                <el-input v-model="ruleForm.sendPhone"></el-input>
            </el-form-item>
            <el-form-item label="寄件人地址" prop="desc">
                <el-input type="textarea" v-model="ruleForm.sendAddress"></el-input>
            </el-form-item>
            </el-form>
    </el-col>
    </el-row>
    <div class='btn'>
        <el-button type="primary" @click="submitForm('ruleForm')">立即下单</el-button>
    </div>
</div>

</template>
<script>
import orderApi from "@/api/order";
  export default {
    data() {
      return {
           options: [{
          value: '选项1',
          label: '中区驿站'
        }, {
          value: '选项2',
          label: '西区驿站'
        }, {
          value: '选项3',
          label: '东区驿站'
        }],
        value: '',
        ruleForm: {
          sendName: '',
          sendPhone: '',
          sendAddress:'',
          name:'',
          phone:'',
          address:''
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          sendName: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          sendPhone: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          sendAddress: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm,"data");
            this.handleAdd()
            this.ruleForm=''
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAdd() {
         orderApi.add(this.ruleForm).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              return
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
      }
    }
  }
</script>
<style>
    .el-row {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .el-select {
        display: inline-block;
        position: relative;
        margin: 20px 50px;
    }
    .btn{
       text-align: center;
    }
</style>