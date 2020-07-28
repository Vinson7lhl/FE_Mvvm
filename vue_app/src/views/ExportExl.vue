<template>
	<div class="exportExl">
		<table border="1">
			<tr>
				<th rowspan="2">F</th>
				<th>G</th>
				<th colspan="3">A</th>
			</tr>
		</table>
		
		
		导出excel文件！左侧树结构，右侧容器table
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
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="150"></el-table-column>
			<el-table-column label="配送信息">
				<el-table-column prop="name" label="姓名" width="120"></el-table-column>
				<el-table-column label="地址">
					<el-table-column prop="province" label="省份" width="120"></el-table-column>
					<el-table-column prop="city" label="市区" width="120"></el-table-column>
					<el-table-column prop="address" label="地址" width="300"></el-table-column>
					<el-table-column prop="zip" label="邮编" width="120"></el-table-column>
				</el-table-column>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "about-page",
		data() {
			return {
				// 树结构元数据
				// label：不可改，必须，显示的节点名
				// children:不可改，必须，子节点
				// 其它字段可自行定义
				data: [
					{
						label: "行",
						level: "top",
						type_name: "row",
						id: 1,
					},
					{
						label: "列",
						level: "top",
						type_name: "col",
						id: 2,
					},
					{
						label: "类型",
						level: "top",
						type_name: "type",
						id: 3,
						children: [
							{
								label: "姓名",
								id: 3,
								level: "son",
								type_name: "name",
								is_in_type: true,
							},
							{
								label: "年龄",
								id: 4,
								level: "son",
								type_name: "age",
								is_in_type: true,
							},
							{
								label: "周期",
								id: 5,
								level: "son",
								type_name: "period",
								is_in_type: true,
							},
							{
								label: "价格",
								id: 6,
								level: "son",
								type_name: "price",
								is_in_type: true,
							},
							{
								label: "体积",
								id: 7,
								level: "son",
								type_name: "volume",
								is_in_type: true,
							},
						],
					},
				],
				// 生成的table每行title数据
				table_row_head_data: [],
				// 生成的table每列title数据
				table_colum_head_data: ["类型"],

				defaultProps: {
					children: "children",
					label: "label",
				},
				tableData: [
					{
						date: "2016-05-03",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-02",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-08",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-06",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
					{
						date: "2016-05-07",
						name: "王小虎",
						province: "上海",
						city: "普陀区",
						address: "上海市普陀区金沙江路 1518 弄",
						zip: 200333,
					},
				],
				html_str: "",
			};
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
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
			allowDrop(draggingNode, dropNode, type) {
				// 如果拖放在行模块
				if (
					draggingNode.data.level === "son" &&
					(dropNode.data.type_name === "row" ||
						dropNode.data.type_name === "col")
				) {
					return type === "inner";
				} else if (
					draggingNode.data.level === "son" &&
					dropNode.data.level === "son" &&
					draggingNode.data.is_in_type &&
					!dropNode.data.is_in_type
				) {
					return type === "inner";
				} else if (
					draggingNode.data.level === "son" &&
					!draggingNode.data.children &&
					dropNode.data.type_name === "type"
				) {
					return type === "inner";
				} else if (
					draggingNode.data.level === "son" &&
					dropNode.data.level === "son" &&
					!draggingNode.data.is_in_type &&
					!dropNode.data.is_in_type
				) {
					return type === "inner";
				} else {
					return false;
				}
			},
			// 放置成功后
			handleDrop(draggingNode, dropNode, dropType, ev) {
				// 获取拖拽后的完整数据
				console.log(this.$refs.thisTree.root.data);
				// 如果拖放在行、列模块
				if (
					dropNode.data.type_name === "row" ||
					dropNode.data.type_name === "col" ||
					dropNode.data.level === "son"
				) {
					draggingNode.data.is_in_type = false;
				} else if (dropNode.data.type_name === "type") {
					draggingNode.data.is_in_type = true;
				}
			},
			getTreeData(data, checked, indeterminate) {
				var data1 = this.$refs.multipleTable.getCheckedNodes();
				console.log(data1);
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>
