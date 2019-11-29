<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Model, Watch, Provide, Inject, Emit, Ref } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'// @ is an alias to /src
@Component({
  components: {
    HelloWorld
  },
})
export default class Home extends Vue {
  demo: any = { name : '' }
  value = ''
  count = 0
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined

  @PropSync('name', { type: String }) syncedName!: string // 同步

  @Model('change', { type: Boolean }) readonly checked!: boolean

  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: any, oldVal: any) {}
  get newName() { // computed
    return this.demo.name
  }

  @Watch('person')
  onPersonChanged2(val: any, oldVal: any) {}

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e: any) {
    return e.target.value
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }

  // @Ref() readonly anotherComponent!: any
  // @Ref('aButton') readonly button!: HTMLButtonElement

  mounted() {
  }
}
</script>