<template>
  <div class="main">
    <Row :gutter="16">
      <i-col :xs="24" :sm="16">
        <article-show :articleType="1" articleName="工作动态"></article-show>
        <article-show :articleType="4" articleName="赔偿案例"></article-show>
        <article-show :articleType="5" articleName="保险课堂"></article-show>
      </i-col>
      <i-col :xs="24" :sm="8">
        <article-show :articleType="2" articleName="公示公告"></article-show>
        <article-show :articleType="3" articleName="政策法规"></article-show>
        <interaction-main :isPage="false"></interaction-main>
      </i-col>
    </Row>
    <div style="text-align:center;">
      <div>Copyright © 1998-2017 CCIB.All Rights Reserved.</div>
      <div>地址：河北省保定市天鹅中路333号世纪大厦A座401 咨询电话：0312-58801132 E-mail:hebeifgs@ccib.com.cn</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleShow from '@/components/article/article-list.vue'// @ is an alias to /src
import InteractionMain from '@/page-home/interaction/interaction-main.vue'
@Component({
  components: {
    ArticleShow,
    InteractionMain
  },
})
export default class Home extends Vue {
  mounted() {
  }
}
</script>