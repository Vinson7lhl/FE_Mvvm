/**
 * @description 首页的api,server、client都可用
 */
export default ({ app }, inject) => {
	inject('API_INDEX', () => {
		return {
			/**
			 * @description 测试Get获取某列表
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 */
			get_index_list: (data = {}) => {
				return app.$_get('/assets/api/product/getAllModuleProducts', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 首页列表 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 登陆接口
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 */
			post_login: (data = {}) => {
				return app.$_post('/user/api/mall/front/login', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 首页列表 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取用户信息
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 */
			post_user_info: (data = {}) => {
				return app.$_post('/user/api/mall/front/userInfo', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取用户信息 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 注册新用户
			 * @param {object} data 形参{}
			 */
			post_register: (data = {}) => {
				return app.$_post('/user/api/mall/front/register', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 注册用户 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取手机验证码
			 * @param {object} data
			 */
			post_phone_verify_code: (data = {}) => {
				return app.$_post('/user/api/mall/sendSms', data).then(res => {
					if (res.code === 200) {
						return 1
					} else {
						console.error(' 发送验证码 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取头部菜单list
			 */
			get_header_menu: () => {
				return app.$_get('/mall/api/industry/getList').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取头部菜单栏 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取产品list（未登录）
			 */
			post_product_list: (data = {}) => {
				return app.$_post('/mall/api/product/list', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取产品list（未登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取产品list（登录）
			 */
			post_product_full_list: (data = {}) => {
				return app.$_post('/mall/api/product/list', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取产品list（登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取产品详情（未登录）
			 */
			get_product_detail: (data = {}) => {
				return app.$_get('/mall/api/product/details', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取产品详情（未登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取产品详情（登录）
			 */
			get_product_full_detail: (data = {}) => {
				return app.$_get('/mall/api/product/details', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取产品详情（登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取方案list（未登录）
			 */
			get_scheme_list: () => {
				return app.$_get('/mall/api/setMeal/client/list').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取方案list（未登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取方案list（登录）
			 */
			get_scheme_full_list: () => {
				return app.$_get('/mall/api/setMeal/client/right/list').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取方案list（登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取配件list（未登录）
			 */
			post_fitting_list: () => {
				return app.$_post('/mall/api/parts/list').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取配件list（未登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 获取配件list（登录）
			 */
			post_fitting_full_list: () => {
				return app.$_post('/mall/api/parts/list').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取配件list（登录） - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 留咨弹窗中的产品列表
			 */
			get_temp_info_product_list: () => {
				return app.$_get('/mall/api/product/productCollection').then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 获取留咨内产品 - Error！')
						return ''
					}
				})
			},
			/**
			 * @description 留咨提交
			 */
			post_temp_info: (data = {}) => {
				return app.$_post('/mall/api/retainedCapital/visitor', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 提交留咨表单 - Error！')
						return ''
					}
				})
			}
		}
	})
}