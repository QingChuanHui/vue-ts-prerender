<template>
  <div class="information-manage">
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
        <!-- <i-col :xs="24" :sm="12" :lg="8">
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
        </i-col> -->
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="保险公司：" >
            <Select v-model="formData.insuranceCompany"  placeholder="请选择保险公司" style="max-width:400px" clearable>
              <Option v-for="(value, index) in dataBase.insuranceCompanyData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <!-- <i-col :xs="24" :sm="12" :lg="8">
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
        </i-col> -->
        <i-col :xs="24" :sm="12" :lg="8">
          <FormItem  label="经纪公司：" >
            <Select v-model="formData.economicCompany"  placeholder="请选择经纪公司" style="max-width:400px" clearable>
              <Option v-for="(value, index) in dataBase.economicCompanyData" :value="value" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col style="text-align:center;">
          <Button type="info" @click="resetInit" >检索</Button>
          <Button type="primary" style="margin-left:50px;" @click="outFile(1)" >导出</Button>
          <Button class="marginLeft" @click="outFile(2)">下载模板</Button>
          <Upload
            :max-size="2048"
            :show-upload-list="false"
            :action="baseUrl+'/information/upload'"
            :on-success="importOk"
            style="display: inline-block;">
              <Button type="primary" class="marginLeft" >导入</Button>
          </Upload>
        </i-col>
      </Row>
    </Form>
    <Table :columns="columns" :data="informationData.listInformation" stripe border :loading="$store.getters.loadingShow" ></Table>
    <div style="margin:5px;overflow: hidden;text-align:left;">
      <Page show-sizer show-total :page-size="pageData.pagesize" :total="pageData.total" :current="pageData.pagenum" @on-change="changePage" @on-page-size-change="pageSizeChange"  :page-size-opts="[10, 20, 30, 40,50,100]"></Page>
    </div>
    <Upload
      :max-size="2048"
      :before-upload="handleUploadInformation"
      action="/"
      style="display: none;">
        <span href="" ref="uploadA"></span>
    </Upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  informationList, informationDelete, informationUpload, cityData, countyData, insuranceCompanyData, economicCompanyData
} from '@/api/information'
import { parseTime, downloadWord } from '@/utils'
import { DatePicker, Upload } from 'view-design'
import { ossBlobUpload } from '@/utils/oss-upload'
@Component({
  components: {
    DatePicker,
    Upload
  }
})
export default class InformationSearchMain extends Vue {
  baseUrl = process.env.VUE_APP_BASEAPI
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
  uploadInformation: any = { informationId: 0, fileType: 1 } // 上传报告信息
  uploadBtn: any
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
      width: 130,
      render: (h: any, params: any) => {
        const btnList = [
          h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.uploadReport(params.row, 1)
                }
              }
            },
            '上传'
          )
        ]
        if (params.row.assessmentReportUrl) {
          btnList.push(h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => {
                  this.urlD(params.row.assessmentReportUrl)
                }
              }
            },
            '查看'
          ))
        }
        return h('div', btnList)
      },
    },
    {
      title: '保单抄件',
      key: 'policyUrl',
      width: 130,
      render: (h: any, params: any) => {
        const btnList = [
          h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.uploadReport(params.row, 2)
                }
              }
            },
            '上传'
          )
        ]
        if (params.row.policyUrl) {
          btnList.push(h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => {
                  this.urlD(params.row.policyUrl)
                }
              }
            },
            '查看'
          ))
        }
        return h('div', btnList)
      }
    },
    {
      title: '操作',
      key: 'action',
      tooltip: true,
      resizable: true,
      width: 80,
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deleteInformation(params.row.id)
                }
              }
            },
            '删除'
          )
        ])
      }
    }
  ]
  informationData: any = {}
  mounted() {
    this.getDataBase()
    this.resetInit()
  }
  getDataBase() { // 获取基本数据
    cityData().then((data: any) => {
      this.dataBase.cityData = data.data
    })
    // bigClassData().then((data: any) => {
    //   this.dataBase.bigClassData = data.data
    // })
    // riskLevelData().then((data: any) => {  // riskLevelData, insuranceCompanyData, economicCompanyData
    //   this.dataBase.riskLevelData = data.data
    // })
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
      this.informationData = data.data.contents
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
  outFile(type: number) {
    if (type === 1) { // 导出数据
      const paramD: any = { ...this.formData }
      let urlParm = '?1=1'
      for (const i in this.formData) {
        if (paramD[i]) {
          urlParm += '&' + i + '=' + paramD[i]
        }
      }
      downloadWord(process.env.VUE_APP_BASEAPI + 'information/download' + urlParm)
    } else { // 导出模板
      downloadWord(process.env.VUE_APP_BASEAPI + 'information/model/download')
    }
  }
  uploadReport(row: any, type: number) { // 上传的报告和保单的方法
    this.uploadInformation.informationId = row.id
    this.uploadInformation.fileType = type
    this.uploadBtn = this.$refs['uploadA']
    this.uploadBtn.click()
  }
  deleteInformation(id: number) { // 删除 信息
    this.$Modal.confirm({
      title: '是否删除',
      content: '<p>您确定要删除吗?</p>',
      onOk: () => {
        // 删除api
        informationDelete({ informationId: id }).then((data) => {
          this.getInformationData()
        })
      }
    })
  }
  handleUploadInformation(file: any) { // 上传报告和保单
    ossBlobUpload(file).then((result: any) => {
      if (result.res.statusCode === 200) {
        this.uploadInformation.fileUrl = result.res.requestUrls[0].replace(/hzxv2-statics.oss-cn-beijing.aliyuncs.com/, 'hzxv2-statics.huifengda.cn')
        informationUpload(this.uploadInformation).then((data) => {
          this.$MessageShow('success', '上传' + (this.uploadInformation.fileType === 1 ? '评估报告' : '保单') + '成功')
          this.getInformationData()
        })
      } else {
        this.$MessageShow('waring', result.res.msg)
      }
    })
    return false
  }
  importOk(response: any, file: any, fileList: any) { // 导入数据成功后
    if (response.code === 2000) {
      this.$MessageShow('success', '导入信息成功')
    } else {
      this.$MessageShow('waring', response.message)
    }
  }
}
</script>