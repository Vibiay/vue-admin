<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="(item, index) in menuTab"
          :key="index"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单验证 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-from"
        size='medium'
      >
        <el-form-item  prop="username">
            <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off" class="item-from"
          ></el-input>
        </el-form-item>
        <el-form-item  prop="password">
             <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off" class="item-from" minlength = '6' maxlength = '20'
          ></el-input>
        </el-form-item>
        <el-form-item  prop="passwords" v-show="model=='register'">
             <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off" class="item-from" minlength = '6' maxlength = '20'
          ></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-from">
             <label>验证码</label>
             <el-row :gutter="10">
                <el-col :span="15"><el-input v-model.number="ruleForm.code" minlength = '6' maxlength = '6'></el-input></el-col>
                <el-col :span="9"><el-button type="success" class="block">获取验证码</el-button
          ></el-col>
             </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')"
             class="block login-btn">提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {stripscript,validateEmail,validatePass,validateVCode} from '@/utils/validate'
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入用户名"));
      }else if(validateEmail(value)){
          callback(new Error("用户名格式有误"))
      }else{
          callback()
      }
    };
    var validatePassword = (rule, value, callback) => {
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(validatePass(value)){
        callback(new Error("密码为6-20位数字+字母"));
      }else{
          callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
        // 如果模块值为login，直接通过
        if(this.model == 'login'){
            callback()
        }
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule,value,callback)=>{

        if(value === ''){
            return callback(new Error('请输入验证码'))
        }else if(validateVCode(value)){
            return callback(new Error('验证码格式有误'))
        }else{
            callback()
        }
    }
    return {
      menuTab: [
        { txt: "登录", current: true ,type :'login'},
        { txt: "注册", current: false ,type:'register'},
      ],
      model:'login',
      ruleForm: {
        username: "",
        password: "",
        passwords:"",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleMenu(data) {
      console.log(data);
      this.menuTab.forEach((ele) => {
        ele.current = false;
      });
      data.current = true;
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #344a5f;
  height: 100vh;
  .login-wrap {
    width: 330px;
    margin: auto;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .login-from{
      margin-top:29px;
      label{
          display: block;
          margin-bottom:3px;
          font-size:14px;
          color:#fff;
          margin-top:13px;
      }
      .block{
          width:100%;
          display:block;
      }
      .login-btn{
          margin-top:19px;
      }
  }
}
</style>