import * as baseService from './baseService_axios'

// 首页测试接口

let indexApi = {
    getList:(url,params) => {
        return baseService.getRequest(url,params)
    }
}

export default indexApi

