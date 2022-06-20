<template>
  <!-- Footer -->
        <footer>
                <b-row>
                    <b-col class="footer-left-side">
                        <div class="header">
                            <router-link :to="{ path: 'paginaInicial' }">Buckle</router-link>
                        </div>
                        <div class="footer-left-section">
                            <div class="left-section">
                                <div class="content">
                                    <router-link :to="{ name: 'PaginaInicial' }">Página inicial</router-link>
                                    <router-link :to="{ name: 'Anuncios' }">Anúncios</router-link>
                                    <router-link :to="{ name: 'Projetos' }">Projetos</router-link>
                                    <router-link :to="{ name: 'sobre' }">Sobre</router-link>
                                    <router-link :to="{ name: 'AE' }">AE</router-link>
                                </div>
                            </div>
                        
                            <div class="right-section">
                                <div class="header"></div>
                                <div class="content">
                                    <div class="text">
                                        <p>Termos e condições</p>
                                        <p>Direitos de autor</p>
                                        <p @click="goProfile">Perfil</p>
                                    </div>
                                    <div class="icons">
                                        <i class="fab fa-instagram-square"></i>
                                        <i class="fab fa-facebook-square"></i>
                                        <i class="fab fa-twitter-square"></i>
                                        <i class="fab fa-linkedin"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col class="footer-right-side">
                        <div class="footer-right-section">
                            <div class="content">
                                <h4>Algum problema ?</h4>
                                <p>Entra em contacto com a tua AE</p>
                            </div>
                            <div class="form">
                                <form action="">
                                    <div class="student-data">
                                        <div class="form-name" id="footer-form-name">
                                            <b-form-input type="text" required placeholder="Nome"></b-form-input>
                                        </div>
                                        <div class="form-email" id="footer-form-email">
                                            <b-form-input type="email" required placeholder="Email de estudante"></b-form-input>
                                        </div>
                                    </div>
                                    <div class="form-message-container">
                                        <b-form-textarea placeholder="Mensagem" class="form-message" rows="3"></b-form-textarea>
                                    </div>
                                    <div class="form-submit">
                                    <b-button type="submit">Enviar</b-button>
                                    </div>
                                </form>
                            </div>
                        </div>  
                    </b-col>
                </b-row>
            <!-- Copyright -->
        </footer>
        <!-- Footer -->
</template>

<script>
export default {
    methods: {
        goProfile() {
      // this.SET_ACTIVE_PROFILE(this.getLoggedUser.email);

      this.$router.push({
        name: "perfil",
        params: { id: this.$store.getters.getLoggedUser.id },
      });
    },
    }
}
</script>

<style scoped>

    footer {
        border-top: 1px solid var(--border);
        margin: 60px 150px 30px 150px;
    }

    footer button:hover {
        background-color: var(--black) !important;
    }

    .footer-left-side {
        padding-right: 0 !important;
        border-right: 1px solid var(--border);
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .footer-right-side {
        padding-left: 0 !important;
        display: flex;
        justify-content: flex-end;
    }

    .footer-left-section {
        display: flex;
        margin-top: 20px;
    }

    .footer-left-side > .header {
        display: flex;
        justify-content: flex-start;
    }

    .footer-left-side > .header > a {
        font-weight: bold;
        color: var(--blue);
        text-decoration: none;
        font-size: 40px;
        margin-bottom: 20px;
    }

    .footer-left-side > .header > a:hover {
        color: var(--orange);
    }

    .left-section {
        margin-right: 50px;
    }  

    .left-section > .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .left-section > .content > a {
        text-decoration: none;
        color: var(--black);
        margin: 7px 0 7px 0;
    }

    .left-section > .content > a:hover {
        color: var(--orange);
    }

    .right-section {
        margin-left: 50px;
    }

    .right-section > .content > .icons {
        display: flex;
        justify-content: space-between;
        
    }
    
    .right-section > .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .right-section > .content > .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .right-section > .content > .text > p {
        margin: 7px 0 7px 0;
        cursor: pointer;
    }

    .right-section > .content > .text > p:hover {
        color: var(--orange);
    }

    .right-section > .content > .icons > i {
        font-size: 20px;
        cursor: pointer;
        margin-bottom: 10px;
    } 

    .right-section > .content > .icons > i:hover {
        color: var(--orange);
    } 

    .footer-right-side > .content {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }

    .footer-right-section {
        width: 60%;
        padding-top: 30px;
    }

    .footer-right-section > .content {
        text-align: left;
    }

    .student-data {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    #footer-form-email {
        padding: 0;
        width: 60%;
    }

    #footer-form-name {
        padding: 0;
        width: 36%;
    }

    .form-message {
        overflow-y: scroll;
        resize: none;
    }

    .form-message-container {
        margin-bottom: 20px;
    }

    .form-submit button{
        width: 100%;
        background-color: var(--orange);
        border: none;
        font-weight: bold;
    }
</style>