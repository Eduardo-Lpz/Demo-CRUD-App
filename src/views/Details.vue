<template>
  <v-container fluid class="fill-height">
    <v-row v-if="!firstName" justify="center" align="center">
      <v-col cols="1">
        <v-btn to="/">Go Back</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <v-card v-if="firstName">
          <v-card-title class="justify-center">
            <v-img position="center" :src="avatar" max-width="128" max-height="128"></v-img>
          </v-card-title>
          <v-card-title class="justify-center">{{firstName}} {{lastName}}</v-card-title>
          <v-card-subtitle class="text-center">{{email}}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["firstName", "lastName", "email", "avatar"]
};
</script>