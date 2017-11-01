<template lang="html">
  <div>
     <!-- <div class="fixed left-0 top-0 w-100 flex justify-center bg-168ADC c-fff">
        <div @click="actionSheet">
            <div class="fs-12px center">{{top.NAME}}</div>
            <div class="fs-10px center">
                <span>{{top.IN_DATE}} 至{{top.OUT_DATE || '现在'}}</span>
                <img :src="down" class="w-8px h-8px" alt="">
            </div>
        </div>
    </div> -->
    <div class="head fixed top-20px left-0 flex justify-between w-100 bg-eee z1 c-BEBEBE bb-eee fs-14px">

      <router-link class='fs-14px w-25 py-6px center' :to="{ name: 'admission-note', params: {} }" active-class='c-168ADC'>入院记录</router-link>
      <router-link class='fs-14px w-25 py-6px center' :to="{ name: 'first-illness', params: {} }" active-class='c-168ADC'>首次病程</router-link>
      <router-link class='fs-14px w-25 py-6px center' :to="{ name: 'daily-illness', params: {} }" active-class='c-168ADC'>日常病程</router-link>
      <router-link class='fs-14px w-25 py-6px center' :to="{ name: 'check-record', params: {} }" active-class='c-168ADC'>查房记录</router-link>
    </div>
  </div>
</template>

<script>

import store from '../../store/index.js'
import down from '../../assets/a-down.svg'

let list = []
export default {
  data(){
    return {
      top: {},
      down,
      list: []
    }
  },
  store,
  mounted(){
        // console.log('check: ', this.$store.state)
        if (window.android) {
            const listChoose = window.android.getEhrList()
            let result = JSON.parse(listChoose)
            this.top = result[0]
            console.log(result)
            for (let index = 0; index < result.length; index++) {
                let element = result[index];
                
                this.list.push({
                        label: `${element.IN_DATE}至${element.OUT_DATE||'现在'}`,
                        onClick: (cb) =>{    
                            this.$store.commit('setEhrId', element.EHRID)
                            this.top = result[index]
                            console.log('点击: ', this.top.IN_DATE)
                        }
                    })
            }
      
        } 

    },
    computed: {

    },
  methods: {
     actionSheet(){
            weui.actionSheet(this.list, {
                className: 'custom-classname'
            });
        },
  }
}
</script>

<style lang="css" scoped>
.bg-F6F6F6 {background-color: #F6F6F6;}
.bb-eee {border-bottom: 1px solid #eee;}
.c-168ADC {color: #168ADC; border-bottom: 1px solid #168ADC;}
.w-25 {width: 25%;}
</style>
