<template>
	<div id="app">
		<Header v-if="isHeaderShow" id="headWrapper"></Header>
		<router-view class="main-content"></router-view>
		<el-backtop class="backtop" target="#app" title="回到顶部"></el-backtop>
	</div>
</template>

<script>
import Header from '_c/Header.vue'

export default {
	name: 'App',
	components: {
		Header,
		// Footer
	},
	computed: {
		//  头部是否显示
		isHeaderShow() {
			let routerNameList = ['Onlyoffice', 'Error_401', 'Error_404', 'Error_500']
			return routerNameList.includes(this.$route.name) ? false : true
		},
		//  底部是否显示
		isFooterShow() {
			let routerNameList = [
				'Onlyoffice',
				'File',
				'Share',
				'Error_401',
				'Error_404',
				'Error_500'
			]
			return routerNameList.includes(this.$route.name) ? false : true
		}
	},
	mounted() {
		const that = this
		window.addEventListener('resize', function () {
			return (() => {
				that.$store.commit('changeScreenWidth', document.body.clientWidth)
			})()
		})
		document
			.querySelector('meta[name="keywords"]')
			.setAttribute(
				'content',
				process.env.NODE_ENV === 'production' &&
					location.host.indexOf('.he.com') !== -1
					? this.$config.siteName
					: '文件中转系统'
			)
	}
}
</script>
<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';

#app {
  height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: none;
  overflow-y: auto;
  >>> .el-backtop {
    background-color: $Success;
    color: #fff;
    z-index: 3;
  }
  .main-content {
    flex: 1;
    width: 90%;
    min-height: calc(100vh - 70px);
    margin: 0 auto;
    display: flex;
  }
}
</style>
