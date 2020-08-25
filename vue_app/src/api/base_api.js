import axios from 'axios'

// 获取当前开发的环境api
const BASE_URL = process.env.VUE_APP_BASE_URL
// 创建一个axios对象
const HTTP = axios.create({
	baseURL: BASE_URL, // api的base_url
	timeout: 10000 // request timeout
})

// 添加请求拦截器
HTTP.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，比如登录校验
    console.log('http-header-config:', config)
	return config
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error)
});

// 添加响应拦截器
HTTP.interceptors.response.use(function (res) {
    // 对响应数据做点什么
	return res.data;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error)
})

// GET请求

// POST请求

// PUT请求

// DELETE请求


export default HTTP