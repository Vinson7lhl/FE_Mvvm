<template>
	<div class='xx-d-flex xx-flex-col'>
		<el-upload
			ref='uploadFile'
			:class='["upload-license", {"hasError":!!errorMsg}]'
			drag
			:limit='1'
			:show-file-list='false'
			:on-success='handleUploadSuccess'
			:on-progress='handleProgress'
			:before-upload='handleBeforUpload'
			:on-error='handleUploadError'
			action='https://jsonplaceholder.typicode.com/posts/'
		>
			<i class='el-icon-upload' />
			<div class='el-upload__text'>
				<template v-if='!isProgress'>
					将文件拖到此处，或
					<em v-if='!errorMsg' class='xx-ml-1'>点击上传</em>
					<em v-else class='xx-ml-1' style='color:#F74141'>重新上传</em>
				</template>
				<template v-else>
					<em class='xx-ml-1' style='color:#F74141' @click='handleCancelUpload'>取消上传</em>
				</template>
			</div>
			<div class='uploadProgress' :style='progressStyle'>
				<span class='percentText'>{{ uploadPercent }}</span>
			</div>
		</el-upload>
		<div :class='["el-upload__tip xx-d-flex xx-flex-col",{"hasError":!!errorMsg}]'>
			<template v-if='!errorMsg'>
				<span>1.证件需加盖与主体一致的单位公章</span>
				<span>2.加盖公章的扫描件或者复印件</span>
				<span>3.支持jpg、jpeg、png格式文件，大小10MB以内</span>
			</template>
			<template v-else>
				<span>{{ errorMsg }}</span>
			</template>
		</div>
		<div class='xx-mt-2 sampleGraph xx-d-flex xx-flex-col xx-flex-items-center'>
			<div class='sampleGraphInner' @mouseover='showPreActions = true' @mouseleave='showPreActions=false'>
				<el-avatar shape='square' :size='128' fit='fill' :src='imgSrc' />
				<div v-show='showPreActions' :class='["actions",{"active":showPreActions}]'>
					<span @click='dialogVisible = true'>
						<i class='el-icon-zoom-in' />
					</span>
					<span v-if='!!fileUrl' class='xx-ml-3' @click='handleRemoveFile'>
						<i class='el-icon-delete' />
					</span>
				</div>
			</div>
			<p class='sampleGraphBadgeText xx-mt-1'>
				示例图
			</p>
		</div>

		<el-dialog :visible.sync='dialogVisible'>
			<img width='100%' :src='imgSrc' alt=''>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'UploadLicense',
	props: ['value'],
	data () {
		return {
			progressStyle: '',
			uploadPercent: '',
			errorMsg: '',
			showPreActions: false,
			dialogVisible: false,
			defaultImgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			fileUrl: '',
			file: '',
			isProgress: false
		}
	},
	computed: {
		imgSrc () {
			if (this.fileUrl) { return this.fileUrl }

			return this.defaultImgUrl
		}
	},
	mounted () {
		this.fileUrl = this.value
	},
	methods: {
		handleUploadSuccess (response, file) {
			this.$emit('input', file)
			this.setErrorMsg('')
			this.resetProgress()
		},
		handleProgress (event, file) {
			this.isProgress = true
			this.file = file
			this.uploadPercent = `${Math.abs(event.percent.toFixed(0))}%`
			this.progressStyle = {
				display: 'block',
				width: this.uploadPercent
			}
		},
		handleBeforUpload (file) {
			console.log(file, 'handleBeforUpload')
			const isIMG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
			let fileSize = file.size / 1024 / 1024
			fileSize = Math.floor(fileSize * 1000) / 1000 // 小数取整后三位
			const isLt10M = fileSize <= 10
			if (!isIMG) {
				this.setErrorMsg('上传头像图片只支持jpg、jpeg、png格式')
			}
			if (!isLt10M) {
				this.setErrorMsg('文件超过10MB，请重新上传')
			}
			if (isIMG && isLt10M) {
				this.setErrorMsg('')
			}
			return isLt10M && isIMG
		},
		handleUploadError (err, file, fileList) {
			console.log(err, file, fileList)
			// todo:删除。
			this.$emit('input', file)
			this.errorMsg = '上传失败,请稍后重试'
			this.resetProgress()
		},
		resetProgress () {
			this.progressStyle = {
				display: 'none',
				width: 0
			}
			this.isProgress = false
		},
		handleRemoveFile () {
			this.fileUrl = ''
			this.$emit('input', '')
			this.setErrorMsg('')
		},
		handleCancelUpload () {
			if (this.file) {
				this.$refs.uploadFile.abort(this.file)
				this.file = ''
				this.resetProgress()
				this.setErrorMsg('')
			}
		},
		setErrorMsg (msg) {
			this.errorMsg = msg
		}
	}
}
</script>
<style lang='scss' scoped>
.el-upload__tip{
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #AAAAAA;
    line-height: 22px;
    &.hasError{
        font-weight: 400;
        color: #F74141;
        line-height: 28px;
    }
}
.upload-license{
    height: 180px;
}
.sampleGraph{
    width: 128px;
}
.sampleGraphBadgeText{
    font-size: 14px;
    font-weight: 400;
    color: #AAAAAA;
    line-height: 20px;
}
.sampleGraphInner{
    position: relative;
    width: 128px;
    height: 128px;
    cursor: pointer;
    .actions{
        position: absolute;
        left: 0;top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;height: 100%;
        background-color: rgba(0,0,0,.4);
        opacity: 0;
        transition: opacity .5s;
        &.active{
            opacity: 1;
        }
        span{
            font-size: 20px;
            color: #fff;
        }
    }
}

.uploadProgress{
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(103, 169, 42, .4);
    border-bottom: 4px solid #67A92A;
    height: 100%;
    width: 0;
    // opacity: .1;
    transition: width 500ms;
    -moz-transition: width 500ms; /* Firefox 4 */
    -webkit-transition: width 500ms; /* Safari 和 Chrome */
    -o-transition: width 500ms; /* Opera */
    font-size: 14px;
    font-weight: 400;
    color: #67A92A;
    line-height: 20px;
    .percentText{
        position: absolute;
        right: 4px;
        bottom: 8px;
    }
}
</style>
<style lang='scss'>
.upload-license{
    .el-upload-dragger{
        border-color: #AFD58B !important;
        .el-upload__text em{
            color:#67A92A;
        }
        &:hover{
            background-color: #F9FFF3;
        }
        &:focus,&:hover,&:active{
            border-color: #AFD58B;
        }
    }
    &.hasError .el-upload-dragger{
        border-color: #F74141 !important;
    }
}
</style>