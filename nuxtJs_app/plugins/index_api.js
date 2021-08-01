/**
 * @description 首页的api,server、client都可用
 */
export default ({ app, env }, inject) => {
	inject('API_INDEX', () => {
		return {
			/**
			 * @description 测试Get获取某列表
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 */
			get_index_list: (data = {}) => {
				return app.$_get(`${env.BASE_URL}/assets/api/product/getAllModuleProducts`, data).then(res => {
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
				return app.$_post('/api/user/api/mall/front/login', data).then(res => {
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
				return app.$_post('/api/user/api/mall/front/userInfo', data).then(res => {
					if (res.code === 200 && res.data) {
						return res.data
					} else {
						console.error(' 首页列表 - Error！')
						return ''
					}
				})
			}
		}
	})
}