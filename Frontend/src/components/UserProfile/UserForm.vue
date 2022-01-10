<template>
  <card shadow type="secondary">
    <div class="bg-white border-0">
      <div class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0">My account</h3>
        </div>
        <div class="col-4 text-right">
          <a href="#!" class="btn btn-sm btn-primary">Settings</a>
        </div>
      </div>
    </div>
    <template>
      <form @submit.prevent>
        <h6 class="heading-small text-muted mb-4">User information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="row">
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Name"
                  placeholder="Name"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_name"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Tel"
                  placeholder="Tel"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_tel"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Email address"
                  placeholder="jesse@example.com"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_email"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Last name"
                  placeholder="Last name"
                  input-classes="form-control-alternative"
                  v-model="userFormData.lastName"
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
      </form>
    </template>
  </card>
</template>

<script lang="ts">
const USER = {
  users_name: "",
  users_address: "",
  users_region: "",
  users_tel: "",
  users_email: "",
  branch_id: "",
  branch_name: "",
  usergroup_id: "",
  usergroup_name: "",
  job_position: "",
};
import { Options, Vue } from "vue-class-component";
type RegionType = {
  value: string;
  text: string;
};

@Options({
  components: {},
  data: function () {
    return {
      userFormData: USER,
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
    saveUserData() {
      console.log(this.userFormData);
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
