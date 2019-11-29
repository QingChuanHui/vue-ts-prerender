<template>
  <div class="article-detail">
    <h1 class="titlea">{{articleDetail.title}}</h1>
    <div class="timer">{{articleDetail.author}}  {{articleDetail.createTime | timeParse}}</div>
    <div v-html="articleDetail.content" class="content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { articleInfo } from '@/api/article'
@Component({
  components: {
  },
})
export default class ArticleDetail extends Vue {
  articleDetail = {}
  articleId = 0
  mounted() {
    if (this.$route.query.articleId) {
      this.articleId = +this.$route.query.articleId
      this.articleInfo()
    }
  }
  articleInfo() {
    articleInfo({ id: this.articleId }).then((data: any) => {
      this.articleDetail = data.data
    })
  }
}
</script>
<style lang="scss" scoped>
.article-detail{
  .titlea {
    text-align:center;
    margin-top: 30px;
    color: red;
  }
  .timer {
    color: #999;
    text-align: right;
    font-size: .8rem;
    padding-right: 20px;
  }
  .content {
    // text-align: center;
    margin: 40px 10px 20px 10px;
  }
}
</style>