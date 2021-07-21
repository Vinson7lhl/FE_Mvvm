import ENV from './env'

export default {
	server: {
		// 此处设置为80而不是3000是因为ssr中预渲染asyncData函数中调用接口只会启动端口为80的node服务——实际上启动的是3000，所以就会报错
		// port: 80
	},
	env: {
		BASE_URL: ENV[process.env.MODE].BASE_URL
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'nuxtJs',
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

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'@/assets/css/base.scss'
	],

	// 插件配置：https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/element-ui',
		{ src: '@/plugins/axios.js' },
		{ src: '@/plugins/index_api.js' }
		// '@/plugins/demo.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'cookie-universal-nuxt',
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// process.env.NODE_ENV production : development
		baseURL: ENV[process.env.MODE].BASE_URL,
		proxy: false,
		https: false,
		retry: { retries: 3 },
		timeout: 10000
	},
	// proxy: {
	// 	'/api': { target: ENV[process.env.MODE].BASE_URL, pathRewrite: { '/api': '' } }
	// },

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/^element-ui/]
	}
}
