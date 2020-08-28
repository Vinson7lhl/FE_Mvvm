import request from './base_api'

const http = {
    /**
     * methods: get请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url, params) {
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params
        return request(config)
    },
    /**
     * methods: post请求
     * @param url 请求地址 
     * @param data 请求参数
     */
    post(url, data) {
        const config = {
            method: 'post',
            url: url
        }
        if (data) config.data = data
        return request(config)
    },
    /**
     * methods: put请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    put(url, params) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) config.params = params
        return request(config)
    },
    /**
     * methods: delete请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    delete(url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) config.params = params
        return request(config)
    }
}
//导出
export default http