import BASE_API from '../base_api'

const INDEX_PAGE_API = {
	/**
	 * @description 获取用户列表
	 */
	get_users: (url, params) => {
		return BASE_API.GET(url, params)
	}
}
export default INDEX_PAGE_API