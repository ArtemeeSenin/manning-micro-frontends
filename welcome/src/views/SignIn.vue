<template>
  <div class="about">
    <form @submit.prevent="submit">
      <fieldset>
        <legend>Sign In</legend>
        <label><span>Username:</span><input v-model="username" name="username"></label>
        <label><span>Password:</span><input v-model="password" type="password" name="password"></label>
        <button type="submit">Sign In</button>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios';
  import {getBootstrapApi} from "@/bootstrap";

  const AUTH_URL = 'https://buildingmfe.maxgallo.io/api/login';

  function assertBootstrapIsAvailable(bootstrap: any): true | never {
    if (!bootstrap) {
      throw new Error('Bootstrap is not available');
    }

    return true;
  }
  function navigateToMusic() {
    const bootstrap = getBootstrapApi();
    assertBootstrapIsAvailable(bootstrap);

    return bootstrap.router.navigateTo('/play');
  }

  export default Vue.extend({
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async submit() {
        const response = await axios.post(AUTH_URL, {
          username: this.username,
          password: this.password,
        }).catch(error => console.error(error));
        if (!response) { return; }

        const { data: { data: { token } } } = response;
        console.log('TOKEN: ', token);

        return navigateToMusic();
      }
    }
  });
</script>

<style lang="scss">
  form {
    width: 320px;
    display: block;
    margin: 0 auto;
  }

  label {
    display: flex;
    margin: 12px;
    justify-content: space-between;
  }
</style>
