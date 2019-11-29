<template>
  <div class="interaction-main">
    <div class="a-title">保险互动<a href="/#/interaction/add" class="a-href">我要留言</a></div>
    <div class="a-content">
      <div v-for="q in questionData" :key="q.id" class="content borderb">
        <div class="left-con">{{q.title}}</div>
        <div class="right-con"><a :href="`/#/interaction/detail?questionId=${q.id}`" class="a-href">【查看详情】</a></div>
      </div>
    </div>
    <div style="margin:5px;overflow: hidden;text-align:left;" v-if="isPage">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { questionList } from '@/api/question'
import { Page } from 'view-design'
interface PageD {
  pagesize: number
  total: number
  pagenum: number
}
@Component({
  components: {
    Page
  }
})
export default class InteractionMain extends Vue {
  pageData: PageD = { pagesize: 5, total: 0, pagenum: 1 }
  questionData = []
  @Prop({ type: Boolean, default: true }) isPage!: boolean
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
    questionList({ pageSize: this.pageData.pagesize, pageNum: this.pageData.pagenum}).then((data: any) => {
      this.questionData = data.data.contents
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
<style scoped lang="scss">
.interaction-main{
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
      .a-href {
        color: #5cadff;
      }
    }
    .timer {
      color: #999;
      text-align: right;
      font-size: .8rem;
      padding-right: 20px;
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
