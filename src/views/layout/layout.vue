<template>
  <Layout class="layout">
    <Header class="header-con">
      <header-bar>
      </header-bar>
    </Header>
    <Content class="content-wrapper">
      <Card>
        <router-view></router-view>
      </Card>
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
  .content-wrapper{
    padding: 10px;
    overflow: auto;
    text-align: left;
    height:calc(100vh - 90px);
  }
  .header-con{
    background: #fff;
    padding: 0px;
    height: 90px;
  }
}
</style>