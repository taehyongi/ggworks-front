import Vue from 'vue';

const state = {
  main: 0,
  serverInfo: {
    apiServerUrl: '',
  },
  userInfo: {
  },
  userProfile: {
  },
  loginInfo: {
    apiToken: '',
    isLogin: false,
  },
  message: '',
  myInfoDialog: false,
  progressDialog: false,
  progressDialogMessage: '',
};

// 조회용
const getters = {
  getApiToken(state) {
    return state.loginInfo.apiToken;
  },
  getServerUrl(state) {
    return state.serverInfo.apiServerUrl;
  },
  getIsLogin(state) {
    return state.loginInfo.isLogin;
  },
  getMessage(state) {
    return state.message;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getUserProfile(state) {
    return state.userProfile;
  },
  getMyInfoDialog(state) {
    return state.myInfoDialog;
  },
  getProgressDialog(state) {
    return state.progressDialog;
  },
  getProgressDialogMessage(state) {
    return state.progressDialogMessage;
  },
};

// commit (정적)
const mutations = {
  clearMessage(state) {
    state.message = '';
  },
  toggleMyInfoDialog(state, visible) {
    state.myInfoDialog = visible;
  },
  toggleProgressDialog(state, { visible, message }) {
    state.progressDialog = visible;
    state.progressDialogMessage = message;
  },
  setServerUrl(state, url) {
    state.serverInfo.apiServerUrl = url;
  },
  setUserProfilePhoto(state, data) {
    state.userProfile.photo = data;
  },
  loginSuccess(state, { token, userInfo, userProfile }) {
    state.loginInfo.apiToken = token;
    state.userInfo = userInfo;
    state.userProfile = userProfile;
    state.loginInfo.isLogin = true;
    Vue.http.defaults.headers.common.authorization = `Token ${token}`;
    if (!userProfile.photo) {
      state.userProfile.photo = 'static/account-icon.png';
    }
  },
  logoutSuccess(state) {
    state.loginInfo.apiToken = '';
    state.userInfo = {};
    state.userProfile = {};
    state.loginInfo.isLogin = false;
    Vue.http.defaults.headers.common.authorization = '';
  },
  loginFail(state, error) {
    if (typeof error.response !== 'undefined') {
      state.message = `${error.response.status}: 이메일 / 패스워드를 확인하세요.`;
    } else {
      state.message = error;
    }
  },
  logoutFail(state, error) {
    if (typeof error.response !== 'undefined') {
      state.message = `${error.response.status}: 정상적으로 처리되지 않았습니다`;
    } else {
      state.message = error;
    }
  },
};

// dispatch (비동기)
const actions = {
  login({ commit }, { id, password }) {
    Vue.http.post('/api/login/', {
      username: id,
      // eslint-disable-next-line object-shorthand
      password: password,
    }).then(({ data }) => commit('loginSuccess', data))
      .catch(error => commit('loginFail', error));
  },
  logout({ commit }) {
    Vue.http.post('/api/logout/')
      .then(({ data }) => commit('logoutSuccess', data))
      .catch(error => commit('logoutFail', error));
  },
  // checkApiToken({ commit }, { apiToken }) {
  //   return this.http.post(`${state.api_server_url}/token_info`, { apiToken })
  //     .then(({ data }) => commit('CheckApiToken', data));
  // },
};

// mutations: {
//   LOGIN (state, {accessToken}) {
//     state.accessToken = accessToken
//   },
//   LOGOUT (state) {
//     state.accessToken = null
//   }
// },
// actions: {
//   LOGIN ({commit}, {email, password}) {
//     return axios.post(`${resourceHost}/login`, {email, password})
//       .then(({data}) => commit('LOGIN', data))
//   },
//   LOGOUT ({commit}) {
//     commit('LOGOUT')
//   },
// }

export default {
  state,
  mutations,
  actions,
  getters,
};
