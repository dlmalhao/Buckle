<template>
  <div>
    <div v-if="showModal">
      <b-modal hide-footer id="modal-1" title="Detalhes utilizador">
        <form @submit.prevent="editProjectAdmin" class="adminModal">
          <b-form-group label="Id" label-for="titulo-input">
            <b-form-input
              id="titulo-input"
              disabled
              v-model="especificProjectsData.id"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Titulo" label-for="img-input" class="outsideDiv">
            <b-form-input
              id="img-input"
              v-model="especificProjectsData.titulo"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Descricao" label-for="nome-input">
            <b-form-textarea
              id="nome-input"
              v-model="especificProjectsData.descricao"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group label="Utilizador Id" label-for="nome-input">
            <b-form-input
            disabled
              id="nome-input"
              v-model="especificProjectsData.utilizadorId"
            ></b-form-input>
          </b-form-group>

          <!-- <b-form-group label="Imagem Anúncio" label-for="Imagem-input">
            <b-form-input
              id="Imagem-input"
              v-model="especificAdData.img"
            ></b-form-input>
            <img :src="especificAdData.img" alt="" />
          </b-form-group> -->

          <b-form-group label="Data" label-for="data-input">
            <b-form-input
              id="data-input"
              disabled
              v-model="especificProjectsData.data"
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
          <th>Titulo</th>
          <th>Descrição</th>
          <!-- <th>Imagem</th> -->
          <th>Id Utilizador</th>
          <th>Tipo</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projectsData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ project.titulo }}</td>
          <td>{{ project.descricao }}</td>
          <!-- <td>
            <img :src="project.img" style="width: 75px; object-fit: cover" />
          </td> -->
          <td>{{ project.utilizadorId }}</td>
          <td>{{ project.data }}</td>
          <td>
            <b-button variant="danger" @click="deleteOneProject(project.id)"
              >Remover</b-button
            >
            <b-button variant="info" style="color: white" @click="showModalFunction(index)" v-b-modal.modal-1>Detalhes</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapActions} from "vuex";

export default {
  data: function () {
    return {
      projectsData: {},
      showModal: false,
      projectsDetailsIndex: null,
      especificProjectsData: {
        id: null,
        titulo: "",
        descricao: "",
        utilizadorId: 0,
        data: "",
      },
    };
  },
  mounted() {
    this.getAllProjects();
  },
  methods: {
    ...mapMutations(["SET_ADS", "REMOVE_AD"]),
    ...mapActions(["deleteProject", "getProjects","editProjectInfoAdmin"]),

    addAds() {
      this.form.id = this.getAdsId;
      (this.form.email = this.getLoggedUser.email), this.SET_ADS(this.form);
    },
    remove_ad(i) {
      Swal.fire({
        title: "Atenção!",
        text: "Tens a certeza que queres remover o anúncio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Informação!", "Anúncio removido com sucesso!", "Ok").then(
            () => {
              this.REMOVE_AD(i);
            }
          );
        }
      });
    },

    async getAllProjects(){
      try {
        this.projectsData = await this.getProjects();
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    showModalFunction(idx) {
      this.showModal = true
      this.projectsDetailsIndex = idx
      this.especificProjectsData = {
        id: this.projectsData[idx].id,
        titulo: this.projectsData[idx].titulo,
        descricao: this.projectsData[idx].descricao,
        utilizadorId: this.projectsData[idx].utilizadorId,
        // img: this.projectsData[idx].img,
        data: this.projectsData[idx].data,
      }
    },

    async editProjectAdmin () {
      try {
        const response = await this.editProjectInfoAdmin(this.especificProjectsData);

        if (response.data.success) {
          this.$swal(
            "Dados do Utilizador!",
            "Atualizados com sucesso!",
            "success"
          );
        }
        this.getAllProjects()
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    async deleteOneProject(idx) {
      this.$swal({
            title: "Atenção",
            text: `Tem a certeza que prentende eliminar o projeto com id = ${idx}?`,
            icon: "warning",
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Não',
            dangerMode: true,
          }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Informação!",
            text: `Projeto com id ${idx} removido com sucesso!`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then(() => {
            this.deleteProject({
              id: idx,
            });
            this.getAllProjects();
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
