<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-icon>mdi-login-variant</v-icon>
            <v-toolbar-title>GG Works Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-btn
                icon
                large
                target="_blank"
                slot="activator"
              >
              </v-btn>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" prepend-icon="mdi-email" name="email" label="Email" type="text" ref="email"
                v-on:keyup.13="focusPassword"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" name="password" label="Password" id="password" 
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                data-vv-name="password"
                v-on:keyup.13="login"
                ref="password"
                required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import dialog from '../mixin/Dialog';

export default {
  mixins: [dialog],
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    checkboxLabel: 'Keep Login',
    checkbox: true,
    showPassword: false,
  }),
  mounted() {
    const storageInfo = this.$storage.get('userid');
    if (storageInfo.status && storageInfo.data) {
      this.email = storageInfo.data;
      this.$nextTick(this.$refs.password.focus);
    } else {
      this.$nextTick(this.$refs.email.focus);
    }
  },
  computed: {
    storeMessage() {
      return this.$store.getters.getMessage;
    },
  },
  methods: {
    login() {
      this.$storage.set('userid', this.email);
      this.$store.commit('clearMessage');

      this.$store.commit('toggleProgressDialog', { visible: true, message: '로그인 중 입니다.' });

      setTimeout(() => {
        this.$store.dispatch('login', { id: this.email, password: this.password });
        this.$store.commit('toggleProgressDialog', { visible: false, message: '' });
      }, 1000);
    },
    focusPassword() {
      this.$nextTick(this.$refs.password.focus);
    },
  },
  watch: {
    storeMessage(newMessage) {
      if (newMessage) {
        this.showMessageDialog('info', newMessage);
      }
    },
  },
};
</script>

<style scoped>
.centerCss {
  margin: auto;
  width: 50%;
}
.btnCss {
  margin-left: 25px;
}
.inputCss {
  margin: auto;
  width: 90%;
}
</style>
