/**
 * 说明：此文件其它module文件
 */

export const state = () => ({
	ju_bu_1: '模块变量'
})

export const mutations = {
	add (state, text) {
		state.list.push({
			text,
			done: false
		})
	},
	remove (state, { todo }) {
		state.list.splice(state.list.indexOf(todo), 1)
	},
	toggle (state, todo) {
		todo.done = !todo.done
	}
}

export const actions = {
	add (state, text) {
		state.list.push({
			text,
			done: false
		})
	},
	remove (state, { todo }) {
		state.list.splice(state.list.indexOf(todo), 1)
	},
	toggle (state, todo) {
		todo.done = !todo.done
	}
}
