<template>
    <div class="flex relative pb-50px">
        <div :class="['w-0 bg-eee fs-12px animation', {'relative w-3':toggle}]" v-show="toggle">
            <div :class="['p-10px border-b-D8D8D8', {'c-168ADC': index==i}]" v-for="(item, i) in queryAllExams" v-bind:key="i" @click="showReport(i, item.ID)">
                <div>[住院]</div>
                <div>{{item.LAB_REPORT_DATE}}</div>
                <div>{{item.LAB_NAME}}</div>
            </div>
        </div>
        <div :class="['fs-12px bg-fff write-tb fixed px-6px py-20px flex flex-column items-center', toggle? 'right-0': 'left-0']" @click="togglePanel">
            
            <img :src="[toggle? right:left]" class="w-8px" alt="" >
        </div>
        <div class=" flex-1 p-10px fs-10px">
            <div class=" fs-16px center py-6px border-b-D8D8D8">检查报告</div>
            <div class="py-6px border-b-D8D8D8">
                <div>检验单号: {{examReport.ID}}</div>
                <div>患者信息: {{examReport.PATIENT_NAME}}  {{examReport.SEX==1?'男':'女'}}  {{examReport.AGE}}岁</div>
                <div>检查日期: {{examReport.EXAM_DATE}}</div>
                <div>检查部位: {{examReport.EXAM_PART}}</div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport.IMAGE_DESC">
                <div>
                    肉眼所见
                </div>
                <div v-html="examReport.IMAGE_DESC"></div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport.IMAGE_DIAG">
                <div>
                    特殊检查
                </div>
                <div v-html="examReport.IMAGE_DIAG"></div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport.EXAMDESC">
                <div>
                    诊断意见
                </div>
                <div v-html="examReport.EXAMDESC"></div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport.IMAGE_DESCX">
                <div>
                    镜下所见
                </div>
                <div v-html="examReport.IMAGE_DESCX"></div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport.EXAMDESC">
                <div>
                    病理诊断
                </div>
                <div v-html="examReport.EXAMDESC"></div>
            </div>
            <div class="py-6px border-b-D8D8D8" v-if="examReport">
                <div class="flex justify-between c-999">
                    <div >
                        <div> 送检医生: {{examReport.SUBMISSION_DOCTOR_NAME}}</div>
                        <div> 审核医生: {{examReport.VERIFY_DOCTOR_NAME}}</div>
                    </div>
                    <div>
                        <div>校验医生: {{examReport.EXEC_DOCTOR_NAME}}</div>
                        <div>报告医生: {{examReport.LAB_REPORT_DOCTOR_NAME}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import store from 'store'
import right from '../../assets/a-left.svg'
import left from './../../assets/a-right.svg'

let init = store.get('init')

let list = []
export default {
    data(){
        return {
            toggle: true, //切换
            left: left, //icon
            right,
            index: 0, //默认第一个
            id: '',
            examReport: {}, // 检查报告
            lisDataDetail: [],
            queryAllExams: [] //list
        }
    },
    mounted(){
            request({
                url: `patient/lisData/${init.ehrId}`,
                data: {
                    token: init.token,
                    uid: init.uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                this.queryAllExams = res.info
                this.examReport = res.info[0]
                
                this.getLisDataDetail(res.info[0].ID)
            })
    },
    watch: {
        index(){
            this.examReport = this.queryAllExams[this.index]
            // this.getLisDataDetail(this.queryAllExams[this.index].ID)
        },
        id(){
            request({
                url: `patient/lisDataDetail/${init.ehrId}/${this.id}`,
                data: {
                    token: init.token,
                    uid: init.uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                this.lisDataDetail = res.info
                
            })
        }

    },
    methods: {
        togglePanel(){
            this.toggle = !this.toggle
        },
        showReport(i, id){       
            this.index = i
            this.id = id
        },
        getLisDataDetail(labId){
            if(!labId){
                weui.toast('labId 不存在')
                return
            }
            request({
                url: `patient/lisDataDetail/${init.ehrId}/${labId}`,
                data: {
                    token: init.token,
                    uid: init.uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                this.lisDataDetail = res.info
                // this.examReport['lisDataDetail'] = res.info
                console.log(`labid --${labId}: `, res.info)
                // list = res.info
                console.log(list.length)
            })
        }
    }

}
</script>
<style scoped>
.write-tb {
    top: 45vh;
}
.left-0::before{
    content: '展开';
    color:#168ADC;
    display: block;
}
.left-0 img {
    color:#168ADC;    
}
.right-0 {
    right: 75vw;
}
.right-0::before{
    content: '关闭';
    display: block;
}
</style>

