/**
 * @param { object } context
 */
export default ({ app, redirect }) => {
	// 添加请求拦截器
	app.$axios.interceptors.request.use(config => {
		// 在发送请求之前做些什么
		console.log('请求前')
		// 判断是否需要token,config.params，如果需要则获取（登陆后获取token并存放在sessionStorage中）
		config.headers.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxOTEzNzUwNjk3MjEiLCJzdWIiOiJ5YW5odWkiLCJ1SWQiOiJjMzVlZmExMmYyNmJhM2VjNzQ2MThjMDA5NDNiYTc1MCIsIm5pa2VOYW1lIjoi6Lev5bu26L6JIiwiZXhwIjoxNzcwNzY1NjI5LCJjcmVhdGVkIjoxNjI2NzY1NjI5NDQ3fQ.mg-ry7Ckc1nF5U4XXyyCmX2Qu1zhd4kpdNFCMcRpO3qmbLHMnpSIX6EysDbHDUjbcNQ7abgoALYMrsOXWIm__A'
		return config
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	})

	// 添加响应拦截器
	app.$axios.interceptors.response.use(response => {
		console.log('请求后')
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
	app.$_get = (url, data) => {
		console.log('已经被调用GET')
		// 做点啥
		if (data.is_loading) {
			// loading
			console.log(data.is_loading)
		}
		if (data.is_token) {
			console.log('获取token:', sessionStorage.getItem('lhl'))
		}
		return app.$axios.get(url, { params: data.data, headers: { Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxOTEzNzUwNjk3MjEiLCJzdWIiOiJ5YW5odWkiLCJ1SWQiOiJjMzVlZmExMmYyNmJhM2VjNzQ2MThjMDA5NDNiYTc1MCIsIm5pa2VOYW1lIjoi6Lev5bu26L6JIiwiZXhwIjoxNzcwNzY1NjI5LCJjcmVhdGVkIjoxNjI2NzY1NjI5NDQ3fQ.mg-ry7Ckc1nF5U4XXyyCmX2Qu1zhd4kpdNFCMcRpO3qmbLHMnpSIX6EysDbHDUjbcNQ7abgoALYMrsOXWIm__A' } })
	}
	app.$_post = (url, data, is_token = false, is_loading = false) => {
		// 做点啥
		if (is_loading) {
			// loading
			console.log(is_loading)
		}
		return app.$axios.post(url, { data, headers: { accessToken: is_token ? 'token' : '' } })
	}
	app.$_put = (url, data, is_token = false, is_loading = false) => {
		// 做点啥
		if (is_loading) {
			// loading
			console.log(is_loading)
		}
		console.log(url, is_token, is_loading)
		return app.$axios.put(url, { data, headers: { accessToken: is_token ? 'token' : '' } })
	}
	app.$_delete = (url, data, is_token = false, is_loading = false) => {
		// 做点啥
		if (is_loading) {
			// loading
			console.log(is_loading)
		}
		return app.$axios.delete(url, { data, headers: { accessToken: is_token ? 'token' : '' } })
	}
}