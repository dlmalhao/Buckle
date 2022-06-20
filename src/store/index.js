import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    users: localStorage.users
      ? JSON.parse(localStorage.users)
      : [
          {
            first_name: "Test",
            last_name: "User",
            course: "multimedia",
            gender: "Masculino",
            email: "user@esmad.ipp.pt",
            password: "Esmad_2122",
            role: "user",
            status: "active",
            profileImg:
              "https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            description: "Estudante teste",
            imgBg:
              "https://media.istockphoto.com/photos/live-video-streaming-media-entertainment-technology-on-laptop-and-picture-id1218395365?b=1&k=20&m=1218395365&s=170667a&w=0&h=DNmqcjDzFNqFqHH0LjdscsDiTzbqOpddOeN4LfePFSE=",
          },
          {
            first_name: "Test",
            last_name: "Admin",
            course: "tsiw",
            gender: "Masculino",
            email: "admin@esmad.ipp.pt",
            password: "Esmad_2122",
            role: "admin",
            status: "active",
            profileImg:
              "https://c.tenor.com/wMM9ZJsWz-YAAAAC/bruno-very-funny.gif",
            description: "Administrador",
            imgBg:
              "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
          },
          {
            first_name: "João",
            last_name: "Silva",
            course: "tsiw",
            gender: "Masculino",
            email: "joao@esmad.ipp.pt",
            password: "Esmad_2122",
            role: "user",
            status: "active",
            profileImg:
              "https://images.unsplash.com/photo-1521061972219-a1894a27a040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
            description: "Aluno do 2 ano de tsiw",
            imgBg:
              "https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-deve-picture-id537331500?b=1&k=20&m=537331500&s=170667a&w=0&h=-OawbbTR9TwfewLYKlaU-_cn1m_dq1WLpBK1qubFhGI=",
          },
          {
            first_name: "Leonor",
            last_name: "Campos",
            course: "multimedia",
            gender: "Masculino",
            email: "leonor@esmad.ipp.pt",
            password: "Esmad_2122",
            role: "user",
            status: "active",
            profileImg:
              "https://images.unsplash.com/photo-1529232356377-57971f020a94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
            description: "Aluna do 3 ano de multimédia",
            imgBg:
              "https://images.unsplash.com/photo-1485894608275-668ad1c2d34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          },
          {
            first_name: "Tiago",
            last_name: "Amaral",
            course: "tcav",
            gender: "Masculino",
            email: "tiago@esmad.ipp.pt",
            password: "Esmad_2122",
            role: "user",
            status: "active",
            profileImg:
              "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            description: "Aluno do primeiro ano de tcav",
            imgBg:
              "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          },
        ],
    ads: localStorage.ads
      ? JSON.parse(localStorage.ads)
      : [
          {
            title: "Fotografias",
            description:
              "Preciso que alguém me empreste uma câmara por um dia.",
            course: "multimedia",
            time: "24-50",
            userId: 0,
            imgBg:
              "https://media.istockphoto.com/photos/live-video-streaming-media-entertainment-technology-on-laptop-and-picture-id1218395365?b=1&k=20&m=1218395365&s=170667a&w=0&h=DNmqcjDzFNqFqHH0LjdscsDiTzbqOpddOeN4LfePFSE=",
            id: 1,
            typeAd: { value: "oferta", text: "Oferta" },
          },
          {
            title: "Fotografias da faculdade",
            description: "Alguém consegue arranjar fotos da ESMAD?",
            course: "tcav",
            time: "24-50",
            email: "tiago@esmad.ipp.pt",
            profileImg:
              "https://i.pinimg.com/originals/7c/19/75/7c197545ca20fab203abb8b415de34e2.gif",
            imgBg:
              "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            id: 2,
            typeAd: { value: "procura", text: "Procura" },
          },
          {
            title: "Programação",
            description:
              "Sou aluno do 3º ano de tsiw e posso ajudar alunos que precisem",
            course: "tsiw",
            time: "24-50",
            email: "joao@esmad.ipp.pt",
            profileImg:
              "https://i.pinimg.com/originals/7c/19/75/7c197545ca20fab203abb8b415de34e2.gif",
            imgBg:
              "https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-deve-picture-id537331500?b=1&k=20&m=537331500&s=170667a&w=0&h=-OawbbTR9TwfewLYKlaU-_cn1m_dq1WLpBK1qubFhGI=",
            id: 3,
            typeAd: { value: "oferta", text: "Oferta" },
          },
          {
            title: "Programação",
            description: "Estou disponivel para fazer sessões fotográficas",
            course: "multimedia",
            time: "24-50",
            email: "leonor@esmad.ipp.pt",
            profileImg:
              "https://i.pinimg.com/originals/7c/19/75/7c197545ca20fab203abb8b415de34e2.gif",
            imgBg:
              "https://images.unsplash.com/photo-1485894608275-668ad1c2d34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            id: 4,
            typeAd: { value: "oferta", text: "Oferta" },
          },
        ],
    projects: localStorage.projects
      ? JSON.parse(localStorage.projects)
      : [
          {
            id: 1,
            id_user: 5,
            cover_image:
              "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg",
            title: "Projeto 1",
            description: "Este é o projeto 1",
            email: "leonor@esmad.ipp.pt",
            link: "www.google.pt",
            data: "2022-03-21",
          },
          {
            id: 2,
            id_user: 3,
            cover_image:
              "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
            title: "Projeto 2",
            description: "Este é o projeto 2",
            email: "user@esmad.ipp.pt",
            link: "www.google.pt",
            data: "2022-03-04",
          },
          {
            id: 3,
            id_user: 3,
            cover_image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4Xaf0afxbWT0zXRo6apRDS4y8jJPcM0dWg&usqp=CAU",
            title: "Projeto 3",
            description: "Este é o projeto 3",
            email: "tiago@esmad.ipp.pt",
            link: "www.google.pt",
            data: "2022-03-31",
          },
          {
            id: 4,
            id_user: 2,
            cover_image:
              "https://t4.ftcdn.net/jpg/04/75/67/67/360_F_475676739_4uSdpV10kGemUK6JN0MPrWLVOhxyZ49R.jpg",
            title: "Projeto 4",
            description: "Este é o projeto 4",
            email: "joao@esmad.ipp.pt",
            link: "www.google.pt",
            data: "2022-03-19",
          },
        ],
    project_images: localStorage.project_images
      ? JSON.parse(localStorage.project_images)
      : [
          {
            project_id: 1,
            image_id: 1,
            image_src:
              "https://t4.ftcdn.net/jpg/04/75/67/67/360_F_475676739_4uSdpV10kGemUK6JN0MPrWLVOhxyZ49R.jpg",
          },
          {
            project_id: 1,
            image_id: 2,
            image_src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4Xaf0afxbWT0zXRo6apRDS4y8jJPcM0dWg&usqp=CAU",
          },
          {
            project_id: 1,
            image_id: 3,
            image_src:
              "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
          },
          {
            project_id: 2,
            image_id: 1,
            image_src:
              "https://t4.ftcdn.net/jpg/04/75/67/67/360_F_475676739_4uSdpV10kGemUK6JN0MPrWLVOhxyZ49R.jpg",
          },
          {
            project_id: 2,
            image_id: 2,
            image_src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4Xaf0afxbWT0zXRo6apRDS4y8jJPcM0dWg&usqp=CAU",
          },
          {
            project_id: 3,
            image_id: 3,
            image_src:
              "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
          },
          {
            project_id: 3,
            image_id: 1,
            image_src:
              "https://t4.ftcdn.net/jpg/04/75/67/67/360_F_475676739_4uSdpV10kGemUK6JN0MPrWLVOhxyZ49R.jpg",
          },
          {
            project_id: 3,
            image_id: 2,
            image_src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4Xaf0afxbWT0zXRo6apRDS4y8jJPcM0dWg&usqp=CAU",
          },
          {
            project_id: 3,
            image_id: 3,
            image_src:
              "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
          },
        ],
    loggedUser: localStorage.loggedUser
      ? JSON.parse(localStorage.loggedUser)
      : null,
    favs: localStorage.favs ? JSON.parse(localStorage.favs) : [],
    aeFavs: localStorage.aeFavs ? JSON.parse(localStorage.aeFavs) : [],
    avaliacoes: localStorage.avaliacoes
      ? JSON.parse(localStorage.avaliacoes)
      : [],
    activeAd: localStorage.activeAd ? JSON.parse(localStorage.activeAd) : null,
    activeProfile: localStorage.activeProfile
      ? JSON.parse(localStorage.activeProfile)
      : null,
    ae: localStorage.ae
      ? JSON.parse(localStorage.ae)
      : [
          {
            id: 0,
            email: "joao@esmad.ipp.pt",
            description: "Festa logo á noite !!!",
            date: "15:17?2022-5-17",
            likes: 0,
            usersThatLiked: ["admin@esmad.ipp.pt"],
          },
        ],
  },
  getters: {
    isLoginValid: (state) => (email, password) =>
      state.users.some(
        (user) => user.email === email && user.password === password
      ),
    isEmailRegistered: (state) => (email) =>
      state.users.some((user) => user.email === email),
    // getUsers: (state) => state.users,
    getLoggedUser: (state) => state.loggedUser,
    getAds: (state) => state.ads,
    getAe: (state) => state.ae,
    getAeFavs: (state) => state.aeFavs,
    getProjects: (state) => state.projects,
    getProjectImages: (state) => state.project_images,
    getAdsId: (state) =>
      state.ads ? state.ads[state.ads.length - 1].id + 1 : 0,
    getId: (state) => state.activeAd,
    getActiveProfile: (state) => state.activeProfile,
    // getAdSpecific: (state) => (id) => state.ads.find((ad) => ad.id == id),
    getProjectSpecific: (state) => (id) =>
      state.projects.find((project) => project.id == id),
    // getFavs: (state) => state.favs,
    // getThisAdFav: (state) => (id) => state.favs.find((fav) => fav.adId == id),
    // ads: (state) => state.users,
    getAvaliacoes: (state) => state.avaliacoes,
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
    SET_NEW_USER(state, payload) {
      state.users.push(payload);
      localStorage.users = JSON.stringify(state.users);
    },
    SET_LOGGED_USER(state, payload) {
      state.loggedUser = state.users.find((user) => user.email === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SIGNOUT_USER(state) {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
    },
    SET_USER_BLOCKED(state, payload) {
      state.users[payload].status = "blocked";
      localStorage.users = JSON.stringify(state.users);
    },
    SET_USER_ACTIVE(state, payload) {
      state.users[payload].status = "active";
      localStorage.users = JSON.stringify(state.users);
    },
    SET_ADS(state, payload) {
      state.ads.push(payload);
      localStorage.ads = JSON.stringify(state.ads);
    },
    SET_ACTIVE_AD(state, payload) {
      state.activeAd = state.ads.find((ad) => ad.id === payload);
      localStorage.activeAd = JSON.stringify(state.activeAd);
    },
    ADD_FAV(state, payload) {
      state.favs.push(payload);
      localStorage.favs = JSON.stringify(state.favs);
    },
    ADD_AE_FAV(state, payload) {
      state.aeFavs.push(payload);
      localStorage.aeFavs = JSON.stringify(state.aeFavs);
    },
    REMOVE_FAV(state, payload) {
      state.favs.splice(payload, 1);
      localStorage.favs = JSON.stringify(state.favs);
    },
    REMOVE_AE_FAV(state, payload) {
      state.aeFavs.splice(payload, 1);
      localStorage.aeFavs = JSON.stringify(state.aeFavs);
    },
    REMOVE_AD(state, payload) {
      state.ads.splice(payload, 1);
      localStorage.ads = JSON.stringify(state.ads);
    },
    REMOVE_AE_AD(state, payload) {
      state.ae.splice(payload, 1);
      localStorage.ae = JSON.stringify(state.ae);
    },
    REMOVE_USER(state, payload) {
      state.users.splice(payload, 1);
      localStorage.users = JSON.stringify(state.users);
    },
    SET_ACTIVE_AD_OUT(state) {
      state.activeAd = null;
      localStorage.removeItem("activeAd");
    },
    SET_UPDATE_USER(state, payload) {
      state.users.push(payload);
      localStorage.users.setItem(getLoggedUser.email, payload);
    },
    SET_ACTIVE_PROFILE(state, payload) {
      state.activeProfile = state.users.find((user) => user.email === payload);
      localStorage.activeProfile = JSON.stringify(state.activeProfile);
    },
    SET_NEW_AE_AD(state, payload) {
      state.ae.push(payload);
      localStorage.ae = JSON.stringify(state.ae);
    },
    ADD_COMMENT(state, payload) {
      state.avaliacoes.push(payload);
      localStorage.avaliacoes = JSON.stringify(state.avaliacoes);
    },
    INCREASE_LIKES(state, payload) {
      state.ae[payload].likes++;
      localStorage.as = JSON.stringify(state.ae);
    },
    DECREASE_LIKES(state, payload) {
      state.ae[payload].likes--;
      localStorage.as = JSON.stringify(state.ae);
    },
  },
  actions: {
    async getUser({ context, state }, id){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/users/${id}`)        
          return response.data.user;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getAnnouncements({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/announcements`)        
          return response.data.announcements.reverse();
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async postAnnouncement({ context, state },ad){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/announcements`, {
          titulo: ad.titulo,
          descricao: ad.descricao,
          utilizadorId: ad.utilizadorId,
          img: ad.img,
          tipo: ad.tipo,
          data: ad.data,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getAe({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/aeAnnouncements`)        
          return response.data.aes.reverse();
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async postAe({ context, state },ad){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/aeAnnouncements`, {
          descricao: ad.descricao,
          utilizadorId: ad.utilizadorId,
          data: ad.data,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async deleteAe({ context, state },id){
      try{
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/aeAnnouncements/${id}`)        
          return response;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getProjects({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/projects`)        
          return response.data.projects.reverse();
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async postProject({ context, state },project){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/projects`, {
          titulo: project.titulo,
          descricao: project.descricao,
          utilizadorId: project.utilizadorId,
          data: project.data,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async deleteAnnouncement({ context, state }, ad) {
      try {
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/announcements/${ad.id}`, 
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response.data.ad;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async deleteProject({ context, state }, project) {
      try {
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/projects/${project.id}`, 
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response.data.project;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async editAdInfoAdmin({ context, state }, ad) {
      try {
        const response = await axios.put(`http://buckle-app-esmad.herokuapp.com/announcements/${ad.id}`, {
          titulo: ad.titulo,
          descricao: ad.descricao,
          utilizadorId: ad.utilizadorId,
          img: ad.img,
          tipo: ad.tipo,
          data: ad.data,
        }, {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async editProjectInfoAdmin({ context, state }, project) {
      try {
        const response = await axios.put(`http://buckle-app-esmad.herokuapp.com/projects/${project.id}`, {
          titulo: project.titulo,
          descricao: project.descricao,
          utilizadorId: project.utilizadorId,
          // img: ad.img,
          data: project.data,
        }, {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },


    async getUsers({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/users`)        
          return response.data.users;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async editUserInfo({ context, state }, user) {
      try {
        const response = await axios.put(`http://buckle-app-esmad.herokuapp.com/users/${user.id}`, {
          email_utilizador: user.email_utilizador,
          nome: user.nome,
          sobrenome: user.sobrenome,
          descricao : user.descricao,
          img : user.img,
          bgImg: user.bgImg
        }, {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async editUserInfoAdmin({ context, state }, user) {
      try {
        const response = await axios.put(`http://buckle-app-esmad.herokuapp.com/users/${user.id}`, {
          email_utilizador: user.email_utilizador,
          nome: user.nome,
          sobrenome: user.sobrenome,
          descricao : user.descricao,
          img : user.img,
          bgImg: user.bgImg,
          role: user.role
        }, {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async deleteUser({ context, state }, user) {
      try {
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/users/${user.id}`, 
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response.data.user;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getProjectImages({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/projectImages`)        
          return response.data.projectImages;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getCourses({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/courses`)        
          return response.data.courses;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getEspecificAnnouncement({ context, state }, id){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/announcements/${id}`)
          return response.data.announcement;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getEspecificProject({ context, state }, id){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/projects/${id}`)
          return response.data.project;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getAnnouncementFavs({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/favsAnnouncement`)        
          return response.data.favAnnouncements;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async postAnnouncementFavs({ context, state },fav){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/favsAnnouncement`, {
          adID: fav.adID,
          id_utilizador_dado: fav.id_utilizador_dado,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async postProjectImages({ context, state },image){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/projectImages`, {
          projetoID: image.projetoID,
          descricao: image.descricao,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async addComments({ context, state }, comment) {
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/users/${comment.id}/comments`, {
          desc_comentario: comment.desc_comentario,
          rating: comment.rating,
          tipo_comentario: comment.tipo_comentario,
          id_quem_comentou: comment.id_quem_comentou,
          id_a_quem_comentou: comment.id_a_quem_comentou,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getCommentsByID({ context, state }, comment) {
      try {
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/users/${comment.id}/comments`,
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
          return response.data.comments;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async addChat({ context, state }, chat) {
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/users/${chat.id}/chats`, {
          id_user1 : chat.id_user1,
          id_user2 : chat.id_user2
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getChatsByID({ context, state }, chat) {
      try {
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/users/${chat.id}/chats`,
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
          return response.data.chats;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async addMessage({ context, state }, message) {
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/users/${message.userID}/chats/${message.chatID}/messages`, {
          id_chat : message.id_chat,
          id_user : message.id_user,
          text : message.text,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getMessagesByID({ context, state }, message) {
      try {
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/users/${message.userID}/chats/${message.chatID}/messages`,
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
          return response.data.messages;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async removeAnnouncementFavs({ context, state },id){
      try{
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/favsAnnouncement/${id}`)        
          return response;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async getProjectFavs({ context, state }){
      try{
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/favsProject`)        
          return response.data.favProjects;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async postProjectFavs({ context, state },fav){
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/favsProject`, {
          projectID: fav.projectID,
          id_utilizador_dado: fav.id_utilizador_dado,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async removeProjectFavs({ context, state },id){
      try{
        const response = await axios.delete(`http://buckle-app-esmad.herokuapp.com/favsProject/${id}`)        
          return response;
      }
      catch(err){
        throw Error(err.response.data.message);
      }
    },

    async login({ context, state }, user) {
      try {
        const response = await axios.post("http://buckle-app-esmad.herokuapp.com/auth/signin", {
          email_utilizador: user.email_utilizador,
          password: user.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("loggedUser",JSON.stringify(response.data.user));
          state.loggedUser = response.data.user;
          return response;
        } else {
          const data = response;
          throw Error(data.msg);
        }
      } catch (err) {
        throw Error(err.msg);
      }
    },

    async register({ context, state }, user) {
      try {
        const response = await axios.post("http://buckle-app-esmad.herokuapp.com/auth/signup", {
          email_utilizador: user.email_utilizador,
          nome: user.nome,
          sobrenome: user.sobrenome,
          password: user.password,
          descricao_curso: user.descricao_curso,
          gender : user.gender
        });
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async addCommentsProject({ context, state }, commentProject) {
      try {
        const response = await axios.post(`http://buckle-app-esmad.herokuapp.com/projects/${commentProject.id}/commentsProject`, {
          desc_comentario: commentProject.desc_comentario,
          id_quem_comentou: commentProject.id_quem_comentou,
          id_projeto: commentProject.id_projeto,
        },{headers: {Authorization: 'Bearer ' + localStorage.token}});
        
        return response;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

    async getCommentsProject({ context, state }, commentProject) {
      try {
        const response = await axios.get(`http://buckle-app-esmad.herokuapp.com/projects/${commentProject.id}/commentsProject`,
          {headers: {Authorization: 'Bearer ' + localStorage.token}});
        
          return response.data.commentsProject;

      } catch (err) {
        throw Error(err.response.data.message);
      }
    },

  },
  modules: {},
});
