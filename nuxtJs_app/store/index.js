/**
 * 说明：此文件为根store文件；
 * NuxtJs中的Vuex比较特别，只需要导出对应的state、getters、mutations、actions即可，index.js为根模块，所有的其它在此文件夹中的文件都为moudle模块，会自动被导入和生成
 */

export const state = () => {
	return {
		// 是否显示登陆浮窗
		is_show_login_dialog: false,
		// 是否显示留资浮窗
		is_show_leave_message_dialog: false,
		// 高德AMap类
		AMap: '',
		// 高德地图实例
		map_obj: ''
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
	},
	/**
	 * @description 打开登陆弹窗
	 * @param {object} state
	 */
	showLoginDialog: state => {
		state.is_show_login_dialog = true
	},
	/**
	 * @description 关闭登陆弹窗
	 * @param {object} state
	 */
	hideLoginDialog: state => {
		state.is_show_login_dialog = false
	},
	/**
	 * @description 打开留资弹窗
	 * @param {object} state
	 */
	showLeaveMessageDialog: state => {
		state.is_show_leave_message_dialog = true
	},
	/**
	 * @description 关闭留资弹窗
	 * @param {object} state
	 */
	hideLeaveMessageDialog: state => {
		state.is_show_leave_message_dialog = false
	},
	/**
	 * 设置AMap类
	 */
	initAMapObj: (state, AMap) => {
		state.AMap = AMap
	},
	/**
	 * 设置Map实例
	 */
	initMapObj: (state, map_obj) => {
		state.map_obj = map_obj
	}
}

/**
 * -------------------------- getter --------------------------
 * 相当于state的computed计算
 * 用法：this.$store.getter.login_message
 */
export const getters = {
	login_message: state => {
		return `登陆者名字为：${state.login_name}，手机号码为：${state.login_number}`
	}
}

export const actions = {
	asyncAction: ({ state, commit }) => {
		console.log(state)
		console.log(commit)
	}
}
