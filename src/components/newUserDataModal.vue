<template>
  <v-row justify="center">
    <v-dialog v-model="newUserDataModalGet" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">New User</span>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="12">
              <img height="128" width="128" ref="vistaPrevia" :src="AvatarSample" class="avatar" />
              <file-pond
                @addfile="addAvatar"
                :allow-multiple="false"
                :instant-upload="false"
                accepted-file-types="image/*"
                ref="pond"
                label-idle="Add files here..."
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                clearable
                append-icon="mdi-account"
                label="First Name"
                v-model="firstNameGetSet"
                :error-messages="errorsFirstName"
                @blur="$v.newUserData.userFirstName.$touch()"
                @change="setIsValidForm"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                clearable
                append-icon="mdi-account"
                label="Last Name"
                v-model="lastNameGetSet"
                :error-messages="errorsLastName"
                @blur="$v.newUserData.userLastName.$touch()"
                @change="setIsValidForm"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                clearable
                append-icon="mdi-email"
                label="Email"
                v-model="emailGetSet"
                :error-messages="errorsEmail"
                @blur="$v.newUserData.userEmail.$touch()"
                @change="setIsValidForm"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="addUser">{{this.acceptText}}</v-btn>
          <v-btn class="primary lighten-1" @click="cancel">{{this.cancelText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";

import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
const FilePond = vueFilePond(FilePondPluginFileValidateType);

import { RepositoryFactory } from "../repository/RepositoryFactory";
const ApiUsersCreate = RepositoryFactory.get("create");
export default {
  data() {
    return {
      AvatarSample: require("@/assets/avatar.png")
    };
  },
  props: [
    "title",
    "subtitle",
    "contentHeader",
    "contentBody",
    "contentFooter",
    "acceptText",
    "onAccept",
    "cancelText",
    "onCancel"
  ],
  validations: {
    newUserData: {
      userEmail: {
        required,
        email
      },
      userLastName: { required },
      userFirstName: { required }
    }
  },
  components: {
    FilePond
  },
  computed: {
    ...mapState("user", ["userDataModal", "newUserData"]),
    ...mapGetters("user", ["newUserDataModalGet"]),
    emailGetSet: {
      get() {
        return this.newUserData.userEmail;
      },
      set(input) {
        this.setNewUserEmail(input);
      }
    },
    lastNameGetSet: {
      get() {
        return this.newUserData.userLastName;
      },
      set(input) {
        this.setNewUserLastName(input);
      }
    },
    firstNameGetSet: {
      get() {
        return this.newUserData.userFirstName;
      },
      set(input) {
        this.setNewUserFirstName(input);
      }
    },
    errorsEmail() {
      let errorsEmail = [];

      if (!this.$v.newUserData.userEmail.$dirty) {
        return errorsEmail;
      }
      if (!this.$v.newUserData.userEmail.required) {
        errorsEmail.push("This field is required");
      }
      if (!this.$v.newUserData.userEmail.email) {
        errorsEmail.push("email not valid");
      }
      return errorsEmail;
    },
    errorsLastName() {
      let errorsLastName = [];

      if (!this.$v.newUserData.userLastName.$dirty) {
        return errorsLastName;
      }
      if (!this.$v.newUserData.userLastName.required) {
        errorsLastName.push("This field is required");
      }
      return errorsLastName;
    },
    errorsFirstName() {
      let errorsFirstName = [];

      if (!this.$v.newUserData.userFirstName.$dirty) {
        return errorsFirstName;
      }
      if (!this.$v.newUserData.userFirstName.required) {
        errorsFirstName.push("This field is required");
      }
      return errorsFirstName;
    }
  },
  methods: {
    ...mapMutations(["showBusy", "hideBusy", "showSuccess", "showError"]),
    ...mapMutations("user", [
      "addUserData",
      "setNewUserDataModal",
      "setNewUserEmail",
      "setNewUserLastName",
      "setNewUserFirstName",
      "setNewUserDataIsValid"
    ]),
    setIsValidForm() {
      if (!this.$v.newUserData.$invalid) this.setNewUserDataIsValid(true);
    },
    validate() {
      if (this.$v.newUserData.$invalid) this.$v.newUserData.$touch();
      else {
        this.$v.$reset();
        this.setNewUserDataIsValid(false);
        this.emailGetSet = "";
        this.firstNameGetSet = "";
        this.lastNameGetSet = "";
      }
    },
    addAvatar(error, archivo) {
      if (error) {
        return;
      }
      let reader = new FileReader();
      let vm = this;
      reader.onloadend = () => {
        vm.$refs.vistaPrevia.src = reader.result;
      };
      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },
    cancel() {
      this.$v.$reset();
      this.setNewUserDataIsValid(false);
      this.emailGetSet = "";
      this.firstNameGetSet = "";
      this.lastNameGetSet = "";
      this.setNewUserDataModal();
    },
    async addUser() {
      if (this.$v.newUserData.$invalid) this.$v.newUserData.$touch();
      else {
        let ocupado = {
          title: "Adding new user",
          message: "processing..."
        };
        this.showBusy(ocupado);
        const response = await ApiUsersCreate.post(this.newUserData);

        if (response) {
          this.addUserData(this.newUserData);
          this.cancel();
          this.hideBusy();
          this.showSuccess("user added");
        } else {
          this.hideBusy();
          this.showError("Something goes wrong...");
        }
      }
    }
  }
};
</script>
<style scope>
.avatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
