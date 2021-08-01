<template>
	<div class='profileContainer xx-pt-3'>
		<xx-breadcrumb :list='breadcrumb' />

		<div class='xx-mt-3 certificationInner'>
			<el-steps :space='185' :active='2' class='certificationStep xx-d-flex xx-justify-center'>
				<el-step title='上传资料' icon='iconfont icon-a-Group16' class='stepIcon'>
					<i slot='icon' class='iconfont icon-a-Group30' />
				</el-step>
				<el-step title='资料审核' icon='iconfont icon-a-Group16' class='stepIcon'>
					<i slot='icon' class='iconfont icon-a-Group13' />
				</el-step>
				<el-step title='完成认证' icon='iconfont icon-a-Group16' class='stepIcon lastStep'>
					<i slot='icon' class='iconfont icon-a-Group16' />
				</el-step>
			</el-steps>
			<div class='xx-d-flex xx-flex-col xx-flex-items-center mt-60'>
				<div class='illustration'>
					<el-image :src='illustration1' />
					<el-image :src='illustration2' class='illustrationImg' />
				</div>
				<p class='sucessText'>
					提交成功
				</p>
				<p class='badgeText xx-mt-2'>
					我们将于1~2天内完成审核工作，请您耐心等待，
				</p>
				<p class='badgeText'>
					如有疑问请联系我们400-8866-886
				</p>
				<el-button type='primary' class='xx-mt-3' @click='back'>
					{{ btnText }}
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import successfulCertification from '@/assets/imgs/user/successfulCertification.png'
import succeed from '@/assets/imgs/user/succeed.png'

export default {
	name: 'CertificationPage',
	components: {
		'xx-breadcrumb': () => import('@/components/user/XxBreadcrumb.vue')
	},
	data () {
		return {
			breadcrumb: [
				{ label: '首页', path: '/' },
				{ label: '企业认证' }
			],
			illustration1: successfulCertification,
			illustration2: succeed,
			timeId: '',
			number: 5
		}
	},
	computed: {
		btnText () {
			return `${this.number}s 返回`
		}
	},
	mounted () {
		this.countdown()
		console.log(sessionStorage.getItem('previousLocation'), '====>previousLocation')
	},
	methods: {
		countdown () {
			this.timeId = setInterval(() => {
				this.number = this.number - 1
				if (this.number <= 0) {
					this.back()
				}
			}, 1000)
		},
		back () {
			if (this.timeId) {
				clearTimeout(this.timeId)
			}
			// window.location.href = '/user'
		}
	}
}
</script>
<style lang='scss' scoped>
.profileContainer{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    min-height: calc(100vh - 64px);
}
.certificationInner{
    padding-top: 64px;
    min-height: 710px;
    background: #FFFFFF;
}
.mt-60{
    margin-top: 60px;
}
.lastStep{
    width: 60px !important;
    flex-basis:unset !important
}
.illustration{
    position: relative;
    .illustrationImg{
        position: absolute;
        right: -26px;
        bottom: -9px;
    }
}
.sucessText{
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #2C2C2C;
    line-height: 22px;
}
.badgeText{
    font-size: 14px;
    font-weight: 400;
    color: #AAAAAA;
    line-height: 26px;
}
</style>

<style lang='scss'>
.certificationStep{
    .el-step__head.is-finish{
        color: #2C2C2C;
        border-color: #2C2C2C;
    }
    .el-step__head.is-wait,.el-step__head.is-process{
        color: #AAAAAA;
    }
    .el-step__title{
        font-size: 14px;
        font-weight: 400;
        color: #2C2C2C;
        line-height: 20px;
        &.is-process,&.is-wait{
            color:#AAAAAA;
        }
    }
    .el-step__line{
        background-color: #EEEEEE;
    }
}
.stepIcon{
    .el-step__icon.is-icon{
        width: 30px;
        height: 30px;
    }
    .iconfont{
        font-size: 30px;
    }
    .el-step__main {
        margin-top: 4px;
        // margin-left: -12px;
    }
}
</style>