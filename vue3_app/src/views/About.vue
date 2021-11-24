<template>
  <div class="about">
    <h1>{{ about_msg }}</h1>
  </div>
</template>

<script>

export default {
	name: 'Home',
	components: {},
	props: [],
	data () {
		return {
			about_msg: 'This is an about page'
		}
	}
}
</script>
