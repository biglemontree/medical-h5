<template>
    <div class="flex relative pb-50px fs-14px" >
        {{test}}
        <!-- 顶部 -->
         <!-- <div class="fixed left-0 top-0 w-100 flex justify-center bg-168ADC c-fff">
            <div @click="actionSheet">
                <div class="fs-12px center">{{top.MASTER_DOCTOR_NAME}}</div>
                <div class="fs-10px center">
                    <span>{{top.IN_DATE}} 至{{top.OUT_DATE || '现在'}}</span>
                    <img :src="down" class="w-4px h-4px" alt="">
                </div>
            </div>
        </div> -->
        <!-- 左侧 -->
        <div :class="['w-0 bg-eee fs-14px animation overflow-y h-100 pt-56px', {'relative w-3':toggle}]" v-show="toggle" >
            <div :class="['p-10px border-b-D8D8D8', {'c-168ADC': index==i}]" v-for="(item, i) in queryAllExams" v-bind:key="i" @click="showReport(i)">
                <div>[住院][{{item.EXAM_MODALITY}}]</div>
                <div>{{item.EXAM_INSPECTION_DATE}}</div>
                <div>{{item.EXAM_METHOD}}</div>
            </div>
        </div>
        <!-- 切换 -->
        <div :class="['fs-12px bg-fff write-tb fixed px-6px py-20px flex flex-column items-center', toggle? 'right-0': 'left-0']" @click="togglePanel">
            <img :src="[toggle? right:left]" class="w-8px" alt="" >
        </div>
        <!-- examReport -->
        <div class=" flex-1 p-10px fs-14px pt-56px" v-if="examReport">
            <div class=" fs-16px center py-6px border-b-D8D8D8">{{examReport.LAB_NAME}}</div>
            <div class="py-6px border-b-D8D8D8">
                <div>患者信息: {{examReport.PATIENT_NAME}}  {{examReport.SEX==1?'男':'女'}}  {{examReport.AGE}}岁</div>
                <div>申请科室: {{examReport.SUBMISSION_DEPT_NAME}}</div>
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
                        <div> 报告医生: {{examReport.EXAM_REPORTOR}}</div>
                        <div> 审核医生: {{examReport.VERIFY_DOCTOR_NAME}}</div>
                    </div>
                    <div>
                        <div>报告日期: {{examReport.EXAM_REPORT_DATE}}</div>
                        <div>审核日期: {{examReport.EXAM_REPORT_DATE}}</div>
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
import down from '../../assets/a-down.svg'
import vstore from '../../store/index.js'

export default {
    data(){
        return {
            top:{},
            toggle: true, //切换
            left: left, //icon
            right,
            down,
            list: [],
            index: 0, //默认第一个
            examReport: {}, // 检查报告
            queryAllExams: [] //list
        }
    },
    store: vstore,
    mounted(){
        // if (window.android) {
        //     const listChoose = window.android.getEhrList()
        //     let result = JSON.parse(listChoose)
        //     this.top = result[0]
        //     this.advice(result[0].EHRID)

        //     for (var index = 0; index < result.length; index++) {
        //         var element = result[index];
        //         this.list.push({
        //                 label: `${element.IN_DATE}至${element.OUT_DATE||'现在'}`,
        //                 onClick: (cb) =>{
        //                     this.ehrId = element.EHRID  
        //                     this.advice(element.EHRID)
        //                 }
        //             })
        //     }
        // }
            
    },
    watch: {
        index(){
            this.examReport = this.queryAllExams[this.index]
        }
    },
    computed: {
        test(){
            this.advice(this.$store.state.ehrId)      
        }
    },
    methods: {
        togglePanel(){
            this.toggle = !this.toggle
        },
        showReport(i){       
            this.index = i
        },
        actionSheet(){
            weui.actionSheet(this.list, {
                className: 'custom-classname'
            });
        },
        advice(ehrId){
            request({
                url: `patient/queryAllExams/0/${ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                this.queryAllExams = res.info
                this.examReport = res.info[0]
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

