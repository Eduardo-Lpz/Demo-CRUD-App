import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: {
      visible: false,
      message: '',
      color: 'info'
    },
    busy: {
      visible: false,
      title: '',
      message: ''
    },
  },
  mutations: {
    showInfo(state, payload) {
      state.notification.message = payload
      state.notification.color = 'info'
      state.notification.visible = true
    },
    showSuccess(state, payload) {
      state.notification.message = payload
      state.notification.color = 'success'
      state.notification.visible = true
    },
    showWarning(state, payload) {
      state.notification.message = payload
      state.notification.color = 'warning'
      state.notification.visible = true
    },
    showError(state, payload) {
      state.notification.message = payload
      state.notification.color = 'error'
      state.notification.visible = true
    },
    hideNotification(state) {
      state.notification.visible = false
    },
    showBusy(state, payload) {
      state.busy.title = payload.title
      state.busy.message = payload.message
      state.busy.visible = true
    },
    hideBusy(state) {
      state.busy.visible = false
    }
  },
  modules: {
    user
  }
})
