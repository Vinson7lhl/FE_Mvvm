<template>
	<div class="exportExl">
		<div class="treeFrame">
			<!-- <el-tree
        draggable
        :data="data"
        :props="defaultProps"
        :allow-drop="allowDrop"
        default-expand-all
        @node-click="handleNodeClick"
        @node-drop="handleDrop"
        @check="getTreeData"
        ref="thisTree"
			></el-tree>-->
		</div>
		<div id="tableFrame">
			<div id="wdr-component"></div>
		</div>
	</div>
</template>

<script>
import zh_json from '../assets/zh.json'
export default {
	name: 'about-page',
	data () {
		return {
			// 树结构元数据
			// label：不可改，必须，显示的节点名
			// children:不可改，必须，子节点
			// 其它字段可自行定义
			data: [
				{
					label: '产品信息',
					level: 'top',
					type_name: 'row',
					id: 1
				},
				{
					label: '产品参数',
					level: 'top',
					type_name: 'col',
					id: 2
				},
				{
					label: '类型',
					level: 'top',
					type_name: 'type',
					id: 3,
					children: [
						{
							label: '品牌',
							id: 8,
							level: 'son',
							type_name: 'brand_name',
							is_in_type: true
						},
						{
							label: '品类',
							id: 4,
							level: 'son',
							type_name: 'brand_type',
							is_in_type: true
						},
						{
							label: '品牌组',
							id: 5,
							level: 'son',
							type_name: 'brand_group',
							is_in_type: true
						},
						{
							label: '规格',
							id: 6,
							level: 'son',
							type_name: 'Specification',
							is_in_type: true
						},
						{
							label: '包装',
							id: 7,
							level: 'son',
							type_name: 'packaging',
							is_in_type: true
						},
						{
							label: '口味',
							id: 8,
							level: 'son',
							type_name: 'taste',
							is_in_type: true
						},
						{
							label: '入数',
							id: 9,
							level: 'son',
							type_name: 'ru_shu',
							is_in_type: true
						},
						{
							label: '同价码',
							id: 10,
							level: 'son',
							type_name: 'tong_jia_ma',
							is_in_type: true
						},
						{
							label: '产品编码',
							id: 11,
							level: 'son',
							type_name: 'product_code',
							is_in_type: true
						},
						{
							label: '克重',
							id: 12,
							level: 'son',
							type_name: 'weight',
							is_in_type: true
						},
						{
							label: '预算出货金额',
							id: 13,
							level: 'son',
							type_name: 'pre_price',
							is_in_type: true
						},
						{
							label: '预算出货达成',
							id: 14,
							level: 'son',
							type_name: 'pre_price_ok',
							is_in_type: true
						},
						{
							label: '同比增长',
							id: 15,
							level: 'son',
							type_name: 'year_on_year_growth',
							is_in_type: true
						},
						{
							label: '实际出货金额',
							id: 16,
							level: 'son',
							type_name: 'real_price',
							is_in_type: true
						}
					]
				}
			],
			// 生成的table每行title数据
			table_row_head_data: [],
			// 生成的table每列title数据
			table_colum_head_data: ['类型'],

			defaultProps: {
				children: 'children',
				label: 'label'
			},
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-08',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-06',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				},
				{
					date: '2016-05-07',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}
			],
			html_str: '',
			pivot: ''
		}
	},
	mounted () {
		let _this = this
		this.pivot = new WebDataRocks({
			container: '#wdr-component',
			height: 530,
			toolbar: true,
			report: {
				dataSource: {
					data: _this.getData()
				},
				options: {
					grid: {
						type: 'classic',
						title: '李宏磊的表格',
						showReportFiltersArea: true
					},
					general: {
						configuratorActive: false
					}
				},
				cellData: {
					height: 500
				},
				slice: {
					rows: [
						{
							uniqueName: '产品信息',
							sort: 'asc'
						}
					],
					columns: [
						{
							uniqueName: '产品参数',
							sort: 'asc'
						}
					],
					measures: [
						{
							uniqueName: '实际出货金额',
							// 聚合方式：比如 求和，求平均值，求方差
							aggregation: 'sum'
						},
						{
							uniqueName: '同比增长',
							// 聚合方式：比如 求和，求平均值，求方差
							aggregation: 'sum'
						},
						{
							uniqueName: '预算出货达成',
							// 聚合方式：比如 求和，求平均值，求方差
							aggregation: 'sum'
						},
						{
							uniqueName: '预算出货金额',
							// 聚合方式：比如 求和，求平均值，求方差
							aggregation: 'sum'
						}
					],
					drills: {
						drillAll: false,
						rows: [
							{
								tuple: ['Business Type.Warehouse']
							}
						]
					}
				}
			},
			global: {
				// replace this path with the path to your own translated file
				localization: zh_json
			}
		})
	},
	methods: {
		handleNodeClick (data) {
			console.log(data)
		},
		// 是否允许放置
		/**
			 * 类型 -- 子节点 -- 行/列
			 *
			 * 类型 -- 子节点 -- 行/列 --子节点
			 *
			 * 行/列 -- 子节点 -- 类型
			 *
			 * 行/列 -- 子节点 -- 子节点
			 */
		allowDrop (draggingNode, dropNode, type) {
			// 如果拖放在行模块
			if (
				draggingNode.data.level === 'son' &&
					(dropNode.data.type_name === 'row' ||
						dropNode.data.type_name === 'col')
			) {
				return type === 'inner'
			} else if (
				draggingNode.data.level === 'son' &&
					dropNode.data.level === 'son' &&
					draggingNode.data.is_in_type &&
					!dropNode.data.is_in_type
			) {
				return type === 'inner'
			} else if (
				draggingNode.data.level === 'son' &&
					(!draggingNode.data.children ||
						draggingNode.data.children.length === 0) &&
					dropNode.data.type_name === 'type'
			) {
				return type === 'inner'
			} else if (
				draggingNode.data.level === 'son' &&
					dropNode.data.level === 'son' &&
					!draggingNode.data.is_in_type &&
					!dropNode.data.is_in_type
			) {
				return type === 'inner'
			} else {
				return false
			}
		},
		// 放置成功后
		handleDrop (draggingNode, dropNode, dropType, ev) {
			// 获取拖拽后的完整数据
			console.log(this.$refs.thisTree.root.data)
			// 如果拖放在行、列模块
			if (
				dropNode.data.type_name === 'row' ||
					dropNode.data.type_name === 'col' ||
					dropNode.data.level === 'son'
			) {
				draggingNode.data.is_in_type = false
			} else if (dropNode.data.type_name === 'type') {
				draggingNode.data.is_in_type = true
			}
		},
		getTreeData (data, checked, indeterminate) {
			let data1 = this.$refs.multipleTable.getCheckedNodes()
			console.log(data1)
		},
		getData () {
			return [
				{
					// 横向head字段
					品牌: {
						type: 'string'
					},
					品类: {
						type: 'string'
					},
					品牌组: {
						type: 'string'
					},
					规格: {
						type: 'string'
					},
					包装: {
						type: 'string'
					},
					口味: {
						type: 'string'
					},
					入数: {
						type: 'string'
					},
					同价码: {
						type: 'string'
					},
					产品编码: {
						type: 'string'
					},
					克重: {
						type: 'string'
					},

					// 纵向head字段
					预算出货金额: {
						type: 'number'
					},
					预算出货达成: {
						type: 'number'
					},
					同比增长: {
						type: 'number'
					},
					// 元数据
					实际出货金额: {
						type: 'number'
					}
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '单包',
					口味: '酸辣牛肉',
					入数: '24入',
					同价码: '1MW',
					产品编码: '大食袋120g-24-1',
					克重: '120g',

					实际出货金额: 33,
					预算出货金额: 22,
					预算出货达成: 44,
					同比增长: 18
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单5包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '5包',
					口味: '酸辣牛肉',
					入数: '24入+1',
					同价码: '1MW',
					产品编码: '大食袋120g-24-2',
					克重: '120g',
					实际出货金额: 13,
					预算出货金额: 82,
					预算出货达成: 14,
					同比增长: 22
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单5包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '5包',
					口味: '酸辣牛肉',
					入数: '24入+1',
					同价码: '1MW',
					产品编码: '大食袋120g-24-3',
					克重: '120g',
					实际出货金额: 73,
					预算出货金额: 32,
					预算出货达成: 1,
					同比增长: 2
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单5包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '单包',
					口味: '酸辣牛肉',
					入数: '24入+2',
					同价码: '1MW',
					产品编码: '大食袋120g-24-3',
					克重: '120g',
					实际出货金额: 13,
					预算出货金额: 82,
					预算出货达成: 14,
					同比增长: 27
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单5包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '5包',
					口味: '酸辣牛肉',
					入数: '30入',
					同价码: '1MW',
					产品编码: '大食袋120g-24-3',
					克重: '120g',
					实际出货金额: 133,
					预算出货金额: 811,
					预算出货达成: 13,
					同比增长: 1
				},
				{
					品牌: '老陈醋酸辣牛肉面',
					品类: '大食袋单5包',
					品牌组: '北方品牌组',
					规格: '大食袋',
					包装: '5包',
					口味: '酸辣牛肉',
					入数: '30入',
					同价码: '1MW',
					产品编码: '大食袋120g-24-1',
					克重: '120g',
					实际出货金额: 131,
					预算出货金额: 822,
					预算出货达成: 134,
					同比增长: 17
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
	.treeFrame {
		box-sizing: border-box;
		width: 10%;
		box-shadow: 0px 0px 5px 3px rgba(128, 53, 53, 0.2);
		float: left;
		margin-left: 40px;
		margin-top: 100px;
	}
	#tableFrame {
		width: 70%;
		margin-left: 50px;
		float: right;
		margin-right: 40px;
	}
</style>
