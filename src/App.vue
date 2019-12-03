<template>
  <v-app id="bg-img">
    <Appbar />

    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
      multi-line
      top
      right
      :timeout="2000"
    >
      {{notification.message }}
      <v-btn color="primary" @click="hideNotification">Cerrar</v-btn>
    </v-snackbar>

    <v-dialog v-model="busy.visible" max-width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ busy.title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">{{ busy.message }}</v-card-text>
        <v-card-text>
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Appbar
  },
  computed: {
    ...mapState(["notification", "busy"])
  },
  methods: {
    ...mapMutations(["hideNotification"])
  }
};
</script>

<style>
#bg-img {
  background-image: url("https://picsum.photos/1920/1080?random");
  background-size: cover;
  overflow: hidden;
}
</style>
