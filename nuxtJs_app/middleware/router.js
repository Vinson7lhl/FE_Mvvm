export default ({ route, redirect }) => {
	console.log('router中间件')
	const TARGET_URL = route.path
	// 遍历必要的页面看是否匹配用户中心，若匹配则判断是否有token
	if (route.path.includes('/user')) {
		// 如果没有拿到token
		if (!this.$cookies.get('token')) {
			redirect(`/login?targetUrl=${TARGET_URL}`)
		}
	}
}