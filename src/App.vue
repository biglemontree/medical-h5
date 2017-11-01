<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <c-footer></c-footer>
  </div>
</template>

<script>
let num = 0;
import store from 'store'
import Navbar from './components/Nav.vue'
import CFooter from './components/Bottom.vue'
export default {
  name: 'app',
  components: {
    CFooter,
    Navbar
  },
  mounted(){
    num++
    console.log(num)
    if (window.android) {
      const uuid = window.android.getUuid()
      const token = window.android.getToken()
      const list = window.android.getEhrList()
      console.log('from-android-token: ', token)
      store.set('init', {
        uuid,
        token,
      })
      
    } else {
      // weui.toast('window.android不存在')
      console.log('window.android不存在')      
      let uuid = '6B248223E22C4D379E2BA3FB4B2BF3F2'
      let token = 'a1ff507e-2d57-4859-bd04-92029b091862'
      let ehrId = '598'

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
