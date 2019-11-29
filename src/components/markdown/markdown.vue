<template>
  <div class="markdown">
    <div ref="toolbar"  class="toolbar">
    </div>
    <div style="padding: 2px 0; color: #ccc"></div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import E from 'wangeditor'
import { ossBlobUpload } from '@/utils/oss-upload'
@Component({
  components: {
  }
})
export default class MarkDown extends Vue  {
  @Prop() content!: string
  editor: any = null
  mounted () {
    const editor = new E(this.$refs.toolbar, this.$refs.editor) // 实例化编辑器

    editor.customConfig.onchange = (html: string) => {
      this.$emit('saveContent', html)
    }
    // editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = '/upload' // 上传图片到服务器 /upload是上传图片的服务器端接口
    editor.customConfig.uploadImgMaxLength = 1
    // 自定义上传图片事件
    editor.customConfig.customUploadImg = (files: any, insert: any) => {
      // files[0] 是选中的文件 [0]是因为配置只能传一张.
      // insert 是获取图片 url 后，插入到编辑器的方法
      // 上传代码返回结果之后，将图片插入到编辑器中
      ossBlobUpload(files[0]).then((result: any) => {
        if (result.res.statusCode === 200) {
          insert(result.res.requestUrls[0].replace(/hzxv2-statics.oss-cn-beijing.aliyuncs.com/, 'hzxv2-statics.huifengda.cn')[0])
        } else {
          this.$MessageShow('waring', result.res.msg)
        }
      })
    }
    editor.create()
    editor.txt.html(this.content)
    // editor.txt.clear()
    // this.noticeContent = ''
  }
}
</script>

<style lang="scss" scoped>
.markdown {
  .toolbar {
      border: 1px solid #ccc;
  }
  .text {
      border: 1px solid #ccc;
      height: 600px;
  }
}

</style>
