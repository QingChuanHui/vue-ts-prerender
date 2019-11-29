<template>
  <div class="question-answer">
    <div class="modal-body">
      <Form  :model="viewData" ref="viewData" :label-width="100" label-position="right" >
        <Row>
          <i-col span="22">
            <FormItem label="文章标题">
              {{viewData.title}}
            </FormItem>
          </i-col>
         </Row>
        <Row>
          <i-col span="22">
            <FormItem label="内容">
              {{viewData.content}}
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="22">
            <FormItem label="回答，解答">
              <Input v-model="viewData.answer" type="textarea" :autosize="true" placeholder="解答" />
            </FormItem>
          </i-col>
         </Row>
      </Form>
    </div>
    <div class="ivu-modal-footer">
      <Button @click="closeModal">取消</Button>
      <Button type="primary" @click="saveData">保存</Button>
    </div>
    <Spin  fix v-if="$store.getters.loadingShow"></Spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { questionAnswer } from '@/api/question'
import { Spin } from 'view-design'
@Component({
  components: {
    Spin
  }
})
export default class QuestionAnswer extends Vue {
  @Prop() viewData!: any // 新增和编辑的数据
  closeModal () {
    this.$emit('closeModal')
  }
  saveData () {
    questionAnswer({ questionId: this.viewData.id, answer: this.viewData.answer }).then(data => {
      this.$MessageShow('success', '操作成功')
      this.$emit('saveSuccess') // 回调父组件方法 让其查询案由信息
    })
  }
}
</script>