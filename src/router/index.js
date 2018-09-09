import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RoomIndex from '@/components/room/Index'
import Store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/room/:room/:room_name',
      name: 'room',
      component: RoomIndex,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!Store.getters.getState.name) {
          next({
            name: 'home',
            query: {
              room: to.params.room,
              roomName: to.params.room_name
            }
          })
        }
        next()
      }
    }
  ]
})
