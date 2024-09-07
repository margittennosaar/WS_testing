import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory('/WS_testing/comp2/'),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/peli/:id',
			name: 'SingleGame',
			component: () => import('../views/SingleGameView.vue')
		}
	]
})

export default router
