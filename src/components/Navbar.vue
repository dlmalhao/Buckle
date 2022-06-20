<template>
  <b-navbar toggleable="lg" id="nav">
    <b-navbar-brand href="#"
      ><router-link :to="{ name: 'PaginaInicial' }" class="navbar-brand"
        >Buckle</router-link
      ></b-navbar-brand
    >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto navbarContent">
        <b-nav-item
          class="nav-item nav-link"
          @click="$router.push({ name: 'Anuncios' })"
          >Anúncios</b-nav-item
        >
        <b-nav-item
          class="nav-item nav-link"
          @click="$router.push({ name: 'Projetos' })"
          >Projetos</b-nav-item
        >
        <b-nav-item
          class="nav-item nav-link"
          @click="$router.push({ name: 'AE' })"
          >AE</b-nav-item
        >
        <b-nav-item
          class="nav-item nav-link"
          @click="$router.push({ name: 'sobre' })"
          >Sobre</b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="loggedUser()" class="profileZone">
          <img
            @click="goProfile"
            :src="loggedUser().img"
            id="img_profile"
            alt=""
          />
          <b-nav-item-dropdown class="user-dropdown">
            <template #button-content>{{ loggedUser().first_name }}</template>
            <b-dropdown-item id="dropdown-perfil" @click="goProfile"
              >Perfil</b-dropdown-item
            >
            <b-dropdown-item
              id="dropdown-anuncios"
              @click="$router.push({ name: 'Anuncios' })"
              href="#"
              >Anúncios</b-dropdown-item
            >
            <b-dropdown-item id="dropdown-projetos" href="#"
              >Projetos</b-dropdown-item
            >
            <b-dropdown-divider
              v-if="this.$store.getters.getLoggedUser.role == 'Admin'"
            ></b-dropdown-divider>
            <b-dropdown-item
              id="dropdown-admin-users"
              @click="$router.push({ name: 'Gestão de utilizadores' })"
              v-if="this.$store.getters.getLoggedUser.role == 'Admin'"
              href="#"
              >Gestão Utilizadores</b-dropdown-item
            >
            <b-dropdown-item
              id="dropdown-admin-anuncios"
              @click="$router.push({ name: 'Gestão de anuncios' })"
              v-if="this.$store.getters.getLoggedUser.role == 'Admin'"
              href="#"
              >Gestão Anúncios</b-dropdown-item
            >
            <b-dropdown-item
              id="dropdown-admin-projetos"
              @click="$router.push({ name: 'Gestão de projetos' })"
              v-if="this.$store.getters.getLoggedUser.role == 'Admin'"
              href="#"
              >Gestão Projetos</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item id="dropdown-leave" href="#" @click="logoutUser()"
              >Sair</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-nav-item>
        <b-nav-item v-else class="account-link">
          <router-link
            :to="{ name: 'Login' }"
            class="nav-item nav-link login"
            v-if="CurrentPath() == '/login'"
            >Login</router-link
          >
          <router-link
            :to="{ name: 'Login' }"
            class="nav-item nav-link registo"
            v-else-if="CurrentPath() == '/registo'"
            >Registo</router-link
          >
          <router-link
            :to="{ name: 'Login' }"
            class="nav-item nav-link"
            id="entrar"
            v-else
            >Entrar</router-link
          >
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: function () {
    return {
      colors: [
        { white: "#fff" },
        { dark: "#353535" },
        { blue: "#5266B7" },
        { orange: "#F17941" },
      ],
    };
  },

  mounted() {},
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  methods: {
    ...mapMutations(["SIGNOUT_USER", "SET_ACTIVE_PROFILE"]),
    ...mapActions(["logout"]),

    CurrentPath() {
      return this.$route.path;
    },
    loggedUser() {
      return this.getLoggedUser;
    },

    async logoutUser() {
      try {
        if (localStorage.token != null) {
          this.$swal({
            title: "Logout?",
            text: "Tem a certeza que prentende sair da conta?",
            icon: "warning",
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Não',
            dangerMode: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal("Logout efetuado com sucesso!", {
                icon: "success",
              });
              this.$router.go();
              localStorage.removeItem("token");
              localStorage.removeItem("loggedUser");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            // text: response.msg,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      }
    },

    goProfile() {
      // this.SET_ACTIVE_PROFILE(this.getLoggedUser.email);

      this.$router.push({
        name: "perfil",
        params: { id: this.getLoggedUser.id },
      });
    },
  },
};
</script>

<style>
#nav {
  padding: 20px 100px !important;
  background-color: #202020;
}

.navbarContent a,
#entrar {
  color: white !important;
  position: relative;
  transition: 0.5s ease;
  padding: 0 0 2px 0 !important;
  overflow: hidden;
  text-underline-offset: 2px;
}

.navbarContent a.active {
  color: #202020;
}

.navbarContent li {
  margin: 0 10px;
}

.navbarContent a::after,
#entrar::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0.1rem;
  background-color: var(--orange);
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
  transform: translate3d(-100%, 0, 0);
}

.navbarContent a:hover::after,
#entrar:hover::after,
#entrar:focus::after,
.navbarContent a:focus::after {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* #entrar {
    color: white !important;
  } */

.navbar-brand {
  font-size: 30px !important;
  font-weight: bold !important;
  color: white !important;
}

#nav-collapse > .navbarContent {
  margin-right: 100px !important;
}

.nav-item > a {
  font-size: 15px;
  font-weight: 600 !important;
}

.account-link > a > .login {
  color: var(--orange) !important;
}

.account-link > a > .registo {
  color: var(--blue) !important;
}

.user-dropdown > ul {
  background-color: #f8f8f8;
  border-radius: 10px;
  right: -65px;
}

.user-dropdown > button {
  background-color: var(--orange) !important;
  border: none;
  font-weight: bold;
}

#dropdown-perfil,
#dropdown-anuncios,
#dropdown-projetos,
#dropdown-leave {
  color: var(--black) !important;
}

#dropdown-perfil:hover,
#dropdown-anuncios:hover,
#dropdown-projetos:hover,
#dropdown-leave:hover {
  background-color: var(--orange);
  color: white !important;
  transition: 0.5s ease;
}

#dropdown-admin-users,
#dropdown-admin-anuncios,
#dropdown-admin-projetos {
  color: rgb(220, 20, 20) !important;
}

#dropdown-admin-users:hover,
#dropdown-admin-anuncios:hover,
#dropdown-admin-projetos:hover {
  color: white !important;
  background-color: rgb(220, 20, 20) !important;
  transition: 0.5s ease;
}

#dropdown-leave {
  color: var(--orange) !important;
}

#dropdown-leave:hover {
  color: white !important;
}

#img_profile {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.profileZone a {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.profileZone > a > li > a {
  color: white !important;
}

.profileZone a img {
  margin-right: 15px;
}
</style>
