<template>
  <div>


    <div id="canvanCode" @click="canvan" class='canvan'>点击开启扫码</div>
    <div @click="stopCanvan">停止</div>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="快递单号" prop="expressNumber">
            <el-input v-model="ruleForm.expressNumber"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary"   @click="handleDelete()">出库</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Uploader } from 'vant'
import 'vant/lib/uploader/style'
Vue.use(Uploader)
import Quagga from 'quagga'
import GoodsApi from '../../api/goods'


 export default {
    data() {
      return {

        // expressNumber: '',
        ruleForm: {
          expressNumber: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      // this.canvan()
    },
    methods: {

      canvan(){
          //Quagga库
              Quagga.init({
                  inputStream : {
                      name : "Live",
                      type : "LiveStream",
                      target: document.querySelector('#canvanCode')
                  },
                  decoder : {
                      readers : ["ean_reader",'code_39_reader'],
                      debug: {
                          drawBoundingBox: false,
                          showFrequency: false,
                          drawScanline: false,
                          showPattern: false,
                      },
                      multiple: false
                  }
              }, ()=>{
                  //打开摄像头
                  Quagga.start();
                  Quagga.onDetected(function(data){
                      console.log(data.codeResult.code);
                      this.ruleForm.expressNumber=data.codeResult.code;

                      //data.codeResult.code就是摄像头扫描出的商品条形码
                      //Tip:只要摄像头一识别到条形码就会显示在控制台，有时候一识别就显示十几行条形码，所以我们可以使用节流，减少扫码的次数。
                  });
              });
      },
      stopCanvan(){
        // 没想好呢 
      },


    handleDelete() {
     console.log(this.ruleForm.expressNumber,"ruleForm");
          GoodsApi.deleteByExpressNumber(this.ruleForm.expressNumber).then((response) => {
            const resp = response.data;
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message,
            });
            
          });

          GoodsApi
          .search(this.currentPage, this.pageSize, {phone:'18724534985'})
          .then((response) => {
            const resp = response.data;
            // this.total = resp.data.total;
            // this.pack.awaitSigned = resp.data.rows;
            console.log(resp.data.rows,"this.awaitSigned");
          });
      
    },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
   },   
  }
</script>

<style>
.canvan{
  width: 100%;
  height: 500px;
}
</style>