<template>
  <div id="app">
    <v-app light>
      <side-menu v-if="isLogin" v-on:selectTab="changeTab"></side-menu>
      <v-content>
        <v-container fluid fill-height pa-0 ma-0>
          <Login v-if="!isLogin"></Login>
          <!-- <router-view v-if="isLogin"></router-view> -->
          <notification v-show="isLogin && selectedTab == 'notification'"></notification>
          <groups v-show="isLogin && selectedTab == 'groups'"></groups>
          <schedule v-show="isLogin && selectedTab == 'schedule'"></schedule>
          <chat v-show="isLogin && selectedTab == 'chat'"></chat>
          <note v-show="isLogin && selectedTab == 'note'"></note>
          <settings v-show="isLogin && selectedTab == 'settings'"></settings>
        </v-container>
      </v-content>
      
      <v-dialog
        v-model="progressDialog"
        hide-overlay
        
        width="250"
        max-width="250"
        persistent
      >
        <progress-circle></progress-circle>
      </v-dialog>


    </v-app>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu';
import Login from './components/Login';
import Schedule from './components/Schedule';
import Notification from './components/Notification';
import Groups from './components/Groups';
import Chat from './components/Chat';
import Settings from './components/Settings';
import Note from './components/Note';
import ProgressCircle from './components/ProgressCircle';

export default {
  name: 'GG_Works',
  data: () => ({
    selectedTab: 'schedule',
  }),
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
    progressDialog: {
      get() { return this.$store.getters.getProgressDialog; },
      set(newValue) { this.$store.commit('toggleProgressDialog', newValue); },
    },
  },
  props: {
    source: String,
  },
  components: {
    SideMenu, Login, Schedule, Notification, Groups, Chat, Settings, Note, ProgressCircle,
  },
  methods: {
    /* eslint-disable */
    changeTab: function(value) {
      this.selectedTab = value;
    },
  },
};
</script>

<style>
</style>
