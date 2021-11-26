import BASE_API from '../base_api'

const INDEX_PAGE_API = {
	/**
	 * @description 获取用户列表
	 */
	get_data: (params) => {
		return BASE_API.GET('https://www-api.huxiu.com/v1/ad/getConfig', params)
	},
	/**
	 * @description 获取用户列表
	 */
	post_form: (data) => {
		return BASE_API.POST('真实url地址', data)
	}
}
export default INDEX_PAGE_API