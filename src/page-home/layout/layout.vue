<template>
  <Layout class="layout">
    <Header class="header-con">
      <header-bar>
      </header-bar>
    </Header>
    <Content class="content-wrapper">
      <router-view class="content-main"></router-view>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderBar from './components/header-bar.vue'
@Component({
  components: {
    HeaderBar
  }
})
export default class Login extends Vue {
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.layout{
  background-color: #fff;
  .content-wrapper{
    padding: 10px;
    overflow: auto;
    text-align: left;
    min-height:calc(100vh - 130px);
    .content-main {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
  .header-con{
    background: #fff;
    padding: 0px;
    height: 130px;
  }
}
</style>