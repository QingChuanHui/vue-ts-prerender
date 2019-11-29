<template>
  <div class="interaction-add">
    <h1 style="text-align:center;">留言提问</h1>
    <br/>
    <div class="marginT">
      <label for=""><span class="xing">*</span>标题:</label>
      <i-Input type="textarea" v-model="questionDetail.title" placeholder="请输入标题" :autosize="true"  style="max-width:700px"  show-word-limit :maxlength="80"></i-Input>
    </div>
    <div class="marginT">
      <label for=""><span class="xing">*</span>内容:</label>
      <i-Input type="textarea" v-model="questionDetail.content" placeholder="请输入内容" :autosize="true"  style="max-width:700px"></i-Input>
    </div>
    <div class="marginT">
      <label for=""><span class="xing">*</span>姓名:</label>
      <i-Input type="text" v-model="questionDetail.fromUser" placeholder="请输入姓名"  style="max-width:400px"></i-Input>
    </div>
    <div class="marginT">
      <label for="">联系电话:</label><i-Input type="text" v-model="questionDetail.phone" placeholder="请输入联系电话"  style="max-width:400px"></i-Input>
    </div>
    <div class="marginT">
      <label for="">单位:</label><i-Input type="text" v-model="questionDetail.unit" placeholder="请输入单位"  style="max-width:400px"></i-Input>
    </div>
    <div class="marginT">
      <label for="">地址:</label><i-Input type="text" v-model="questionDetail.address" placeholder="请输入地址"  style="max-width:400px"></i-Input>
    </div>
    <div class="marginT">
      <label for="">邮箱:</label><i-Input type="text" v-model="questionDetail.email" placeholder="请输入邮箱"  style="max-width:400px"></i-Input>
    </div>
    <div class="marginT">
       <Button type="primary" style="margin-left:100px;" @click="saveQuestion">提交</Button><Button  style="margin-left:50px;" @click="clearV">重置</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { questionAdd } from '@/api/question'
import {
  Input, Button
} from 'view-design'
@Component({
  components: {
    'i-Input': Input,
    Button
  },
})
export default class InteractionAdd extends Vue {
  questionDetail = {
    title: '',
    content: '',
    fromUser: '',
    phone: '',
    unit: '',
    address: '',
    email: ''
  }
  questionId = 0
  mounted() {
  }
  saveQuestion() {
    questionAdd(this.questionDetail).then((data: any) => {
      this.$MessageShow('success', '留言成功,我们会尽快处理!')
      this.clearV()
    })
  }
  clearV() {
    this.questionDetail = {
      title: '',
      content: '',
      fromUser: '',
      phone: '',
      unit: '',
      address: '',
      email: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.interaction-add{
  .xing{
    color: red;
  }
  .marginT {
    label {
      width: 100px;
      display: inline-block;
    }
    margin-top: 10px;
  }
}
</style>