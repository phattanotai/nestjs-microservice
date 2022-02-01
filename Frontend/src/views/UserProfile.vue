<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 400px;
        background-image: url(/img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <span class="mask bg-gradient-success opacity-8"></span>
    </base-header>
    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <user-detail></user-detail>
        </div>
        <div class="col-xl-8 order-xl-1">
          <users-form></users-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import UserDetail from "../components/UserProfile/UserDetail.vue";
import UsersForm from "../components/UserProfile/UserForm.vue";

export default {
  name: "user-profile",
  components: {
    UsersForm,
    UserDetail,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
