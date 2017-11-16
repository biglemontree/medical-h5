<template>
    <div class="fs-16px">
        {{test}}
        <div v-html="getEmr.EMR_CONTENT" class="p-10px a-origin">

        </div>
    </div>
</template>
<script>
import store from 'store'
import vstore from '../../../store/index.js'

export default {
    data(){
        return {
            getEmr: {}
        }
    },
    store: vstore,
    computed: {
        test(){
            request({
                url: `patient/getEmr/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                if (res.flag==0) {
                    
                    } else if (res.flag == 1) {
                        
                    this.getEmr = res.info[0]
                    return ''
                }
            })
        }
    },
    created(){
       
    }
}
</script>
<style >
.a-origin table:nth-of-type(1) {
    width: 100% !important;
}

.a-origin table:nth-last-of-type(1){
    width: 100% !important;
}
</style>
