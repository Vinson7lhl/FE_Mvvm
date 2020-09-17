<template>
  <div>
    <MapCtrl />
    <Map />
  </div>
</template>
<script>
import Map from '@/components/map/Map.vue'
import MapCtrl from '@/components/mapCtrl/MapCtrl.vue'

export default {
	name: 'map-page',
	data () {
		return {
			map: '',
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
	methods: {}
}
</script>

<style lang="scss">
</style>
