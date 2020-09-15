<template>
	<div class="movieContainer" v-if="movie_list">
		<div class="perMovie" v-for="item in movie_list" :key="item.show.id">
			<div class="baseInfo">
				得分：
				<span class="scoreNum">{{item.score}}</span>
				片名：{{item.show.name}}
			</div>
			<img v-if="item.show.image" :src="item.show.image.medium" alt />
		</div>
	</div>
</template>

<script>
import indexPageApi from '@/api/index_api'

export default {
	name: 'tv_list',
	data () {
		return {
			movie_list: ''
		}
	},
	mounted () {
		this.getList()
	},
	methods: {
		getList () {
			console.log('请求')
			indexPageApi.getTvList({ q: 'girls' }).then((res) => {
				this.movie_list = res
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.movieContainer {
		padding: 20px;
		width: 100%;
		.perMovie {
			width: 150px;
			text-align: center;
			margin-left: 20px;
			float: left;
			.scoreNum {
				font-weight: bold;
			}
			img {
				width: 100%;
			}
		}
	}
</style>
