<template>
  <div class="otherComp">
      这里是异步组件-{{other_msg}}
  </div>
</template>

<script>
export default {
	name: 'OtherComp',
	props: [],
	data () {
		return {
			other_msg: '异步组件'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.otherComp {
    font-size:16px;
    font-weight:bold;
}
</style>