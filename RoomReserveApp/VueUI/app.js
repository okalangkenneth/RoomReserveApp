

const routes = [
    { path: '/home', component: home },
    { path: '/reservation', component: reservation },
    { path: '/RoomType', component: roomType }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')