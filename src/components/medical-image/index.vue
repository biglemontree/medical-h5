<template>
    <div>
        {{test}}
        <div v-if='queryAllExams.length>0' class='flex relative pb-50px overflow-none h-100vh'>
             <!-- 左侧 -->
            <div :class="['w-0 bg-e9e9e9 fs-16px animation overflow-y h-100 pt-56px c-444', {'relative w-3':toggle}]" v-show="toggle" >
                <div :class="['p-10px border-b-D8D8D8', {'bg-fff': index==i}]" v-for="(item, i) in queryAllExams" v-bind:key="i" @click="showReport(i)">
                    <div>[住院][{{item.EXAM_MODALITY}}]</div>
                    <div>{{item.EXAM_INSPECTION_DATE}}</div>
                    <div>{{item.EXAM_METHOD}}</div>
                </div>
            </div>
            <!-- 切换 -->
            <div :class="['fs-12px bg-fff write-tb fixed px-6px py-20px flex flex-column items-center justify-center', toggle? 'right-0': 'left-0']" @click="togglePanel">
                <img :src="[toggle? right:left]" class="w-15px" alt="" >
            </div>
            <!-- examReport -->
            <div :class="['overflow-y flex-1 p-10px fs-16px pt-56px', {'pl-20px': !toggle}]" v-if="examReport">
                <div class=" fs-18px f-bold center py-6px border-b-D8D8D8">{{examReport.LAB_NAME}}</div>
                <div class="py-6px border-b-D8D8D8">
                    <div>患者信息: {{examReport.NAME}}  {{examReport.SEX==1?'男':'女'}}  {{examReport.AGE}}岁</div>
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
       
       <div v-else class='center pt-120px px-30px'>
           <a href="javascript:;" class="weui-btn weui-btn_primary">sorry~ 暂无内容</a>
       </div>

    </div>
</template>
<script>
import axios from 'axios'
import store from 'store'
import right from '../../assets/a-left.png'
import left from './../../assets/a-right.png'
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
/* .left-0::before{
    content: '展开';
    color:#168ADC;
    display: block;
} */
.left-0 img {
    color:#168ADC;    
}
.right-0 {
    right: 75vw;
}
/* .right-0::before{
    content: '关闭';
    display: block;
} */
</style>

