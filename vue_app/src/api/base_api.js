import axios from 'axios'

// 此处要设置全局api{dev,test,pre,pro},这四种环境
const HTTP = axios.create({
	baseURL: '', // api的base_url
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
HTTP.interceptors.response.use(function (response) {
    // 对响应数据做点什么
	return response.data;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error)
})

export default HTTP