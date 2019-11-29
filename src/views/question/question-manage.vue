<template>
  <div class="information-manage">
    <Table :columns="columns" :data="data" stripe border :loading="$store.getters.loadingShow" ></Table>
    <div style="margin:5px;overflow: hidden;text-align:left;">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
    <Modal v-model="questionAModel" title="解答互动" width="70%" footer-hide>
      <question-answer @saveSuccess="answerSaveSuccess" :viewData="questionData"   @closeModal="questionAModel=false"></question-answer>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { questionList, questionDelete, questionInfo } from '@/api/question'
import { parseTime } from '@/utils'
import QuestionAnswer from './components/question-answer.vue'
import { Modal } from 'view-design'
@Component({
  components: {
    QuestionAnswer,
    Modal
  }
})
export default class InformationSearchMain extends Vue {
  pageData: PageD = { pagesize: 10, total: 0, pagenum: 1 }
  articleType: any = [] // 文章类别列表
  selectArticleType = 1 // 选择的类别
  columns: any = [
    {
      title: '标题',
      key: 'title',
      tooltip: true,
      width: 200
    },
    {
      title: '内容',
      key: 'content',
      tooltip: true,
      minWidth: 150
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
      title: '是否解答',
      key: 'answered',
      tooltip: true,
      resizable: true,
      width: 100,
      render: (h: any, params: any) => {
        return h(
          'span', {
              style: {
                color: params.row.answered ? '' : 'red'
              }
            }, params.row.answered ? '解答' : '未解答'
        )
      }
    },
    {
      title: '发件人',
      key: 'fromUser',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '联系电话',
      key: 'phone',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '地址',
      key: 'address',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '邮箱',
      key: 'email',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '单位',
      key: 'unit',
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
                  this.answerQ(params.row.id)
                }
              }
            },
            '解答'
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
                  this.deleteQuestion(params.row.id)
                }
              }
            },
            '删除'
          )
        ])
      }
    }
  ]
  data: any = [] // 文章列表数据
  questionAModel = false // 问题回答model
  questionData = {} // 回答的数据
  mounted() {
    this.resetInit()
  }
  getData () {
    questionList({ pageSize: this.pageData.pagesize, pageNum: this.pageData.pagenum }).then((data: any) => {
      this.data = data.data.contents
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
  deleteQuestion(id: number) { // 删除 信息
    this.$Modal.confirm({
      title: '是否删除',
      content: '<p>您确定要删除吗?</p>',
      onOk: () => {
        // 删除api
        questionDelete({ questionId: id }).then((data) => {
          this.getData()
        })
      }
    })
  }
  answerQ(qid: number) {
    questionInfo({ questionId: qid }).then((data: any) => {
      this.questionData = data.data
      this.questionAModel = true
    })
  }
  answerSaveSuccess() { // 回答成功的回调
    this.questionAModel = false
    this.getData()
  }
}
</script>