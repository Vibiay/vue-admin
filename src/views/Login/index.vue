<template>
  <div class="login">
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
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <!-- {{model}} -->
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "sha1";
import { GetSms, Register, Login } from "@/api/login.js";
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateCode,
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, context) {
    // 这里面放置data数据，生命周期，自定义函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // 模块值
    const model = ref("login");
    const { ctx } = getCurrentInstance();
    // 登录按钮禁用状态
    const loginButtonStatus = ref(false);
    // 验证码按钮禁用状态
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    // 声明倒计时
    const timer = ref(null);
    // 声明函数
    const toggle = (data) => {
      menuTab.forEach((ele, index) => {
        ele.current = false;
      });
      data.current = true;
      // 修改tab的值
      model.value = data.type;
      // 重置表单
      ctx.$refs.ruleForm.resetFields();
    };
    /**
     * 获取验证码
     */
    const getSms = () => {
      if (ctx.ruleForm.username == "") {
        ctx.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ctx.ruleForm.username)) {
        ctx.$message.error("邮箱格式有误，请重新输入!!");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: ctx.ruleForm.username,
        module: model.value,
      };
      // 修改获取验证按钮状态
      codeButtonStatus.status = true;
      codeButtonStatus.text = "发送中";
      setTimeout(() => {
        //请求接口
        GetSms(requestData)
          .then((response) => {
            console.log(response);
            let data = response.data;
            ctx.$message({
              message: data.message,
              type: "success",
            });
            // 启用登录或注册按钮
            loginButtonStatus.value = false;
            // 调用定时器方法，倒计时60s
            countDown(60);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    };
    /**
     * 倒计时*/
    const countDown = (number) => {
      let num = number;
      timer.value = setInterval(() => {
        num--;
        if (num == 0) {
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = `再次获取`;
        } else {
          codeButtonStatus.text = `倒计时  ${num}`;
        }
      }, 1000);
    };
    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码默认状态
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
      // 清除倒计时
      clearInterval(timer.value);
    };

    // 挂载完成后
    onMounted(() => {});

    return {
      menuTab,
      model,
      toggle,
      getSms,
      loginButtonStatus,
      codeButtonStatus,
      countDown,
    };
  },
  data() {
    //   验证邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
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
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
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
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      // menuTab: [
      //   { txt: "登录", current: true ,type:'login' },
      //   { txt: "注册", current: false ,type:'register'},
      // ],
      // model:'login',
      // 表单的数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validatCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 模拟注册成功
      this.toggle(this.menuTab[0]);
      this.clearCountDown();
      return false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let requestData = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            code: this.ruleForm.code,
          };
          if ((this.model == "register")) {
            Register(requestData)
              .then((res) => {
                let data = res.data;
                this.$message({
                  message: data.message,
                  type: "success",
                });
              })
              .catch((error) => {
                // 失败时处理的操作
              });
          }else if(this.model == 'login'){
            Login(requestData).then(res=>{
              console.log(res)
            })
          }
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