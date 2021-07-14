/**
 * 说明：此文件为根store文件；
 * NuxtJs中的Vuex比较特别，只需要导出对应的state、getters、mutations、actions即可，index.js为根模块，所有的其它在此文件夹中的文件都为moudle模块，会自动被导入和生成
 */

/**
 * -------------------------- 根state --------------------------
 * 用法 this.$store.state.count
 */

export const state = () => {
	return {
		count: 1,
		state1: 2,
		state2: 3,
		state3: 4,
		login_name: '',
		login_number: '13888877671',
		G_map: ''
	}
}

/**
 * -------------------------- mutation -----------------------------
 * 同步处理状态
 * this.$store.commit('函数名')
 */
export const mutations = {
	add: (state, data) => { state.count = state.count + data },
	minus: (state, data) => { state.count = state.count - data },
	changeUserName: (state, data) => {
		state.login_name = data
	}
}

/**
 * -------------------------- getter --------------------------
 * 相当于state的computed计算
 * 用法：this.$store.getter.login_message
 */
export const getters = {
	login_message: (state) => {
		return `登陆者名字为：${state.login_name}，手机号码为：${state.login_number}`
	}
}

export const actions = {}
