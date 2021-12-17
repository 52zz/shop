<template>
  <div class="login-container">
    <div class="login-form">
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <!-- 登录页 -->
        <el-tab-pane label="登陆" name="first">
          <!-- 登录页表单 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="user">
              <span>用户名</span>
              <el-input
                type="text"
                placeholder="请输入手机号或者邮箱号"
                required="required"
                v-model="ruleForm.user"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <span>密码</span>
              <el-input
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="ruleForm.pass"
                @keyup.enter.native="toSubmitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <!-- 注册页 -->
        <el-tab-pane label="注册" name="second">
          <!-- 注册页表单 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="user1">
              <el-input
                type="text"
                placeholder="用户名"
                required="required"
                v-model="ruleForm.user1"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass1">
              <el-input
                class="phone-input"
                placeholder="手机号/邮箱"
                v-model="ruleForm.pass1"
                prefix-icon="el-icon-mobile-phone"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code" class="phone" v-show="yzmshow">
              <el-input
                v-model="ruleForm.code"
                placeholder="验证码"
                :minlength="6"
                :maxlength="6"
              ></el-input>
              <el-button
                type="primary"
                @click="getCode()"
                class="code-btn"
                :disabled="!show"
              >
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{ count }} s</span>
              </el-button>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm.pass"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                placeholder="请再次输入密码"
                v-model="ruleForm.checkPass"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item class="btn-form">
              <el-button @click="submitForm('ruleForm')">注册</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 登录
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号或者邮箱不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // eslint-disable-next-line no-useless-escape
        const reg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (reg.test(value) || reg2.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号或者邮箱"));
        }
      }
    };

    // 注册
    var validateUser1 = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (value) {
          const res = await request.post("/api/user/checkUsernameExist", {
            username: this.ruleForm.user1,
          });
          console.log(res);
          if (res.data.code === 20000) {
            callback();
          } else {
            return callback(new Error("该用户名已经被注册"));
          }
        }
      }
    };
    var validatePass1 = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号或者邮箱不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // eslint-disable-next-line no-useless-escape
        const reg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (reg.test(value) || reg2.test(value)) {
          this.yzmshow = true;
          callback();
        } else {
          callback(new Error("请输入正确的手机号或者邮箱"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (this.ruleForm.code.length === 6) {
          callback();
        } else {
          callback(new Error("验证码不正确"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "first",
      // 登录
      urlQuery: "",
      activeIndex: "1",
      ruleForm: {
        pass: "",
        user: "",
      },
      rules: {
        user: [{ required: true, validator: validateUser, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
      },
      // 注册
      activeIndex: "2",
      loginForm: {
        mobile: "",
        code: "",
        zheCode: "",
      },
      show: true,
      count: "",
      timer: null,
      yzmshow: false,
      ruleForm: {
        user1: "",
        pass1: "",
        pass: "",
        checkPass: "",
        zhecode: "",
        mobile: "",
        phoneCode: "",
        emailCode: "",
        code: "",
      },
      rules: {
        code: [
          {
            required: true,
            validator: validateCode,
            trigger: "blur",
          },
          {
            min: 6,
            max: 6,
            message: "长度为6",
            trigger: "blur",
          },
        ],
        user1: [
          {
            required: true,
            validator: validateUser1,
            trigger: "blur",
          },
        ],
        pass1: [
          {
            required: true,
            validator: validatePass1,
            trigger: "blur",
          },
        ],
        // 密码
        pass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
          {
            min: 6,
            message: "长度在不少于6个字符",
            trigger: "blur",
          },
        ],
        // 校验密码
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
          {
            min: 6,
            message: "长度在不少于6个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.login-container {
  background-image: url("~@/assets/background.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 430px;
    height: 560px;
    background: rgba(255, 255, 255);
    text-align: left;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    .el-tabs {
      // border: 1px solid;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 53px 73px;

      ::v-deep .el-tabs__item {
        padding: 0 20px;
        &:hover {
          color: pink;
        }
      }
      ::v-deep .el-tabs__item.is-active {
        color: pink;
      }
      ::v-deep .el-tabs__active-bar {
        background: pink;
      }
      ::v-deep .el-tabs__nav-wrap::after {
        display: none;
      }
      .demo-ruleForm {
        padding: 10px 0;
        span {
          font-size: 12px;
          color: #303133;
        }
        .el-button {
          background-color: pink;
          width: 100%;
          color: #fff;
        }
      }
    }
  }
}
</style>
