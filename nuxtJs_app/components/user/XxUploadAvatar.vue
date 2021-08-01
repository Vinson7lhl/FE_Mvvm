<template>
	<div class='avatarUploadContainer' @mouseover='mouseOver' @mouseleave='mouseLeave'>
		<slot />
		<div v-show='isShowEdit' class='editAvatar' @click='selectLocalImage'>
			<span>编辑</span>
			<!--file input-->
			<input
				ref='uploadInput'
				type='file'
				accept='.jpeg, .jpg, .png'
				class='uploadFileInput'
				@change='handleUploadInputChange($event)'
			>
		</div>
	</div>
</template>
<script>
export default {
	name: 'XxUploadAvatar',
	emits: ['uploaded'],
	data () {
		return {
			isShowEdit: false
		}
	},
	methods: {
		mouseOver () {
			this.isShowEdit = true
		},
		mouseLeave () {
			this.isShowEdit = false
		},
		selectLocalImage () {
			this.$refs.uploadInput.click()
		},
		handleUploadInputChange (ev) {
			const file = ev.target.files[0]
			const data = new FormData()
			data.append(this.file, file)
			data.append('type', this.type)
			this.$emit('uploaded', file)
			// request.post('/image', data).then(res => {
			// 	if (res.data) {
			// 		this.$emit('update:modelValue', res.data.image_url)
			// 		this.$emit('uploaded', res.data.image_url)
			// 	}
			// })
		}
	}
}
</script>
<style scoped lang='scss'>
.avatarUploadContainer{
    display: block;
    position: relative;
}
.editAvatar{
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.4;
    border-radius: 100%;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
}
.uploadFileInput{
    display: none;
}
</style>