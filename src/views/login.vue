<template>
  <div class="login">
    <transition name="login-fade" mode="in-out">
      <el-form
        :model="loginForm"
        class="container"
        :rules="rules"
        v-show="showLogin"
        ref="loginForm"
      >
        <el-form-item label="名称" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="login('loginForm')" class="login_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface LoginForm {
  username: string;
  password: number | string;
}

@Component
export default class App extends Vue {
  private loginForm: LoginForm;
  private showLogin: boolean;
  private rules: any;
  constructor() {
    super();
    this.loginForm = {
      username: "",
      password: ""
    };
    this.showLogin = false;
    this.rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 9, message: "密码长度在6-9个字符", trigger: "blur" }
      ]
    };
  }
  public mounted() {
    this.showLogin = true;
  }
  public login = (ref: string) => {
    let refForm: any = this.$refs[ref];
    refForm.validate((valid: boolean) => {
      if (valid) {
        console.log("tyuighj");
      } else {
        console.log(67890);
      }
    });
  };
}
</script>
<style lang="scss">
@import "@/style/mixin";
.login {
  @include relative;
  background-color: $main_color;
  .container {
    @include wh(320px, 260px);
    @include ctp(320px, 260px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .login_btn {
      width: 100%;
      font-size: 16px;
    }
  }
  .login-fade-enter-active,
  .login-fade-leabe-active {
    transition: all 1s;
  }
  .login-fade-enter,
  .login-fade-leave {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
}
</style>