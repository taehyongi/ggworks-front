<template>
	<div class="containerCss" v-resize="onResize">
    <nav class="menuCss">
      <v-navigation-drawer permanent class="menuCss" :width="navWidth">
        <v-list dense class="pt-0">
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{windowSize}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </nav>
    <div id="splitter"></div>
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
export default {
  name: 'setting',
  mounted() {
    this.onResize();
  },
  computed: {
    navWidth() {
      return this.windowSize.x * 0.3;
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
    windowSize: {
      x: 0,
      y: 0,
    },
    items: [
      { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'Home', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
      // { title: 'About', icon: 'mdi-bell-ring-outline' },
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

#splitter
{
  width:10px;
  background-color:#002200;
  float:left;
  height:100vh;
  position:absolute;
  cursor:w-resize;
}
</style>