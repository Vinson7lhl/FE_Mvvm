/**
 * @param { object } context
 */
export default ({ app, redirect }) => {
	app.$axios.onRequest(config => {
		console.log('Making request to ' + config.url)
	})

	app.$axios.onError(error => {
		const code = parseInt(error.response && error.response.status)
		if (code === 400) {
			redirect('/400')
		}
	})

	// 添加请求拦截器
	app.$axios.interceptors.request.use(config => {
		// 在发送请求之前做些什么
		config.headers.accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxOTEzNzUwNjk3MjEiLCJzdWIiOiJ5YW5odWkiLCJ1SWQiOiJjMzVlZmExMmYyNmJhM2VjNzQ2MThjMDA5NDNiYTc1MCIsIm5pa2VOYW1lIjoi6Lev5bu26L6JIiwiZXhwIjoxNzcwMzM0ODMyLCJjcmVhdGVkIjoxNjI2MzM0ODMyODMwfQ.-n9rUk2a4LM_vFvHKlsNpvUnWToXGUug3DYA3foE47sp2Qs7_R9alOFdB5OWQ_apXL1nww0831V4itkGbaXPpQ'
		return config
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	})

	// 添加响应拦截器
	app.$axios.interceptors.response.use(response => {
		if (response.data.code === 401) {
			console.log('未验证！')
		} else if (response.data.code === 404) {
			// 重定向到404页面
			redirect('/404')
		} else {
			// 请求接口数据正常，返回数据
			return response
		}
		return response
	}, error => {
		// 对响应错误做点什么
		return Promise.reject(error)
	})
}