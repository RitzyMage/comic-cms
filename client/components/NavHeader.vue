<template>
  <div class="header">
    <nuxt-link to="/" class="header-link header-link--title">{{ name }}</nuxt-link>
    <nuxt-link v-for="link in links" :to="link.href" :key="link.name" class="header-link">
      {{ link.name }}
    </nuxt-link>
    <client-only>
      <nuxt-link v-if="$auth.loggedIn" to="/admin" class="header-link">Manage Comics</nuxt-link>
      <a v-if="$auth.loggedIn" class="header-link" @click="logout">Log out</a>
      <nuxt-link v-else class="header-link" to="/admin">Log in</nuxt-link>
    </client-only>
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

.header-link--title {
  font-size: 1.2em;
  color: $darkBackground;
}
</style>
