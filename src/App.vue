<template>
  <div id="app">
    <Navbar />

    <router-view />

    <Footer v-if="this.$router.currentRoute.path !== '/perfil'" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    // window.addEventListener('load', () => {
    //   if (!localStorage.getItem("users")) {
    //     localStorage.setItem("users", JSON.stringify([
    //     ]))
    //   }
    // })
  },
};
</script>


<style>
@font-face {
  font-family: "Rubik Light";
  src: url("./assets/font/Rubik/static/Rubik-Light.ttf") format("truetype");
  font-weight: lighter;
}
@font-face {
  font-family: "Rubik";
  src: url("./assets/font/Rubik/static/Rubik-Regular.ttf") format("truetype");
  font-weight: initial;
}
@font-face {
  font-family: "Rubik Medium";
  src: url("./assets/font/Rubik/static/Rubik-Medium.ttf") format("truetype");
  font-weight: bold;
}
@font-face {
  font-family: "Rubik Bold";
  src: url("./assets/font/Rubik/static/Rubik-Bold.ttf") format("truetype");
  font-weight: bolder;
}

:root {
    --orange: #F17941;
    --black: #353535;
    --border: #ced4da;
    --cardDisable: #D5D5D5;
    --blue: #5266B7;
  --lightFont: 'Rubik Light';
  --regularFont: 'Rubik';
  --mediumFont: 'Rubik Medium';
  --boldFont: 'Rubik Bold';
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: var(--orange);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.myTabs .col-auto ul {
  background-color: white;
  
  padding: 0;
}

.myTabs .col-auto .nav-item a{
  color: var(--black);
  text-align: left;
}

.myTabs .col-auto .nav-link.active {
  color: white;
  background-color: var(--orange);
}

.myTabs .col-auto .nav-item {
  padding: 5px 10px;
}

.myTabs .col-auto .profileArea {
  color: white;
  margin-bottom: 10px;
  background-color: var(--orange);
}

.myTabs .col-auto ul {
  background-color: #e4e4e4;
  height: 100%;
}


.myTabs .tab-content {
  padding: 0;
}

.myTabs {
  margin: 0 !important;
}

.profileArea .sector1 {
  padding: 0 15px;
}

.ads-tab section{
  display: flex;
  justify-content: space-between;
}

.ads-tab section .filterRow{
  order: 2;
}

.ads-tab section .ads-row{
  order: 1;
  margin: 10px 0 0 0;
  padding: 0 15px;
}

.settingsButton .dropdown-toggle::after {
  display: none;
}

.settingsButton div button svg{
  display: flex;
  transition: all 0.4s ease;
}

.settingsButton div button:hover svg {
  transform: rotateZ(180deg);
  transition: all 0.4s ease;
}

.settingsButton .dropdown-item svg {
  margin-right: 5px;
}

.settingsButton .btn.dropdown-toggle.btn-primary {
  display: flex;
}

.projects-tab section{
  display: flex;
  justify-content: space-between;
}

.projects-tab section .filterRow{
  order: 2;
}

.myTabs .col-auto {
  width: 300px;
}

.myTabs .tab-pane {
  height: 100%;
}

.projects-tab section .projects-row{
  order: 1;
  margin: 10px 0 0 0;
  margin: 15px;
}

.imagesCarousel div div div img {
  height: 500px;
  object-fit: cover;
}

.myTabs .col-auto {
  padding: 0;
}

.buttonsProfileCard .tabs div ul li a.active {
  background-color: var(--orange);
}

.buttonsProfileCard .tabs div ul li a {
  color: var(--black);
}

.settingsButton .btn.dropdown-toggle.btn-primary {
  background-color: var(--orange);
  border-color: var(--orange);
  margin-right: 12vh;
}
.settingsButton .btn-primary.dropdown-toggle {
  background-color: var(--orange) !important;
  border-color: var(--orange) !important;
}

.settingsButton .dropdown-item:active {
  background-color: var(--orange) !important;
}
.settingsButton .dropdown-item.text-danger:active {
  background-color: #d9534f !important;
  color: #ffffff !important;
}
.modal-content .close {
  background-color: #d9534f !important;
  color: #ffffff !important;
  border: none;
  width: 25px;
  border-radius: 4px;
}


.modal .modal-content {
  border: none;
}

.modal .modal-header {
  background-color: var(--black);
  border-radius: 0;
}

.modal .modal-header h5 {
  color: white;
}

.outsideDiv div{
  display: flex;
  align-items: center;
}

.outsideDiv button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outsideDiv .buttonsModalDiv {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}

.removeButtonModal {
  font-size: 13px;
}

.swal2-confirm {
  background-color: var(--orange) !important;
}

.swal2-confirm:hover {
  background-color: var(--black);
}

.adminModal .form-group {

  margin-bottom: 10px;
}

.adminModal .form-group img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px; 
  margin-left: 5px;
}

.adminModal .form-group div {
  display: flex;
}

.generalContainerOtherPerson .card-header {
  background-color: white;
  border: none;
}


</style>
