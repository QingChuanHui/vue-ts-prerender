<template>
  <div class="interaction-detail">
    <h1 class="titlea">{{questionDetail.title}}</h1>
    <div class="timer">{{questionDetail.author}}  {{questionDetail.createTime | timeParse}}</div>
    <div class="qcontent">{{questionDetail.content}}</div>
    <div v-if="questionDetail.answered">
      <Divider>回答</Divider>
      <div class="qcontent">{{questionDetail.answer}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { questionInfo } from '@/api/question'
@Component({
  components: {
  },
})
export default class InteractionDetail extends Vue {
  questionDetail = {}
  questionId = 0
  mounted() {
    if (this.$route.query.questionId) {
      this.questionId = +this.$route.query.questionId
      this.questionInfo()
    }
  }
  questionInfo() {
    questionInfo({ questionId: this.questionId }).then((data: any) => {
      this.questionDetail = data.data
    })
  }
}
</script>
<style lang="scss" scoped>
.interaction-detail{
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
  .qcontent{
    // text-align: center;
    margin: 40px 10px 20px 10px;
  }
}
</style>