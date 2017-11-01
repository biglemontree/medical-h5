<template>
    <div>
        {{test}}
        <!-- <div class="fixed left-0 top-0 w-100 flex justify-center bg-168ADC c-fff">
            <div @click="actionSheet">
                <div class="fs-12px center">{{masterDoctorName}}</div>
                <div class="fs-10px center">
                    <span>{{inDate}} 至{{outDate}}</span>
                    <img :src="down" class="w-4px h-4px" alt="">
                </div>
            </div>
        </div> -->
        <div class="head fixed top-20px left-0 flex justify-between w-100 bg-eee z1 c-BEBEBE bb-eee">
            <div :class='["fs-14px w-6 py-14px center", {"active": !showLong}]' @click="toggle">临时医嘱</div>
            <div :class='["fs-14px w-6 py-14px center", {"active": showLong}]' @click="toggle">长期医嘱</div>
        </div>
        <div class="pt-83px">
            <div class="" v-for="(short, index) in shortList" v-bind:key="index" v-show="!showLong">
                <div class="p-10px fs-14px">
                    <div>{{short.NAME}}</div>
                    <div class="flex ">
                        <div class="w-6">类型: {{short.ORDER_CLASS}}</div> 
                        <div class="flex-auto">规格: {{short.DRUG_RULE}}</div> 
                    </div>
                    <div>时间: {{short.ORDER_START_DATE}}至{{short.ORDER_END_DATE}}</div>
                    <div>剂量: {{short.SINGLE_USED}}</div>
                    <div>频次: {{short.USED_TIMES}}</div>
                    <div>总剂量: {{short.TOTAL_USED}}</div>
                </div>
                <div class="bg-eee h-10px"></div>
            </div>                
            <div class="" v-for="(long, index) in longList" v-bind:key="index" v-show="showLong">
                <div class="p-10px fs-14px">
                    <div>{{long.NAME}}</div>
                    <div class="flex ">
                        <div class="w-6">类型: {{long.ORDER_CLASS}}</div> 
                        <div class="flex-auto">规格: {{long.DRUG_RULE}}</div> 
                    </div>
                    <div>时间: {{long.ORDER_START_DATE}}至{{long.ORDER_END_DATE}}</div>
                    <div>剂量: {{long.SINGLE_USED}}</div>
                    <div>频次: {{long.USED_TIMES}}</div>
                    <div>总剂量: {{long.TOTAL_USED}}</div>
                </div>
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
    //     if (window.android) {
    //         const listChoose = window.android.getEhrList()
    //         let result = JSON.parse(listChoose)
    //         this.inDate = result[0].IN_DATE
    //         this.outDate = result[0].OUT_DATE || '现在'
    //         this.masterDoctorName = result[0].MASTER_DOCTOR_NAME 
    //         this.advice(result[0].EHRID)
    //         for (var index = 0; index < result.length; index++) {
    //             var element = result[index];
    //             this.list.push({
    //                     label: `${element.IN_DATE}至${element.OUT_DATE||' 现在'}`,
    //                     onClick: (cb) =>{
    //                         this.advice(element.EHRID)
    //                     }
    //                 })
    //         }
    //     } 


    //   request({
    //         url: `patient/doctorAdviceCount`,
    //         data: {
    //             token: store.get('init').token,
    //             uid: store.get('init').uuid,
    //             t: (new Date().getTime())+4000,
    //             ehrId: store.get('init').ehrId,
    //             orderClass: 1
    //         }
    //     }).then(res => {
    //         this.long = res.info
    //     })  

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
</style>

