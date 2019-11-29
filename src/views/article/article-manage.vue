<template>
  <div class="information-manage">
    <Form  :label-width="90" class="marginBottom">
      <Row>
        <i-col>
          文章类别：
          <Select v-model="selectArticleType"  style="width: 200px;" @on-change="resetInit">
            <Option v-for="item in articleType" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>  <Button type="info" class="marginLeft" @click="addArticle" >新增内容</Button>
        </i-col>
      </Row>
    </Form>
    <Table :columns="columns" :data="articleData" stripe border :loading="$store.getters.loadingShow" ></Table>
    <div style="margin:5px;overflow: hidden;text-align:left;">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
    <Modal v-model="addArticleModel" title="新增/编辑内容" width="70%" footer-hide>
      <article-add @saveSuccess="articleSaveSuccess" :viewData="articleDetail" :articleType="articleType"  @closeModal="addArticleModel=false"></article-add>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { articleList, articleType, articleDelete, articleInfo } from '@/api/article'
import { parseTime } from '@/utils'
import { Modal } from 'view-design'
import ArticleAdd from './components/article-add.vue'
@Component({
  components: {
    ArticleAdd,
    Modal
  }
})
export default class ArticleManage extends Vue {
  pageData: PageD = { pagesize: 10, total: 0, pagenum: 1 }
  articleType: any = [] // 文章类别列表
  selectArticleType = 1 // 选择的类别
  columns: any = [
    {
      title: '文章标题',
      key: 'title',
      tooltip: true,
      minWidth: 150
    },
    {
      title: '文章摘要',
      key: 'summary',
      tooltip: true,
      minWidth: 200
    },
    {
      title: '创建时间',
      key: 'createTime',
      tooltip: true,
      resizable: true,
      width: 180,
      render: (h: any, params: any) => {
        return h(
          'span',
          parseTime(params.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')
        )
      }
    },
    {
      title: '作者',
      key: 'author',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      tooltip: true,
      resizable: true,
      width: 140,
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.editArticle(params.row.id)
                }
              }
            },
            '编辑'
          ),
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => {
                  this.deleteArticle(params.row.id)
                }
              }
            },
            '删除'
          )
        ])
      }
    }
  ]
  articleData: any = [] // 文章列表数据
  addArticleModel = false // 新增文章的model
  articleDetail = {} // 文章详情信息
  mounted() {
    this.getArticleType()
    this.resetInit()
  }
  addArticle() { // 新增
    this.articleDetail = {
      id: 0,
      title: '',
      type: this.selectArticleType,
      titleUrl: '',
      author: '',
      content: ''
    }
    this.addArticleModel = true
  }
  getArticleType() {
    articleType().then((data: any) => {
      this.articleType = data.data
    })
  }
  getData () {
    articleList({ pageSize: this.pageData.pagesize, pageNum: this.pageData.pagenum, type: this.selectArticleType }).then((data: any) => {
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
  deleteArticle(aid: number) { // 删除 信息
    this.$Modal.confirm({
      title: '是否删除',
      content: '<p>您确定要删除吗?</p>',
      onOk: () => {
        // 删除api
        articleDelete({ id: aid }).then((data) => {
          this.getData()
        })
      }
    })
  }
  articleSaveSuccess() { // 文章保存成功的回调
    this.addArticleModel = false
    this.getData()
  }
  editArticle(aid: number) {
    articleInfo({ id: aid }).then((data: any) => {
      this.articleDetail = data.data
      this.addArticleModel = true
    })
  }
}
</script>