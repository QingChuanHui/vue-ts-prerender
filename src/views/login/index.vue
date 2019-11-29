<template>
  <div class="Login">
    <Form  class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginFormRef" label-position="left" :label-width="80">
      <!-- <div class="logo_title">河北环责险信息网</div> -->
      <img src="../../assets/images/logo3.png" alt="">
      <FormItem prop="account" label="账号" >
        <i-Input type="text" v-model="loginForm.account" placeholder="请输入账号">
        </i-Input>
      </FormItem>
      <FormItem prop="password" label="密码">
        <i-Input type="password" v-model="loginForm.password" placeholder="请输入密码"  @keyup.enter.native="handleLogin">
        </i-Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { login } from '@/api/login'
import { setToken, setUserName } from '@/utils/auth'
import md5 from 'js-md5'
@Component({
  components: {
  }
})
export default class Login extends Vue {
  loginForm: any = { account: '', password: '' } // 表单数据
  loading = false
  formDataVal: any // 表单验证变量
  loginRules: any = {
    account: [{ required: true, trigger: 'blur', message: '请输入账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
  }

  mounted() {
  }
  handleLogin () {
    this.formDataVal = this.$refs['loginFormRef']
    this.formDataVal.validate((valid: any) => {
      if (valid) {
        this.loading = true
        login({
          userName: this.loginForm.account.trim(),
          userPassword: md5(this.loginForm.password),
        }).then((data: any) => {
          this.loading = false
          setToken(data.data.id)
          setUserName(data.data.realName)
          this.$router.replace({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
      } else {
        return false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.Login{
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #5a97f3;
  align-items: center;
  justify-content: center;
  .login-form {
    img{
      width: 100%;
    }
    max-width: 400px;
    height: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  .logo_title{
    font-weight: bold;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 10px;
  }
}
// .login::before {
//   z-index: -999;
//   content: "";
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-image: url("../../assets/img/login-bg.jpg"); // login-bg
//   background-size: cover;
// }

</style>