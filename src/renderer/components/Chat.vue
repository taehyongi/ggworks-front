<template>
	<div class="containerCss" v-resize="onResize">
    <nav class="menuCss">
      <v-navigation-drawer permanent class="menuCss" :width="navWidth">
        <v-flex xs12>
          <v-card>
            <v-container class="searchCss">
              <v-text-field
                v-model="searchWord"
                solo
                label="검색"
                clearable
              ></v-text-field>
            </v-container>
            <v-list subheader>
              <v-subheader>Recent chat</v-subheader>
              <v-list-tile
                v-for="item in items"
                :key="item.title"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon :color="item.active ? 'teal' : 'grey'">mdi-chat</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list subheader>
              <v-subheader>Previous chats</v-subheader>

              <v-list-tile
                v-for="item in items2"
                :key="item.title"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-navigation-drawer>
    </nav>
     
    <v-layout class="contentsCss" column justify-center> 
        <v-flex>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-flex>
    </v-layout>
	</div>
</template>

<script>
/* eslint-disable */
var roomName = 'test';

var chatSocket = new WebSocket(
  'ws://localhost:8000' +
  '/ws/chat/' + roomName + '/');

chatSocket.onmessage = function(e) {
  console.log(e);
  var data = JSON.parse(e.data);
  var message = data['message'];
  console.log(message + '\n');
};

chatSocket.onclose = function(e) {
  console.error('Chat socket closed unexpectedly');
};

// document.querySelector('#chat-message-input').focus();
// document.querySelector('#chat-message-input').onkeyup = function(e) {
//   if (e.keyCode === 13) {  // enter, return
//     document.querySelector('#chat-message-submit').click();
//   }
// };

// document.querySelector('#chat-message-submit').onclick = function(e) {
//   var messageInputDom = document.querySelector('#chat-message-input');
//   var message = messageInputDom.value;
//   chatSocket.send(JSON.stringify({
//     'message': message,
//   }));

//   messageInputDom.value = '';
// };

export default {
  name: 'chat',
  mounted() {
    this.onResize();
  },
  computed: {
    navWidth() {
      return this.windowSize.x * 0.30;
    },
  },
  methods: {
    getName() {
      return this.$electron.remote.app.getName();
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
  data: () => ({
    searchWord: '',
    windowSize: {
      x: 0,
      y: 0,
    },
    items: [
      { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
      { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
      { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
      { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
    ],
    items2: [
      { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
    ],
  }),
};
</script>

<style scoped>
.containerCss {
  display: flex;
  height: 100vh;
}
.menuCss {
}

.contentsCss { 
  overflow: auto;
}

.searchCss {
  height: 60px;
}
</style>