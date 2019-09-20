import Vue from 'vue'
import App from './App.vue'
import MainMenu from './components/MainMenu.vue'
import Settings from './components/Settings.vue'
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
    
    {
      path: "/main",
      name: "main",
      component: MainMenu,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/",
      name: "app",
      component: App,
    }
   ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

