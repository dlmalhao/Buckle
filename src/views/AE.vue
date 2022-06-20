<template>
  <div class="main">
    <div class="generalContainer">
      <div class="left-side">
        <div class="left-side-container">
          <div class="filter">
            <b-row class="filterRow">
              <div class="filterRectangle">
                <div class="div">
                  <div class="filterHeader">
                    <p>Filtrar por:</p>
                  </div>
                  <b-col cols="2">
                    <div class="pesquisa">
                      <p>Pesquisa</p>
                      <b-form-input type="text" v-model="search"></b-form-input>
                    </div>
                  </b-col>
                </div>
              </div>
            </b-row>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="text">
          <p>Associação de Estudantes</p>
        </div>
        <b-row style="padding:0;">
          <b-col xl="12" lg="12" md="12" sm="12"   v-for="(ad,index) in filteredAds" :key="index">
            <div class="cardContainer">
              <div class="cardContent">
                <div class="adData">
                  <div class="profileImage">
                    <img :src="usersData.find((user) => user.id == ad.utilizadorId).img" alt="">
                  </div>
                  <div class="data">
                    <div class="header_data">
                      <h4>{{usersData.find((user) => user.id == ad.utilizadorId).nome + " " + usersData.find((user) => user.id == ad.utilizadorId).sobrenome}}</h4>
                      <h5>{{usersData.find((user) => user.id == ad.utilizadorId).email}}</h5>
                    </div>
                    <div class="texto_data">
                      <p>{{formatTimeAndDate(ad.data)}}</p>
                    </div>
                  </div>
                </div>
                <div class="descricao">
                  <p>{{ad.descricao}}</p>
                </div>
                <div class="actions">
                  <div class="delete" v-if="ad.utilizadorId == loggedUser.id">
                    <a @click="removeAe(ad.id)"><b-icon icon="trash" style="width: 20px; height: 20px;"></b-icon></a>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>


      <div class="right-side-ae" v-if="isAe">
        <div class="title">
          <h3>Adicionar novo tópico</h3>
        </div>
        <div class="right-side-ae-container">
          <div class="form">
            <form @submit.prevent="addAe">
              <div class="data">
                <div class="description">
                  <div class="form-group">
                    <textarea placeholder="Escreva aqui..." v-model="form.descricao" class="form-control" name="" id="" rows="10"></textarea>
                  </div>
                </div>
              </div>
              <div class="button">
                <b-button type="submit">Adicionar</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div class="right-side" v-else>
        <div class="title">
            <h3>Precisas de ajuda?</h3>
        </div>
        <div class="right-side-container">
          <div class="form">
            <form action="">
              <div class="student-data">
                <div class="form-name">
                  <b-form-input type="text" required placeholder="Nome"></b-form-input>
                </div>
                <div class="form-email" id="footer-form-email">
                  <b-form-input type="email" required placeholder="Email de estudante"></b-form-input>
                </div>
              </div>
              <div class="form-message-container">
                <b-form-textarea placeholder="Mensagem" class="form-message" rows="10"></b-form-textarea>
              </div>
              <div class="form-submit">
                <b-button type="submit">Enviar</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex"

export default {
  data() {
    return {
      ae: [],
      usersData: [],
      loggedUser: [],
      form: {
        descricao: ""
      },
      isAe: false,
      search: ""
    }
  },
  computed : {
    ...mapGetters(["getLoggedUser"]),

    filteredAds () {

      let filterAds = this.ae.slice(0)

      if(this.search != "") {
        filterAds = filterAds.filter((ad)=> ad.descricao.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().replace(/\s/g, '')) || this.usersData.find((user) => user.id == ad.utilizadorId).nome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) || this.usersData.find((user) => user.id == ad.utilizadorId).sobrenome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) )
      }
      return filterAds
    }
    
  },
  mounted () {
    this.loggedUser = this.getLoggedUser
    console.log(this.loggedUser)
    if(this.loggedUser.role == "Admin" || this.loggedUser.role == "Ae") {
      this.isAe = true
    }
    this.loadingSpinner()
  },
  methods: {

    ...mapActions(["getUsers","getAe","postAe","deleteAe"]),

    
    async getAllUsers() {
      try {
        this.usersData = await this.getUsers();
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },


    async addAe() {
      try {
        const today = new Date()
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const time = today.getHours() + ":" + today.getMinutes()
        let ad = {
          descricao: this.form.descricao,
          utilizadorId: this.loggedUser.id,
          data: time + "?" + date,
        }
        const response = await this.postAe(ad);
        // this.getAnnouncementsData()
        if (response.data.success) {
          this.$swal('','Tópico criado com sucesso')
          this.getAeData()
        }
      } catch (err) {
        this.$swal('Erro ao criar Tópico!')
        console.log(err)
      }
    },

    async loadingSpinner () {
      this.$vs.loading ({color:'#F17941'})

      await this.getAllUsers()
      await this.getAeData()

      setTimeout( ()=> {
        this.$vs.loading.close()
      },300);
    },

    async getAeData() {
      try {
        this.ae = await this.getAe();
        console.log(this.ae)
      } catch (err) {
        this.$swal('Erro ao requisitar Ae')
        console.log(err)
      }
    },

    formatTimeAndDate (timeAndDate) {
      let timeAndDateArray = timeAndDate.split("?");
      let unformattedDate = timeAndDateArray[1].split("-")
      let formattedDate = unformattedDate[2] + "/" + unformattedDate[1]+ "/" + unformattedDate[0]
      return formattedDate + " " + "-" + " " + timeAndDateArray[0];
    },

    async removeAe(idx) {
      this.$swal({
            title: "Atenção",
            text: `Tem a certeza que prentende eliminar este tópico ?`,
            icon: "warning",
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Não',
            dangerMode: true,
          }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Informação!",
            text: `Tópico removido com sucesso!`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then(() => {
            this.deleteAe(idx);
            this.getAeData();
          });
        }
      });
    },
  }
}
</script>

<style scoped>

.main {
  background-color: #ebebeb;
}

  .generalContainer {
    display: flex;
    width: 100%;
    padding-bottom: 25px;
  }

  .center {
    width: 100%;
    margin-top: 25px;
  }

  .left-side {
    width: 400px;
    border-radius: 15px;
    margin: 25px 25px 0 350px;
  }

  .right-side, .right-side-ae {
    width: 600px;
    border-radius: 15px;
    margin: 25px 350px 0 25px;
  }


  .center .text {
    background-color: var(--orange);
    padding: 1px;
    margin-bottom: 15px;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .center .text p {
    font-weight: bold;
    font-size: 20px;
    margin: 18px 0;
    color: white;
    text-align: center;
  }

  .filterRow {
  padding: 0!important;
  width: 100%;
  margin: 0;
  height: 60vh!important;
}

textarea {
  resize: none;
}

.filterRectangle {
  width: 300px;
  height: 100%;
  background-color: rgb(255, 255, 255) !important;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.filterHeader p {
  margin: 25px 0 10px 0;
  font-size: 18px;
}

.filterHeader {
  width: 100%;
  border-bottom: 2px solid #ebebeb;
}

.filterRectangle > div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
} 

.filterRectangle div input {
  height: 35px!important;
  font-size: 14px;
}

.filterRectangle div select {
  height: 35px!important;
  font-size: 14px;
}

.pesquisa p {
  margin: 5px;
  margin-top: 25px!important;
  font-size: 14px;
}

.licenciatura p {
  margin: 5px;
  font-size: 14px;
}

.ordenar p {
  margin: 5px;
  font-size: 14px;
}

.tipo p {
  margin: 5px;
  font-size: 14px;
}

.licenciatura, .pesquisa, .ordenar, .tipo  {
  margin-bottom: 25px;
}

.filterRectangle > div > .col-2 {
  width: 100%;
}

.filterRectangle {
  height: 200px;
}

.filterRectangle .tipo .buttons .btn {
  width: 50%;
}

.filterRectangle .tipo .buttons {
  display: flex;
  height: 35px;
}

.filterRectangle .tipo .buttons button{
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filterRectangle .tipo {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.filterRectangle div p {
  color: rgb(92, 92, 92);
  text-align: left;
  font-weight: bold;
}

#nav {
  position: fixed !important;
  width: 100%;
}

.left-side-container {
  height: 100%;
}

/* .left-side-container .filter {
  height: 100%;
}

.left-side-container .filter .filterRow {
  height: 100% !important;
}

.left-side-container .filter .filterRow .filterRectangle {
  height: 100%;
} */

.btn-procura {
  margin-right: 5px;
}

.btn-oferta {
  margin-left: 5px;
}








.profileImage img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.row {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 150px;
}

.col-4 {
  margin-bottom: 25px;
}

.cardContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  border-radius: 15px;
  margin: 25px 0px 0 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
}

a {
  text-decoration: none;
}

.cardContainer p, h4 {
  color: var(--black);
}

.cardContent > .profileImage {
  padding: 10px;
}

.cardContent {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 120px;
}

.descricao {
  padding: 0 15px;
  text-align: left;
  font-size: 16px;
  margin: 15px 0;
  overflow-wrap: anywhere;
  position: relative;
}

.cardContent h4, .cardContent p {
  margin: 0;
}

.cardContent .actions {
  display: flex;
  width: 100%;
  justify-content: end;
  margin-bottom: 15px;
  padding-right: 20px;
}

.cardContent .actions .like {
  margin-right: 8px;
}

.cardContent .actions .like a:hover svg {
  color: green;
  width: 22px !important;
  height: 22px !important;
}

.cardContent .actions .like a svg {
  position: absolute;
  right: 60px;
  bottom: 15px;
  cursor: pointer;
}

.cardContent .actions .delete a svg {
  position: absolute;
  right: 20px;
  bottom: 15px;
  cursor: pointer;
}

.cardContent .actions .delete a:hover svg {
  color: red;
  width: 22px !important;
  height: 22px !important;
}

.cardContent .actions .delete {
  margin-left: 8px;
}

.cardContent .adData .data {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.cardContent .adData .data .header_data {
  display: flex;
  align-items:center;
}

.nome_curso > .texto_data {
  display: flex;
  justify-content: flex-start;
}

.cardContent .adData {
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
}

.cardContent .adData .data .header_data h4{
  font-weight: bold;
  margin-right: 5px;
  font-size: 14px;
}

.cardContent .adData .data h5 {
  font-size: 14px;
  color: grey !important;
  margin: 0;
}

.cardContent .adData .data p {
  font-size: 14px;
  color: grey !important;
  margin: 5px 0 0 0;
}

.adData {
  display: flex;
}

.right-side .title h3, .right-side-ae .title h3{
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin: 18px 0;
}

.right-side .title, .right-side-ae .title {
  background-color: var(--blue);
  padding: 1px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
}

.right-side-container {
  background-color: white;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  border-radius: 15px;
  min-height: 333px;
}

.right-side-ae-container {
  background-color: white;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  border-radius: 15px;
}

.right-side-ae-container .button button {
  width: 100%;
  background-color: var(--blue);
  border: none;
}

.right-side-ae-container .button {
  margin-top: 15px;
}

.right-side-ae-container .button button:hover {
  background-color: var(--orange);
}

.right-side-ae-container .form {
  padding: 15px;
}

.form {
  margin: 10px;
}

.form-name {
  padding-top: 10px;
}

.form-email {
  padding-top: 10px;
}

.form-message-container {
  padding-top: 10px;
}

.form-submit {
  padding-top: 10px;
  padding-bottom: 10px;
}

.form-submit button {
  width: 100%;
}

.actions .like span {
  position: absolute;
  bottom: 12px;
  right: 86px;
}


@media only screen and (max-width: 1800px) {
  .right-side, .right-side-ae {
    margin: 25px 250px 0 25px;
  }

  .right-side .title h3, .right-side-ae .title h3 {
    font-size: 18px;
  }

  .left-side {
    margin: 25px 25px 0 250px;
  }
}

  @media only screen and (max-width: 1500px) {
  .right-side, .right-side-ae {
    margin: 25px 150px 0 25px;
  }

  .left-side {
    margin: 25px 25px 0 150px;
  }
}

  @media only screen and (max-width: 1250px) {
  .right-side, .right-side-ae {
    margin: 25px 50px 0 25px;
  }

  .left-side {
    margin: 25px 25px 0 50px;
  }
}



</style>