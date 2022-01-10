<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <h2>{{ $store.getters.getAuthCaption.label_register }}</h2>
          </div>
          <form role="form">
            <base-input
              input-classes="input-group-alternative"
              placeholder="Name"
              addon-left-icon="ni ni-single-02"
              v-model="registerData.name"
              :input="registerData.name"
            ></base-input>
            <base-input
              input-classes="input-group-alternative"
              placeholder="Username"
              addon-left-icon="ni ni-hat-3"
              v-model="registerData.username"
              :input="registerData.username"
            ></base-input>

            <base-input
              input-classes="input-group-alternative"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="registerData.email"
              :input="registerData.email"
            ></base-input>

            <base-input
              input-classes="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="registerData.password"
              :input="registerData.password"
            ></base-input>
            <base-input
              input-classes="input-group-alternative"
              placeholder="Re-Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="registerData.repassword"
              :input="registerData.repassword"
            ></base-input>

            <div class="row my-4 text-left">
              <div class="col-12" style="b">
                <base-checkbox
                  class="custom-control-alternative"
                  v-model="registerData.agree"
                >
                  <span class="text-muted">
                    <a href="#!">{{
                      $store.getters.getAuthCaption.label_agree
                    }}</a>
                  </span>
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button
                v-bind:disabled="isButtonDisabled"
                type="primary"
                class="my-4"
                v-on:click="doRegister"
                >{{ $store.getters.getAuthCaption.btn_register }}</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3 text-left">
        <div class="col-6">
          <router-link to="/auth/repassword" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_repassword }}</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/auth/login" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_login }}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AlertService from "../service/AlertService";

@Options({
  data() {
    return {
      registerData: {
        name: "ee",
        username: "ee",
        email: "ee",
        password: "ee",
        repassword: "ee",
        agree: false,
      },
      isButtonDisabled: false,
    };
  },
  methods: {
    doRegister() {
      if (
        this.registerData.username === "" ||
        this.registerData.username.length < 6
      ) {
        AlertService.Warning(
          this.$store.getters.getAuthCaption.msg_username_null
        );
      } else if (this.registerData.email === "") {
        AlertService.Warning(this.$store.getters.getAuthCaption.msg_email_null);
      } else if (
        this.registerData.password === "" ||
        this.registerData.password.length < 6 ||
        this.registerData.repassword === ""
      ) {
        AlertService.Warning(
          this.$store.getters.getAuthCaption.msg_password_null
        );
      } else {
        if (this.registerData.password === this.registerData.repassword) {
          if (this.registerData.agree) {
            this.isButtonDisabled = true;
            console.log(this.registerData);
            // this.$store
            //   .dispatch("doRegister", this.registerData)
            //   .then((response) => {
            //     if (response) {
            //       this.registerData = {
            //         username: "",
            //         email: "",
            //         password: "",
            //         repassword: "",
            //         agree: false,
            //       };
            //     }
            //     this.isButtonDisabled = false;
            //   });
          } else {
            AlertService.Warning(
              this.$store.getters.getAuthCaption.msg_agree_null
            );
          }
        } else {
          AlertService.Warning(
            this.$store.getters.getAuthCaption.msg_repassword
          );
        }
      }
    },
  },
})
export default class Register extends Vue {}
</script>
<style></style>
