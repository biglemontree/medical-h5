<template lang="html">
  <div class="head fixed top-0 left-0 flex justify-between w-100 bg-eee z1 c-BEBEBE bb-eee">

    <router-link class='fs-12px w-25 py-10px center' :to="{ name: 'admission-note', params: {} }" active-class='c-168ADC'>入院记录</router-link>
    <router-link class='fs-12px w-25 py-10px center' :to="{ name: 'first-illness', params: {} }" active-class='c-168ADC'>首次病程</router-link>
    <router-link class='fs-12px w-25 py-10px center' :to="{ name: 'daily-illness', params: {} }" active-class='c-168ADC'>日常病程</router-link>
    <router-link class='fs-12px w-25 py-10px center' :to="{ name: 'check-record', params: {} }" active-class='c-168ADC'>查房记录</router-link>
  </div>
</template>

<script>
export default {
  data(){
    return {
      head: [{
        title: '入院记录',
        url: 'record'
      }]
    }
  }
}
</script>

<style lang="css" scoped>
.bg-F6F6F6 {background-color: #F6F6F6;}
.bb-eee {border-bottom: 1px solid #eee;}
.c-168ADC {color: #168ADC; border-bottom: 1px solid #168ADC;}
.w-25 {width: 25%;}
</style>
