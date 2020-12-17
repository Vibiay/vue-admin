<template>
  <div class="login">
    <!-- <div class="login-child">
            <div class="login-child-title flex-x">
                <button class="btns" :class="{bgcolor:flag == true}" @click="change">登录</button>
                <button class="btns" :class="{bgcolor:flag == false}" @click="change">注册</button>
            </div>
            <logins v-if="flag"></logins>
            <register v-else></register>
        </div> -->
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :class="{ current: item.current }"
          :key="item.id"
          @click="toggle(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        :size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength = "20" minlength = "6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if = 'model=="register"'>
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            maxlength = "20" minlength = "6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
                <el-input v-model.number="ruleForm.code"  maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9" >
                <el-button type="success" class="block">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript , validateEmail ,validatePass ,validateCode} from "@/utils/validate"
export default {
  name: "login",
  data() {
    //   验证邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(validateEmail(value)){
        callback(new Error("用户名格式有误")); 
      }else{
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value)
      value = this.ruleForm.password
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("请输入6-20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      // 如果model值为login，直接登录
      // if(this.model == 'login'){ callback() }
      this.ruleForm.passwords = stripscript(value)
      value = this.ruleForm.passwords
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validatCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("请输入验证码"));
      }else if(validateCode(value)){
        return callback(new Error("验证码格式有误"));
      }else{
        callback(); 
      }
    };
    return {
      flag: true,
      menuTab: [
        { txt: "登录", current: true ,type:'login' },
        { txt: "注册", current: false ,type:'register'},
      ],
      model:'login',
      //   表单的数据
      ruleForm: {
        username: "",
        password: "",
        passwords:"",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords:[{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validatCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggle(data) {
      this.menuTab.forEach((ele) => {
        ele.current = false;
      });
      data.current = true;
      // 修改tab的值
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
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #344a5f;
  height: 100vh;
  .login-wrap {
    width: 330px;
    margin: auto;
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        color: #fff;
        cursor: pointer;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
      }
      .current {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      font-size: 14px;
      color: #fff;
      margin-bottom: 3px;
    }
    .item-form {
      margin-bottom: 13px;
    }
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
  // .login-child{
  //     position:absolute;
  //     top:50%;
  //     left:50%;
  //     transform: translate(-50%,-50%);
  //     width:330px;
  //     height:405px;
  //     margin:0 auto;
  //     .btns{
  //         width:88px;
  //         height:36px;
  //         line-height:36px;
  //         text-align:center;
  //         border:none;
  //         background-color:#344a5f;
  //         margin-right:10px;
  //         outline: none;
  //         color:#fff;
  //         font-size:14px;
  //     }
  //     .bgcolor{
  //         background-color:#2f4255;
  //         font-weight:600;
  //     }

  // }
}
</style>