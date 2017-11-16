<template>
    <div class="fs-16px  p-10px w-100 border-box">
        {{test}}
        <div v-html="firstOrigin.EMR_CONTENT">

        </div>
    </div>
</template>
<script>
import store from 'store'
import vstore from '../../../store/index.js'

export default {
    data(){
        return {
            firstOrigin: {}
        }
    },
    store: vstore,
    computed: {
        test(){
            request({
                url: `patient/getDayCourseEmr/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                if (res.flag==0) {
                    
                    } else if (res.flag == 1) {
                        
                    this.firstOrigin = res.info[0]
                    return ''
                }
            })
        }
    },
    created(){
       
    }
}
</script>
<style scoped>
.origin {

}
</style>
