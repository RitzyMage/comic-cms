<template>
  <div class="header">
    <h1 class="title">
      <nuxt-link to="/" class="title-link">{{ name }}</nuxt-link>
    </h1>
    <div class="links">
      <nuxt-link v-for="link in links" :to="link.href" :key="link.name" class="header-link">
        {{ link.name }}
      </nuxt-link>
      <client-only>
        <nuxt-link v-if="$auth.loggedIn" to="/admin" class="header-link">Manage Comics</nuxt-link>
        <span v-if="$auth.loggedIn" class="auth-button header-link" @click="logout">Log out</span>
        <nuxt-link v-else class="auth-button header-link" to="/admin">Log in</nuxt-link>
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
@import "~/assets/scss/colors.scss";
.header {
  display: flex;
  background-color: $primary;
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

.header-link {
  height: calc(100% - 20px);
  flex-grow: 1;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $mediumBackground;
  cursor: pointer;
  margin: 0;
  height: 100%;
}

.header-link:hover {
  background-color: $primaryLight;
}

.title {
  width: 200px;
  max-width: 200px;
  font-size: 1.2em;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-link {
  color: $darkBackground;
}
</style>
