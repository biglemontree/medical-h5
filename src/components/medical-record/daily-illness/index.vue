<template>
    <div class="fs-16px" >
        {{test}}
        <div v-for="(item, index) in dailyCourse" v-bind:key='index' >
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    {{item.RECORD_DATE}} {{item.RECORD_TOPIC}}
                </div>
                <div class="pt-6px" v-html="item.RECORD_CONTENT"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
    </div>
</template>
<script>
import store from 'store'
import vstore from '../../../store/index.js'

export default {
    data(){
        return {
            dailyCourse: [],
      
        }
    },
    store: vstore,
    computed: {
        test(){
            console.log('this.$store.state.ehrId: ', this.$store.state.ehrId)
            request({
                url: `patient/dailyCourse/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                console.log(res.info)
                this.dailyCourse = res.info
            })
        }
    },
}
</script>
