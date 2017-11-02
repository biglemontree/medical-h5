<template>
    <div class="fs-16px">
        {{test}}
        <div v-if="firstCourse.MEDICAL_FEATURE">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    病例特点
                </div>
                <div class="pt-6px" v-html="firstCourse.MEDICAL_FEATURE"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.INITIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    初步诊断
                </div>
                <div class="pt-6px" v-html="firstCourse.INITIAL_DIAGNOSIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.INITIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    诊断依据
                </div>
                <div class="pt-6px" v-html="firstCourse.DIAGNOSTIC_BASIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.DIFFERENTIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    鉴别诊断
                </div>
                <div class="pt-6px" v-html="firstCourse.DIFFERENTIAL_DIAGNOSIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.MEDICAL_PROCESS">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    诊疗特点
                </div>
                <div class="pt-6px" v-html="firstCourse.MEDICAL_PROCESS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.DOCTOR_NAME">
            <div class="p-10px relative">
                <div class='fs-18px f-bold'>
                    医生名称
                </div>
                <div class="pt-6px" v-html="firstCourse.DOCTOR_NAME"></div>
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
            firstCourse: {}
        }
    },
    store: vstore,
    computed: {
        test(){
            request({
                url: `patient/firstCourse/${this.$store.state.ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                if (res.flag==0) {
                    
                    } else if (res.flag == 1) {
                        
                    this.firstCourse = res.info[0]
                    return ''
                }
            })
        }
    },
    created(){
       
    }
}
</script>
