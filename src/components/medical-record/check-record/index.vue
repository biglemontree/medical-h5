
<template>
    <div class="fs-16px">
        {{test}}
        <div v-for="(item, index) in checkInRecord" v-bind:key='index' v-if='checkInRecord.length>0'>
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    {{item.RECORD_DATE}} {{item.RECORD_TOPIC}}
                </div>
                <div class="pt-6px" v-html="item.RECORD_CONTENT"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-else>
            <a href="javascript:;" class="weui-btn weui-btn_primary">sorry~ 暂无内容</a>
        </div>
    </div>
</template>
<script>
import store from 'store'
import vstore from '../../../store/index.js'

export default {
    data(){
        return {
            checkInRecord: []
        }
    },
    store: vstore,
     computed: {
        test(){
            request({
                url: `patient/checkInRecord/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                if (res.flag==0) {
                    
                    } else if (res.flag == 1) {
                        
                    this.checkInRecord = res.info
                    return ''
                }
            })
        }
    },
}
</script>
<style >
.record {
    padding-top: 76px;
}
</style>

