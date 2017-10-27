<template>
    <div>
        <div class="head fixed top-0 left-0 flex justify-between w-100 bg-eee z1 c-BEBEBE bb-eee">
            <div class='fs-12px w-6 py-10px center' :to="{ name: 'admission-note', params: {} }" >临时医嘱</div>
            <div class='fs-12px w-6 py-10px center' :to="{ name: 'first-illness', params: {} }" >长期医嘱</div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return {
          
      }
  }
}
</script>
<style scoped>
.c-168ADC {color: #168ADC; border-bottom: 1px solid #168ADC;}
</style>

