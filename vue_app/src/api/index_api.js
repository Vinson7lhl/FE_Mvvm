import HTTP from './base_api'

let index_get = () => {
	return HTTP({
		url: ' http://api.tvmaze.com/search/shows',
		methods: 'get',
		params: {
			q: 'girls'
		}
	})
}

export { index_get }