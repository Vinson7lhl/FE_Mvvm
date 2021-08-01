<template>
	<div class='xxCard'>
		<div v-if='!!$slots.header' class='xxCardHeader'>
			<slot name='header' />
		</div>
		<div class='xxCardBody'>
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: 'XxCard',
	mounted () {
	}
}
</script>
<style scoped>
.xxCard{
    background-color: #fff;
}
.xxCardHeader{
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid #EEEEEE;
    font-size: 22px;
    font-family: 'PingFangSC-Medium, PingFang SC';
    font-weight: 500;
    color: #2C2C2C;
    line-height: 30px;
}
.xxCardBody{
    padding: 32px 24px;
}
</style>