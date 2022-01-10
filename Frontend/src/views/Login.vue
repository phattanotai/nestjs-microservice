<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-5">
            <h2>{{ $store.getters.getAuthCaption.label_login }}</h2>
          </div>
          <form role="form">
            <base-input
              input-classes="input-group-alternative"
              placeholder="ชื่อผู้ใช้"
              addon-left-icon="ni ni-single-02"
              v-model="loginData.username"
              :input="loginData.username"
            ></base-input>
            <base-input
              input-classes="input-group-alternative"
              placeholder="รหัสผ่าน"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="loginData.password"
              v-on:keyup.enter="doLogin()"
              :input="loginData.password"
            >
            </base-input>

            <base-checkbox
              v-model="loginData.remember"
              :checked="loginData.remember"
              class="custom-control-alternative text-left"
            >
              <span class="text-muted">{{
                $store.getters.getAuthCaption.label_remember
              }}</span>
            </base-checkbox>

            <div class="text-center">
              <base-button
                icon="ni ni-key-25"
                @click="doLogin"
                class="my-4 btn-login"
                >{{ $store.getters.getAuthCaption.btn_login }}</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6 text-left">
          <router-link to="/auth/repassword" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_repassword }}</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/auth/register" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_register }}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "../components/InputField.vue";
import alertService from "../service/AlertService";
import { AuthActionTypes } from "../store/auth/action-types";

@Options({
  components: { InputField },
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        remember: false,
      },
      loginNull: {
        username: false,
        password: true,
      },
    };
  },
  methods: {
    doLogin() {
      if (this.loginData.username && this.loginData.password) {
        this.$store.dispatch(AuthActionTypes.doLogin, this.loginData);
      } else {
        alertService.Warning(this.$store.getters.getAuthCaption.warning_login);
      }
    },
  },
  mounted() {
    this.$store.dispatch(AuthActionTypes.setRememberData);
    this.loginData = this.$store.getters.getRememberData;
  },
})
export default class Login extends Vue {}
</script>

<style scoped>
.btn-login {
  background-image: linear-gradient(to right, #1a4ca1, #1843af) !important;
  border: none;
}
.msg {
  color: crimson;
}
</style>
