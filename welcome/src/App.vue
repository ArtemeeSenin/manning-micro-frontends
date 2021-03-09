<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/sign-in">Sign In</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {getLifecycleEvents} from "@/bootstrap";

const bootstrapLifecycle = getLifecycleEvents();

class BootstrapListener {
  constructor(
      private readonly element: Pick<Element, 'addEventListener' | 'removeEventListener'>
  ) {
    this.element.addEventListener(bootstrapLifecycle.WILL_MOUNT, this, false);
    this.element.addEventListener(bootstrapLifecycle.DID_MOUNT, this, false);
    this.element.addEventListener(bootstrapLifecycle.WILL_UNMOUNT, this, false);
    this.element.addEventListener(bootstrapLifecycle.DID_UNMOUNT, this, false);
    this.element.addEventListener('keydown', this.log, false);
  }

  handleEvent(event: CustomEvent) {
    switch (event.type) {
      case bootstrapLifecycle.WILL_MOUNT:
      case bootstrapLifecycle.DID_MOUNT:
      case bootstrapLifecycle.DID_UNMOUNT:
        console.log(event.detail);
        break;
      case bootstrapLifecycle.WILL_UNMOUNT:
        console.log(event.detail);
        this.unlisten();
    }
  }

  public log = console.warn;

  public unlisten(): void {
    this.element.removeEventListener(bootstrapLifecycle.WILL_MOUNT, this, false);
    this.element.removeEventListener(bootstrapLifecycle.DID_MOUNT, this, false);
    this.element.removeEventListener(bootstrapLifecycle.WILL_UNMOUNT, this, false);
    this.element.removeEventListener(bootstrapLifecycle.DID_UNMOUNT, this, false);
    this.element.removeEventListener('keydown', this.log, false);
  }
}

export default Vue.extend({
  data() {
    return {
      lifecycleListener: null as unknown as BootstrapListener
    }
  },
  mounted() {
    this.lifecycleListener = new BootstrapListener(document);
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
