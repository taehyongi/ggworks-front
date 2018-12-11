import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default,
    },
    // {
    //   path: '/notification',
    //   name: 'notification',
    //   component: require('@/components/Notification').default,
    // },
    // {
    //   path: '/calendar',
    //   name: 'calendar',
    //   component: require('@/components/Calendar').default,
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: require('@/components/Settings').default,
    // },
    // {
    //   path: '/groups',
    //   name: 'groups',
    //   component: require('@/components/Groups').default,
    // },
    // {
    //   path: '/chat',
    //   name: 'chat',
    //   component: require('@/components/Chat').default,
    // },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
