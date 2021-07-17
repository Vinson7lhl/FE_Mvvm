export default {
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

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/element-ui',
		'@/plugins/axios.js'
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
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// process.env.NODE_ENV production : development
		baseURL: '',
		proxy: true,
		https: false,
		retry: { retries: 3 },
		timeout: 10000
	},
	proxy: {
		'/api': { target: 'http://61.153.224.202:15109', pathRewrite: { '/api': '' } }
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/^element-ui/]
	}
}