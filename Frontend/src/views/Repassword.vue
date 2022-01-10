<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-5">
            <h2>เปลี่ยนรหัสผ่าน</h2>
          </div>
          <form role="form">
            <base-input
              input-classes="input-group-alternative mb-3"
              placeholder="ชื่อผู้ใช้"
              addon-left-icon="ni ni-single-02"
              v-model="loginData.username"
            ></base-input>

            <base-input
              input-classes="input-group-alternative"
              placeholder="รหัสผ่าน"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="loginData.password"
            ></base-input>
            <base-input
              input-classes="input-group-alternative"
              placeholder="รหัสผ่านอีกครั้ง"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="loginData.repassword"
            ></base-input>
            <div class="text-center">
              <base-button
                icon="ni ni-key-25"
                @click="doRepass()"
                class="my-4 btn-login"
                >เปลี่ยนรหัสผ่าน</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3 text-left">
        <div class="col-6">
          <router-link to="/auth/login" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_login }}</small>
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

@Options({
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        repassword: "",
      },
    };
  },
  methods: {
    doRepass() {
      console.log(this.loginData);
    },
  },
})
export default class Repassword extends Vue {}
</script>
<style>
.btn-login {
  background-image: linear-gradient(to right, #1a4ca1, #1843af) !important;
  border: none;
}
</style>
