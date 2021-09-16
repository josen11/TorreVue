import Vue from 'vue'
import VueRouter from 'vue-router'
import Match from '../components/SkillsMatch.vue'
import RoadMap from '../components/SkillsRoadMap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'match',
    component: Match
  },
  {
    path: '/',
    name: 'roadmap',
    component: RoadMap
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
