import Vue from 'vue'

const state = {
  email: '',
  userId: null,
  isLoggedIn: false,
  loginError: ''
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
}

const actions = {
  async isLogged ({ commit }) {
    await Vue.axios.get('/login', {withCredentials: true, crossdomain: true})
      .then((resp) => {
        let data = resp.data
        if (data && data._id.length > 0) {
          const userInfo = {
            userId: data._id,
            email: data.email
          }
          commit('logInUser', userInfo)
        }
      })
  },
  async logInUser ({ commit }, payload) {
    await Vue.axios.post('/login', payload)
      .then((resp) => {
        let data = resp.data
        if (data && data._id.length > 0) {
          payload.userId = data._id
          commit('logInUser', payload)
        }
      })
      .catch(() => {
        commit('loginError')
      })
  },

  async logOutUser ({ commit }) {
    await Vue.axios.post('/logout')
      .then((resp) => {
        if (resp.status === 200) {
          commit('logOutUser')
        }
      })
      .catch(() => {
        commit('logoutError')
      })
  },

  async signUpUser ({ commit }, payload) {
    await Vue.axios.post('/user', payload)
      .then((resp) => {
        commit('logInUser', payload)
      }).catch(() => {
        commit('signUpError')
      })
  }
}

const mutations = {
  logInUser (state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.userId = payload.userId
  },
  loginError (state) {
    state.isLoggedIn = false
    state.loginError = 'Email and/or Password are invalid. Login failed.'
  },
  signUpError (state) {
    state.isLoggedIn = false
    state.signUpError = 'Sign Up failed.'
  },
  logOutUser (state) {
    state.isLoggedIn = false
    state.email = ''
    state.userId = ''
  },
  logoutError (state) {
    state.logoutError = 'Logout failed.'
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
