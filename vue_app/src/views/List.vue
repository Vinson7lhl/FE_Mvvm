<template>
	<div>
		<div v-for="item of products" :key="item.id">
			<router-link :to="'/list_detail/' + item.id">{{item.name}}</router-link>
		</div>
	</div>
</template>

<script>
	import indexPageApi from "@/service/index_page_api";

	export default {
		name: "产品列表",
		data() {
			return {
				products: [
					{ id: 1, name: "苹果" },
					{ id: 2, name: "鸭梨" },
					{ id: 3, name: "橘子" },
				],
			};
		},
		mounted() {
			this.getList()
		},
		methods: {
			async getList() {
				let res = await indexPageApi.getList("/shows", { id: 82 })
			},
		},
	};
</script>
