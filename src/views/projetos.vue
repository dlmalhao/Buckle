<template>
  <div class="generalContainer">
    <header class="masthead">
      <picture>
        <source type="image/webp" srcset="../assets/img/projectosMain.webp">
        <source type="image/jpg" srcset="../assets/img/projectosMain.jpg">
        <img src="../assets/img/projectosMain.jpg" class="imageBox">
      </picture>
      <div class="intro-body">
        <b-container>
          <b-row>
            <b-col col mx="auto" class="headerText">
              <h1 class="headerTitle">Projetos</h1>
              <p class="headerSubTitle">
                Mostra às empresas aquilo que tens para oferecer.
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </header>
    <div class="addProjectButton" @click="showModal = true" v-b-modal.modal-1>
      <p>+</p>
    </div>
    <section>
      <b-row class="filterRow">
        <div class="filterRectangle">
          <div class="div">
            <div class="filterHeader">
              <p>Filtrar por:</p>
            </div>
            <b-col cols="6">
              <div class="pesquisa">
                <p>Pesquisa</p>
                <b-form-input type="text" v-model="search"></b-form-input>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="licenciatura">
                <p>Licenciatura</p>
                <div class="form-selects">
                  <b-form-select v-model="graduation.selected" :options="graduation.options" class="form-select cursos"></b-form-select>
                </div>
              </div>
            </b-col>
          </div>
        </div>
      </b-row>
    
      <b-row style="padding:0;">
        <b-col xl="4" lg="4" cols="6" style="margin-bottom: 20px;" v-for="(project, index) in this.filteredProjects" :key="index" >
          <router-link :to="{ name: 'projetoEspecifico', params: { id: project.id }}">
            <div class="cardContainer">
              <div class="cardImage">
                <img v-if="!loadingProjetos && !loadingImagensProjetos" :src="allProjectImages.filter((image) => image.projetoID == project.id)[0].descricao" alt="">
              </div>
              <div class="cardContent">
                <div class="adData">
                  <div class="profileImage">
                    <img :src="users.find((user) => user.id == project.utilizadorId).img" alt="">
                  </div>
                  <div class="nome_curso">
                    <h4>{{users.find((user) => user.id == project.utilizadorId).nome + " " + users.find((user) => user.id == project.utilizadorId).sobrenome}}</h4>
                    <div class="curso">
                      <p>de&nbsp;</p>
                      <p>{{users.find((user) => user.id == project.utilizadorId).course.descricao_curso}}</p>
                    </div>
                  </div>
                </div>
                <div class="descricao">
                  <p>{{project.descricao}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </b-col>
      </b-row>
    </section>
    <div v-if="showModal">
        <b-modal hide-footer id="modal-1" title="Adicionar projeto">
          <form @submit.prevent="addProject">
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
            <b-form-group v-for="(image, index) in this.images" :key="index"
              label="Imagem"
              label-for="img-input"
              class="outsideDiv"
            >
              <b-form-input
                id="img-input"
                required
                v-model="image.img"
              ></b-form-input>
              <div class="buttonsModalDiv">
                <b-button variant="success" v-if="index == images.length-1" @click="addInput">+</b-button>
              </div>
              <div class="buttonsModalDiv">
                <b-button variant="danger" class="removeButtonModal" v-if="index != 0" @click="removeInput(index)">x</b-button>
              </div>
            </b-form-group>
            <b-form-group label="Descrição" label-for="descricao-input">
              <b-form-textarea
                id="descricao-input"
                v-model="form.descricao"
              ></b-form-textarea>
            </b-form-group>
            <div class="submitModalAddProject">
              <input type="submit" class="btn btn-primary" value="Adicionar" />
            </div>
          </form>
        </b-modal>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"

export default {
  data() {
    return {
      loggedUser: {},
      projects: [],
      allProjectImages: [],
      loadingProjetos: false,
      loadingImagensProjetos: false,
      users: [],
      form : {
        titulo: "",
        descricao: "",
      },
      graduation: {
        selected: null,
        options: [
          { value: null, text: "Tudo" },
          { value: "tsiw", text: "TSIW" },
          { value: "tcav", text: "TCAV" },
          { value: "design-grafico", text: "Design Gráfico" },
          { value: "design-industrial", text: "Design Industrial" },
          { value: "fotografia", text: "Fotografia" },
          { value: "multimedia", text: "Multimédia" },
        ],
      },
      order: {
        selected: null,
        options: [
          { value: null, text: "Tudo" },
          { value: "recentes", text: "Mais recentes" },
          { value: "antigos", text: "Mais antigos" },
        ],
      },
      type: {
        isOferta: false,
        isProcura: false,
      },
      search: "",
      showModal : false,
      images: [{img: ""}]
    }
  },
  computed : {
    ...mapGetters(["getLoggedUser"]),

    filteredProjects () {
      let filterProjects = this.projects.slice(0)
      let filterProjectsCopy = []
      if(this.graduation.selected != null) {
        for(let ad of filterProjects) {
          let utilizadorID = ad.utilizadorId
          // Utilizador que criou o anuncio
          let utilizador = this.users.find((user) => user.id == utilizadorID)

          // Filtro por Curso
          if(utilizador.course.value == this.graduation.selected) {
            filterProjectsCopy.push(ad) 
          }
        }
        filterProjects = filterProjectsCopy
      }
 
      // Filtro por pesquisa
      if(this.search != "") {
        filterProjects = filterProjects.filter((ad)=> ad.descricao.toLowerCase().replace(/\s/g, '').includes(this.search.toLowerCase().replace(/\s/g, '')) || this.users.find((user) => user.id == ad.utilizadorId).nome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) || this.users.find((user) => user.id == ad.utilizadorId).sobrenome.toLowerCase().includes(this.search.toLowerCase().replace(/\s/g, '')) )
      }
      return filterProjects
    }
  },

  mounted () {
    if(this.getLoggedUser) {
      this.loggedUser = this.getLoggedUser
    }
    this.loadingSpinner()
  },

   methods: {
    ...mapActions(["getProjects","getUsers", "getCourses","getProjectImages","addProject","postProjectImages","postProject"]),

    addInput() {
      this.images.push({
          img: ""
      });
    },

    async loadingSpinner () {
      this.$vs.loading ({color:'#F17941'})

      await this.getUsersData()
      await this.getProjectImagesData()
      await this.getProjectsData()

      setTimeout( ()=> {
        this.$vs.loading.close()
      },300);
    },

    removeInput(index) {
      this.images.splice(index, 1);
    },

    async getProjectsData() {
      try {
        this.loadingProjetos = true
        this.projects = await this.getProjects();
        this.loadingProjetos = false
      } catch (err) {
        this.$swal('Erro ao requisitar projetos')
        console.log(err)
      }
    },

    async addProject() {
      try {
        let today = new Date()
        let project = {
          titulo: this.form.titulo,
          descricao: this.form.descricao,
          utilizadorId: this.loggedUser.id,
          data: today.getFullYear()+'-'+( today.getMonth()+1)+'-'+ today.getDate(),
        }
        
        const response = await this.postProject(project);

        await this.getProjectsData()
        if (response.data.success) {
          this.$swal('','Projeto criado com sucesso')
        }
      } catch (err) {
        this.$swal('Erro ao criar projeto!')
        console.log(err)
      }
      try {
        for(let image of this.images) {
          let imageData = {
            projetoID : this.projects[0].id ,
            descricao : image.img
          }
          await this.postProjectImages(imageData)
        }
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },

    async getUsersData() {
      try {
        this.users = await this.getUsers();
        this.getCoursesData()
        this.getProjectsData()
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

    async getProjectImagesData() {
      try {
        this.loadingImagensProjetos = true
        this.allProjectImages = await this.getProjectImages();
        this.loadingImagensProjetos = false
      } catch (err) {
        this.$swal('Erro ao requisitar imagens de projetos')
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

.addProjectButton {
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

.addProjectButton p {
  margin-bottom: 0 !important;
  cursor: pointer;
  font-size: 25px;
}

.addProjectButton:hover {
  width: 58px;
  height: 58px;
  right: 16px;
  bottom: 446px;
}

.submitModalAddProject {
  display: flex;
  justify-content: flex-end;
  margin-top: 2vh;
}

.submitModalAddProject input {
  background-color: var(--orange);
  border: none;
  color: white;
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
  height: 220px;
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

.filterRow {
  margin-bottom: 50px;
}

.filterRectangle .col-6 {
  width: 100%;
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


</style>

