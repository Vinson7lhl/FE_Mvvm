<template>
	<ul class='xx-d-flex xx-flex-items-center'>
		<li v-for='item in data' :key='item.value' :class='["tabItem",{"active":selectedValue === item.value}]' @click='handleSelected(item)'>
			{{ item.label }}
		</li>
	</ul>
</template>
<script>
export default {
	name: 'FilterTabs',
	emit: ['input', 'change'],
	props: {
		data: {
			type: Array,
			default () {
				return []
			}
		},
		value: {
			type: [String, Number],
			default: ''
		}
	},
	data () {
		return {
			selectedValue: ''
		}
	},
	mounted () {
		this.selectedValue = this.value
	},
	methods: {
		handleSelected (item) {
			this.selectedValue = item.value
			this.$emit('input', item.value)
			this.$emit('change', item.value)
		}
	}
}
</script>
<style lang="scss" scoped>
.tabItem{
    position: relative;
    padding: 12px 0;
    margin-left: 56px;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
    cursor: pointer;
    &:first-child{
        margin-left: 0;
    }
    &::after{
        content: "";
        display: none;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-color:#67A92A;
    }
    &.active{
        font-weight: 500;
        color: #67A92A;
        &::after{
            display: block;
        }
    }
}
</style>