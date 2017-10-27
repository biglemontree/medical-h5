<template>
  <div id="app">
    <router-view/>
    <c-footer></c-footer>
  </div>
</template>

<script>
import store from 'store'
import CFooter from './components/Bottom.vue'
export default {
  name: 'app',
  components: {
    CFooter
  },
  mounted(){

    
    if (window.android) {
      const uuid = window.android.getUuid()
      const token = window.android.getToken()
      const ehrId = window.android.getEhrId()
      const date = window.android.getDate()
      // const timeZone = window.android.setDateZone()
      console.log('uuid: ', uuid)
      store.set('init', {
        uuid,
        token,
        ehrId,
        date
      })
      console.log('init: ', init)
      // console.log('timeZone: ', timeZone)
    } else {
      // weui.toast('window.android不存在')
      console.log('window.android不存在')      
      let uuid = 'DE7E39CD11154E70A26B2EA10888C133'
      let token = '1266ecd4-382f-4220-adb7-5408a54443d2'
      let ehrId = '7230'
      store.set('init', {
          uuid,
          token,
          ehrId
      })
    }
  }
}
</script>

<style>
@import "./../static/global.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
