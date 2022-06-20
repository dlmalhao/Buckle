<template>
  <div class="background-container login">
    <b-row style="margin-right: 0">
      <b-col>
        <div class="">
          <img src="../assets/img/loginImg.png" class="login-image" />
        </div>
      </b-col>
      <b-col>
        <div class="align-login-form-container">
          <div class="align-login-form-container-2">
            <div class="login-form-header">
              <h2>A minha conta</h2>
            </div>
            <div class="form-selector">
              <b-button type="button" class="login-btn">Login</b-button>
              <router-link :to="{ path: 'registo' }">
                <b-button type="button" class="register-btn">Registo</b-button>
              </router-link>
            </div>
            <form @submit.prevent="loginUser">
              <div class="form-email">
                <b-form-input
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="Email de estudante"
                ></b-form-input>
              </div>
              <div class="form-password">
                <b-form-input
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Password"
                ></b-form-input>
              </div>
              <div class="form-submit">
                <b-button ref="loginButton" type="submit">Entrar</b-button>
              </div>
            </form>
            <div class="forgot-password">
              <a href="#">Esqueci-me da password</a>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      },
      users: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["isLoginValid"]),

    // loadingFunc() {
    //   if(this.isLoading) {
    //     this.$vs.loading({background:this.backgroundLoading,color:'#353535'})
    //   }
    //   else {
    //     this.$vs.loading.close()
    //   }
    // }
  },
  methods: {
    ...mapMutations(["SET_LOGGED_USER", "SET_ACTIVE_PROFILE"]),

    ...mapActions(["login"]),

    async loginUser() {
      try{
        const response = await this.login({
        email_utilizador: this.form.email,
        password: this.form.password,
      });
      if (response.data.success) {
        this.$swal("Login!", "Login efetuado com sucesso!", "success")
        this.$router.push("/");
      } else {
        throw new Error(response.data.msg);
      }
      }catch (err){
        this.$swal("Error!", err.message, "error");
      }
      
    },

    // login() {
    //   if (this.isLoginValid(this.form.email, this.form.password)) {
    //     if (this.users.find((user) => user.email == this.form.email).status =="blocked") {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Utilizador bloqueado!",
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: "Ok",
    //       });
    //     }
    //     else {
    //       this.SET_LOGGED_USER(this.form.email);
    //       this.SET_ACTIVE_PROFILE(this.form.email)
    //       Swal.fire({
    //         icon: "success",
    //         title: "Bem vindo/a",
    //         text: "Logado com sucesso!",
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: "Entrar",
    //       }).then(() => {
    //         this.$router.push({ name: "PaginaInicial" });
    //       });
    //     }
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Credenciais erradas!",
    //       confirmButtonColor: '#3085d6',
    //       confirmButtonText: "Tentar outra vez..",
    //     });
    //   }
    // },
  },
};
</script>
    
<style scoped>
.login button:hover {
  background-color: var(--black) !important;
}

.login-image {
  width: 100%;
  height: 100%;
}

.align-login-form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.align-login-form-container-2 {
  width: 40%;
  background-color: #fafafa;
  border-radius: 5%;
  margin-bottom: 10%;
  padding: 20px 20px 20px 20px;
}

.login-form-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border);
}

.login-form-header > h2 {
  font-weight: bold;
}

.login-btn,
.register-btn {
  margin: 0 20px 0 20px !important;
}

.form-submit,
.form-submit > button {
  width: 100%;
}

.form-submit > button,
.login-btn {
  background-color: var(--orange) !important;
  border: var(--orange) !important;
  font-weight: bold !important;
}

.register-btn {
  background-color: #fff !important;
  border: #fff !important;
  color: var(--black) !important;
  font-weight: bold !important;
  width: 90px;
}

.login-btn {
  width: 90px !important;
}

.register-btn:hover {
  color: #fff;
}

.form-email {
  padding: 30px 0 20px 0;
}

.form-password {
  padding-bottom: 20px;
}

.form-submit,
.form-submit > button {
  height: 45px;
}

.forgot-password {
  padding-top: 15px;
}

.forgot-password > a {
  color: #8d8d8d;
}

.forgot-password > a:hover {
  color: #d3d3d3;
}

.swal2-styled.swal2-confirm {
  background-color: var(--orange);
}

.swal2-styled.swal2-confirm:focus {
  box-shadow: 0 0 0 3px transparent;
}
</style>