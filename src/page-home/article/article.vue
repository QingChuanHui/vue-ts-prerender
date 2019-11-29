<template>
  <div class="article">
    <article-show :articleType="articleType" :articleName="articleName" v-if="articleType" :isPage="true" :key="articleType"></article-show>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { articleInfo } from '@/api/article'
import ArticleShow from '@/components/article/article-list.vue'
@Component({
  components: {
    ArticleShow
  }
})
export default class Article extends Vue {
  articleType = 0
  articleName = ''
  mounted() {
    this.articleTypeInfo()
  }
  articleTypeInfo() {
    if (this.$route.query.articleType) {
      this.articleType = +this.$route.query.articleType
      if (this.articleType === 1) {
        this.articleName = '工作动态'
      } else if (this.articleType === 2) {
        this.articleName = '公示公告'
      } else if (this.articleType === 3) {
        this.articleName = '政策法规'
      } else if (this.articleType === 4) {
        this.articleName = '赔偿案例'
      } else if (this.articleType === 5) {
        this.articleName = '保险课堂'
      }
    }
  }

  @Watch('$route')
  updateRoute() {
    this.articleTypeInfo()
  }
}
</script>