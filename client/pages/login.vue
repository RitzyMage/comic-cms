<template>
  <div class="loginPage mainContainer">
    <h1>LOGIN</h1>
    <TextInput v-model="username" name="username" />
    <TextInput password v-model="password" name="password" />
    <Button @click="login">LOGIN</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TextInput from "@/components/inputs/TextInput.vue";
import Button from "@/components/inputs/Button.vue";
import options from "~/options.json";

@Component({
  components: { TextInput, Button },
  head() {
    return {
      title: `${options.name} login`,
    };
  },
})
export class Login extends Vue {
  private username = "";
  private password = "";

  private async login() {
    try {
      let result = await this.$auth.loginWith("local", {
        data: {
          username: this.username,
          password: this.password,
        },
      });
      if (result) {
        this.$NotifyToast("Logged In");
      }
    } catch (e) {
      this.$ErrorToast("Login Error");
    }
  }
}

export default Login;
</script>
