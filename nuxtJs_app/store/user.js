
export const state = () => ({
	user_info: {
		auditStatus: -1,
		companyName: '',
		photoUrl: '',
		userMobile: ''
	}
})

export const getters = {
	userInfo: state => {
		return state.user_info
	}
}

export const mutations = {
	setUserInfo (state, data) {
		state.user_info = data
	}
}

export const actions = {
	getUserInfo ({ commit }, data = {}) {
		this.$API_INDEX().post_user_info(data).then(res => {
			commit('setUserInfo', res)
		})
	}
}