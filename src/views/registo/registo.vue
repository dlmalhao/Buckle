<template>
    <div class="background-container register">
        <b-row style="margin-right: 0;">
          <b-col>
              <div class="">
                  <img src="../../assets/img/registerImg.png" class="register-image">
              </div>
          </b-col>
          <b-col>
                <div class="align-register-form-container">
                    <div class="align-register-form-container-2">
                        <div class="register-form-header">
                            <h2>A minha conta</h2>
                        </div>
                        <div class="form-selector">
                            <router-link :to="{path: 'login'}">
                                <b-button type="button" class="login-btn2">Login</b-button>
                            </router-link>
                            <b-button type="button" class="register-btn2">Registo</b-button>
                        </div>
                        <form @submit.prevent="register">
                            <div class="form-names">
                               <b-form-input type="text" class="first-name" v-model="form.first_name" required placeholder="Nome"></b-form-input>
                               <b-form-input type="text" class="last-name" v-model="form.last_name" required placeholder="Sobrenome"></b-form-input>
                            </div>
                            <div class="form-selects">
                                <b-form-select v-model="form.course.selected" class="form-select cursos"  :options="form.course.options"></b-form-select>
                                <b-form-select v-model="form.gender.selected" class="form-select generos"  :options="form.gender.options"></b-form-select>
                            </div>
                            <div class="form-email2">
                                <b-form-input type="email" v-model="form.email" required placeholder="Email do estudante"></b-form-input>
                            </div>
                            <div class="form-password">
                                <b-form-input type="password" v-model="form.password" required placeholder="Password"></b-form-input>
                            </div>
                            <div class="form-confirm-password">
                                <b-form-input type="password" v-model="form.confirm_password" required placeholder="Confirmar password"></b-form-input>
                            </div>    
                            <div class="form-submit2">
                                <b-button type="submit">Criar conta</b-button>
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
    import { mapGetters, mapMutations } from "vuex";

    export default {
        data: function () {
            return {
                form : {
                    first_name: '',
                    last_name: '',
                    course: {
                        selected: null,
                        options: [
                            { value: null, text: 'Curso', disabled: true },
                            { value: 'tsiw', text: 'TSIW' },
                            { value: 'tcav', text: 'TCAV' },
                            { value: 'design-grafico', text: 'Design Gráfico' },
                            { value: 'design-industrial', text: 'Design Industrial'},
                            { value: 'fotografia', text: 'Fotografia'},
                            { value: 'multimedia', text: 'Multimédia'},
                        ]
                    },
                    gender: {
                        selected: null,
                        options: [
                            { value: null, text: 'Género', disabled: true },
                            { value: 'masculino', text: 'Masculino' },
                            { value: 'feminino', text: 'Feminino' },
                            { value: 'outro', text: 'Outro' },
                        ]
                    },
                    email: '',
                    password: '',
                    confirm_password: '',
                }
            }
        },
        computed: {
            ...mapGetters(["isEmailRegistered"])
        },
        methods: {
            ...mapMutations(["SET_NEW_USER"]),

            register() {
                const form_data = {
                    first_name: this.form.first_name,
                    last_name: this.form.last_name,
                    course: this.form.course.selected,
                    gender: this.form.gender.selected,
                    email: this.form.email,
                    password: this.form.password,
                    role: "user",
                    status: "active"
                }

                if(!this.isEmailRegistered(form_data.email)) {
                    if (this.form.password === this.form.confirm_password) {
                        if (this.form.password.length >= 8) {
                            this.SET_NEW_USER(form_data)
                            Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Agora já podes fazer login!',
                            confirmButtonText: 'Entrar'
                            })
                        }
                        else { Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'A tua password tem de ter pelo menos 8 carateres!',
                            confirmButtonText: 'Tentar outra vez..'
                            }) 
                        }
                    }
                    else { Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'As passwords não coincidem!',
                        confirmButtonText: 'Tentar outra vez..'
                        })  
                    }
                }
                else { Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Esse email já está registado noutra conta!',
                    confirmButtonText: 'Tentar outra vez..'
                    })  
                }
            }
        }
    }
</script>
    
<style lang="css">

    :root {
        --orange: #F17941;
        --black: #353535;
        --border: #ced4da;
        --blue: #5266B7;
    }

           
    button {
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .register button:hover {
        background-color: var(--black) !important;
    }

    .register-image {
        width: 100%;
        height: 100%;
    }

    .align-register-form-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .align-register-form-container-2 {
        width: 40%;
        background-color: #fafafa;
        border-radius: 5%;
        padding: 20px 20px 40px 20px;
    }

    .register-form-header {
        margin-bottom: 30px;
        border-bottom: 1px solid var(--border);
    }

    .register-form-header > h2{
        font-weight: bold;
    }

    .login-btn2, .register-btn2 {
        margin: 0 20px 0 20px !important;
    }

    .form-submit2, .form-submit2 > button {
        width: 100%;
        height: 100%;
    }

    .form-submit2 > button, .register-btn2 {
        background-color: var(--blue) !important;
        border: var(--blue) !important;
        font-weight: bold !important;
    }

    .login-btn2 {
        background-color: #fff !important;
        border: #fff !important;
        color: var(--black) !important;
        font-weight: bold !important;
        width: 30%;
    }

    .register-btn2 {
        width: 30% ;
    }

    .login-btn2:hover {
        color: #fff !important;
    }

    .form-names {
        display: flex;
        justify-content: space-between;
        padding: 30px 0 20px 0;
    }

    .first-name {
        margin-right: 10px;
    }

    .last-name {
        margin-left: 10px;
    }

    .form-selects {
        display: flex;
        justify-content: space-between;
    }

    .cursos {
        margin-right: 10px;
        color: #6C757D !important;
    }

    .generos {
        margin-left: 10px;
        color: #6C757D !important;
    }

    .form-email2 {
        padding: 20px 0 20px 0;
    }

    .form-password {
        padding-bottom: 20px;
    }

    .form-submit2, .form-submit2 > button {
        height: 45px;
    }

    .form-submit2 {
        padding: 20px 0 20px 0;
    }

    .forgot-password {
        margin-top: 15px !important;
    }

    .forgot-password > a {
        color: #8d8d8d;
    }

    .forgot-password > a:hover {
        color: #d3d3d3;
    }

    


</style>