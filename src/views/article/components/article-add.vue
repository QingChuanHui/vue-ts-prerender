<template>
  <div class="article-add">
    <div class="modal-body">
      <Form  :model="viewData" ref="viewData" :label-width="100" label-position="right" >
        <Row>
          <i-col span="22">
            <FormItem label="文章标题">
              <Input v-model="viewData.title"  clearable  />
            </FormItem>
          </i-col>
         </Row>
        <Row>
          <i-col span="22">
            <FormItem label="摘要">
              <Input v-model="viewData.summary"  clearable  />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="22">
            <FormItem label="所属类别" >
              <Select v-model="viewData.type"  style="width: 200px;" >
                <Option v-for="item in articleType" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
            </FormItem>
          </i-col>
         </Row>
        <Row>
          <i-col span="22">
            <FormItem label="标题图片">
              <Input v-model="viewData.titleUrl"  style="max-width:400px;" />
              <Upload action="/" :max-size="2048"  :before-upload="handleUploadTitle" style="display: inline-block;">
                <Button type="primary" class="marginLeft">选择图片</Button>
              </Upload>
            </FormItem>
          </i-col>
         </Row>
         <Row>
          <i-col span="22">
            <FormItem label="作者">
              <Input v-model="viewData.author"  clearable  style="max-width:200px;" />
            </FormItem>
          </i-col>
         </Row>
        <Row>
          <i-col span="22">
            <FormItem label="内容">
              <mark-down :content="viewData.content"  @saveContent="saveContent"  :key="viewData.id" />
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
import { articleEdit } from '@/api/article'
import { Spin, Upload } from 'view-design'
import { ossBlobUpload } from '@/utils/oss-upload'
import MarkDown from '@/components/markdown/markdown.vue'
@Component({
  components: {
    Spin,
    MarkDown,
    Upload
  }
})
export default class ArticleAdd extends Vue {
  @Prop() viewData!: any // 新增和编辑的数据
  @Prop() articleType!: any // 类别数据
  closeModal () {
    this.$emit('closeModal')
  }
  saveData () {
    articleEdit(this.viewData).then(data => {
      this.$MessageShow('success', '操作成功')
      this.$emit('saveSuccess') // 回调父组件方法 让其查询案由信息
    })
  }
  saveContent(html: any) {
    this.viewData.content = html
  }
  handleUploadTitle(file: any) {
    ossBlobUpload(file).then((result: any) => {
      if (result.res.statusCode === 200) {
        this.viewData.titleUrl = result.res.requestUrls[0].replace(/hzxv2-statics.oss-cn-beijing.aliyuncs.com/,
         'hzxv2-statics.huifengda.cn')
      } else {
        this.$MessageShow('waring', result.res.msg)
      }
    })
  }
}
</script>