import Vue from 'vue'
import Router from 'vue-router'

import MedicalRecord from '@/components/medical-record/index.vue'
import AdmissionNote from '@/components/medical-record/admission-note'//入院记录
import FirstIllness from '@/components/medical-record/first-illness'//首次病程
import DailyIllness from '@/components/medical-record/daily-illness'//日常病程
import CheckRecord from '@/components/medical-record/check-record'//查房记录

import MedicalImage from '@/components/medical-image'//医学影像
import Check from '@/components/check'//检验
import Advice from '@/components/advice'//医嘱

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/medical-record',
      name: 'medical-record',
      redirect: '/medical-record/admission-note',
      component: MedicalRecord,
      children: [
        {
          path: 'admission-note',
          name: 'admission-note',
          component: AdmissionNote
        },
        {
          path: '/medical-record/first-illness',
          name: 'first-illness',
          component: FirstIllness
        },
        {
          path: '/medical-record/daily-illness',
          name: 'daily-illness',
          component: DailyIllness//日常病例
        },
        {
          path: '/medical-record/check-record',
          name: 'check-record',
          component: CheckRecord //查房记录
        },
      ]
    },
    {
      path: '/medical-image',
      name: 'medical-image',
      // redirect: '/medical-image/admission-note',
      component: MedicalImage,
      children: [
        // {
        //   path: '/medical-image/admission-note',
        //   name: 'medical-image',
        //   component: MedicalImage
        // }
      ]
    },
    {
      path: '/check',
      name: 'check',
      component: Check
    },
    {
      path: '/advice',
      name: 'advice',
      component: Advice
    }
  ]
})
