import Vue from 'vue'
import Router from 'vue-router'
import country from '@/components/country'
import detailArea from '@/components/detailArea'
import project from '@/components/project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'country',
      component: country
    },
    {
      path: '/detailArea',
      name: 'detailArea',
      component: detailArea
    },
    {
      path: '/project',
      name: 'project',
      component: project
    }
  ]
})
