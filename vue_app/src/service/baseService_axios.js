// 导入Axios库
import axios from 'axios'
// 引入Element UI [loading]
import { Loading } from 'element-ui';

const BASE_URL = process.env.VUE_APP_BASE_URL

let axios_obj = axios.create({
	baseURL: BASE_URL,
	timeout: 15000
})

/**
 * @description axios-request拦截器：处理所有请求的token验证
 * @param {object} config 请求对象
 */
axios_obj.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token')
		if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.authorization = token //请求头加上token
		}
		return config
	},
	err => {
		return Promise.reject(err)
	})

/**
 * @description axios-response拦截器：在返回数据时前置进行过滤，通用处理，然后最终发回给调用者有价值的数据，但需要和后端统一好！
 * @param {object} res HTTP响应对象
 */
axios_obj.interceptors.response.use(
	res => {
		// 如果http返回200状态
		if (res.status === 200) {
			// 处理后端自定义的数据，比如有自己的code定义，再次进行处理
			return res.data
		} else if (res.status === 404) {
			return Promise.reject('/*-----无此接口，请确认！-----*/')
		} else if (res.status === 500) {
			return Promise.reject('/*-----服务端错误，请确认！-----*/')
		}
	}, error => {
		// 对响应错误做点什么
		return Promise.reject(error)
	})

/** 
 * @description get方法 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function getRequest (url, params = {}) {
	return axios_obj.get(url, params)
		.then(res => {
			return res
		})
		.catch(err => {
			console.log('/*-----网络错误！-----*/', err)
		})
}

/** 
 * @description post方法
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function postRequest (url, params) {
	return axios_obj.post(url, params)
		.then(res => {
			return res
		})
		.catch(err => {
			console.log('/*-----网络错误！-----*/', err)
		})
}
// put 请求

// delete 请求