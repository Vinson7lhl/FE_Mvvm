export default ({ app, env }, inject) => {
	inject('API_INDEX', () => {
		// 做点啥
		return {
			/**
			 * @description 测试Get获取某列表
			 * @param {object} data 形参，请封装好后
			 * @param {boolean} is_token 是否需要toke
			 * @param {boolean} is_loading 是否需要显示loading
			 */
			get_index_list: (data = {}) => {
				return app.$_get(`${env}/assets/api/product/getAllModuleProducts`, data)
			}
		}
	})
}