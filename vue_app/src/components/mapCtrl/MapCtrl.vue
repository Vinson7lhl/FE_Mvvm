<template>
	<div class="mapCtrl">
		<button @click='addMarker'>增加一个点</button>
	</div>
</template>
<script>
import { mapState } from 'Vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState(['G_map'])
	},
	watch: {
		G_map (old_data, new_data) {
			console.log('地图变化了')
		}
	},
	mounted () {
		console.log('地图控制器初始化完毕')
	},
	methods: {
		addMarker () {
			console.log(this.G_map)
		}
	}
}
</script>

<style lang="scss">
</style>
