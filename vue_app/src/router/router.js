import Vue from 'vue'
import Router from 'vue-router'

// 页面级别
// import Home from '@/views/Home.vue'
// import About from '@/views/About.vue'
// import List from '@/views/List.vue'
// import ListDetail from '@/views/ListDetail.vue'
// import NotFoundPage from '@/views/NotFound.vue'
// import ExportExcel from '@/views/ExportExl.vue'
// import ExportExcelCn from '@/views/ExportExlCn.vue'
// import EchartsTable from '@/views/echartsTable.vue'
// import MapTest from '@/views/MapTest.vue'
// import MapTest2 from '@/views/MapTest2.vue'

// // 组件级别
// import AsyncComp from '@/views/asyncCompTest.vue'
// import AboutUs from '@/components/aboutUs/about_us.vue'
// import AboutFirm from '@/components/aboutFirm/about_firm.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
		},
		{
			path: '/about/:id',
			name: 'about',
			component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
			meta: { requiresAuth: true },
			// redirect: '/about/us',
			children: [
				{
					path: '',
					component: () => import(/* webpackChunkName: "about" */ '../components/aboutUs/about_us.vue'),
					meta: { requiresAuth: true }
				},
				{
					path: 'us',
					name: 'about_us',
					component: () => import(/* webpackChunkName: "about" */ '../components/aboutUs/about_us.vue'),
					meta: { requiresAuth: true }
				},
				{
					path: 'firm',
					name: 'about_firm',
					component: () => import(/* webpackChunkName: "about" */ '../components/aboutFirm/about_firm.vue'),
					meta: { requiresAuth: true }
				}
			]
		},
		// {
		// 	path: '/ex',
		// 	name: 'export_excel',
		// 	component: () => import(/* webpackChunkName: "export-excel" */ '../views/ExportExl.vue')
		// },
		// {
		// 	path: '/dashboard',
		// 	name: 'page_dashboard',
		// 	component: () => import(/* webpackChunkName: "dashboard" */ '../views/echartsTable.vue')
		// },
		// {
		// 	path: '/exCn',
		// 	name: 'export_excel_cn',
		// 	component: () => import(/* webpackChunkName: "export-excel-cn" */ '../views/ExportExlCn.vue')
		// },
		{
			path: '/list',
			name: 'list',
			component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
		},
		{
			path: '/list_detail/:id/:score',
			name: 'list_detail',
			component: () => import(/* webpackChunkName: "list-detail" */ '../views/ListDetail.vue')
		},
		{
			path: '/asyncComp',
			name: 'async_comp',
			component: () => import(/* webpackChunkName: "async-comp" */ '../views/asyncCompTest.vue')
		},
		{
			path: '/map',
			name: 'map_test',
			component: () => import(/* webpackChunkName: "map-test" */ '../views/MapTest.vue')
		},
		{
			path: '/map2',
			name: 'map_test2',
			component: () => import(/* webpackChunkName: "map-test2" */ '../views/MapTest2.vue')
		},
		{
			path: '*',
			name: 'not_found_page',
			component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	console.log('---全局“前”置路由守卫---')
	console.log(to)
	console.log(from)
	// 无论如何要调用一次 next()
	next()
	// next(new Error('路由组件错误'))
})
router.afterEach((to, from) => {
	console.log('---全局“后”置路由守卫---')
	console.log(to)
	console.log(from)
})

router.onError((message) => {
	console.error('嘿，兄弟！报错了路由！这是信息 ====>>>', message)
})
export default router
