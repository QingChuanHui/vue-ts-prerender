<template>
  <div class="article-list">
    <div class="a-title">{{articleName}} <a :href="`/#/article/articleList?articleType=${articleType}`" class="a-href" v-if="!isPage">查看更多>></a></div>
    <div class="a-content" v-if="articleType === 2 || articleType===3">
      <div v-for="article in articleData" :key="article.id" class="content borderb">
        <div class="left-con">{{article.title}}</div>
        <div class="right-con"><a :href="`/#/article/detail?articleId=${article.id}`" class="a-href">【查看详情】</a></div>
      </div>
    </div>
    <div class="a-content" v-else>
      <div v-for="article in articleData" :key="article.id" class="borderb content1">
        <div class="leftImg" v-if="article.titleUrl">
          <img :src="article.titleUrl" alt="">
        </div>
        <div class="rightMain">
          <div class="content">
            <div class="left-con">{{article.title}}</div>
            <div class="right-con timer">{{article.createTime | timeParse('{y}-{m}-{d}')}}</div>
          </div>
          <div class="text" >{{article.summary}}</div>
          <div class="info" ><a :href="`/#/article/detail?articleId=${article.id}`" class="a-href">【查看详情】</a></div>
        </div>
        <!-- <div class="text">福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的福卡时代峻峰看到了司法局看到了经费公开的规划局卡拉三等奖反馈过拉丝的开发商的商的</div> -->
      </div>
    </div>
    <div style="margin:5px;overflow: hidden;text-align:left;" v-if="isPage">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { articleList } from '@/api/article'
import { Page } from 'view-design'
@Component({
  components: {
    Page
  }
})
export default class ArticleShow extends Vue {
  pageData: PageD = { pagesize: 5, total: 0, pagenum: 1 }
  articleData = []
  @Prop({ type: Number, default: 1 }) articleType!: number
  @Prop() articleName!: string
  @Prop({ type: Boolean, default: false }) isPage!: boolean
  // asyncData ({ store }: any) {
  //   return store.dispatch('getArticleList', { type: this.articleType, pageSize: 10,  })
  // }
  mounted () {
    if (this.isPage) {
      this.pageData.pagesize = 10
    }
    this.resetInit()
  }
  getData() {
    articleList({ type: this.articleType, pageSize: this.pageData.pagesize, pageNum: this.pageData.pagenum}).then((data: any) => {
      this.articleData = data.data.contents
      this.pageData.total = data.data.total
    })
  }
  changePage(pageindex: number) {
    this.pageData.pagenum = pageindex
    this.getData()
  }
  resetInit() {
    this.pageData.pagenum = 1
    this.getData()
  }
  pageSizeChange(size: number) {
    this.pageData.pagesize = size
    this.resetInit()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.article-list{
  .borderb{
    border-bottom: 1px dashed #E3E3E3;
  }
  border: 1px solid #E3E3E3;
  margin-bottom: 10px;
  width: 100%;
  .a-title {
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    // color: #fff;
    font-weight: bold;
    background-color: #E3E3E3;
    .a-href {
      color: #5cadff;
      float: right;
    }
  }
  .a-content {
    padding: 10px;
    .content1 {
      display:-webkit-box;
    }
    .rightMain{
      flex: 1;
    }
    .leftImg{
      img {
        width: 100%;
      }
      width: 200px;
      margin-right: 5px;
    }
    @media screen and (max-width:480px){
      .leftImg {
        width: 100px;
      }
    }
    .info{
      height: 30px;
      line-height: 30px;
      text-align: right;
      // padding-right: 20px;
    }
    .a-href {
      color: #5cadff;
    }
    border-top: 1px solid #E3E3E3;
    .content{
      height: 40px;
      line-height: 40px;
      display:flex;
      .left-con {
        flex: 1;
        font-weight: bold;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .right-con{
        text-align: center;
        width: 100px;
      }
    }
    .timer {
      color: #999;
      text-align: right;
      font-size: .8rem;
    }
    .text{
      color: #999;
      font-size: .8rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 5px;
    }
  }
}
</style>
