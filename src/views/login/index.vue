<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-form"
    >
      <h2>登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="form.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <!-- <el-button @click="goRegister">注册</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login,getUserInfo } from '@/api/login.js'
// import test  from '@/api/test.js'
export default {
  data() {
    return {
      form: {
        username: "",
        pass: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  // created(){
  //   test.getList().then(res=>{
  //     console.log(res.data,"in created");
  //   })
  // },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            login(this.form.username,this.form.pass).then(response => {
                const resp = response.data;
                if(resp.flag){
                    getUserInfo(resp.data.token).then(response=>{
                        const respUser = response.data;
                        if(respUser.flag){
                            localStorage.setItem("uid",JSON.stringify(respUser.data));
                            localStorage.setItem("token",resp.data.token);
                            if(this.form.username.startsWith("1")){
                              this.$router.push("/users")
                            }
                            if(this.form.username.startsWith("e")){
                              this.$router.push("/employees")
                            }
                            if(this.form.username.startsWith("a")){
                              this.$router.push("/admin")
                            }
                            
                        }
                    })
                }
                
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // goRegister() {
    //   // 跳转到注册页面
    //   this.$router.push("/register");
    // },
  },
};
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: url(../../assets/bg.jpg); */
  background-color: #b5ffef;
  background-size: cover;
}
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.el-select {
    display: inline-block;
    position: relative;
    margin: 0;
}
h2 {
  text-align: center;
}
</style>

