<template>
	<div class="home-wrapper">
		<Notice></Notice>
    <Trans></Trans>
	</div>
</template>

<script>
import Notice from '_c/home/Notice.vue'
import Trans from "_c/home/Trans.vue";

export default {
	name: 'Home',
	components: {
		Notice,
    Trans
	}
}
</script>

<style lang="stylus" scoped>
.home-wrapper {
  width: 100% !important;
  flex-direction column
}
</style>
