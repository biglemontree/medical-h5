<template>
    <div class="fs-16px " v-if="record!=null">
        {{test}}
        <div v-if="record.CHIEF_COMPLAINT">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    主诉
                </div>
                <div class="pt-6px" v-html="record.CHIEF_COMPLAINT"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div v-if="record.CURRENT_MEDICAL_HISTORY">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    现病史
                </div>
                <div class="pt-6px" v-html="record.CURRENT_MEDICAL_HISTORY"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div v-if="record.PAST_HISTORY">
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    既往史
                </div>
                <div class="pt-6px" v-html="record.PAST_HISTORY"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div v-if="record.FAMILY_HISTORY">
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    家族史
                </div>
                <div class="pt-6px" v-html="record.FAMILY_HISTORY"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div v-if="record.PHYSICALEXAM">
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    体格检查
                </div>
                <div class="pt-6px" v-html="record.PHYSICALEXAM"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div class="p-10px relative" v-if="record.SPECIALEXAM">
            <div class="fs-18px f-bold">
                专科检查
            </div>
            <div class="pt-6px" v-html="record.SPECIALEXAM"></div>
        </div>

        <div v-if="record.AUXILYEXAM">
            <div class="bg-eee h-10px"></div>
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    辅助检查
                </div>
                <div class="pt-6px" v-html="record.AUXILYEXAM"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>

        <div v-if="record.INITIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div class="fs-18px f-bold">
                    初步诊断
                </div>
                <div class="pt-6px" v-html="record.INITIAL_DIAGNOSIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
       
       <div v-if="record.EPRESENTOR">
            <div class="p-10px relative" >
                <div class="fs-18px f-bold">
                    病史陈述者
                </div>
                <div class="pt-6px" v-html="record.EPRESENTOR"></div>
            </div>
            <div class="bg-eee h-10px"></div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from 'store'
import vstore from '../../../store/index.js'

export default {
    data(){
        return {
            record: {},
            ehrId: this.$store.state.ehrId
        }
    },
    store: vstore,
    created(){


        let t = this
        let init = store.get('init')
    },

    computed: {
        test(){
            const uuid = window.android.getUuid()
            const token = window.android.getToken()
            const list = window.android.getEhrList()
            console.log('note:token-', store.get('init').token)
            store.set('init', {
                uuid,
                token,
            })

            request({
                url: `patient/inHospital/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                console.log(res.info[0])
                if (res.flag==0) {
                    
                    } else if (res.flag == 1) {
                        
                    this.record = res.info[0]
                    return ''
                }
            })
        }
    },
}
</script>
<style>

</style>
