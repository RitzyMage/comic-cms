<template>
  <div class="loginPage">
    <h1>LOGIN</h1>
    <TextInput v-model="username" name="username" />
    <TextInput password v-model="password" name="password" />
    <Button @click="login">LOGIN</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";
import Button from "@/components/inputs/Button.vue";

@Component({
  components: { TextInput, Button },
})
export class Login extends Vue {
  private username = "";
  private password = "";

  private async login() {
    try {
      await this.$auth.loginWith("local", {
        data: {
          username: this.username,
          password: this.password,
        },
      });
      this.$NotifyToast("Logged In");
    } catch (e) {
      this.$ErrorToast("Login Error");
    }
  }
}

export default Login;
</script>

<style scoped>
.loginPage {
  max-width: 800px;
  margin: 0 auto;
}
</style>
