<template>
  <v-container>
    <newUserDataModal acceptText="Add User" :onAccept="addUserData" cancelText="cancel" />
    <v-row>
      <v-col xs="8" sm="6" md="4" lg="3" xl="2" v-for="(item, id) in usersData" :key="id">

        <Card
          :firstName="item.userFirstName"
          :lastName="item.userLastName"
          :email="item.userEmail"
          :avatar="item.userAvatar"
          :onDelete="deleteUserData"
        />
        
      </v-col>
    </v-row>
    <v-btn fab dark color="primary" fixed right bottom @click="showNewUserDataModal">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import Card from "../components/Card";
import newUserDataModal from "../components/newUserDataModal";

import { mapState, mapMutations } from "vuex";

import { RepositoryFactory } from "../repository/RepositoryFactory";
const ApiUsersData = RepositoryFactory.get("data");

export default {
  components: {
    Card,
    newUserDataModal
  },
  computed: {
    ...mapState("user", ["usersData", "userDataModal"])
  },
  mounted() {
    this.getUsersData();
  },
  methods: {
    ...mapMutations("user", [
      "setUsersData",
      "setNewUserDataModal",
      "addUserData",
      "deleteUserData"
    ]),
    async getUsersData() {
      const { data } = await ApiUsersData.get();
      this.setUsersData(data.data);
    },
    showNewUserDataModal() {
      this.setNewUserDataModal();
    }
  }
};
</script>