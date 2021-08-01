<template>
	<div class='FooterModel'>
		<div class='footerFrame'>
			<div class='mainContent'>
				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						散装液体解决方案
					</p>
					<p class='perLink'>
						吨立方
					</p>
					<p class='perLink'>
						超立方
					</p>
					<p class='perLink'>
						正立方
					</p>
					<p class='perLink'>
						挤推器
					</p>
					<p class='perLink'>
						灌排配件
					</p>
				</div>

				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						生鲜果蔬解决方案
					</p>
					<p class='perLink'>
						金刚
					</p>
					<p class='perLink'>
						罗汉
					</p>
					<p class='perLink'>
						花仙子
					</p>
				</div>

				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						汽配快运解决方案
					</p>
					<p class='perLink'>
						功夫
					</p>
					<p class='perLink'>
						蝉翼
					</p>
					<p class='perLink'>
						魔方
					</p>
					<p class='perLink'>
						如燕
					</p>
					<p class='perLink'>
						金箍塔
					</p>
				</div>

				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						循环服务
					</p>
					<p class='perLink'>
						数智+
					</p>
					<p class='perLink'>
						百网千驿
					</p>
					<p class='perLink'>
						箱箱商城
					</p>
					<p class='perLink'>
						链接云平台
					</p>
					<p class='perLink'>
						箱箱计算器
					</p>
				</div>

				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						关于箱箱
					</p>
					<p class='perLink'>
						关于我们
					</p>
					<p class='perLink'>
						全球巡展
					</p>
					<p class='perLink'>
						新闻动态
					</p>
				</div>

				<div class='baseLinksGroup baseLinksGroup1'>
					<p class='linkGroupName'>
						用箱操作指导
					</p>
					<p class='perLink'>
						下载产品手册
					</p>
					<p class='perLink'>
						查看操作视频
					</p>
				</div>

				<div class='otherContracts'>
					<div class='pershare shareArea'>
						<img src='@/assets/imgs/wechat.png' alt='微信'>
						<img src='@/assets/imgs/weibo.png' alt='微博'>
						<img src='@/assets/imgs/ins.png'>
						<img src='@/assets/imgs/fb.png'>
						<img src='@/assets/imgs/ten.png' alt='腾讯'>
					</div>
					<div class='pershare'>
						<span class='contractTitle'>销售对接</span>
						<span class='contractAddress'>sales@cortp.com</span>
					</div>
					<div class='pershare'>
						<span class='contractTitle'>招贤纳士</span>
						<span class='contractAddress'>hr@cortp.com</span>
					</div>
					<div class='pershare'>
						<span class='contractTitle'>市场合作</span>
						<span class='contractAddress'>pr@cortp.com</span>
					</div>
				</div>
			</div>
			<div class='firmInfo'>
				Copyright © 2019 箱箱共用 Cortp 保留所有权利。 ｜ 沪公网安备 31010402003516号 ｜<span class='lawInfo'>法律信息 ｜ 隐私政策</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FooterModel',
	props: [],
	data () {
		return {}
	},
	beforeCreate () {
		// console.log('footer:beforeCreate')
	},
	created () {
		// console.log('footer:created')
	},
	beforeMount () {
		// console.log('footer:beforeMount')
	},
	mounted () {
		// console.log('footer:mounted')
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
    .FooterModel {
        background-color: #F4F4F4;
        width:100%;
        height:350px;
		font-size:11px;
		color:#3E4046;
		margin-top:10px;
		overflow: hidden;
		.footerFrame{
			width:1225px;
			margin-left:auto;
			margin-right:auto;
		}
		.mainContent{
			height:289px;
			border-bottom:1px solid #E5EBF0;
			display: flex;
			margin-top:20px;
		}
		.baseLinksGroup{
			margin-right:60px;
			.linkGroupName{
				color:#121317;
				font-weight:bold;
				margin-bottom:14px;
			}
			.perLink{
				line-height: 24px;
			}
		}
		.firmInfo{
			color:#A1A2A9;
			text-align: center;
			margin-top:16px;
			margin-bottom:16px;
		}
		.otherContracts{
			width: 250px;
		}
		.pershare{
			border-bottom:2px solid #E5EBF0;
			display: flex;
			line-height: 58px;
			align-items: center;
			.contractTitle{
				margin-right:20px;
				color:#121317;
				font-weight:bold;
			}
			img{
				width:34px;
				height:34px;
				margin-right:20px;
			}
		}
		.shareArea{
			padding-bottom:10px;
		}
    }
</style>
