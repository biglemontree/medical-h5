<template>
    <div class="">
        {{test}}
        <div v-if='queryAllExams.length>0' class='flex relative pb-50px overflow-none h-100vh'>
            <!-- 左侧 -->
            <div :class="['w-0 bg-e9e9e9 fs-16px animation overflow-y h-100 pt-56px c-444', {'relative w-3':toggle}]" v-show="toggle">
                <div :class="['p-10px border-b-D8D8D8 c-444', {'red': item.RESULT_COUNT>0}, {'bg-fff': index===i},]" v-for="(item, i) in queryAllExams" v-bind:key="i" @click="showReport(i, item.ID)">
                    <div class=''>[住院]
                        <!-- {{item.ID}} -->
                    </div>
                    <div>{{item.LAB_REPORT_DATE}}</div>
                    <div>{{item.LAB_NAME}}</div>
                </div>
            </div>
            <!-- 悬浮层 -->
            <div :class="['fs-12px bg-fff write-tb fixed px-10px py-20px flex flex-column items-center justify-center', toggle? 'right-0': 'left-0']" @click="togglePanel">          
                <img :src="[toggle? right:left]" class="w-15px" alt="" >
            </div>
            <!-- 右侧 -->
            <div :class="['overflow-y flex-1 p-10px fs-16px pt-56px', {'pl-20px': !toggle}]" v-if="examReport.ID">
                <div class="f-bold fs-18px center py-6px border-b-D8D8D8">{{examReport.LAB_NAME}}</div>
                <div class="py-6px border-b-D8D8D8">
                    <div>检验单号: {{examReport.ID}}</div>
                    <div>患者信息: {{examReport.NAME}}  {{examReport.SEX==1?'男':'女'}}  {{examReport.AGE}}</div>
                    <div>检查日期: {{examReport.LAB_REPORT_DATE}}</div>
                    <div>标本部位: {{examReport.SPECIMEN_LOCATION}}</div>
                </div>
                
                <div class="py-6px border-b-D8D8D8" v-if="lisDataDetail.length>0">
                    <div v-for="(list, index) in lisDataDetail" v-bind:key="index" :class="{'py-6px': true, 'bg': item===index, 'red': list.RESULT_DESC!=' '}"  @click="item = index">
                        <!-- {{isNormal(list.RESULT_REFERENCE, list.RESULT_VALUE)}} -->
                        <div class='fs-18px f-bold'>{{list.LAB_ITEM_CH_NAME}}</div>
                        <div class="flex ">
                            <div class="flex-1">结果: {{list.RESULT_VALUE}}{{list.RESULT_DESC==='H'?'↑' : (list.RESULT_DESC==='L'?'↓':'')}}</div>
                            <div class="flex-1">单位: {{list.RESULT_UNIT}}</div>
                        </div>
                        <div>参考值:{{list.RESULT_REFERENCE}}</div>
                    </div>
                    <!-- <div v-html="examReport.EXAMDESC"></div> -->
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
        <div v-else class='center pt-120px px-30px'>
            <a href="javascript:;" class="weui-btn c-168ADC">暂无检验数据</a>
        </div>
        

    </div>
</template>
<script>

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
            index: 0, //默认第一个
            id: '',
            item: '', // 右侧当前选中的
            examReport: {}, // 检查报告
            lisDataDetail: [],
            queryAllExams: [], //list
            list: [],
            ehrId: ''
        }
    },
    store: vstore,
    mounted(){
     


    },
    watch: {
        index(){
            this.examReport = this.queryAllExams[this.index]
        },
    },
    computed: {
        test(){
            this.advice(this.$store.state.ehrId)      
        },
    },
    methods: {
        togglePanel(){
            this.toggle = !this.toggle
        },
        showReport(i, id){       
            this.index = i
            this.id = id
            this.getLisDataDetail(this.$store.state.ehrId, this.queryAllExams[i].ID)
        },
        actionSheet(){
            weui.actionSheet(this.list, {
                className: 'custom-classname'
            });
        },
        isClick(index, item){
            return index==this.item
        },
        isNormal(reference, result){
            if (!result) {
                return true //正常
            }
            if (reference.includes('-')) {
                let res = reference.split('-')
                let start = +res[0]
                let end = +res[1]
            // result == 9.96 && alert(end)
                if(+result < start || +result > end){
                    return false
                }
                return true // 正常
            }
            if (reference.includes('>')) {
                let res = reference.split('>')
                
                let min = +res[1]
                if(+result > min ){
                    return true
                }
                return false
            }
            if (reference.includes('<')) {
                let res = reference.split('<')
                let max = +res[1]

                if(+result < max){
                    return true
                }
                return false
            }
            if (reference === result) {
                return true
            }
        },
        advice(ehrId){
            let t = this
            request({
                url: `patient/lisData/${ehrId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                if(res.info.length>0){

                    this.queryAllExams = res.info
                    console.log('queryAllExams: ', this.queryAllExams)
                    this.examReport = res.info[0]
                    
                    this.getLisDataDetail(ehrId, res.info[0].ID)
                }
            })
        },
        getLisDataDetail(ehrId, labId){
            if(!labId){
                weui.toast('labId 不存在')
                return
            }
            request({
                url: `patient/lisDataDetail/${ehrId}/${labId}`,
                data: {
                    token: store.get('init').token,
                    uid: store.get('init').uuid,
                    t: (new Date().getTime())+4000
                }
            }).then(res => {
                
                this.lisDataDetail = res.info

                console.log(`labid --${labId}: `, res.info)
                // list = res.info
                console.log(this.lisDataDetail.length)
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
.red {
    color: red;
}
.bg {
    background: rgba(177,170,172,.3)
}
.c-168ADC {
    border: 1px solid #168ADC;
}
</style>

