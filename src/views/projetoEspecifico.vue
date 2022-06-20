<template>
  <div class="addPage">
    <b-container>
      <b-row>
        <b-col col lg="7">
          <div class="imagesCarousel" style="height: 100%">
            <b-carousel
              style="text-shadow: 0px 0px 2px #000; height: 100%"
              no-animation
              controls
              indicators
              img-width="1024"
              img-height="600"
            >
              <div
                class="div"
                v-for="(image, index) in thisProjectImages"
                :key="index"
              >
                <b-carousel-slide :img-src="image.descricao"></b-carousel-slide>
              </div>
            </b-carousel>
          </div>
        </b-col>
        <b-col col lg="5">
          <div class="specificAdInfo">
            <div class="text">
              <p class="adType">Projeto</p>
              <h3 class="specificAdTitle">{{ especificProjectData.titulo }}</h3>
              <div class="secondLine">
                <p class="announcerName">
                  {{ userData.nome + " " + userData.sobrenome }}
                </p>
                <div class="containerFavourites" v-if="getLoggedUser">
                  <p v-if="didUserLikeThisProject()">{{ favsCount() }}</p>
                  <a
                    @click="removeProjectFavById()"
                    v-if="
                      didUserLikeThisProject() &&
                      this.userData.id != this.loggedUser.id
                    "
                    ><i class="fas fa-bookmark" style="color: var(--orange)"></i
                  ></a>
                  <p v-if="!didUserLikeThisProject()">{{ favsCount() }}</p>
                  <a
                    @click="postProjectFavById()"
                    v-if="
                      !didUserLikeThisProject() &&
                      this.userData.id != this.loggedUser.id
                    "
                    ><i class="far fa-bookmark"></i
                  ></a>
                </div>
              </div>
              <div class="userContent">
                <div class="adSpecificSummary">
                  <p class="announcerDescription">Descrição</p>
                  <p>
                    {{ especificProjectData.descricao }}
                  </p>
                </div>
                <div class="announcerCourse">
                  <p class="courseWritten">Curso</p>
                  <p v-if="!loadingUser && !loadingEspecificProjectData">
                    {{
                      users.find(
                        (user) => user.id == especificProjectData.utilizadorId
                      ).course.descricao_curso
                    }}
                  </p>
                </div>
                <div class="announcerTime">
                  <p class="timeWritten">Data</p>
                  <p class="timeNeeded">{{ especificProjectData.data }}</p>
                </div>
              </div>
            </div>
            <div class="button">
              <!-- <b-button type="button" @click="goProfileOtherPerson">Contactar</b-button> -->
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <div class="slideBg">
        <div class="userImg">
          <img :src="userData.img" />
        </div>
        <div class="userInfo">
          <div class="header">
            <h3>Sobre o criador</h3>
          </div>
          <div class="content">
            <p v-if="userData.descricao == '' || userData.descricao == null">
              {{
                userData.nome + " " + userData.sobrenome + " não tem descrição."
              }}
            </p>
            <p v-else>{{ userData.descricao }}</p>
          </div>
        </div>
      </div>
    </b-container>
    <b-container>
      <b-row>
        <form @submit.prevent="addNewComment" class="newComment" 
          v-if="getLoggedUser.id != especificProjectData.utilizadorId">
            <b-form-group>
              <b-form-input
                placeholder="Adicionar Comentário..."
                id="comentario-input"
                required
                v-model="commentProject.desc_comentario"
              ></b-form-input>
            </b-form-group>
            <div class="submitComment">
              <input type="submit" class="btn btn-primary" value="Comentar" />
            </div>
          </form>
          <div
          class="getComments"
          v-for="(comment, index) in commentsActiveProject"
          :key="index"
        >
        <img :src="comment.img" class="commentImg">
        <div>
          <h4>{{comment.nome}} {{comment.sobrenome}}</h4>
          <p>{{comment.desc_comentario}}</p>
        </div>
        
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      project: {},
      loggedUser: {},
      users: [],
      favs: [],
      projects: [],
      especificProjectData: {},
      userCourse: {},
      courses: [],
      userData: {},
      loadingUser: true,
      allProjectImages: [],
      loadingEspecificProjectData: true,
      thisProjectImages: [],
      newComment: "",
      commentProject: {
        desc_comentario: "",
        id_quem_comentou: 0,
        id_projeto: 0,
      },
      commentsActiveProject: [],
      getUserData:{}
    };
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  created() {
    if (this.getLoggedUser) {
      this.loggedUser = this.getLoggedUser;
    }
  },

  mounted() {
    this.getCommentsProjectById();
    this.loadingSpinner()
  },
  methods: {
    ...mapActions([
      "getProjectImages",
      "getUsers",
      "getProjects",
      "getEspecificProject",
      "getUser",
      "getCourses",
      "getProjectImages",
      "getProjectFavs",
      "postProjectFavs",
      "removeProjectFavs",
      "addCommentsProject",
      "getCommentsProject",
    ]),

    async getUsersData() {
      try {
        this.loadingUser = true;
        this.users = await this.getUsers();
        this.loadingUser = false;
        this.getProjectsData();
        await this.getDataEspecificProject();
        this.getProjectImagesData();
      } catch (err) {
        this.$swal("Erro ao requisitar utilizadores");
        console.log(err);
      }
    },

    async getProjectsData() {
      try {
        this.projects = await this.getProjects();
      } catch (err) {
        this.$swal("Erro ao requisitar projetos");
        console.log(err);
      }
    },

    async loadingSpinner() {

      this.$vs.loading ({color:'#F17941'})
      await this.getDataEspecificProject()
      await this.getProjectFavsData()

      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 300);
    },

    async getDataEspecificProject() {
      try {
        this.loadingEspecificProjectData = true;
        this.especificProjectData = await this.getEspecificProject(
          this.$route.params.id
        );
        this.loadingEspecificProjectData = false;
        this.getDataUser();
      } catch (err) {
        this.$swal("Erro ao requisitar Projeto Especifico");
        console.log(err);
      }
    },

    getEspecificCourseData() {
      this.userCourse = this.courses.find(
        (course) => course.id == this.userData.courseId
      );
    },

    async getCoursesData() {
      try {
        this.courses = await this.getCourses();
        this.getEspecificCourseData();
      } catch (err) {
        this.$swal("Erro ao requisitar cursos");
        console.log(err);
      }
    },

    async getDataUser() {
      try {
        let userID = this.especificProjectData.utilizadorId;
        this.userData = await this.getUser(userID);
        this.getCoursesData();
      } catch (err) {
        this.$swal("Erro ao requisitar Utilizador");
      }
    },

    async getProjectImagesData() {
      try {
        this.allProjectImages = await this.getProjectImages();
        this.getThisProjectImages();
      } catch (err) {
        this.$swal("Erro ao requisitar imagens de projetos");
        console.log(err);
      }
    },

    getThisProjectImages() {
      this.thisProjectImages = this.allProjectImages.filter(
        (image) => image.projetoID == this.$route.params.id
      );
    },

    async getProjectFavsData() {
      try {
        this.favs = await this.getProjectFavs();
        console.log(this.favs);
      } catch (err) {
        this.$swal("Erro ao requisitar favoritos");
        console.log(err);
      }
    },

    didUserLikeThisProject() {
      let did_user_like = false;
      for (const fav of this.favs) {
        if (
          fav.id_utilizador_dado == this.loggedUser.id &&
          fav.projectID == this.$route.params.id
        ) {
          did_user_like = true;
        }
      }
      return did_user_like;
    },

    favsCount() {
      return this.favs.filter(
        (fav) => fav.projectID == this.$route.params.id
      ).length;
    },

    async postProjectFavById() {
      try {
        if (!this.didUserLikeThisProject()) {
          const response = await this.postProjectFavs({
            projectID : this.$route.params.id,
            id_utilizador_dado: this.loggedUser.id,
          });
          if (response.data.success) {
            this.$swal("", "Projeto adicionado aos favoritos!");
            this.getProjectFavsData();
          }
        }
      } catch (err) {
        this.$swal("Erro ao adicionar aos favoritos!");
        console.log(err);
      }
    },

    async removeProjectFavById() {
      try {
        let idx;
        for (const fav of this.favs) {
          if (
            fav.id_utilizador_dado == this.loggedUser.id &&
            fav.projectID == this.$route.params.id
          ) {
            idx = fav.id;
            console.log(idx);
          }
        }
        const response = await this.removeProjectFavs(idx);
        if (response.data.success) {
          this.$swal("", "Projeto removido dos favoritos!");
          this.getProjectFavsData();
        }
      } catch (err) {
        this.$swal("Erro ao remover dos favoritos");
        console.log(err);
      }
    },

    async addNewComment() {
      try {

        const response = await this.addCommentsProject({
          id: this.$route.params.id,
          desc_comentario: this.commentProject.desc_comentario,
          id_quem_comentou: this.getLoggedUser.id,
          id_projeto: this.$route.params.id,
        });

        this.especificProjectData = await this.getEspecificProject(
          this.$route.params.id
        );
        if (response.data.success) {
          this.$swal(
            "Novo comentário!",
            "Novo comentário efetuado com sucesso!",
            "success"
          );
        }
        window.location.reload();
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    async getCommentsProjectById() {
      try {
        this.commentProject = await this.getCommentsProject(
          this.$route.params.id
        );
        for (const comment of this.commentProject) {
          if (comment.id_projeto == this.$route.params.id) {
            this.getUserData = await this.getUser(
              comment.id_quem_comentou
            )
            comment.nome = this.getUserData.nome
            comment.sobrenome = this.getUserData.sobrenome
            comment.img = this.getUserData.img
            this.commentsActiveProject.push(comment);
          }
        }
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },
  },
};
</script>

<style scoped>
.specificAdInfo {
  text-align: left;
  width: 100%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.specificAdInfo p {
  margin: 0;
}

button {
  margin: 0;
}

.row {
  margin-top: 30px;
  margin-bottom: 80px;
}

.adImage {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 451px;
  border-radius: 15px;
}

.adType {
  font-size: 18px;
  line-height: 21px;
  font-family: var(--lightFont);
  color: #353535;
}

.specificAdTitle {
  font-size: 45px;
  line-height: 65px;
  font-family: var(--mediumFont);
  color: #353535;
}

.announcerName {
  margin: 0;
  font-size: 20px;
  color: #353535;
  font-family: var(--regularFont);
}

.secondLine {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 7px;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--black);
}

.containerFavourites {
  display: flex;
  align-items: flex-end;
}

.containerFavourites i {
  font-size: 25px;
  margin-right: 10px;
  transition: 0.3s ease;
}

.containerFavourites a {
  text-decoration: none;
  color: #353535;
  cursor: pointer;
}

.containerFavourites a:hover i {
  text-decoration: none;
  color: var(--orange);
}

.containerFavourites p {
  margin-right: 10px !important;
  margin-bottom: 3px !important;
  font-weight: bold;
  margin: 0;
  cursor: default;
}

.courseWritten {
  font-weight: bold;
}

.announcerCourse {
  margin-top: 15px;
}

.announcerLink {
  margin-top: 15px;
}

.announcerDescription {
  font-weight: bold;
}

.announcerTime {
  margin-top: 15px;
}

.announcerTime .timeWritten {
  font-weight: bold;
}

.announcerLink .linkWritten {
  font-weight: bold;
}

.button button {
  background-color: var(--orange);
  border: none;
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  transition: 0.3s ease;
}

.button button:hover {
  background-color: var(--black);
}

.userContent {
  margin-top: 30px;
}

.slideBg {
  background: var(--black);
  color: white;
  border-radius: 15px;
  height: 135px;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
}

.userImg img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  left: 40px;
}

.userImg {
  width: 33%;
}

.userInfo {
  text-align: left;
  width: 67%;
  margin-right: 30px;
}

.userInfo .header h3 {
  font-size: 24px;
  font-weight: bold;
  color: var(--orange);
}

.userInfo .content p {
  font-size: 16px;
  font-weight: light;
}

.carousel-item img {
  height: 200px !important;
}

/* Css novo */
.newComment {
  display: flex;
  flex-direction: row;
  margin-bottom: 5vh;
}

.newComment fieldset {
  width: 90%;
}

.newComment .submitComment input {
  background-color: var(--orange);
  border-color: var(--orange);
}
.commentImg{
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius:50%;
}

.getComments{
  display: flex;
  flex-direction: row;
  margin-bottom: 2vh;
}

.getComments img{
 margin-right: 40px;
}

.getComments div h4{
 font-size: 20px;
 text-align: left;
 font-weight: bold;
}
.getComments div {
 text-align: left;
}

</style>
