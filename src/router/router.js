import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import(/* webpackChunkName: "home" */ '_v/Home.vue'),
			meta: {
				title:
					'文件中转系统',
				content: {
					description:
						'文件中转系统'
				}
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import(/* webpackChunkName: "login" */ '_v/Login.vue'),
			meta: { title: '登录' }
		},
		{
			path: '/register',
			name: 'Register',
			component: () =>
				import(/* webpackChunkName: "register" */ '_v/Register.vue'),
			meta: { title: '注册' }
		},
		{
			path: '/file',
			name: 'File',
			component: () => import(/* webpackChunkName: "file" */ '_v/File.vue'),
			meta: {
				requireAuth: true, //  当前路由是否需要登录才可进入
				title: '存储',
				content: {
					description: '图片 文档 视频 音乐 其他 回收站 我的分享'
				}
			}
		},
		{
			path: '/share/:shareBatchNum',
			name: 'Share',
			component: () => import(/* webpackChunkName: "share" */ '_v/Share.vue'),
			meta: {
				title: '分享',
				content: {
					description: '查看他人分享'
				}
			},
			props: true
		},
		{
			path: '/notice',
			name: 'Notice',
			component: () =>
				import(/* webpackChunkName: "noticeList" */ '_v/notice/NoticeList.vue'),
			meta: {
				title: '公告',
				content: {
					description: '公告列表'
				}
			}
		},
		{
			path: '/notice/:noticeId',
			name: 'NoticeDetail',
			component: () =>
				import(
					/* webpackChunkName: "noticeDetail" */ '_v/notice/NoticeDetail.vue'
				),
			meta: {
				title: '公告详情',
				content: {
					description: '公告详情'
				}
			}
		},
		{
			path: '*',
			name: 'Error_404',
			component: () =>
				import(/* webpackChunkName: "error_404" */ '_v/ErrorPage/404.vue'),
			meta: { title: '链接不存在' }
		}
	]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
