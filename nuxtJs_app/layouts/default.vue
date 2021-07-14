<template>
  <div>
    <!--这里是首页等页面的base-layout-->
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'IndexLayout',
	components: { Header, Footer },
	data () {
		return {

		}
	}
}
</script>