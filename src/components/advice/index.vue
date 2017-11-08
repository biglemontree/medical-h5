<template>
    <div>
        {{test}}
        <div class="head fixed top-20px left-0 flex justify-between w-100 bg-eee z1 c-BEBEBE bb-eee">
            <div :class='["fs-16px w-6 py-16px center", {"active": !showLong}]' @click="toggle">临时医嘱</div>
            <div :class='["fs-16px w-6 py-16px center", {"active": showLong}]' @click="toggle">长期医嘱</div>
        </div>
        <div class="pt-83px pb-50px">
            <div class="" v-for="(short, index) in shortList" v-bind:key="index" v-show="!showLong">
                <table class="table table-bordered" width='100%' border="1">
                    <thead width='100%'> 
                        <tr >
                            <td class="center f-bold">类型</td>
                            <td class="center">{{short.NAME}}</td>
                            <td class="center f-bold">名称</td>
                            <td class="center">{{short.DRUG_NAME}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td class="center f-bold">开始时间</td>
                            <td class="center">{{short.ORDER_START_DATE}}</td>
                            <td class="center f-bold">结束时间</td>
                            <td class="center">{{short.ORDER_END_DATE}}</td>
                        </tr>
                        <tr >
                            <td class="center f-bold">规格</td>
                            <td class="center">{{short.DRUG_RULE}}</td>
                            <td class="center f-bold">剂量</td>
                            <td class="center">{{short.SINGLE_USED}}</td>
                        </tr>
                        <tr >
                            <td class="center f-bold">频次</td>
                            <td class="center">{{short.USED_TIMES}}</td>
                            <td class="center f-bold">总剂量</td>
                            <td class="center">{{short.TOTAL_USED}}</td>
                        </tr>

                    </tbody>

                </table>
                <div class="bg-eee h-10px"></div>
            </div>                
            <div class="" v-for="(long, index) in longList" v-bind:key="index" v-show="showLong">
                <!-- <div class="p-10px fs-16px">
                    <div class='fs-18px f-bold'>{{long.NAME}}</div>
                    <div class="flex ">
                        <div class="w-6">类型: {{long.ORDER_CLASS}}</div> 
                        <div class="flex-auto">规格: {{long.DRUG_RULE}}</div> 
                    </div>
                    <div>时间: {{long.ORDER_START_DATE}}至{{long.ORDER_END_DATE}}</div>
                    <div>剂量: {{long.SINGLE_USED}}</div>
                    <div>频次: {{long.USED_TIMES}}</div>
                    <div>总剂量: {{long.TOTAL_USED}}</div>
                </div> -->
                <table class="table table-bordered" width='100%' border="1">
                    <thead width='100%'> 
                        <tr >
                            <td class="center f-bold">类型</td>
                            <td class="center">{{long.NAME}}</td>
                            <td class="center f-bold">名称</td>
                            <td class="center">{{long.DRUG_NAME}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td class="center f-bold">开始时间</td>
                            <td class="center">{{long.ORDER_START_DATE}}</td>
                            <td class="center f-bold">结束时间</td>
                            <td class="center">{{long.ORDER_END_DATE}}</td>
                        </tr>
                        <tr >
                            <td class="center f-bold">规格</td>
                            <td class="center">{{long.DRUG_RULE}}</td>
                            <td class="center f-bold">剂量</td>
                            <td class="center">{{long.SINGLE_USED}}</td>
                        </tr>
                        <tr >
                            <td class="center f-bold">频次</td>
                            <td class="center">{{long.USED_TIMES}}</td>
                            <td class="center f-bold">总剂量</td>
                            <td class="center">{{long.TOTAL_USED}}</td>
                        </tr>

                    </tbody>

                </table>
                <div class="bg-eee h-10px"></div>
            </div>                
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import store from 'store'
import down from '../../assets/a-down.svg'
import vstore from '../../store/index.js'

export default {
  data(){
      return {
          showLong: false,
          shortList: [],
          longList: [],
          //   顶部
          inDate: '',
          outDate: '现在',
          list: [],
          down,  
          masterDoctorName: ''
      }
  },
  store: vstore,
  created(){
    //   顶部导航
       let t = this
  },
  computed: {
        test(){
            this.advice(this.$store.state.ehrId)      
        }
    },
  methods: {
      toggle(){
          this.showLong = !this.showLong
      },
      actionSheet(){
          weui.actionSheet(this.list, {
            className: 'custom-classname'
        });
      },
      advice(ehrId){
        
           // 长期医嘱
        request({
                url: `patient/doctorAdvice`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000,
                    ehrId: ehrId,
                    orderClass: 2
                }
            }).then(res => {
                this.longList = res.info
                console.log('this.longList', this.longList)
            })
        // 临时医嘱
        request({
                url: `patient/doctorAdvice`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000,
                    ehrId: ehrId,
                    orderClass: 1
                }
            }).then(res => {
                this.shortList = res.info
                console.log('this.shortList', this.shortList)
            })
      }
  }
}
</script>
<style scoped>
.active {color: #168ADC; border-bottom: 1px solid #168ADC;}
.td {
    border: none;
    /* border-top: 1px solid #eee; */
}
</style>

