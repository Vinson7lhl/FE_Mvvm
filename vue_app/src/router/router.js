import Vue from 'vue'
import Router from 'vue-router'

// 页面级别
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import List from '@/views/List.vue'
import ListDetail from '@/views/ListDetail.vue'
import NotFoundPage from '@/views/NotFound.vue'
import ExportExcel from '@/views/ExportExl.vue'
import ExportExcelCn from '@/views/ExportExlCn.vue'
import EchartsTable from '@/views/echartsTable.vue'
import MapTest from '@/views/MapTest.vue'

// 组件级别
import AsyncComp from '@/views/asyncCompTest.vue'
import AboutUs from '@/components/aboutUs/about_us.vue'
import AboutFirm from '@/components/aboutFirm/about_firm.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      redirect: '/about/us',
      children: [
        {
          path: 'us',
          name: 'about_us',
          component: AboutUs
        },
        {
          path: 'firm',
          name: 'about_firm',
          component: AboutFirm
        }
      ]
    },
    {
      path: '/ex',
      name: 'export_excel',
      component: ExportExcel
    },
    {
      path: '/dashboard',
      name: 'page_dashboard',
      component: EchartsTable
    },
    {
      path: '/exCn',
      name: 'export_excel_cn',
      component: ExportExcelCn
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/list_detail/:id',
      name: 'list_detail',
      component: ListDetail
    },
    {
      path: '/asyncComp',
      name: 'async_comp',
      component: AsyncComp
    },
    {
      path: '/map',
      name: 'map_test',
      component: MapTest
    },
    {
      path: '*',
      name: 'not_found_page',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('全局前置路由守卫')
  console.log(to)
  console.log(from)
  next()
})
export default router