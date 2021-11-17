<template>
  <div>


 <div id="canvanCode" @click="stopCanvan" class='canvan' >停止</div>
 <div @click="canvan">开始</div>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="expressNumber" >
            <el-input v-model="ruleForm.expressNumber"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">入库</el-button>
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
import expressApi from '../../api/goods'



 export default {
    data() {
      return {
        // expressNumber: '',
        ruleForm: {
          phone: '',
          expressNumber: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入电话号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度11', trigger: 'blur' }
          ],
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
                    // alert(data.codeResult.code)
                      this.ruleForm.expressNumber=data.codeResult.code;
                      console.log(this.ruleForm.expressNumber);
                      //data.codeResult.code就是摄像头扫描出的商品条形码
                      //Tip:只要摄像头一识别到条形码就会显示在控制台，有时候一识别就显示十几行条形码，所以我们可以使用节流，减少扫码的次数。
                  });
              });
      },
      stopCanvan(){
         Quagga.stop();
      },

      handleAdd() {
         expressApi.add(this.ruleForm).then((response) => {
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
      },



      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm,'formName');
              this.handleAdd()
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