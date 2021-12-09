<template>
    <div>
        <el-table :data="skuListInfo" :span-method="objectSpanMethod" border>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="storeIds" label="适应门店">
        </el-table-column>
        <el-table-column prop="feeTypeInfo" label="费用类型">
        </el-table-column>
        <el-table-column prop="productInfo" label="适用产品">
        </el-table-column>
        <el-table-column prop="billing" label="计费方法">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
	name: 'map-page',
	data () {
		return {
			skuListInfo: [
				// 假数据
				{
					id: 1,
					name: '普通门店',
					storeIds: '123',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '1',
					productInfo: '日托',
					mergeId: 1,
					feeType: '1',
					feeTypeInfo: '学费1',
					billing: '月/季/年制度'
				},
				{
					id: 2,
					name: '普通门店',
					storeIds: '123',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '2',
					productInfo: '晚托',
					feeType: '1',
					mergeId: 1,
					feeTypeInfo: '学费1',
					billing: '月/季/年制度'
				},
				{
					id: 3,
					name: '普通门店',
					storeIds: '1-2-3',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '3',
					productInfo: '临时托',
					feeType: '1',
					mergeId: 1,
					feeTypeInfo: '学费2',
					billing: '月/季/年制度'
				},
				{
					id: 4,
					name: '普通门店',
					storeIds: '1-2-3',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '4',
					productInfo: '越拖',
					feeType: '1',
					mergeId: 1,
					feeTypeInfo: '学费2',
					billing: '月/季/年制度'
				},
				{
					id: 9,
					name: '普通门店',
					storeIds: '1-2-3',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '4',
					productInfo: '全部',
					feeType: '2',
					mergeId: 1,
					feeTypeInfo: '定金',
					billing: '月/季/年制度'
				},
				{
					id: 10,
					name: '普通门店',
					storeIds: '1-2-3',
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '4',
					productInfo: '全部',
					feeType: '3',
					mergeId: 1,
					feeTypeInfo: '学杂费',
					billing: '月/季/年制度'
				},
				{
					id: 5,
					name: '团购',
					storeIds: [1, 2, 3, 4],
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '5',
					productInfo: '寒假托',
					feeType: '2',
					mergeId: 1,
					feeTypeInfo: '定金',
					billing: '月/季/年制度'
				},
				{
					id: 6,
					name: '团购',
					storeIds: [1, 2, 3, 4],
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '5',
					productInfo: '日托',
					feeType: '1',
					mergeId: 1,
					feeTypeInfo: '学费',
					billing: '月/季/年制度'
				},
				{
					id: 7,
					name: '团购',
					storeIds: [1, 2, 3, 4],
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '5',
					productInfo: '晚托',
					feeType: '1',
					mergeId: 1,
					feeTypeInfo: '学费',
					billing: '月/季/年制度'
				},
				{
					id: 8,
					name: '大客户',
					storeIds: [1, 2, 3, 4],
					storeIdInfo: '[1, 2, 3, 4]',
					productType: '6',
					productInfo: '暑假托',
					feeType: '3',
					mergeId: 1,
					feeTypeInfo: '学杂费',
					billing: '月/季/年制度'
				}
			],
			typeNameArr: [], // 第一列进行合并操作时存放的数组变量
			typeNamePos: 0, // 上面的数组的下标值
			storeArr: [], // 第二列进行合并操作时存放的数组变量
			storePos: 0, // 上面的数组的下标值
			feeArr: [], // 第三列进行合并操作时存放的数组变量
			feePos: 0 // 上面的数组的下标值
		}
	},

	mounted () {
		console.log('父级初始化完毕')
		this.merage()
	},
	methods: {
		initData () {
			this.typeNameArr = []
			this.typeNamePos = 0
			this.storeArr = []
			this.storePos = 0
			this.feeArr = []
			this.feePos = 0
		},
		merage () {
			this.initData()
			for (let i = 0; i < this.skuListInfo.length; i += 1) {
				if (i === 0) {
					// 第一行必须存在
					this.typeNameArr.push(1)
					this.typeNamePos = 0
					this.storeArr.push(1)
					this.storePos = 0
					this.feeArr.push(1)
					this.feePos = 0
				} else {
					// 判断当前元素与上一个元素是否相同,eg：this.typeNamePos 是 this.typeNameArr序号
					// 第一列 下面的是eslint的不限制语法
					// eslint-disable-next-line no-lonely-if
					if (this.skuListInfo[i].name === this.skuListInfo[i - 1].name) {
						this.typeNameArr[this.typeNamePos] += 1
						this.typeNameArr.push(0)
					} else {
						this.typeNameArr.push(1)
						this.typeNamePos = i
					}
					// 第二列
					if (
						this.skuListInfo[i].storeIds === this.skuListInfo[i - 1].storeIds
					) {
						this.storeArr[this.storePos] += 1
						this.storeArr.push(0)
					} else {
						this.storeArr.push(1)
						this.storePos = i
					}
					// 第三列
					if (
						this.skuListInfo[i].feeTypeInfo === this.skuListInfo[i - 1].feeTypeInfo
					) {
						this.feeArr[this.feePos] += 1
						this.feeArr.push(0)
					} else {
						this.feeArr.push(1)
						this.feePos = i
					}
				}
			}
			console.log('第一列：', this.typeNameArr)
		},
		objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				// 第一列的合并方法
				const row1 = this.typeNameArr[rowIndex]
				const col1 = row1 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
				return {
					rowspan: row1,
					colspan: col1
				}
			} else if (columnIndex === 1) {
				// 第二列的合并方法
				const row2 = this.storeArr[rowIndex]
				const col2 = row2 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
				return {
					rowspan: row2,
					colspan: col2
				}
			} else if (columnIndex === 2) {
				// 第三列的合并方法
				const row3 = this.feeArr[rowIndex]
				const col3 = row3 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
				return {
					rowspan: row3,
					colspan: col3
				}
			}
		}
	}
}
</script>

<style lang="scss">
</style>
