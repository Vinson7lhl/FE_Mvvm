<template>
  <div class='breadcrumbContainer'>
    <template v-for='(item, index) in list'>
      <span :key='item.label + index' :class='["breadcrumbItem",{"clickable":!!item.path}]' @click='goPage(item.path)'>{{ item.label }}</span>
      <img v-if='index < list.length - 1' :key='item.label' src='/imgs/icon/arrow_right.png' class='breadcrumbIcon'>
    </template>
  </div>
</template>
<script>
export default {
	name: 'XxBreadcrumb',
	props: {
		list: {
			type: Array,
			default () {
				return []
			}
		}
	},
	methods: {
		goPage (path) {
			if (!path) { return false }

			window.location.href = path
		}
	}
}
</script>
<style lang='scss' scoped>
.breadcrumbContainer{
    display: flex;
    align-items: center;
}
.breadcrumbItem{
    margin-left: 4px;
    font-size: 14px;
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: #AAAAAA;
    line-height: 20px;
    &:first-child{
        margin-left: 0;
    }
    &.clickable{
        color: #666666;
        cursor: pointer;
    }
}
.breadcrumbIcon{
    margin-left: 4px;
}
</style>