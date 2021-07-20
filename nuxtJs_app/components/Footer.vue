<template>
  <div class='FooterModel'>
    这里是脚部
  </div>
</template>

<script>
export default {
	name: 'FooterModel',
	props: [],
	data () {
		return {}
	},
	beforeCreate () {
		console.log('footer:beforeCreate')
	},
	created () {
		console.log('footer:created')
	},
	beforeMount () {
		console.log('footer:beforeMount')
	},
	mounted () {
		console.log('footer:mounted')
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
    .FooterModel {
        background-color: burlywood;
        width:100%;
        height:100px;
        background-color: burlywood;
    }
</style>
