import axios from 'axios'

/**
 * @description 创建axios实例
 */
const AXIOS_OBJ = axios.create({
    // 将自动将此字符串加载到请求的URL前面
    baseURL: '/api',
    // 接口请求超时限制在3秒内
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
    }
})

/**
 * @description 添加请求拦截器，在发送请求之前做些什么
 */
AXIOS_OBJ.interceptors.request.use(config => {
    console.log('拦截器config：', config)
    // 显示loading
    // 针对请求的config尽心判断、或者修改config
    console.log(config)
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

/**
 * @description 添加响应拦截器
 */
AXIOS_OBJ.interceptors.response.use(res => {
    console.log('拦截器res：', res)
    // 隐藏loading
    // 对响应数据做点什么
    if (res.status === 200) {
        return res.data
    }
    // 弹出提示，请求失败
    return ''
}, error => {
    // 对响应错误做点什么
    // 提示错误信息内容
    return Promise.reject(error)
})

/**
 * @description 对RESTFUL配置
 */
const BASE_API = {
    GET: (url, params = {}) => {
        return AXIOS_OBJ.get(url, { params })
    },
    POST: (url, data = {}) => {
        return AXIOS_OBJ.post(url, { data })
    },
    DELETE: (url, data = {}) => {
        return AXIOS_OBJ.delete(url, { data })
    },
    PUT: (url, data = {}) => {
        return AXIOS_OBJ.put(url, { data })
    }
}

export default BASE_API