<template>
  <div>
    <MapCtrl :map-obj='map_obj'/>
    <Map @sendMapObj = 'getMapObj'/>
  </div>
</template>
<script>
import Map from '@/components/map/Map.vue'
import MapCtrl from '@/components/mapCtrl/MapCtrl.vue'

export default {
	name: 'map-page2',
	data () {
		return {
			map_obj: '',
			marker_obj: ''
		}
	},
	mounted () {
		console.log('MapTest2父级初始化完毕')
	},
	components: {
		Map,
		MapCtrl
	},
	methods: {
		getMapObj (map_obj) {
			console.log('拿到map2')
			this.map_obj = map_obj
		}
	}
}
</script>

<style lang="scss">
</style>
