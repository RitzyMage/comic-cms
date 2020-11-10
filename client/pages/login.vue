<template>
  <div>
    <h1>LOGIN</h1>
    <input type="text" v-model="username" />
    <input type="password" v-model="password" />
    <button @click="login">LOGIN</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "Login"
})
export class Login extends Vue {
  private username = "username";
  private password = "";
  public $auth!: any;

  private login() {
    this.$auth.loginWith("local", {
      data: {
        username: this.username,
        password: this.password
      }
    });
  }
}

export default Login;
</script>
