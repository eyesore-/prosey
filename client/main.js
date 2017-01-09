// <!-- Created by Duncan on 12.28.2016 -->
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainContent from './vue-components/main_content.vue';
// import Utils from './js/utils.js';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/:channel?',
      name: 'mainContent',
      component: MainContent
    }
  ],
});

new Vue({
  router,
  template: `
    <div>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app');
