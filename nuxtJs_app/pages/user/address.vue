<template>
	<div>
		<xx-card>
			<template #header>
				<div class='xx-d-flex xx-flex-items-center xx-justify-between'>
					<span>地址管理</span>
					<!-- <el-button class='defaultPrimary' @click='handleAdd'>
						<i class='el-icon-plus' />
						新增地址
					</el-button> -->
				</div>
			</template>
			<div class='adressContainer'>
				<el-skeleton v-if='isLoading' :rows='6' animated />
				<adress-list>
					<div class='addAdressCard  xx-mt-2 xx-pl-1 xx-pr-1'>
						<div class='inner xx-d-flex xx-flex-items-center xx-justify-center xx-flex-col' @click='handleAdd'>
							<i class='iconfont icon-a-Group4 iconPlus' />
							<p class='xx-mt-2'>
								新增地址
							</p>
						</div>
					</div>
					<adress-item
						v-for='(item,index) in addressList'
						:key='index'
						class='xx-mt-2 xx-pl-1 xx-pr-1'
						:data='item'
						:index='index'
						@handleEdit='handleEdit'
						@handleDel='handleDel'
					/>
				</adress-list>
			</div>
		</xx-card>
		<el-dialog title='新增收货地址' :visible.sync='dialogFormVisible' width='568px' :close-on-click-modal='false'>
			<el-form
				v-if='dialogFormVisible'
				ref='editForm'
				:rules='rules'
				:model='editForm'
				label-width='98px'
				class='updatePwdForm xx-mt-2'
			>
				<el-form-item label='收货人' prop='name'>
					<el-input v-model='editForm.name' autocomplete='off' placeholder='请输入收货人姓名' />
				</el-form-item>
				<el-form-item label='手机号' prop='tel'>
					<el-input v-model='editForm.tel' placeholder='请输入手机号' />
				</el-form-item>
				<el-form-item label='所在地区' prop='adress'>
					<el-input v-model='editForm.adress' placeholder='请选择' />
				</el-form-item>
				<el-form-item label='详细地址' prop='detailAdress'>
					<el-input v-model='editForm.detailAdress' placeholder='请输入路名或街道地址、门牌号等' />
				</el-form-item>
				<el-form-item prop='detailAdress' style='margin-bottom:0'>
					<el-checkbox v-model='editForm.default'>
						设为默认
					</el-checkbox>
				</el-form-item>
			</el-form>
			<div slot='footer' class='dialog-footer'>
				<el-button @click='dialogFormVisible = false'>
					取 消
				</el-button>
				<el-button type='primary' @click='dialogFormVisible = false'>
					确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'AdressPage',
	components: {
		'xx-card': () => import('@/components/user/XxCard.vue'),
		'adress-list': () => import('@/components/user/AdressList.vue'),
		'adress-item': () => import('@/components/user/AdressItem.vue')
	},
	data () {
		return {
			isLoading: false,
			dialogFormVisible: false,
			editForm: {
				name: '',
				tel: '',
				adress: '',
				detailAdress: '',
				default: false
			},
			rules: {
				name: [
					{ required: true, message: '请输入收货人姓名', trigger: 'blur' }
				],
				tel: [
					{ required: true, message: '请输入手机号', trigger: 'blur' }
				],
				adress: [
					{ required: true, message: '请输入手机号', trigger: 'blur' }
				],
				detailAdress: [
					{ required: true, message: '请输入详细地址', trigger: 'blur' }
				]
			},
			addressList: [
				{ name: '陈小初', tel: '13112345678', default: true, adress: '湖北省武汉市江夏区锦绣大道1234号万华化工一厂' },
				{ name: '陈小2', tel: '13112345678', default: false, adress: '湖北省武汉市江夏区锦绣大道1234号万华化工一厂' },
				{ name: '陈小3', tel: '13112345678', default: false, adress: '湖北省武汉市江夏区锦绣大道1234号万华化工一厂' },
				{ name: '陈小3', tel: '13112345678', default: false, adress: '湖北省武汉市江夏区锦绣大道1234号万华化工一厂' }
			]
		}
	},
	mounted () {

	},
	methods: {
		handleAdd () {
			this.dialogFormVisible = true
		},
		handleEdit (item, index) {
			console.log(item, index, '====>edit')
		},
		handleDel (item, index) {
			console.log(item, index, '====>Del')
		}
	}
}
</script>
<style lang='scss' scoped>
    .adressContainer{
        margin-top: -32px;
    }
    .addAdressCard {
        width: 33.333%;
        .inner{
            width: 100%;
            height: 100%;
            background-color: #FAFAFA;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
        }
    }
    .iconPlus{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-size: 44px;
    }
</style>
<style>
.adressContainer .addressListContainer .adressItem{
    width: 33.3333%;
}
</style>