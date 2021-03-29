<template>
  <div class="header">
    <nuxt-link to="/" class="header-link header-link--title">{{ name }}</nuxt-link>
    <nuxt-link v-for="link in links" :to="link.href" :key="link.name" class="header-link">
      {{ link.name }}
    </nuxt-link>
    <client-only>
      <nuxt-link v-if="$auth.loggedIn" to="/admin/add" class="header-link">
        Add Comic
      </nuxt-link>
    </client-only>
    <nuxt-link to="/search" class="header-link"><SearchIcon /></nuxt-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SearchIcon } from "vue-feather-icons";
import options from "~/options.json";

@Component({
  components: { SearchIcon },
})
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
  align-items: stretch;
  justify-content: space-evenly;
}

.header-link {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $mediumBackground;
  cursor: pointer;
  margin: 0;
}

.header-link:hover {
  background-color: $primaryLight;
}

.header-link--title {
  font-size: 1.2em;
  color: $darkBackground;
}

.nuxt-link-exact-active {
  background-color: $primaryDark;
  color: $font;
}
</style>
