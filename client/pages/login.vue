<template>
  <div>
    <h1>LOGIN</h1>
    <input type="text" v-model="username" />
    <input type="password" v-model="password" />
    <button @click="login">LOGIN</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "../util/Vue";

@Component({
  name: "Login",
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
    } catch (e) {
      this.$ErrorToast("login error");
    }
  }
}

export default Login;
</script>
