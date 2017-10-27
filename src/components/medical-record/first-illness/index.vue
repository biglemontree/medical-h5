<template>
    <div class="fs-12px">
        <div v-if="firstCourse.MEDICAL_FEATURE">
            <div class="p-10px relative">
                <div>
                    病例特点
                </div>
                <div class="pt-6px" v-html="firstCourse.MEDICAL_FEATURE"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.INITIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div>
                    初步诊断
                </div>
                <div class="pt-6px" v-html="firstCourse.INITIAL_DIAGNOSIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.INITIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div>
                    诊断依据
                </div>
                <div class="pt-6px" v-html="firstCourse.DIAGNOSTIC_BASIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.DIFFERENTIAL_DIAGNOSIS">
            <div class="p-10px relative">
                <div>
                    鉴别诊断
                </div>
                <div class="pt-6px" v-html="firstCourse.DIFFERENTIAL_DIAGNOSIS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.MEDICAL_PROCESS">
            <div class="p-10px relative">
                <div>
                    诊疗特点
                </div>
                <div class="pt-6px" v-html="firstCourse.MEDICAL_PROCESS"></div>
            </div>
            <div class="bg-eee h-10px"></div>
        </div>
        <div v-if="firstCourse.DOCTOR_NAME">
            <div class="p-10px relative">
                <div>
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
const init = store.get('init')
console.log(init.token)
export default {
    data(){
        return {
            firstCourse: {}
        }
    },
    components: {

    },
    mounted(){
        request({
            url: `patient/firstCourse/${init.ehrId}`,
            data: {
                token: init.token,
                uid: init.uuid,
                t: (new Date().getTime())+4000
            }
        }).then(res => {
            this.firstCourse = res.info[0]
        })
    }
}
</script>
