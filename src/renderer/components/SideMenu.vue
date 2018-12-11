<template>
	<div>
    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      fixed
      width="53"
      permanent
    >
      <v-tooltip right nudge-left=15>
        <!-- <v-list-tile @click="onClickTab('my-info')" slot="activator" avatar> -->
          <v-list-tile slot="activator" avatar>
            <v-dialog v-model="myInfoDialog" persistent max-width="450">
              <v-list-tile-avatar :size="avatarSize" slot="activator">
                <v-img class="avatarStyle" :src="userPhoto"></v-img>
              </v-list-tile-avatar>
              <my-info></my-info>
            </v-dialog>
        </v-list-tile>
        <span>{{userName}}</span>
      </v-tooltip>
 
      <v-list-tile @click="onClickTab('notification')">
        <v-list-tile-action>
          <v-badge overlap color="orange" v-model="showNotificationBadge">
            <span class="badgeTextCss" slot="badge">{{displayCountNotification}}</span>
            <v-tooltip right>
              <v-icon slot="activator">
                mdi-bell-ring-outline
              </v-icon>
              <span>알림</span>
            </v-tooltip>
          </v-badge>
        </v-list-tile-action>
      </v-list-tile>
       
      <v-list-tile @click="onClickTab('groups')">
        <v-list-tile-action> 
          <v-tooltip right>
              <v-icon slot="activator">
                mdi-account-network
              </v-icon>
              <span>그룹</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile @click="onClickTab('schedule')">
        <v-list-tile-action> 
          <v-tooltip right>
              <v-icon slot="activator">
                mdi-calendar
              </v-icon>
              <span>일정</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile @click="onClickTab('chat')">
        <v-list-tile-action>
          <v-badge overlap color="orange" v-model="showChatBadge">
            <span class="badgeTextCss" slot="badge">{{displayCountChat}}</span>
            <v-tooltip right>
              <v-icon slot="activator">
                mdi-chat
              </v-icon>
              <span>채팅</span>
            </v-tooltip>
          </v-badge>
        </v-list-tile-action>
      </v-list-tile>
      
      <v-list-tile @click="onClickTab('note')">
        <v-list-tile-action> 
          <v-tooltip right>
              <v-icon slot="activator">
                mdi-note-outline
              </v-icon>
              <span>노트</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile @click="onClickTab('settings')">
        <v-list-tile-action> 
          <v-tooltip right>
              <v-icon slot="activator">
                mdi-settings
              </v-icon>
              <span>설정</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile class="logoutCss" @click="onClickTab('logout')">
        <v-list-tile-action> 
          <v-tooltip right>
              <v-icon slot="activator">
                mdi-logout
              </v-icon>
              <span>로그아웃</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-navigation-drawer>

    <!-- <v-dialog
      v-model="progressDialog"
      hide-overlay
      
      width="300"
      max-width="300"
      persistent
    >
      <progress-circle></progress-circle>
    </v-dialog> -->

    <!-- <v-dialog v-mo" persistent max-width="500">
      <v-list-tile-avatar :size="avatarSize" slot="activator">
        <v-img class="avatarStyle" :src="userPhoto"></v-img>
      </v-list-tile-avatar>
      <my-info></my-info>
    </v-dialog> -->
	</div>
</template>

<script>
import MyInfo from './MyInfo';


export default {
  name: 'side-menu',
  data: () => ({
    drawer: true,
    avatarSize: '30px',
    countNotification: 5,
    countChat: 60,
    // routeNotification: 'notification',
    // routeCalendar: 'calendar',
    // routeSettings: 'settings',
    // routeGroups: 'groups',
    // routeChat: 'chat',
  }),
  components: {
    MyInfo,
  },
  computed: {
    myInfoDialog: {
      get() { return this.$store.getters.getMyInfoDialog; },
      set(newValue) { this.$store.commit('toggleMyInfoDialog', newValue); },
    },
    userName() {
      return this.$store.getters.getUserProfile.full_name;
    },
    userPhoto() {
      return this.$store.getters.getUserProfile.photo;
    },
    showNotificationBadge() {
      return this.countNotification > 0;
    },
    showChatBadge() {
      return this.countChat > 0;
    },
    displayCountNotification() {
      return this.countNotification > 99 ? '99+' : this.countNotification;
    },
    displayCountChat() {
      return this.countChat > 99 ? '99+' : this.countChat;
    },
  },
  methods: {
    /* eslint-disable */
    onClickTab: function(value) {
      if(value === 'logout') {
        this.$store.dispatch('logout');

      } else {
        this.$emit('selectTab', value);
      }
    },
  },
};
</script>

<style scoped>
.avatarStyle {
  margin-right: 6px;
}

.badgeTextCss {
  font-size: 9pt;
  font-weight: bold;
}

.logoutCss {
  margin-top: calc(100vh - 400px);
}

.loading-dialog {
   background-color: #303030; 
}
</style>