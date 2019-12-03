import { Math } from "core-js";

export default {
  namespaced: true,
  strict: true,
  state: {
    usersData: [],
    userDataModal: false,
    newUserData: {
      userEmail: "",
      userFirstName: "",
      userLastName: "",
    },
    newUserDataIsValid: false
  },
  mutations: {
    setUsersData(state, payload) {
      state.usersData.splice(0, state.usersData.length);
      for (let i = 0; i < payload.length; i++) {
        state.usersData.push({
          userID: payload[i].id,
          userEmail: payload[i].email,
          userFirstName: payload[i].first_name,
          userLastName: payload[i].last_name,
          userAvatar: payload[i].avatar
        });
      }
    },
    addUserData(state, payload) {
      state.usersData.push({
        userID: Math.random(),
        userEmail: payload.userEmail,
        userFirstName: payload.userFirstName,
        userLastName: payload.userLastName,
        userAvatar: 'https://cdn4.iconfinder.com/data/icons/men-avatars-icons-set-1/256/21-128.png'
      })
    },
    deleteUserData(state, payload) {
      const i = state.usersData.map(item => item.userEmail).indexOf(payload);
      state.usersData.splice(i, 1);
    },
    setNewUserDataModal(state) {
      state.userDataModal = !state.userDataModal
    },
    setNewUserEmail(state, payload) {
      state.newUserData.userEmail = payload;
    },
    setNewUserLastName(state, payload) {
      state.newUserData.userLastName = payload;
    },
    setNewUserFirstName(state, payload) {
      state.newUserData.userFirstName = payload;
    },
    setNewUserDataIsValid(state) {
      state.newUserDataIsValid = !state.newUserDataIsValid;
    }
  },
  getters: {
    newUserDataModalGet(state) {
      return state.userDataModal
    },
    emailGet(state) {
      return state.ema
    }
  }
};
