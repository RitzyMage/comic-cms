<template>
  <div>
    <h1>LOGIN</h1>
    <TextInput v-model="username" />
    <TextInput password v-model="password" />
    <button @click="login">LOGIN</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "../util/Vue";
import TextInput from "@/components/inputs/TextInput.vue";

@Component({
  components: { TextInput },
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
