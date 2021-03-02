<template>
  <div class="header">
    <h1 class="title">
      <nuxt-link to="/">{{ name }}</nuxt-link>
    </h1>
    <div class="links">
      <nuxt-link v-for="link in links" :to="link.href" :key="link.name" class="link">
        {{ link.name }}
      </nuxt-link>
      <client-only>
        <nuxt-link v-if="$auth.loggedIn" to="/admin">Manage Comics</nuxt-link>
        <span v-if="$auth.loggedIn" class="auth-button" @click="logout">Log out</span>
        <nuxt-link v-else class="auth-button" to="/admin">Log in</nuxt-link>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "~/util/Vue";
import options from "~/options.json";

@Component
export default class NavHeader extends Vue {
  private links = options.links;

  private name: string = options.name;

  private async logout() {
    await this.$auth.logout();
    this.$NotifyToast("logged out");
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
}

.links {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: calc(100% - 200px);
}

.auth-button {
  flex-grow: 1;
}

.link {
  display: block;
  height: calc(100% - 20px);
  flex-grow: 1;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  width: 200px;
  max-width: 200px;
  font-size: 1.2em;
}
</style>
