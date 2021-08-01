<template>
	<div class='userMenuContainer'>
		<nuxt-link v-for='item in navs' :key='item.path' :to='item.path' class='menuItem xx-bb'>
			<i :class='[item.icon,"menuIcon"]' />
			<span class='xx-ml-1'>{{ item.label }}</span>
		</nuxt-link>
	</div>
</template>
<script>
export default {
	name: 'UserMenu',
	props: {
		navs: {
			type: Array,
			default () {
				return []
			}
		}
	}
}
</script>
<style scoped lang='scss'>
.userMenuContainer{
    min-width: 288px;
    padding: 24px 0;
    background: #FFFFFF;
}
.menuItem{
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 24px;
    width: 100%;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: #2C2C2C;
}
.menuIcon{
    font-size: 18px;
}
</style>

<style>
.menuItem.nuxt-link-exact-active::before{
    content: "";
    display: block;
    position: absolute;
    left: 0px;
    top: 0;bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 4px;
    height: 24px;
    background: #67A92A;
}
</style>