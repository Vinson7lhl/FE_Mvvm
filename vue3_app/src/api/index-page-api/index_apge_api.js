import BASE_API from '../base_api'

const INDEX_PAGE_API = {
	/**
	 * @description 获取用户列表
	 */
	get_users: (params) => {
		return BASE_API.GET('真实url地址', params)
	},
	/**
	 * @description 获取用户列表
	 */
	 post_form: (data) => {
		return BASE_API.POST('真实url地址', data)
	}
}
export default INDEX_PAGE_API