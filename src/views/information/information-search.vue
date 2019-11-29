<template>
  <div class="information-search-main">
    <Form  :label-width="90" class="marginBottom">
      <Row>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="企业名称：" >
            <i-Input type="text" v-model="formData.enterpriseName" placeholder="请输入企业名称"  style="max-width:400px" clearable>
            </i-Input>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="片区：" placeholder="请选择片区" >
            <Select v-model="formData.city"  placeholder="请选择市区" style="max-width:150px" clearable @on-change="selctCounty" >
              <Option v-for="(value, index) in dataBase.cityData" :value="value" :key="index">{{ value }}</Option>
            </Select>
            <Select v-model="formData.county"  placeholder="请选择县区" style="max-width:150px;margin-left:5px;" clearable>
              <Option v-for="(value, index) in dataBase.countyData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="投保时间：" >
            <DatePicker type="date" v-model="formData.startUpDateStart" split-panels placeholder="请选择开始时间" style="max-width:150px"></DatePicker>&nbsp;至&nbsp;
            <DatePicker type="date" v-model="formData.startUpDateEnd" split-panels placeholder="请选择结束时间" style="max-width:150px"></DatePicker>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="保单号：" >
            <i-Input type="text" v-model="formData.policyNo"  placeholder="请输入保单号" style="max-width:400px" clearable>
            </i-Input>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="行业类型：" >
            <Select v-model="formData.bigClass"  placeholder="请选择大类" style="max-width:150px" clearable @on-change="selctBigClass">
              <Option v-for="(value, index) in dataBase.bigClassData" :value="value" :key="index">{{ value }}</Option>
            </Select>
            <Select v-model="formData.smallClass"  placeholder="请选择小类" style="max-width:150px;margin-left:5px;" clearable>
              <Option v-for="(value, index) in dataBase.smallClassData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="保险公司：" >
            <Select v-model="formData.insuranceCompany"  placeholder="请选择保险公司" style="max-width:400px" clearable>
              <Option v-for="(value, index) in dataBase.insuranceCompanyData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="投保限额：" >
            <i-Input type="text" v-model="formData.insuredStart"  placeholder="起始限额" style="max-width:150px" clearable></i-Input>&nbsp;至&nbsp;
            <i-Input type="text" v-model="formData.insuredEnd"  placeholder="终止限额" style="max-width:150px" clearable></i-Input>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="风险等级：" >
            <Select v-model="formData.riskLevel"  placeholder="请选择风险等级" style="max-width:400px" clearable >
              <Option v-for="(value, index) in dataBase.riskLevelData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="经纪公司：" >
            <Select v-model="formData.economicCompany"  placeholder="请选择经纪公司" style="max-width:400px" clearable>
              <Option v-for="(value, index) in dataBase.economicCompanyData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          总计&nbsp;&nbsp;总数：{{infotmationData.listCount}}&nbsp;&nbsp;保额：{{infotmationData.insuredSum}}万元&nbsp;&nbsp;保费：{{infotmationData.premiumSum}}元&nbsp;&nbsp;&nbsp;均件保额：{{infotmationData.insuredAverage}}万元&nbsp;&nbsp; 均件保费：{{infotmationData.premiumAverage}}元
        </i-col>
        <i-col :xs="24" :sm="12">
          <Button type="primary" @click="resetInit" >检索</Button>
          <Button type="info" style="margin-left:50px;" @click="outFile" >导出</Button>
        </i-col>
      </Row>
    </Form>
    <Table :columns="columns" :data="infotmationData.listInformation" stripe border :loading="$store.getters.loadingShow" ></Table>
    <div style="margin:5px;overflow: hidden;text-align:left;">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  informationList, cityData, countyData, bigClassData, smallClassData,
  riskLevelData, insuranceCompanyData, economicCompanyData
} from '@/api/information'
import { parseTime, downloadWord } from '@/utils'
import { DatePicker } from 'view-design'
@Component({
  components: {
    DatePicker
  }
})
export default class InformationSearchMain extends Vue {
  pageData: PageD = { pagesize: 10, total: 0, pagenum: 1 }
  formData = { // 表单搜索的实体数据
    enterpriseName: '',
    city: '',
    county: '',
    startUpDateStart: '',
    startUpDateEnd: '',
    policyNo: '',
    bigClass: '',
    smallClass: '',
    insuranceCompany: '',
    insuredStart: '',
    insuredEnd: '',
    riskLevel: '',
    economicCompany: ''
  }
  dataBase = {
    cityData: [], // 市区的数据
    countyData: [], // 县区
    bigClassData: [], // 大类
    smallClassData: [], // 小类
    riskLevelData: [], // 等级
    insuranceCompanyData: [], // 保险公司
    economicCompanyData: [] // 经纪公司
  }
  columns: any = [
    {
      title: '企业名称',
      key: 'enterpriseName',
      tooltip: true,
      fixed: 'left',
      minWidth: 150
    },
    {
      title: '起保日期',
      key: 'startUpDate',
      tooltip: true,
      resizable: true,
      fixed: 'left',
      width: 120
      // render: (h: any, params: any) => {
      //   return h(
      //     'span',
      //     parseTime(params.row.startUpDate, '{y}-{m}-{d}')
      //   )
      // }
    },
    {
      title: '片区',
      align: 'center',
      children: [
        {
          title: '市区',
          key: 'city',
          tooltip: true,
          resizable: true,
          width: 100
        },
        {
          title: '县区',
          key: 'county',
          tooltip: true,
          resizable: true,
          width: 100
        }
      ]
    },
    {
      title: '行业类型',
      align: 'center',
      children: [
        {
          title: '大类',
          key: 'bigClass',
          tooltip: true,
          resizable: true,
          width: 100
        },
        {
          title: '小类',
          key: 'smallClass',
          tooltip: true,
          resizable: true,
          width: 100
        }
      ]
    },
    {
      title: '企业规模',
      key: 'enterpriseSize',
      tooltip: true,
      resizable: true,
      width: 150
    },
    {
      title: '风险等级',
      key: 'riskLevel',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '保额(万元)',
      key: 'insured',
      tooltip: true,
      resizable: true,
      width: 110
    },
    {
      title: '保费(元)',
      key: 'premium',
      tooltip: true,
      resizable: true,
      width: 100
    },
    {
      title: '保单号',
      key: 'policyNo',
      tooltip: true,
      resizable: true,
      width: 220
    },
    {
      title: '保险公司',
      key: 'insuranceCompany',
      tooltip: true,
      resizable: true,
      width: 140
    },
    {
      title: '经纪公司',
      key: 'economicCompany',
      tooltip: true,
      resizable: true,
      width: 140
    },
    {
      title: '评估报告',
      key: 'assessmentReportUrl',
      width: 100,
      render: (h: any, params: any) => {
        if (params.row.assessmentReportUrl) {
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
                    this.urlD(params.row.assessmentReportUrl)
                  }
                }
              },
              '查看'
            )
          ])
        } else {
          return h('span', '无')
        }
      }
    },
    {
      title: '保单抄件',
      key: 'policyUrl',
      width: 100,
      render: (h: any, params: any) => {
        if (params.row.policyUrl) {
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
                    this.urlD(params.row.policyUrl)
                  }
                }
              },
              '查看'
            )
          ])
        } else {
          return h('span', '无')
        }
      }
    }
  ]
  infotmationData: any = {}
  mounted() {
    this.getDataBase()
    this.resetInit()
  }
  getDataBase() { // 获取基本数据
    cityData().then((data: any) => {
      this.dataBase.cityData = data.data
    })
    bigClassData().then((data: any) => {
      this.dataBase.bigClassData = data.data
    })
    riskLevelData().then((data: any) => {  // riskLevelData, insuranceCompanyData, economicCompanyData
      this.dataBase.riskLevelData = data.data
    })
    insuranceCompanyData().then((data: any) => { // insuranceCompanyData, economicCompanyData
      this.dataBase.insuranceCompanyData = data.data
    })
    economicCompanyData().then((data: any) => { // economicCompanyData
      this.dataBase.economicCompanyData = data.data
    })
  }
  selctCounty(value: any) { // 选择市区后改变县区
    this.dataBase.countyData = []
    this.formData.county = ''
    if (value) {
      countyData({ city: value }).then((data: any) => {
        this.dataBase.countyData = data.data
      })
    }
  }
  selctBigClass(value: any) { // 选择大类的改变小类
    this.dataBase.smallClassData = []
    this.formData.smallClass = ''
    if (value) {
      smallClassData({ bigClass: value }).then((data: any) => {
        this.dataBase.smallClassData = data.data
      })
    }
  }
  getInformationData () {
    const paramD: any = { ...this.formData }
    for (const i in paramD) {
      if (!paramD[i]) {
        delete paramD[i]
      }
    }
    paramD.pageNum = this.pageData.pagenum
    paramD.pageSize = this.pageData.pagesize
    informationList(paramD).then((data: any) => {
      this.infotmationData = data.data.contents
      this.pageData.total = data.data.total
    })
  }
  changePage(pageindex: number) {
    this.pageData.pagenum = pageindex
    this.getInformationData()
  }
  resetInit() {
    this.pageData.pagenum = 1
    this.getInformationData()
  }
  pageSizeChange(size: number) {
    this.pageData.pagesize = size
    this.resetInit()
  }
  urlD (urlD: string) {
    if (urlD) {
      const tempwindow: any = window.open('_blank')
      tempwindow.location = urlD
    } else {
      this.$MessageShow('info', '该文件不存在')
    }
  }
  outFile() {
    const paramD: any = { ...this.formData }
    let urlParm = '?1=1'
    for (const i in this.formData) {
      if (paramD[i]) {
        urlParm += '&' + i + '=' + paramD[i]
      }
    }
    downloadWord(process.env.VUE_APP_BASEAPI + 'information/download' + urlParm)
  }
}
</script>
<style lang="scss" scoped>
// .information-search-main{
// }
</style>