<template>
    <div class="fs-12px">
        <div v-for="(item, index) in dailyCourse" v-bind:key='index'>
            <div class="p-10px relative">
                <div class="f-bold">
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
const init = store.get('init')
console.log(init.token)
export default {
    data(){
        return {
            dailyCourse: []
        }
    },
    components: {
    },
    mounted(){
        request({
            url: `patient/dailyCourse/${init.ehrId}`,
            data: {
                token: init.token,
                uid: init.uuid,
                t: (new Date().getTime())+4000
            }
        }).then(res => {
            this.dailyCourse = res.info
        })
    }
}
</script>
