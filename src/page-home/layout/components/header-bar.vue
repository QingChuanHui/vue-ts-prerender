<template>
  <div class="header-bar">
    <Row class="header-bar-img">
      <i-col span="16"><img src="../../../assets/images/logo3.png" alt="" class="logoimg"></i-col>
      <i-col span="8" style="height:80px;">
        <img src="../../../assets/images/qr.jpg" alt="" class="qrimg">
        <a href="/manage.html#/"  class="alogin">登录</a>
      </i-col>
    </Row>
    <div class="header-bar-btn">
      <div class="bar-main">
        <a class="bar-a" href="/#/" >首页</a><Divider type="vertical" />
        <a class="bar-a" href="/#/article/articleList?articleType=1">工作动态</a><Divider type="vertical" />
        <a class="bar-a" href="/#/article/articleList?articleType=2">公示公告</a><Divider type="vertical" />
        <a class="bar-a" href="/#/article/articleList?articleType=3">政策法规</a><Divider type="vertical" />
        <a class="bar-a" href="/#/article/articleList?articleType=4">赔偿案例</a><Divider type="vertical" />
        <a class="bar-a" href="/#/article/articleList?articleType=5">保险课堂</a><Divider type="vertical" />
        <a class="bar-a" href="/#/interaction/main">保险互动</a><Divider type="vertical" />
        <a class="bar-a" href="/#/interaction/add">联系我们</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    components: {
    }
  })
  export default class Login extends Vue {
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
.header-bar{
  height: 90px;
  .header-bar-img{
    max-width: 1200px;
    margin: 0 auto;
    height: 80px;
    line-height: 80px;
    white-space: nowrap;
    overflow-x: auto;
    .alogin{
      border: 1px solid #E3E3E3;
      padding: 10px;
    }
    .logoimg {
      height: 80px;
      max-width: 100%;
      display: block;
    }
    .qrimg {
      height: 75px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .header-bar-btn {
    background-color: #5cadff;
    height: 50px;
    line-height: 50px;
    text-align: left;
    overflow-x:auto;
    .bar-main {
      max-width: 1200px;
      margin: 0 auto;
      white-space:nowrap;
      .bar-a {
        font-size: 1.3rem;
        color: #fff;
        padding: 0px 5px;
      }
    }
  }
}
</style>