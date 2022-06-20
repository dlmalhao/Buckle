<template>
  <div class="addPage">
    <b-container>
      <b-row>
        <b-col col lg="7">
          <img class="adImage" :src="especificAnnouncementData.img" />
        </b-col>
        <b-col col lg="5">
          <div class="specificAdInfo">
            <div class="text">
              <p class="adType">Anúncio {{especificAnnouncementData.tipo}}</p>
              <h3 class="specificAdTitle">{{especificAnnouncementData.titulo}}</h3>
              <div class="secondLine">
                <p class="announcerName">{{userData.nome + " " + userData.sobrenome}}</p>
                <div class="containerFavourites" v-if="getLoggedUser && this.userData.id != this.loggedUser.id">
                  <a @click="removeAnnouncementFavById()" v-if="didUserLikeThisAnnouncement()" ><i class="fas fa-bookmark" style="color: var(--orange);"></i></a>
                  <a @click="postAnnouncementFavById()" v-if="!didUserLikeThisAnnouncement()"><i class="far fa-bookmark"></i></a>
                </div>
              </div>
              <div class="userContent">
                <div class="adSpecificSummary">
                  <p class="announcerDescription">Descrição</p>
                  <p>
                    {{especificAnnouncementData.descricao}}
                  </p>
                </div>
                <div class="announcerCourse">
                  <p class="courseWritten">Curso</p>
                  <p class="courseName">{{userCourse.descricao_curso}}</p>
                </div>
                <div class="announcerTime">
                  <p class="timeWritten">Data</p>
                  <p class="timeNeeded">{{especificAnnouncementData.data}}</p>
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
          <img @click="goProfile" :src="userData.img" alt="">
        </div>
        <div class="userInfo">
          <div class="header">
            <h3>Sobre o criador</h3>
          </div>
          <div class="content">
            <p v-if="userData.descricao == '' || userData.descricao == null ">{{userData.nome + ' ' + userData.sobrenome + ' não tem descrição.'}}</p>
            <p v-else>{{userData.descricao}}</p>
          </div>
        </div>
        <div class="btnProfile">
          <b-button variant="dark" @click="goProfile">Perfil</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import {mapGetters,mapMutations, mapActions} from "vuex"

export default {
  data () {
    return {
      especificAnnouncementData: {},
      loggedUser: {},
      userData: {},
      userCourse: {},
      courses: {},
      // users: [],
      favs: [],
      // userEmail: "",
      // idAd: ""
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  mounted () {
    if(this.getLoggedUser) {
      this.loggedUser = this.getLoggedUser
    }
    this.loadingSpinner()
  },
  // created() {
  //   this.adEspecific = this.getAdSpecific(this.$route.params.id)
  //   this.users = this.getUsers
  //   this.favs = this.getFavs
  //   if(this.getLoggedUser) {
  //     this.loggedUser = this.getLoggedUser
  //   }
  //   this.SET_ACTIVE_PROFILE(this.adEspecific.email);
    
  //   this.SET_ACTIVE_AD(this.adEspecific.id)
  // },
  methods: {
    ...mapMutations(["ADD_FAV","REMOVE_FAV", "SET_ACTIVE_PROFILE", "SET_ACTIVE_AD"]),
    ...mapActions(["getEspecificAnnouncement","getUser","getCourses","getAnnouncementFavs", "postAnnouncementFavs", "removeAnnouncementFavs"]),
    

    // addFavourite () {
    //   const favData = {
    //     userEmail: this.loggedUser.email,
    //     adId: parseInt(this.$route.params.id),
    //     activeProfile : this.getActiveProfile
    //   }
    //   this.ADD_FAV(favData)
    //   console.log(this.favs);
    // },
    // removeFavourite() {
    //   let idx = this.favs.indexOf(this.favs.find((fav) => fav.userEmail == this.loggedUser.email && fav.adId == this.adEspecific.id))
    //   this.REMOVE_FAV(idx)
    // },

    // goProfileOtherPerson(){
    //   this.SET_ACTIVE_PROFILE(this.adEspecific.email);
    //   this.$router.push({name: 'perfil'}) 
    // }

    async getDataEspecificAnnouncement() {
      try {
        this.especificAnnouncementData = await this.getEspecificAnnouncement(this.$route.params.id);
        console.log(this.especificAnnouncementData)
        await this.getDataUser()
      } catch (err) {
         this.$swal('Erro ao requisitar Anuncio Especifico')
         console.log(err)
      }
    },

    async loadingSpinner() {

      this.$vs.loading ({color:'#F17941'})
      await this.getDataEspecificAnnouncement()
      await this.getAnnouncementFavsData()

      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 300);
    },

    async getDataUser() {
      try {
        let userID = this.especificAnnouncementData.utilizadorId
        this.userData = await this.getUser(userID);
        this.getCoursesData()
        console.log(this.userData)
      } catch (err) {
        this.$swal('Erro ao requisitar Utilizador')
      }
    },

    getEspecificCourseData() {
      this.userCourse = this.courses.find((course) => course.id == this.userData.courseId)
    },

    async getCoursesData() {
      try {
        this.courses = await this.getCourses();
        this.getEspecificCourseData()
      } catch (err) {
        this.$swal('Erro ao requisitar cursos')
        console.log(err)
      }
    },

    async getAnnouncementFavsData() {
      try {
        this.favs = await this.getAnnouncementFavs();
        console.log(this.favs)
      } catch (err) {
        this.$swal('Erro ao requisitar favoritos')
        console.log(err)
      }
    },

    goProfile() {
      // this.SET_ACTIVE_PROFILE(this.getLoggedUser.email);
      this.$router.push({
        name: "perfil",
        params: { id: this.userData.id },
      });
    },

    didUserLikeThisAnnouncement () {
      let did_user_like = false
      for(const fav of this.favs) {
        if(fav.id_utilizador_dado == this.loggedUser.id && fav.adID == this.$route.params.id) {
          did_user_like = true
        }
      }
      return did_user_like
    },

    async postAnnouncementFavById() {
      try {
        if (!this.didUserLikeThisAnnouncement()) {
          const response = await this.postAnnouncementFavs({
            adID: this.especificAnnouncementData.id,
            id_utilizador_dado: this.loggedUser.id
          });
          console.log(response);
          if (response.data.success) {
            this.$swal('','Anúncio adicionado aos favoritos!')
            this.getAnnouncementFavsData()
          }
        }
      } catch (err) {
        this.$swal('Erro ao adicionar aos favoritos!')
        console.log(err)
      }
    },

    async removeAnnouncementFavById() {
      try {
        let idx 
        for(const fav of this.favs) {
          if(fav.id_utilizador_dado == this.loggedUser.id && fav.adID == this.$route.params.id) {
            idx = fav.id
          }
        }
        const response = await this.removeAnnouncementFavs(idx)
        console.log(idx);
        if (response.data.success) {
          this.$swal('','Anúncio removido dos favoritos!')
          this.getAnnouncementFavsData()
        }
      } catch (err) {
        this.$swal('Erro ao remover dos favoritos')
        console.log(err)
      }
    },
  },
}

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
  font-weight: bold;
  margin: 0;
  cursor:default;
}

.courseWritten {
  font-weight: bold;
}

.announcerCourse {
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
  cursor: pointer;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  left: 40px;
  transition: all 0.2s ease;
}

.userImg img:hover {
  padding: 3px;
}

.userImg {
  width: 30%;
}

.userInfo {
  text-align: left;
  width: 50%;
  margin-right: 30px;
}

.btnProfile {
  width: 20%;
}

.btnProfile button {
  width: 100px;
  height: 50px;
  background-color: var(--orange) ;
  font-weight: bold;
  border: 0;
  margin-right: 60px;
}

.btnProfile button:hover {
  background-color: var(--border);
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

</style>
