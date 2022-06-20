<template>
  <div>
    <div v-if="showModal">
      <b-modal hide-footer id="modal-1" title="Detalhes utilizador">
        <form @submit.prevent="editAdAdmin" class="adminModal">
          <b-form-group label="Id" label-for="titulo-input">
            <b-form-input
              id="titulo-input"
              disabled
              v-model="especificAdData.id"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Titulo" label-for="img-input" class="outsideDiv">
            <b-form-input
              id="img-input"
              v-model="especificAdData.titulo"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Descricao" label-for="nome-input">
            <b-form-textarea
              id="nome-input"
              v-model="especificAdData.descricao"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group label="Utilizador Id" label-for="nome-input">
            <b-form-input
            disabled
              id="nome-input"
              v-model="especificAdData.utilizadorId"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Imagem Anúncio" label-for="Imagem-input">
            <b-form-input
              id="Imagem-input"
              v-model="especificAdData.img"
            ></b-form-input>
            <img :src="especificAdData.img" alt="" />
          </b-form-group>

          <b-form-group label="Tipo" label-for="genero-input">
            <b-form-input
              id="genero-input"
              disabled
              v-model="especificAdData.tipo"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Data" label-for="data-input">
            <b-form-input
              id="data-input"
              disabled
              v-model="especificAdData.data"
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
          <th>Imagem</th>
          <th>Id Utilizador</th>
          <th>Tipo</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ad, index) in adsData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ ad.titulo }}</td>
          <td>{{ ad.descricao }}</td>
          <td>
            <img :src="ad.img" style="width: 75px; object-fit: cover" />
          </td>
          <td>{{ ad.utilizadorId }}</td>
          <td>{{ ad.tipo }}</td>
          <td>
            <b-button variant="danger" @click="deleteOneAd(ad.id)"
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
      ads: [],
      adsData: {},
      showModal: false,
      adDetailsIndex: null,
      especificAdData: {
        id: null,
        titulo: "",
        descricao: "",
        utilizadorId: 0,
        img: "",
        tipo: "",
        data: "",
      },
    };
  },
  mounted() {
    this.getAllAds();
  },
  methods: {
    ...mapMutations(["SET_ADS", "REMOVE_AD"]),
    ...mapActions(["deleteAnnouncement", "getAnnouncements","editAdInfoAdmin"]),

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

    async getAllAds(){
      try {
        this.adsData = await this.getAnnouncements();
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    showModalFunction(idx) {
      this.showModal = true
      this.adDetailsIndex = idx
      this.especificAdData = {
        id: this.adsData[idx].id,
        titulo: this.adsData[idx].titulo,
        descricao: this.adsData[idx].descricao,
        utilizadorId: this.adsData[idx].utilizadorId,
        img: this.adsData[idx].img,
        tipo: this.adsData[idx].tipo,
        data: this.adsData[idx].data,
      }
    },

    async editAdAdmin () {
      try {
        const response = await this.editAdInfoAdmin(this.especificAdData);

        if (response.data.success) {
          this.$swal(
            "Dados do Utilizador!",
            "Atualizados com sucesso!",
            "success"
          );
        }
        this.getAllAds()
      } catch (err) {
        this.$swal("Error!", err.message, "error");
      }
    },

    async deleteOneAd(idx) {
      this.$swal({
            title: "Atenção",
            text: `Tem a certeza que prentende eliminar o anúncio com id = ${idx}?`,
            icon: "warning",
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: 'Não',
            dangerMode: true,
          }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Informação!",
            text: `Anúncio com id ${idx} removido com sucesso!`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then(() => {
            this.deleteAnnouncement({
              id: idx,
            });
            this.getAllAds();
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
