<template>
  <div class="header-bar">
    <Row class="header-bar-img">
      <i-col span="12"><img src="../../../assets/images/logo3.png" alt=""></i-col>
      <i-col span="12"><span style="color:#5cadff;">当前登录用户：{{userName}}</span><Button type="text" @click="logout">【退出】</Button></i-col>
    </Row>
    <div class="header-bar-btn">
      <Button type="text" @click="toHome">首页</Button><Divider type="vertical" />
      <Button type="text" :to="{ path: '/information/search' }">信息检索</Button><Divider type="vertical" />
      <Button type="text" :to="{ path: '/information/manage' }">信息管理</Button><Divider type="vertical" />
      <Button type="text" :to="{ path: '/article/manage' }">内容管理</Button><Divider type="vertical" />
      <Button type="text" :to="{ path: '/question/manage' }">互动解答</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { removeToken, getUserName } from '@/utils/auth'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class Login extends Vue {
  userName = getUserName()
  mounted() {
  }
  toHome (){
    window.location.href = '/#/'
  }
  logout() { // 退出登录
    removeToken()
    window.location.reload()
  }
}
</script>
<style lang="scss" scoped>
.header-bar{
  height: 90px;
  .header-bar-img{
    height: 50px;
    line-height: 50px;
    img {
      height: 50px;
      display: block;
      margin: 0 auto;
    }
  }
  .header-bar-btn {
    background-color: #5cadff;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    text-align: left;
  }
}
</style>