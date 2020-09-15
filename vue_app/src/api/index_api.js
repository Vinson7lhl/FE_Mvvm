import http from './api'

let index_page_api = {
	/**
	 * @description 获取电视列表
	 */
	getTvList: (params) => {
		return http.get('search/shows', params)
	}
}
export default index_page_api
