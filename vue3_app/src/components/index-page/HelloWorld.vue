<template>
	<div class="hello">
		<div class='blockLine'>这里是首页-{{msg}}</div>
		<div class='blockLine'><span class='attName'>provide => inject：</span>{{ multi_deep_data }}</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: ['msg'],
	data () {
		return {
			name: '欧阳锋'
		}
	},
	// 获取爷爷级别的组件传递过来的数据
	inject: ['multi_deep_data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.blockLine{
	line-height: 24px;
	margin-bottom:4px;
	background-color: bisque;
	text-align: left;
}
.attName{
	font-weight: bold;
	font-style: italic;
}
</style>