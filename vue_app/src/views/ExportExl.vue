<template>
	<div class="exportExl">
		<div class="treeFrame">
			<el-tree
				draggable
				:data="data"
				:props="defaultProps"
				:allow-drop="allowDrop"
				default-expand-all
				@node-click="handleNodeClick"
				@node-drop="handleDrop"
				@check="getTreeData"
				ref="thisTree"
			></el-tree>
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
					label: '行',
					level: 'top',
					type_name: 'row',
					id: 1
				},
				{
					label: '列',
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
							label: '姓名',
							id: 8,
							level: 'son',
							type_name: 'name',
							is_in_type: true
						},
						{
							label: '年龄',
							id: 4,
							level: 'son',
							type_name: 'age',
							is_in_type: true
						},
						{
							label: '周期',
							id: 5,
							level: 'son',
							type_name: 'period',
							is_in_type: true
						},
						{
							label: '价格',
							id: 6,
							level: 'son',
							type_name: 'price',
							is_in_type: true
						},
						{
							label: '体积',
							id: 7,
							level: 'son',
							type_name: 'volume',
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
			html_str: ''
		}
	},
	mounted () {
		let _this = this
		let pivot = new WebDataRocks({
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
							uniqueName: 'Product Info',
							sort: 'asc'
						}
					],
					columns: [
						{
							uniqueName: 'Part Area',
							sort: 'asc'
						}
					],
					measures: [
						{
							uniqueName: 'Price',
							// 聚合方式：比如 求和，求平均值，求方差
							aggregation: 'sum'
						}
					],
					drills: {
						drillAll: true
					},
					expands: {
						expandAll: true
					}
				}
			},
			global: {
				// replace this path with the path to your own translated file
				localization: zh_json
			}
		})
		console.log(pivot)
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
					'Business Type': {
						type: 'level',
						hierarchy: 'Product Info'
					},
					Category: {
						type: 'level',
						hierarchy: 'Product Info',
						parent: 'Business Type'
					},
					Country: {
						type: 'level',
						parent: 'part',
						hierarchy: 'Part Area'
					},
					part: {
						type: 'level',
						hierarchy: 'Part Area'
					},

					Size: {
						type: 'string'
					},
					Color: {
						type: 'string'
					},
					Destination: {
						type: 'string'
					},
					Price: {
						type: 'number'
					},
					Quantity: {
						type: 'number'
					},
					Discount: {
						type: 'number'
					}
				},
				{
					'Business Type': 'Specialty Bike Shop',
					Category: 'Accessories',
					Size: '262 oz',
					Color: 'red',
					Destination: 'Australia',
					Country: 'Australia',
					Price: 174,
					Quantity: 225,
					part: 'N',
					Discount: 23
				},
				{
					Category: 'Accessories',
					Size: '214 oz',
					Color: 'yellow',
					Destination: 'Canada',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Canada',
					Price: 502,
					Quantity: 90,
					part: 'N',
					Discount: 17
				},
				{
					Category: 'Accessories',
					Size: '147 oz',
					Color: 'white',
					Destination: 'France',
					'Business Type': 'Specialty Bike Shop',
					Country: 'France',
					Price: 242,
					Quantity: 855,
					part: 'N',
					Discount: 37
				},
				{
					Category: 'Accessories',
					Size: '112 oz',
					Color: 'yellow',
					Destination: 'Germany',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Germany',
					Price: 102,
					Quantity: 897,
					part: 'N',
					Discount: 42
				},
				{
					Category: 'Accessories',
					Size: '256 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United Kingdom',
					Price: 126,
					Quantity: 115,
					part: 'N',
					Discount: 44
				},
				{
					Category: 'Accessories',
					Size: '278 oz',
					Color: 'yellow',
					Destination: 'United States',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United States',
					Price: 1246,
					Quantity: 88,
					part: 'N',
					Discount: 47
				},
				{
					Category: 'Accessories',
					Size: '8 oz',
					Color: 'green',
					Destination: 'Australia',
					'Business Type': 'Value Added Reseller',
					Country: 'Australia',
					Price: 680,
					Quantity: 66,
					part: 'N',
					Discount: 80
				},
				{
					Category: 'Accessories',
					Size: '181 oz',
					Color: 'yellow',
					Destination: 'Canada',
					'Business Type': 'Value Added Reseller',
					Country: 'Canada',
					Price: 1241,
					Quantity: 939,
					part: 'N',
					Discount: 66
				},
				{
					Category: 'Accessories',
					Size: '181 oz',
					Color: 'yellow',
					Destination: 'Canada',
					'Business Type': 'Value Added Reseller',
					Country: 'Canada',
					Price: 1241,
					Quantity: 939,
					part: 'N',
					Discount: 66
				},
				{
					Category: 'Accessories',
					Size: '344 oz',
					Color: 'yellow',
					Destination: 'France',
					'Business Type': 'Value Added Reseller',
					Country: 'France',
					Price: 150,
					Quantity: 67,
					part: 'N',
					Discount: 30
				},
				{
					Category: 'Accessories',
					Size: '291 oz',
					Color: 'red',
					Destination: 'Germany',
					'Business Type': 'Value Added Reseller',
					Country: 'Germany',
					Price: 244,
					Quantity: 963,
					part: 'N',
					Discount: 22
				},
				{
					Category: 'Accessories',
					Size: '126 oz',
					Color: 'yellow',
					Destination: 'United Kingdom',
					'Business Type': 'Value Added Reseller',
					Country: 'United Kingdom',
					Price: 501,
					Quantity: 556,
					part: 'N',
					Discount: 9
				},
				{
					Category: 'Accessories',
					Size: '317 oz',
					Color: 'red',
					Destination: 'United States',
					'Business Type': 'Value Added Reseller',
					Country: 'United States',
					Price: 4960,
					Quantity: 898,
					part: 'N',
					Discount: 41
				},
				{
					Category: 'Accessories',
					Size: '124 oz',
					Color: 'yellow',
					Destination: 'Australia',
					'Business Type': 'Warehouse',
					Country: 'Australia',
					Price: 9,
					Quantity: 578,
					part: 'N',
					Discount: 8
				},
				{
					Category: 'Accessories',
					Size: '23 oz',
					Color: 'red',
					Destination: 'Canada',
					'Business Type': 'Warehouse',
					Country: 'Canada',
					Price: 3655,
					Quantity: 64,
					part: 'N',
					Discount: 70
				},
				{
					Category: 'Accessories',
					Size: '124 oz',
					Color: 'green',
					Destination: 'France',
					'Business Type': 'Warehouse',
					Country: 'France',
					Price: 1654,
					Quantity: 556,
					part: 'N',
					Discount: 95
				},
				{
					Category: 'Accessories',
					Size: '310 oz',
					Color: 'yellow',
					Destination: 'Germany',
					'Business Type': 'Warehouse',
					Country: 'Germany',
					Price: 1190,
					Quantity: 292,
					part: 'N',
					Discount: 36
				},
				{
					Category: 'Accessories',
					Size: '277 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Warehouse',
					Country: 'United Kingdom',
					Price: 1222,
					Quantity: 730,
					part: 'S',
					Discount: 38
				},
				{
					Category: 'Accessories',
					Size: '47 oz',
					Color: 'white',
					Destination: 'United States',
					'Business Type': 'Warehouse',
					Country: 'United States',
					Price: 7941,
					Quantity: 73,
					part: 'S',
					Discount: 53
				},
				{
					Category: 'Bikes',
					Size: '264 oz',
					Color: 'white',
					Destination: 'Australia',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Australia',
					Price: 6829,
					Quantity: 19,
					part: 'S',
					Discount: 56
				},
				{
					Category: 'Bikes',
					Size: '76 oz',
					Color: 'red',
					Destination: 'Canada',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Canada',
					Price: 1664,
					Quantity: 19,
					part: 'S',
					Discount: 75
				},
				{
					Category: 'Bikes',
					Size: '217 oz',
					Color: 'red',
					Destination: 'France',
					'Business Type': 'Specialty Bike Shop',
					Country: 'France',
					Price: 2995,
					Quantity: 98,
					part: 'S',
					Discount: 88
				},
				{
					Category: 'Bikes',
					Size: '251 oz',
					Color: 'green',
					Destination: 'Germany',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Germany',
					Price: 1487,
					Quantity: 96,
					part: 'S',
					Discount: 100
				},
				{
					Category: 'Bikes',
					Size: '292 oz',
					Color: 'green',
					Destination: 'United Kingdom',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United Kingdom',
					Price: 9245,
					Quantity: 51,
					part: 'S',
					Discount: 29
				},
				{
					Category: 'Bikes',
					Size: '266 oz',
					Color: 'green',
					Destination: 'United States',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United States',
					Price: 9008,
					Quantity: 76,
					part: 'S',
					Discount: 66
				},
				{
					Category: 'Bikes',
					Size: '198 oz',
					Color: 'green',
					Destination: 'Australia',
					'Business Type': 'Value Added Reseller',
					Country: 'Australia',
					Price: 9376,
					Quantity: 92,
					part: 'S',
					Discount: 7
				},
				{
					Category: 'Bikes',
					Size: '109 oz',
					Color: 'red',
					Destination: 'Canada',
					'Business Type': 'Value Added Reseller',
					Country: 'Canada',
					Price: 1531,
					Quantity: 56,
					part: 'N',
					Discount: 31
				},
				{
					Category: 'Bikes',
					Size: '54 oz',
					Color: 'yellow',
					Destination: 'France',
					'Business Type': 'Value Added Reseller',
					Country: 'France',
					Price: 5421,
					Quantity: 83,
					part: 'S',
					Discount: 22
				},
				{
					Category: 'Bikes',
					Size: '93 oz',
					Color: 'red',
					Destination: 'Germany',
					'Business Type': 'Value Added Reseller',
					Country: 'Germany',
					Price: 6975,
					Quantity: 73,
					part: 'S',
					Discount: 41
				},
				{
					Category: 'Bikes',
					Size: '297 oz',
					Color: 'blue',
					Destination: 'United Kingdom',
					'Business Type': 'Value Added Reseller',
					Country: 'United Kingdom',
					Price: 4320,
					Quantity: 59,
					part: 'S',
					Discount: 100
				},
				{
					Category: 'Bikes',
					Size: '339 oz',
					Color: 'red',
					Destination: 'Australia',
					'Business Type': 'Value Added Reseller',
					Country: 'United States',
					Price: 3200,
					Quantity: 27,
					part: 'S',
					Discount: 41
				},
				{
					Category: 'Bikes',
					Size: '205 oz',
					Color: 'blue',
					Destination: 'Canada',
					'Business Type': 'Warehouse',
					Country: 'Australia',
					Price: 6688,
					part: 'S',
					Quantity: 22,
					Discount: 41
				},
				{
					Category: 'Bikes',
					Size: '226 oz',
					Color: 'blue',
					Destination: 'France',
					'Business Type': 'Warehouse',
					Country: 'Canada',
					part: 'S',
					Price: 699,
					Quantity: 22,
					Discount: 42
				},
				{
					Category: 'Bikes',
					Size: '311 oz',
					Color: 'purple',
					Destination: 'Germany',
					'Business Type': 'Warehouse',
					Country: 'France',
					Price: 5403,
					Quantity: 75,
					part: 'S',
					Discount: 70
				},
				{
					Category: 'Bikes',
					Size: '282 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Warehouse',
					Country: 'Germany',
					Price: 6377,
					Quantity: 28,
					part: 'S',
					Discount: 49
				},
				{
					Category: 'Bikes',
					Size: '286 oz',
					Color: 'blue',
					Destination: 'United States',
					'Business Type': 'Warehouse',
					Country: 'United Kingdom',
					Price: 2471,
					Quantity: 93,
					part: 'S',
					Discount: 14
				},
				{
					Category: 'Bikes',
					Size: '100 oz',
					Color: 'blue',
					Destination: 'Australia',
					'Business Type': 'Warehouse',
					Country: 'United States',
					Price: 6650,
					Quantity: 40,
					part: 'S',
					Discount: 4
				},
				{
					Category: 'Clothing',
					Size: '218 oz',
					Color: 'yellow',
					Destination: 'Canada',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Australia',
					Price: 865,
					Quantity: 4513,
					part: 'S',
					Discount: 70
				},
				{
					Category: 'Clothing',
					Size: '216 oz',
					Color: 'blue',
					Destination: 'France',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Canada',
					Price: 511,
					Quantity: 4615,
					part: 'S',
					Discount: 20
				},
				{
					Category: 'Clothing',
					Size: '284 oz',
					Color: 'blue',
					Destination: 'Germany',
					'Business Type': 'Specialty Bike Shop',
					Country: 'France',
					Price: 981,
					Quantity: 1854,
					part: 'S',
					Discount: 36
				},
				{
					Category: 'Clothing',
					Size: '325 oz',
					Color: 'blue',
					Destination: 'United Kingdom',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Germany',
					Price: 57,
					Quantity: 1187,
					part: 'S',
					Discount: 10
				},
				{
					Category: 'Clothing',
					Size: '192 oz',
					Color: 'white',
					Destination: 'United States',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United Kingdom',
					Price: 675,
					Quantity: 1527,
					part: 'S',
					Discount: 38
				},
				{
					Category: 'Clothing',
					Size: '25 oz',
					Color: 'purple',
					Destination: 'Australia',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United States',
					Price: 40,
					Quantity: 4342,
					part: 'S',
					Discount: 72
				},
				{
					Category: 'Clothing',
					Size: '95 oz',
					Color: 'red',
					Destination: 'Canada',
					'Business Type': 'Value Added Reseller',
					Country: 'Australia',
					Price: 400,
					Quantity: 8975,
					part: 'S',
					Discount: 63
				},
				{
					Category: 'Clothing',
					Size: '39 oz',
					Color: 'purple',
					Destination: 'France',
					'Business Type': 'Value Added Reseller',
					Country: 'Canada',
					Price: 971,
					Quantity: 3522,
					part: 'S',
					Discount: 90
				},
				{
					Category: 'Clothing',
					Size: '36 oz',
					Color: 'green',
					Destination: 'Germany',
					'Business Type': 'Value Added Reseller',
					Country: 'France',
					Price: 357,
					Quantity: 3939,
					part: 'S',
					Discount: 93
				},
				{
					Category: 'Clothing',
					Size: '208 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Value Added Reseller',
					Country: 'Germany',
					Price: 820,
					Quantity: 3560,
					part: 'S',
					Discount: 40
				},
				{
					Category: 'Clothing',
					Size: '3 oz',
					Color: 'white',
					Destination: 'United States',
					'Business Type': 'Value Added Reseller',
					Country: 'United Kingdom',
					Price: 520,
					part: 'S',
					Quantity: 3892,
					Discount: 32
				},
				{
					Category: 'Clothing',
					Size: '147 oz',
					Color: 'white',
					Destination: 'Australia',
					'Business Type': 'Value Added Reseller',
					Country: 'United States',
					Price: 448,
					Quantity: 3906,
					part: 'N',
					Discount: 24
				},
				{
					Category: 'Clothing',
					Size: '68 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Warehouse',
					Country: 'Australia',
					Price: 513,
					Quantity: 9790,
					part: 'N',
					Discount: 40
				},
				{
					Category: 'Clothing',
					Size: '267 oz',
					Color: 'blue',
					Destination: 'United States',
					'Business Type': 'Warehouse',
					Country: 'Canada',
					Price: 977,
					Quantity: 6107,
					part: 'N',
					Discount: 8
				},
				{
					Category: 'Clothing',
					Size: '33 oz',
					Color: 'green',
					Destination: 'Australia',
					'Business Type': 'Warehouse',
					Country: 'France',
					Price: 118,
					Quantity: 4718,
					part: 'N',
					Discount: 84
				},
				{
					Category: 'Clothing',
					Size: '319 oz',
					Color: 'blue',
					Destination: 'Canada',
					'Business Type': 'Warehouse',
					Country: 'Germany',
					Price: 161,
					Quantity: 7988,
					part: 'N',
					Discount: 29
				},
				{
					Category: 'Clothing',
					Size: '326 oz',
					Color: 'green',
					Destination: 'France',
					'Business Type': 'Warehouse',
					Country: 'United Kingdom',
					Price: 239,
					Quantity: 840,
					part: 'N',
					Discount: 89
				},
				{
					Category: 'Clothing',
					Size: '184 oz',
					Color: 'green',
					Destination: 'Germany',
					'Business Type': 'Warehouse',
					Country: 'United States',
					Price: 327,
					Quantity: 6574,
					part: 'N',
					Discount: 79
				},
				{
					Category: 'Components',
					Size: '255 oz',
					Color: 'red',
					Destination: 'United Kingdom',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Australia',
					Price: 284,
					Quantity: 2471,
					part: 'N',
					Discount: 42
				},
				{
					Category: 'Components',
					Size: '144 oz',
					Color: 'green',
					Destination: 'United States',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Canada',
					Price: 827,
					Quantity: 4772,
					part: 'N',
					Discount: 26
				},
				{
					Category: 'Components',
					Size: '283 oz',
					Color: 'red',
					Destination: 'Australia',
					'Business Type': 'Specialty Bike Shop',
					Country: 'France',
					Price: 967,
					Quantity: 1646,
					part: 'N',
					Discount: 42
				},
				{
					Category: 'Components',
					Size: '299 oz',
					Color: 'blue',
					Destination: 'United Kingdom',
					'Business Type': 'Specialty Bike Shop',
					Country: 'Germany',
					Price: 569,
					Quantity: 6568,
					part: 'N',
					Discount: 58
				},
				{
					Category: 'Components',
					Size: '88 oz',
					Color: 'blue',
					Destination: 'United States',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United Kingdom',
					Price: 156,
					Quantity: 7585,
					part: 'N',
					Discount: 35
				},
				{
					Category: 'Components',
					Size: '161 oz',
					Color: 'red',
					Destination: 'Australia',
					'Business Type': 'Specialty Bike Shop',
					Country: 'United States',
					Price: 845,
					Quantity: 4208,
					part: 'N',
					Discount: 42
				},
				{
					Category: 'Components',
					Size: '242 oz',
					Color: 'blue',
					Destination: 'Canada',
					'Business Type': 'Value Added Reseller',
					Country: 'Australia',
					Price: 838,
					Quantity: 6460,
					part: 'N',
					Discount: 41
				},
				{
					Category: 'Components',
					Size: '25 oz',
					Color: 'red',
					Destination: 'France',
					'Business Type': 'Value Added Reseller',
					Country: 'Canada',
					Price: 51,
					Quantity: 410,
					part: 'N',
					Discount: 97
				},
				{
					Category: 'Components',
					Size: '317 oz',
					Color: 'blue',
					Destination: 'Germany',
					'Business Type': 'Value Added Reseller',
					Country: 'France',
					Price: 95,
					Quantity: 2307,
					part: 'N',
					Discount: 64
				},
				{
					Category: 'Components',
					Size: '295 oz',
					Color: 'red',
					Destination: 'France',
					'Business Type': 'Value Added Reseller',
					Country: 'Germany',
					Price: 885,
					Quantity: 6843,
					part: 'N',
					Discount: 10
				},
				{
					Category: 'Components',
					Size: '69 oz',
					Color: 'blue',
					Destination: 'Germany',
					'Business Type': 'Value Added Reseller',
					Country: 'United Kingdom',
					Price: 239,
					Quantity: 7541,
					part: 'S',
					Discount: 36
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
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
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
