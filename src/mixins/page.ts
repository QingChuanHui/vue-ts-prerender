import { Vue } from 'vue-property-decorator'
interface PageD {
  pagesize: number
  total: number
  pagenum: number
}
declare module 'vue/types/vue' {
  interface Vue {
    pageData: PageD
    resetInit(): void
    pageSizeChange(size: number): void
    getData(): void
    changePage(pageindex: number): void
  }
}
export default class PageMixin extends Vue {
  pageData: PageD = { pagesize: 10, total: 0, pagenum: 1 }
  resetInit() {
    this.pageData.pagenum = 1
    this.getData()
  }
  pageSizeChange(size: number) {
    this.pageData.pagesize = size
    this.resetInit()
  }
  changePage(pageindex: number) {
    this.pageData.pagenum = pageindex
    this.getData()
  }
}
