/**
 * @description 首页的api,server、client都可用。调用方式：client:this.$API_INDEX();server:context.app.$API_INDEX()
 */
export default ({ app, env }, inject) => {
	inject('API_USER', () => {
		// 做点啥
		return {
			/**
			 * @description 测试Get获取某列表
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 * @param {boolean} is_loading 是否需要显示loading
			 */
			get_geo: (data = {}) => {
				return app.$_get('https://hxkj.vip/demo/mapData/pcas-code.json', data)
			},
			get_authentication_info: (data = {}) => {
				return app.$_get(`${env.BASE_URL}/user/api/mall/front/user/userAudit`, data)
			},
			post_authentication: (data = {}) => {
				return app.$_post(`${env.BASE_URL}/user/api/mall/front/user/userAudit`, data)
			}
		}
	})
}