import axios from 'axios'
import { Loading } from 'element-ui';

/**
 * 获取当前开发的环境api，四个环境在根目录中的四个.env.dev/test/pre/pro文件中;
 * 通过npm run XXX 启动时即可确定环境一般有四个：dev test pre pro，后两者会压缩打包，前两者用于自测
 */
const BASE_URL = process.env.VUE_APP_BASE_URL

// 创建一个axios对象，如果项目存在另一个base_api则可创建多个对象
const HTTP = axios.create({
    baseURL: BASE_URL, // api的base_url
    timeout: 100000 // request timeout
})

let LOADING_OBJ = ''
// 对所有请求增加请求拦截器
HTTP.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，比如登录校验，增加loading
    LOADING_OBJ = Loading.service({
        background:'rgba(0, 0, 0, 0.7)',
        text:'加载中……'
    })
    return config
}, function (error) {
    // 对请求错误做些什么
    LOADING_OBJ.close()
    return Promise.reject(error)
});

// 对所有请求增加响应拦截器
HTTP.interceptors.response.use(res => {
    LOADING_OBJ.close()
    // 如果存在响应数据，去除loading(后端会封装一层{code:x,data:x,extData:x,message:x})
    if (res.data && res.data.code === 200 && res.data.data) {
        return res.data
    }
    // 如果没有返回有价值数据，则返回空字符串
    return ''
}, err => {
    /***** 接收到异常响应的处理开始 *****/
    LOADING_OBJ.close()
    if (err && err.response) {
        // 公共错误处理,根据响应码具体处理
        switch (err.response.status) {
            case 400:
                console.warn('错误请求')
                break;
            case 401:
                console.warn('未授权，请重新登录')
                break;
            case 403:
                console.warn('拒绝访问')
                break;
            case 404:
                console.error('请求错误,未找到该资源')
                break;
            case 405:
                console.warn('请求方法未允许')
                break;
            case 408:
                console.warn('请求超时')
                break;
            case 500:
                console.error('服务器端出错')
                break;
            case 501:
                console.error('网络未实现')
                break;
            case 502:
                console.error('网络错误')
                break;
            case 503:
                console.error('服务不可用')
                break;
            case 504:
                console.error('网络超时')
                break;
            case 505:
                console.error('http版本不支持该请求')
                break;
            default:
                console.error(`连接错误：${err.response.status}`)
        }
    } else {
        // 超时处理
        if (JSON.stringify(err).includes('timeout')) {
            console.error('服务器响应超时，请刷新当前页')
        }
        console.error('服务繁忙！！！')
    }
})

export default HTTP