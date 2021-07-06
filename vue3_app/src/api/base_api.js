import axios from 'axios'

/**
 * 创建请求实例
 */
const AXIOS_OBJ = axios.create({
	// 根据环境不同从而匹配不同的api
	baseURL: 'http://api.tvmaze.com',
	timeout: 3000
})

/**
 * 添加请求拦截器
 */
AXIOS_OBJ.interceptors.request.use(config => {
	// 在发送请求之前做些什么
	console.log(config)
	return config
}, error => {
	// 对请求错误做些什么
	return Promise.reject(error)
})

/**
 * 添加响应拦截器
 */
AXIOS_OBJ.interceptors.response.use(res => {
	// 对响应数据做点什么
	if (res.status === 200) {
		return res.data
	}
	// 弹出提示，请求失败
	return ''
}, error => {
	// 对响应错误做点什么
	return Promise.reject(error)
})

const BASE_API = {
	GET: (url, params = {}) => {
		return AXIOS_OBJ.get(url, { params })
	},
	POST: (url, data = {}) => {
		return AXIOS_OBJ.post(url, { data })
	}
}

export default BASE_API