<template>
	<div class='adressItem'>
		<div class='inner'>
			<div class='xx-d-flex xx-flex-items-center'>
				<span class='name'>{{ data.name }}</span>
				<span class='tel xx-ml-3'>{{ data.tel }}</span>
				<div v-if='data.default' class='xx-chip xx-ml-2'>
					默认
				</div>
			</div>
			<p class='adressText xx-mt-2'>
				{{ data.adress }}
			</p>
			<transition name='fade'>
				<div class='xx-d-flex xx-flex-items-center icons xx-justify-end xx-mt-2'>
					<span @click='handleEdit'>
						<i class='iconfont icon-a-Group30' />
					</span>
					<span v-if='!data.default' class='xx-ml-4' @click='handleDel'>
						<i class='iconfont icon-a-Group15' />
					</span>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: 'AdressItem',
	props: {
		data: {
			type: Object,
			default () {
				return null
			}
		},
		index: {
			type: Number,
			default: 0
		}
	},
	emits: ['handleEdit', 'handleDel'],
	data () {
		return {
		}
	},
	methods: {
		handleEdit () {
			this.$emit('handleEdit', this.data, this.index)
		},
		handleDel () {
			this.$emit('handleDel', this.data, this.index)
		}
	}
}
</script>
<style lang="scss" scoped>
.adressItem .inner{
    padding: 24px 32px 24px 24px;
    background-color: #FAFAFA;
    border-radius: 4px;
    &:hover{
        .icons{
            opacity: 1;
        }
    }
}
.icons{
    opacity: 0;
    transition: opacity .5s;
}
.icons span{
    font-size: 20px;
    cursor: pointer;
}
.name,.tel{
    font-size: 16px;
    font-weight: 500;
    color: #2C2C2C;
    line-height: 22px;
}
.adressText{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
}
.xx-chip{
    padding: 2px 12px;
    background: #FFEEE3;
    border-radius: 11px;
    border: 1px solid #FFDECB;
    font-size: 12px;
    font-weight: 400;
    color: #ED5806;
    line-height: 17px;
}
.iconfont{
    font-size: 20px;
}
</style>