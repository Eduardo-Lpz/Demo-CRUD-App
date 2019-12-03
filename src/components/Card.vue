<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="justify-center">
            <v-img position="center" :src="avatar" max-width="128" max-height="128"></v-img>
          </v-card-title>
          <v-card-title class="justify-center">{{firstName}} {{lastName}}</v-card-title>
          <v-card-subtitle class="text-center">{{email}}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn icon @click="deleteUserData">
              <v-icon>mdi-account-remove</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { RepositoryFactory } from "../repository/RepositoryFactory";
import { mapMutations } from "vuex";
const ApiDelete = RepositoryFactory.get("delete");
export default {
  props: ["firstName", "lastName", "email", "avatar", "onDelete"],
  methods: {
    ...mapMutations(["showBusy", "hideBusy", "showSuccess", "showError"]),
    async deleteUserData() {
      let ocupado = {
        title: "Deleting",
        message: "processing..."
      };
      this.showBusy(ocupado);
      let payload = {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        avatar: this.avatar
      };

      if(await ApiDelete.delete(payload)){
        this.onDelete(this.email)
        this.hideBusy();
        this.showSuccess("user deleted")
      }
      else{
        this.hideBusy();
        this.showError("something goes wrong...")
      }
    }
  }
};
</script>