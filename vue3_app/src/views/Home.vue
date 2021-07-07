<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <OtherComp />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/index-page/HelloWorld.vue'
// import OtherComp from '@/components/other-page/OtherPage.vue'

import { defineAsyncComponent } from 'vue'

export default {
	name: 'Home',
	components: {
		HelloWorld,
		OtherComp: defineAsyncComponent(() =>
			import('@/components/other-page/OtherPage.vue'))
	}
}
</script>
