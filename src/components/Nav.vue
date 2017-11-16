<template>
    <div class="fixed left-0 top-0 w-100 flex  bg-168ADC flex items-center justify-center c-fff py-6px z1">
      
        <img src="../assets/to_left.png" @click="close" class="absolute left-10px w-15px" alt="">
        
        <div @click="actionSheet" class="auto-center fs-16px">
            <div class="fs-18px center">{{top.NAME}}</div>
            <div class="fs-14px center">
                <span>{{top.IN_DATE}} 至{{top.OUT_DATE || '现在'}}</span>
                <img :src="down" class="w-8px h-8px" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import store from 'store'
import vstore from '../store/index.js'
import left from '../assets/a-left.svg'
import down from '../assets/a-down.svg'

export default {
  data(){
      return {
          top: {},
          down,
          left,
          list: [] //弹出 时间
      }
  },
  store: vstore,
  created(){
      let t = this
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
  methods: {
      actionSheet(){
          weui.actionSheet(this.list, {
            className: 'custom-classname'
        });
      },
      close(){ 
        console.log( window.android)
        window.android.exitAndroid()

      }
  }
}
</script>

<style>
img {

}
.auto-center{
    /* position: relative;
    top: 50%;
    transform: translateY(-50%) */
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
