<template lang="html">
<div class="footer fixed bottom-0 left-0 flex justify-between pt-6px w-100 px-30px c-BEBEBE bg-eee border-t-D8D8D8">
  <router-link :to="{ name: 'medical-record', params: {} }" active-class='c-168ADC'>
    <img src="./../assets/footer/dzbl.png" class='block' alt="">
    <img src="./../assets/footer/dzbl_s.png" class='none' alt="">
    <div class="fs-16px center">
      电子病历
    </div>
  </router-link>
  <router-link :to="{ name: 'medical-image', params: {} }" active-class='c-168ADC'>
    <img data-index='' src="./../assets/footer/img.png" class='block' alt="">
    <img data-index='' src="./../assets/footer/img_s.png" class='none' alt="">
    <div class="fs-16px center">
      医学影像
    </div>
  </router-link>
  <router-link :to="{ name: 'check', params: {} }" active-class='c-168ADC'>
    <img src="./../assets/footer/check.png" class='block' alt="">
    <img src="./../assets/footer/check_s.png" class='none' alt="">
    <div class="fs-16px center">
      检验
    </div>
  </router-link>
  <router-link :to="{ name: 'advice', params: {} }" class='center' active-class='c-168ADC'>
    <img src="./../assets/footer/advice.png" class='block' alt="" >
    <img src="./../assets/footer/advice_s.png" class='none' alt="" >
    <div class="fs-16px center   ">
      医嘱
    </div>
  </router-link>
</div>
</template>

<script>
export default {
  data(){
    return {
      footer: [
        {
          title: '入院记录',
          url: 'record',
          src: '',
          params: {}
        },
        
      ]
    }
  }
}
</script>

<style lang="css">
.footer {
  height: 50px;
}
.footer a {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* align-content: center; */
}
.footer img{
  height: 50%;
  /* position: relative;
  left: 50%;
  transform: translateX(-50%) */
}
.c-168ADC .block {
  display: none;
}
.c-168ADC .none {
  display: block;
}
</style>
