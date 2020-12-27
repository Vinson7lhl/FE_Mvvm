<template>
    <div>
        从爷爷组件拿到的数据：来自{{passData.from}} ，到达 {{passData.to}}
    </div>
</template>

<script>
export default {
	name: 'get_data_temp',
	props: ['passData']
}
</script>

<style lang="stylus" scoped>

</style>
