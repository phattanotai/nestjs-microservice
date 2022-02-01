<template>
  <card shadow type="secondary">
    <template v-slot:header class="bg-white border-0">
      <div class="row align-items-center">
        <div class="col-8 text-left">
          <h3 class="mb-0">My account</h3>
        </div>
        <div class="col-4 text-right">
          <base-button
            icon="ni ni-key-25"
            @click="edit"
            class="btn btn-sm btn-primary"
            >Edit</base-button
          >
          <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
        </div>
      </div>
    </template>
    <form @submit.prevent>
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative
                label="ID"
                placeholder="id"
                input-classes="form-control-alternative"
                disabled
                :input="userFormData.id"
                v-model="userFormData.id"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative
                label="Name"
                placeholder="Name"
                input-classes="form-control-alternative"
                :disabled="disabled"
                :input="userFormData.name"
                v-model="userFormData.name"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative
                label="Username"
                placeholder="Username"
                input-classes="form-control-alternative"
                :disabled="true"
                :input="userFormData.username"
                v-model="userFormData.username"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative
                label="Email"
                placeholder="Email"
                input-classes="form-control-alternative"
                :disabled="true"
                :input="userFormData.email"
                v-model="userFormData.email"
              />
            </div>
            <div class="col-lg-6">
              <!-- <base-input
                alternative
                label="Role"
                placeholder="Admin"
                input-classes="form-control-alternative"
                :disabled="disabled"
                :input="userFormData.role"
                v-model="userFormData.role"
              /> -->
              <base-select
                :options="roleUser"
                :disabled="disabled"
                v-model="userFormData.role"
                :value="userFormData.role"
              />
            </div>
          </div>
          <base-button @click="saveUserData">Save</base-button>
        </div>
      </div>
      <hr class="my-4" />
    </form>
  </card>
</template>

<script lang="ts">
const USER = {
  name: "",
  email: "",
  role: "",
  username: "",
  imagePath: "",
  id: "",
};
import { Options, Vue } from "vue-class-component";
import BaseSelect from "../BaseSelect.vue";

import userService from "../../service/UsersService";

type RegionType = {
  value: string;
  text: string;
};

@Options({
  components: { BaseSelect },
  data: function () {
    return {
      userFormData: USER,
      disabled: true,
      roleUser: {
        USER: "user",
        PREMIUM: "premium",
        ADMIN: "admin",
      },
    };
  },
  props: {
    formType: {
      type: String,
      default: "profile",
      description: "users-form type (profile, edit)",
    },
  },
  methods: {
    edit() {
      this.disabled = !this.disabled;
    },
    async saveUserData() {
      const res = await userService.editUser(this.userFormData);
      if (res) {
      }
    },
    getValue(data: string) {
      let value = null;
      this.optionsRegion.filter(function (i: RegionType) {
        if (i.text === data) {
          value = i.value;
        }
      });
      return value;
    },
    getText(data: string) {
      let text: string = "";
      if (data === null || data === undefined) {
        data = "5300";
      }
      this.optionsRegion.filter(function (i: RegionType) {
        if (i.value === data) {
          text = i.text;
        }
      });
      return text;
    },
  },
  mounted: function () {
    if (this.formType === "profile") {
      this.userFormData = this.$store.getters.getUserData;
      console.log(this.userFormData);
    }
  },
})
export default class UserForm extends Vue {}
</script>

<style></style>
