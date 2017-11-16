<template lang="html">
  <div class=''>
    <div class="head fixed top-20px left-0  w-100 bg-eee z1 c-BEBEBE bb-eee fs-14px">
      <div class='wrap flex justify-between'>
        <router-link v-if="Emr =='0' || Emr==2 || Emr==4" class='fs-14px  px-10px py-10px center ' :to="{ name: 'admission-note', params: {} }" active-class='c-168ADC'>入院记录</router-link>
        <router-link v-if="Emr!=0" class='fs-14px  px-10px py-10px center' :to="{ name: 'admission-origin', params: {} }" active-class='c-168ADC'>入院记录原文</router-link>
        <router-link v-if="Emr =='0' || Emr==2 || Emr==4" class='fs-14px  px-10px py-10px center' :to="{ name: 'first-illness', params: {} }" active-class='c-168ADC'>首次病程</router-link>
        <router-link v-if="Emr!=0" class='fs-14px  px-10px py-10px center' :to="{ name: 'first-origin', params: {} }" active-class='c-168ADC'>首次病程原文</router-link>
        <router-link class='fs-14px  px-10px py-10px center' :to="{ name: 'daily-illness', params: {} }" active-class='c-168ADC'>日常病程</router-link>
        <router-link class='fs-14px  px-10px py-10px center' :to="{ name: 'check-record', params: {} }" active-class='c-168ADC'>查房记录</router-link>
      </div>  
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
      Emr: '',
      list: []
    }
  },
  store,
  mounted(){
        // console.log('check: ', this.$store.state)
        if (window.android) {
            const listChoose = window.android.getEhrList()
            const Emr = window.android.getEmr()
            this.Emr = Emr
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
.wrap {
    /* width: 600px; */
     white-space: nowrap;
}
.head {
    overflow-x: scroll;
    white-space: nowrap;
}
a {
    display: inline-block;
}
</style>
