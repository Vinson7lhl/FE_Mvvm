<template>
	<div class='addressListContainer xx-d-flex xx-flex-wrap'>
		<slot />
	</div>
</template>
<script>
export default {
	name: 'AdressList',
	data () {
		return {

		}
	},
	methods: {

	}
}
</script>
<style lang="scss" scoped>
    .addressListContainer{
        margin-left: -8px;
        margin-right: -8px;
    }
</style>