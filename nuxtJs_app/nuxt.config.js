// 导入基本环境变量api
import ENV from './env'

export default {
	// 此处用来配置本地server端的ip/port。默认localhost,3000
	server: {
		// port: 3000,
		// host: '192.168.18.84' // default: localhost
	},
	// 设置环境变量供server端和client共享的变量
	env: {
		BASE_URL: ENV[process.env.MODE].BASE_URL
	},
	// 配置每个页面的通用元数据脚本和配置（即 每个html中的<head>信息），以及单独引入某些js
	head: {
		title: '箱箱',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// 全局引入基本css，包括库和自定义reset等样式
	css: [
		'element-ui/lib/theme-chalk/index.css',
		{ src: '@/assets/css/base.scss', lang: 'scss' },
		{ src: '@/assets/css/customizeElement.scss', lang: 'scss' },
		'@/assets/iconfont/iconfont.css'
	],

	// 插件配置：即在server端和client端配置的公用方法，也可指定此某文件在某端运行
	plugins: [
		'@/plugins/element-ui',
		'@/plugins/axios.js',
		'@/plugins/index_api.js',
		'@/plugins/user_api.js',
		{ src: '@/plugins/map.js', mode: 'client' },
		{ src: '@/assets/iconfont/iconfont.js', mode: 'client' }
	],

	// 中间件用来全局拦截路由，判断404、是否需要登陆、重定向等
	router: { middleware: 'router' },

	// 自动导入组件
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module'
	],

	modules: [
		// 用来同时处理server端和client端的cookie从而注入请求头（因为server端没办法使用sessionStorage等客户端机制），
		'cookie-universal-nuxt',
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],

	axios: {
		// 根据package.json文件中的webpack mode
		baseURL: ENV[process.env.MODE].BASE_URL,
		// baseURL: '',
		proxy: false,
		https: false,
		retry: { retries: 3 },
		timeout: 3000
	},
	// proxy: {
	// 	'/api': { target: ENV[process.env.MODE].BASE_URL, pathRewrite: { '/api': '' } }
	// },

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/^element-ui/]
	}
}
