<template>
  <div class="generalContainer">
    <header class="masthead">
      <picture>
        <source type="image/webp" srcset="../assets/img/anunciosPage.webp">
        <source type="image/jpg" srcset="../assets/img/anunciosPage.jpg">
        <img src="../assets/img/anunciosPage.jpg" class="imageBox">
      </picture>
      <div class="intro-body">
        <b-container>
          <b-row>
            <b-col col mx="auto" class="headerText">
              <h1 class="headerTitle">Anúncios</h1>
              <p class="headerSubTitle">
                Finalmente, um espaço de união entre os alunos da ESMAD.
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </header>
    <div class="addAnnouncementButton" @click="showModal = true" v-b-modal.modal-1>
      <p>+</p>
    </div>
    <section>
      <b-row class="filterRow">
        <div class="filterRectangle">
          <div class="div">
            <div class="filterHeader">
              <p>Filtrar por:</p>
            </div>
            <b-col cols="4">
              <div class="pesquisa">
                <p>Pesquisa</p>
                <b-form-input type="text" v-model="search" ></b-form-input>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="licenciatura">
                <p>Licenciatura</p>
                <div class="form-selects">
                  <b-form-select  v-model="graduation.selected" :options="graduation.options" class="form-select cursos"></b-form-select>
                </div>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="tipo">
                <p>Tipo</p>
                <div class="buttons">
                  <b-button class="btn-procura" v-if="type.isProcura == false" @click="type.isProcura = true; type.isOferta = false" :class="{ active: type.isProcura }" >Procura</b-button>
                  <b-button class="btn-procura" v-if="type.isProcura == true" @click="type.isProcura = false" :class="{ active: type.isProcura }" >Procura</b-button>
                  <b-button class="btn-oferta" v-if="type.isOferta == false" @click="type.isProcura = false; type.isOferta = true" :class="{ active: type.isOferta }" >Oferta</b-button>
                  <b-button class="btn-oferta" v-if="type.isOferta == true" @click="type.isOferta = false" :class="{ active: type.isOferta }" >Oferta</b-button>
                 
                </div>
              </div>
            </b-col>
          </div>
        </div>
      </b-row>
    
      <b-row style="padding:0;">
        <b-col xl="4" lg="4" cols="6" style="margin-bottom: 20px;" v-for="(ad, index) in this.filteredAds" :key="index" >
          <router-link :to="{ name: 'anuncioEspecifico', params: { id: ad.id }}">
            <div class="cardContainer">
              <div class="cardImage">
                <img :src="ad.img" alt="">
              </div>
              <div class="cardContent">
                <div class="adData">
                  <div class="profileImage">
                    <!-- <img :src="users.find((user) => user.id == ad.utilizadorId).img" alt=""> --><img :src="users.find((user) => user.id == ad.utilizadorId).img" alt="">
                  </div>
                  <div class="nome_curso">
                    <h4>{{users.find((user) => user.id == ad.utilizadorId).nome + " " + users.find((user) => user.id == ad.utilizadorId).sobrenome}}</h4>
                    <div class="curso">
                      <p>de&nbsp;</p>
                      <p>{{users.find((user) => user.id == ad.utilizadorId).course.descricao_curso}}</p>
                    </div>
                  </div>
                </div>
                <div class="descricao">
                  <p>{{ad.descricao}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </b-col>
      </b-row>
    </section>
    <div v-if="showModal">
        <b-modal hide-footer id="modal-1" title="Adicionar anúncio">
          <form @submit.prevent="addAnnouncement">
            <b-form-group
              label="Titulo"
              label-for="titulo-input"
              invalid-feedback="Titulo é obrigatório"
            >
              <b-form-input
                id="titulo-input"
                required
                v-model="form.titulo"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Imagem"
              label-for="img-input"
              invalid-feedback="Imagem é obrigatória"
            >
              <b-form-input
                id="img-input"
                required
                v-model="form.img"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Descrição" label-for="descricao-input">
              <b-form-textarea
                id="descricao-input"
                v-model="form.descricao"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group 
              label="Tipo"
              label-for="tipo-input"
              invalid-feedback="Tipo é obrigatório"
            >
              <b-form-select  v-model="announcementTypes.selected" :options="announcementTypes.options" class="form-select"></b-form-select>
            </b-form-group>
            <div class="submitModalAddAnnouncement">
              <input type="submit" class="btn btn-primary" value="Adicionar" />
            </div>
          </form>
        </b-modal>
      </div>
  </div>
  
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {
  data() {
    return {
      loggedUser: {},
      users: [],
      courses: [],
      graduation: {
        selected: null,
        options: []
      },
      order: {
        selected: null,
        options: [
          { value: null, text: "Tudo" },
          { value: "recentes", text: "Mais recentes" },
          { value: "antigos", text: "Mais antigos" },
        ],
      },
      announcementTypes: {
        selected: null,
        options: [
          { value: null, text: "" , disabled: true },
          { value: "Oferta", text: "Oferta" },
          { value: "Procura", text: "Procura" },
        ]
      },
      form: {
        titulo: "",
        descricao: "",
        img: "",
      },
      type: {
        isOferta: false,
        isProcura: false,
      },
      search: "",
      announcementsData: [],
      showModal : false,
      isLoading : false
    }
  },
  computed : {
    ...mapGetters(["getLoggedUser"]),

    // loadingSpinner () {
    //   if(this.isLoading) {

    //     this.$vs.loading ()
    //   }
    //   if(!this.isLoading) {
    //     this.$vs.loading.close ()
    //   }
    // },

    filteredAds () {
      let filterAds = this.announcementsData.slice(0)
      let filterAdsCopy = []
      if(this.graduation.selected != null) {
        for(let ad of filterAds) {
          let utilizadorID = ad.utilizadorId
          // Utilizador que criou o anuncio
          let utilizador = this.users.find((user) => user.id == utilizadorID)

          // Filtro por Curso
          if(utilizador.course.value == this.graduation.selected) {
            filterAdsCopy.push(ad) 
          }
        }
        filterAds = filterAdsCopy
      }

      // Filtro por Tipo de Anuncio
      if(this.type.isOferta) {
        filterAds = filterAds.filter((ad)=> ad.tipo == "Oferta")
      }
      if(this.type.isProcura) {
        filterAds = filterAds.filter((ad)=> ad.tipo == "Procura")
      }

      // Filtro por pesquisa
      if(this.search != "") {
        filterAds = filterAds.filter((ad)=> ad.descricao.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().replace(/\s/g, '')) || this.users.find((user) => user.id == ad.utilizadorId).nome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) || this.users.find((user) => user.id == ad.utilizadorId).sobrenome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) )
      }
      return filterAds
    }
  },

  mounted () {
    if(this.getLoggedUser) {
      this.loggedUser = this.getLoggedUser
    }
    this.loadingSpinner()
  },


   methods: {
    ...mapActions(["getAnnouncements","getUsers", "getCourses", "postAnnouncement"]),

    async getAnnouncementsData() {
      try {
        this.announcementsData = await this.getAnnouncements(); 
        
      } catch (err) {
        this.$swal('Erro ao requisitar anúncios')
        console.log(err)
      }
    },

    async loadingSpinner() {

      this.$vs.loading ({color:'#F17941'})
      await this.getUsersData()
      await this.getAnnouncementsData()
      await this.getCoursesData()

      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 300);
    },

    async getUsersData() {
      try {
        this.users = await this.getUsers();
      } catch (err) {
        this.$swal('Erro ao requisitar utilizadores')
        console.log(err)
      }
    },

    async getCoursesData() {
      try {
        this.courses = await this.getCourses();
        this.getCoursesOptions()
      } catch (err) {
        this.$swal('Erro ao requisitar cursos')
        console.log(err)
      }
    },

    getCoursesOptions () {
      let optionsData = []
      for(let course of this.courses) {
        let opt = {value: course.value, text: course.descricao_curso}
        optionsData.push(opt)
      }
      this.graduation.options = optionsData
    },

    async addAnnouncement() {
      try {
        let today = new Date()
        let ad = {
          titulo: this.form.titulo,
          descricao: this.form.descricao,
          img: this.form.img,
          tipo: this.announcementTypes.selected,
          utilizadorId: this.loggedUser.id,
          data: today.getFullYear()+'-'+( today.getMonth()+1)+'-'+ today.getDate(),
        }
        const response = await this.postAnnouncement(ad);
        this.S()
        if (response.data.success) {
          this.$swal('','Anúncio criado com sucesso')
        }
      } catch (err) {
        this.$swal('Erro ao criar anúncio!')
        console.log(err)
      }
    },
  },
}


</script>


<style scoped>


html, body {
  overflow-x:hidden ;
} 

.masthead {
  height: 507px;
  margin-bottom: 80px;
}

.masthead img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.generalContainer {
  background-color: #ebebeb;
}

.generalContainer section {
  display: flex;
}

.filterRow {
  padding: 0!important;
  width: auto !important;
  height: 440px!important;
  margin-bottom: 50px !important;
}

.filterRectangle {
  width: 300px;
  height: 100%;
  border-radius: 15px;
  background-color: rgb(255, 255, 255) !important;
  margin-left: 15px;
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
  padding:0 30px 30px 30px;
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

.btn-procura {
  margin-right: 5px;
}

.btn-oferta {
  margin-left: 5px;
}

.headerText {
  position: absolute;
  top: 30%;
  left: 0;
  line-height: 43px;
  text-align: center;
  z-index: 10;
  color: white;
}

.headerTitle{
font-weight: 500;
font-size: 96px;
line-height: 100px;
}

.headerSubTitle{
font-weight: 300;
font-size: 36px;
line-height: 43px;
}

.cardImage img {
  width: 100%;
  height: 340px;
  border-radius: 5px 5px 0 0;
  object-fit: cover;
}

.cardImage {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  height: 220px;
}

.profileImage img {
  width: 40px;
  height: 40px;
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
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
}

.cardContainer:hover .cardImage {
  filter: grayscale(80%);
}

.cardContainer:hover .descricao > p {
  color: var(--orange);
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
  height: 120px;
}
.addAnnouncementButton {
  position: fixed;
  background-color: var(--orange);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  bottom: 450px;
  right: 20px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.filterRectangle .col-4 {
  width: 100%;
}

.addAnnouncementButton p {
  margin-bottom: 0 !important;
  cursor: pointer;
  font-size: 25px;
}

.addAnnouncementButton:hover {
  width: 58px;
  height: 58px;
  right: 16px;
  bottom: 446px;
}


.descricao {
  padding: 0 15px;
  text-align: left;
  font-size: 16px;
  margin-top: 15px;
  position: relative;
}

.descricao p{
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.cardContent h4, .cardContent p {
  margin: 0;
}

.cardContent .adData .nome_curso {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.nome_curso > .curso {
  display: flex;
  justify-content: flex-start;
}

.cardContent .adData {
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
}

.cardContent .adData .nome_curso h4{
  font-weight: bold;
  font-size: 14px;
}

.cardContent .adData .nome_curso p {
  font-size: 14px;
  color: grey !important;
}

.adData {
  display: flex;
}

.tipo .buttons .active {
  background: var(--orange);
  border: none;
}

.submitModalAddAnnouncement {
  display: flex;
  justify-content: flex-end;
  margin-top: 2vh;
}

.submitModalAddAnnouncement input {
  background-color: var(--orange);
  border: none;
  color: white;
}

/* .btnFilter {
  background: #f17941;
  border-radius: 5px;
}

#searchInput {
  height: 35px;
  width: 230px;
  background: #ffffff;
  border: 1px solid rgba(241, 121, 65, 0.6);
  box-sizing: border-box;
  border-radius: 5px;
}

.filterSelect {
  height: 35px;
  width: 180px;
  background: #ffffff;
  border: 1px solid rgba(241, 121, 65, 0.6);
  box-sizing: border-box;
  border-radius: 5px;
}
.cardAd {
  height: 310px;
  background: rgba(255, 255, 255, 0.692);
  border: 1px solid rgba(53, 53, 53, 0.8);
  box-sizing: border-box;
  border-radius: 15px 15px 15px 15px;
}

.cardAvatar {
  position: absolute;
  width: 72.86px;
  height: 72.86px;
  left: 10px;
  object-fit: cover;
  border: 1px solid #353535;
  box-sizing: border-box;
  border-radius: 10px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.cardContent {
  margin-top: 10px;
}

.cardTitle {
  font-family: var(--mediumFont);
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 15px;
  display: flex;
  align-items: center;

  color: #353535;
}

.titleCourse {
  font-family: var(--regularFont);
  font-size: 16px;
  margin-left: 5px;
  color: rgba(53, 53, 53, 0.48);
}

.cardText {
  font-family: var(--regularFont);
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: left;
  display: flex;
  align-items: center;
  color: #353535;
}

.btnShow {
  width: 149px;
  height: 38px;
  background: #f17941;
  border-radius: 5px;
  border: none;
  margin-top: 50px;
  margin-bottom: 50px;
} */
</style>
