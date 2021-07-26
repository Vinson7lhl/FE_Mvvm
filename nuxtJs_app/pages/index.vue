<template>
  <div class='indexPage'>
    <!--产品列表面板-->
    <div class='productListBoard'>
      <!--顶部headerTab切换-->
      <div class='boardTypeTab xx-f-16'>
        <div class='perTab xx-pointer' :class='{activedTab: current_tab_type === "allSolutionTab"}' @click='triggerTab("allSolutionTab")'>
          解决方案
        </div>
        <div class='perTab xx-pointer' :class='{activedTab: current_tab_type === "allProductTab"}' @click='triggerTab("allProductTab")'>
          全部产品
        </div>
      </div>
      <!--解决方案列表-->
      <div v-show='current_tab_type === "allSolutionTab"' class='normalList solutionList'>
        <div class='perSolution xx-radius'>
          <!--顶部图片-->
          <div class='solutionPic'>
            pic
          </div>
          <!--简略描述-->
          <div class='sketch'>
            <div class='part1'>
              <div class='solutionName xx-f-18'>
                方案名
              </div>
              <div class='price xx-f-12 xx-po'>
                ￥登陆可见
              </div>
            </div>
            <div class='part2'>
              蛋液、淀粉、蔬菜加工品等包装解决方案
            </div>
          </div>
        </div>
        <div class='perSolution xx-radius'>
          方案block
        </div>
        <div class='perSolution xx-radius'>
          方案block
        </div>
        <div class='perSolution xx-radius'>
          方案block
        </div>
        <div class='perSolution xx-radius'>
          方案block
        </div>
      </div>
      <!--产品列表-->
      <div v-show='current_tab_type === "allProductTab"' class='normalList allProductList'>
        产品列表
      </div>
    </div>
    <!--地图面板-->
    <div id='map_container' class='mapContainer'>
      地图
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'IndexPage',
	components: {},
	props: [],
	asyncData (context) {
		console.log('server设置cookie-token')
		context.app.$cookies.set('lhl', '阿西吧xxx')
		console.log('server取出cookie-token', context.app.$cookies.get('lhl'))
		context.app.$API_INDEX().get_index_list({ data: { q: 'girls' }, is_token: true }).then(data => {
			console.log('server返回data啦！', data.data[0].id)
		})
		// console.log('服务端测试：', app.API_INDEX.get_index_list())
		// console.log('----', context.app.$_get)
		// const data = await context.app.$axios.get('/api/assets/api/product/getAllModuleProducts')
		// console.log(context)
		// console.log(data)
		// if (data) {
		// 	return { project: data || '哈哈哈' }
		// }
		return { project: '哈哈哈' }
	},
	data () {
		return {
			current_tab_type: 'allSolutionTab'
		}
	},
	computed: {
		test1 () {
			return this.page_name + 'computed'
		},
		...mapState({
			count: state => state.count,
			state1: state => state.state1
		})
	},
	beforeCreate () {
		console.log('index:beforeCreate')
	},
	created () {
		console.log('index:created')
	},
	beforeMount () {
		console.log('index:beforeMount')
	},
	mounted () {
		console.log('index:mounted')
		this.$API_INDEX().get_index_list({ data: {}, is_token: true }).then(data => {
			console.log('异步返回data：', data.data)
		})
		console.log('设置cookie-token')
		this.$cookies.set('lhl2', '阿西吧xxx2')
		console.log('server取出cookie-token', this.$cookies.get('lhl'))
		console.log('取出cookie-token', this.$cookies.get('lhl2'))
		// console.log('客户端测试：', Vue, INDEX_API.GET_LIST())
		// this.$axios.get('/api/assets/api/product/getAllModuleProducts')
		this.$initMap('map_container', map_obj => {
			console.log('地图初始化完毕：', map_obj)
		})
	},
	methods: {
		/**
		 * @description 获取用户名
		 */
		getUserName () {
			alert(this.user_name)
		},
		/**
		 * @description 切换方案和所有产品的列表
		 */
		triggerTab (tab_type) {
			this.current_tab_type = tab_type
		}
	}
}
</script>

<style lang='scss' scoped>
.indexPage {
	display: flex;
	.productListBoard{
		width:440px;
		height:800px;
		background: #F0F1F2;
		.boardTypeTab{
			width:440px;
			height:56px;
			padding: 0 24px 0 24px;
			background-color: #ffffff;
		}
		.perTab{
			display: inline-block;
			text-align: center;
			margin-right:40px;
			width:64px;
			height:52px;
			line-height: 52px;
			transition:all 0.3s;
			border-bottom: 4px solid rgba(103,169,42,0);
		}
		.activedTab{
			color:#67A92A;
			border-bottom: 4px solid rgba(103,169,42,1);
		}
		.normalList{
			height:740px;
			padding:16px 24px;
			overflow: auto;
		}
		.perSolution{
			width:100px;
			background-color: #ffffff;
			height:225px;
			width:100%;
			margin-bottom:12px;
		}
		.solutionPic{
			height:140px;
			background-color: #D8D8D8;
		}
		.sketch{
			padding:16px;
		}
		.solutionName{
			font-weight: bold;
			color:#2C2C2C;
		}
		.part2{
			color:#666666;
		}
		.price{
			width:80px;
			height:28px;
			text-align: center;
			line-height: 28px;
			color:#67A92A;
			border:1px solid #67A92A;
			border-radius: 14px;
		}
	}
	.mapContainer{
		flex:1;
	}
}
</style>
