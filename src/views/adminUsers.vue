<template>
  <div>


    <div v-if="showModal">
        <b-modal hide-footer id="modal-1" title="Detalhes utilizador">
          <form @submit.prevent="editUserAdmin" class="adminModal">

            <b-form-group label="Id" label-for="titulo-input" >
              <b-form-input id="titulo-input" disabled v-model="especificUserData.id"></b-form-input>
            </b-form-group>

            <b-form-group label="Email" label-for="img-input" class="outsideDiv">
              <b-form-input id="img-input" disabled v-model="especificUserData.email_utilizador"></b-form-input>
            </b-form-group>

            <b-form-group label="Nome" label-for="nome-input">
              <b-form-input id="nome-input" v-model="especificUserData.nome"
              ></b-form-input>
              <b-form-input v-model="especificUserData.sobrenome"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Cargo" label-for="cargo-input">
              <b-form-input id="cargo-input"  v-model="especificUserData.role"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Imagem Perfil" label-for="Imagem-input">
              <b-form-input id="Imagem-input" v-model="especificUserData.img"></b-form-input>
              <img :src="especificUserData.img" alt="">
            </b-form-group>

            <b-form-group label="Imagem Background" label-for="Imagem-background-input">
              <b-form-input id="Imagem-background-input" v-model="especificUserData.bgImg"
              ></b-form-input>
              <img :src="especificUserData.bgImg" alt="">
            </b-form-group>

            <b-form-group label="Género" label-for="genero-input">
              <b-form-input id="genero-input" disabled v-model="especificUserData.gender"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Data" label-for="data-input">
              <b-form-input id="data-input" disabled v-model="especificUserData.date"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Descrição" label-for="descricao-input">
              <b-form-input id="descricao-input" v-model="especificUserData.descricao"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Curso" label-for="curso-input">
              <b-form-input disabled id="curso-input" v-model="especificUserData.course.descricao_curso"
              ></b-form-input>
            </b-form-group>

            <div class="submitModalDetails">
              <input type="submit" class="btn btn-primary" value="Concluído" />
            </div>

          </form>
        </b-modal>
      </div>



    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Género</th>
          <th>Curso</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody> 
        <tr v-for="(user, index) in usersData" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.nome + " " + user.sobrenome }}</td>
          <td>{{ user.email_utilizador }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.courseId }}</td>
          <td>
            <b-button
              variant="danger"
              v-if="user.role == 'Student'"
              @click="deleteOneUser(user.id)"
              >Remover</b-button
            >
            <b-button variant="dark" @click="showModalFunction(index)" v-b-modal.modal-1>Detalhes</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data: function () {
    return {
      usersData: {},
      showModal: false,
      userDetailsIndex: null,
      nomeCompleto: [],
      nomeCompletoFormatado: "",
      especificUserData: {
        id: null,
        email_utilizador: "",
        nome: "",
        sobrenome: "",
        role: "",
        img: "",
        bgImg: "",
        gender: "",
        date: "",
        descricao: "",
        course: {
          id: null,
          descricao_curso: ""
        }
      }
    };
  },
  mounted() {
    this.getAllUsers();
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  methods: {
    ...mapActions(["deleteUser", "getUsers","editUserInfoAdmin"]),

    // remove_user(i) {
    //   Swal.fire({
    //     title: "Atenção!",
    //     text: "Tens a certeza que queres remover o utilizador?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Sim",
    //     cancelButtonText: "Não",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire({
    //         title: "Informação!",
    //         text: "Utilizador removido com sucesso!",
    //         confirmButtonColor: "#3085d6",
    //         confirmButtonText: "Ok",
    //       }).then(() => {
    //         this.REMOVE_USER(i);
    //       });
    //     }
    //   });
    // },

    async getAllUsers() {
      try {
        this.usersData = await this.getUsers();
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    showModalFunction(idx) {
      this.showModal = true
      this.userDetailsIndex = idx
      this.nomeCompletoFormatado = this.usersData[idx].nome + " " + this.usersData[idx].sobrenome
      this.nomeCompleto.push({nome: this.usersData[idx].nome, sobrenome: this.usersData[idx].sobrenome})
      this.especificUserData = {
        id: this.usersData[idx].id,
        email_utilizador: this.usersData[idx].email_utilizador,
        nome: this.usersData[idx].nome,
        sobrenome: this.usersData[idx].sobrenome,
        role: this.usersData[idx].role,
        img: this.usersData[idx].img,
        bgImg: this.usersData[idx].bgImg,
        gender: this.usersData[idx].gender,
        date: this.usersData[idx].date,
        descricao: this.usersData[idx].descricao,
        course: {
          id: this.usersData[idx].course.id,
          descricao_curso: this.usersData[idx].course.descricao_curso
        }
      }
    },

    async editUserAdmin () {
      try {
        const response = await this.editUserInfoAdmin(this.especificUserData);

        if (response.data.success) {
          this.$swal(
            "Dados do Utilizador!",
            "Atualizados com sucesso!",
            "success"
          );
        }
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    async deleteOneUser(idx) {
      this.$swal({
            title: "Atenção",
            text: `Tem a certeza que prentende eliminar o utilizador com id = ${idx}?`,
            icon: "warning",
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Não',
            dangerMode: true,
          }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Informação!",
            text: `Utilizador com id ${idx} removido com sucesso!`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then(() => {
            this.deleteUser({
              id: idx,
            });
            this.getAllUsers();
          });
        }
      });
    },
  },
};
</script>

<style scoped>

.submitModalDetails {
  display: flex;
  justify-content: flex-end;
  margin-top: 2vh;
}

.submitModalDetails input {
  background-color: var(--orange);
  border: none;
  color: white;
}


</style>
