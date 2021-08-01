/**
 * @param { object } context
 */
export default ({ app, redirect, route }) => {
	// 添加请求拦截器
	app.$axios.onRequest(config => {
		// console.log('/***** request拦截器 *****/')
		// config.headers.organizationId = 'all'
		// config.headers.platformId = '100'
		if (app.$cookies.get('token')) {
			config.headers.Authorization = app.$cookies.get('token')
		}
		// 在发送请求之前做些什么
		return config
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	})

	// 添加响应拦截器
	app.$axios.onResponse(response => {
		console.log('response拦截器:', response)
		if (response.status === 200) {
			return response.data
		} else if (response.status === 401) {
			// 如果请求token过期 && 是个人中心 && 是客户端则重定向到login
			if (route.path.includes('user-') && process.client) {
				const TARGET_URL = route.path
				redirect(`/login?targetUrl=${TARGET_URL}`)
			}
			console.error('---response::401---')
			return { data: '' }
		} else if (response.status === 404) {
			console.error('---response::404---')
			return { data: '' }
		} else {
			return { data: '' }
		}
	}, error => {
		// 对响应错误做点什么
		console.error('---response::500---')
		return Promise.reject(error)
	})
	/**
	 * @description GET请求
	 * @param {string} url 请求的url
	 * @param {*} data 请求参数
	 * @param {*} is_token 是否需要token
	 */
	app.$_get = (url, data) => {
		return app.$axios.get(url, {
			params: data
		})
	}
	/**
	 * @description POST请求
	 * @param {string} url 请求的url
	 * @param {*} data 请求数据
	 * @param {*} is_token 是否需要token
	 */
	app.$_post = (url, data) => {
		return app.$axios.post(url, data)
	}

	/**
	 * @description DELETE请求
	 * @param {string} url 请求的url
	 * @param {*} data 请求数据
	 * * @param {*} is_token 是否需要token
	 */
	app.$_del = (url, data) => {
		return app.$axios.delete(url, data)
	}
}