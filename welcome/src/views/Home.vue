<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

export default Vue.extend({
  components: {
    HelloWorld
  },
});
</script>
