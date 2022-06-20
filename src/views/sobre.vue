<template>
    <div>
        <div class="generalContainer">
            <picture style="width:100%;">
                <source type="image/webp" srcset="../assets/img/sobreMain.webp">
                <source type="image/jpg" srcset="../assets/img/sobreMain.jpg">
                <img src="../assets/img/sobreMain.jpg" class="backgroundImage">
            </picture>
            <div class="containerBackgroundImage">
                <h2>Sobre Nós</h2>
            </div>
        </div>
        <b-row class="sector2">
            <div class="divContainer">
                <b-col class="leftSide" xl="6">
                    <picture style="width:100%;">
                        <source type="image/webp" srcset="../assets/img/esmad.webp">
                        <source type="image/jpg" srcset="../assets/img/esmad.jpg">
                        <img src="../assets/img/esmad.jpg" class="esmadImg">
                    </picture>
                </b-col>
                <b-col class="rightSide" xl="6">
                    <div class="desc1">
                        <p class="title1">ESMAD</p>
                        <p>A Escola Superior de Media Artes e Design situa-se no Campus 2 do Politécnico do Porto.</p>
                    </div>
                    <div class="desc2">
                        <p class="title2">Descrição</p>
                        <p>A Escola Superior de Media Artes e Design é sinónimo de qualidade, dinamismo e inovação.</p>
                    </div>
                    <div class="desc3">
                        <p class="title3">Contactos</p>
                        <p id="esmadPhone">252 291 700</p>
                        <p>geral@esmad.ipp.pt</p>
                    </div>
                </b-col>
            </div>
            <div class="header">
            <div class="leftText">
                <h3>Os criadores</h3>
                <h3>e a sua missão</h3>
            </div>
            <div class="rightText">
                <p>Somos três alunos da licenciatura de Tecnologias e Sistemas de Informação para a Web na ESMAD com o objetivo de juntar a comunidade académica da nossa universidade. Criamos uma ferramenta que nos ajudará a todos a cumprir essa missão.</p>
            </div>
        </div>
        </b-row>
        <div class="sector3">
            <h2>Os diferentes</h2>
            <h2>cursos</h2>
        </div>
        <b-row class="sector4">
            <b-col cols="5" class="left-side">
                <div class="block">
                    <div class="title">
                        <h4>TSIW</h4>
                    </div>
                    <div class="content">
                        <p>Tecnologias e Sistemas de Informação para a Web é uma licenciatura que assenta numa visão contemporânea e multidisciplinar da Web, agregando competências focadas na conceção, design e desenvolvimento de produtos e software para a Web.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/663">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
                <div class="block">
                    <div class="title">
                        <h4>TCAV</h4>
                    </div>
                    <div class="content">
                        <p>A Licenciatura em Tecnologia da Comunicação Audiovisual tem como objetivo formar profissionais com qualificação superior no âmbito da comunicação audiovisual, promovendo o desenvolvimento de competências e o uso eficaz de conceitos teórico-práticos e técnico-artísticos relevantes.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/493">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
                <div class="block">
                    <div class="title">
                        <h4>FOTOGRAFIA</h4>
                    </div>
                    <div class="content">
                        <p>O ciclo de estudos em Fotografia visa a formação qualificada de artistas e fotógrafos dotados de competências e capacidade crítica para desenvolver o discurso fotográfico nas suas diversas vertentes, tanto profissionais como autorais.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/404">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
            </b-col>
            <b-col cols="2">
                <img src="../assets/img/Vector 17.svg" alt="">
            </b-col>
            <b-col cols="5" class="right-side">
                <div class="block">
                    <div class="title">
                        <h4>DESIGN GRÁFICO</h4>
                    </div>
                    <div class="content">
                        <p>Na Licenciatura em Design os estudantes podem escolher a sua especialização: design gráfico e de publicidade ou design industrial, sendo a seleção através da apresentação de um portefólio e de uma entrevista.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/487">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
                <div class="block">
                    <div class="title">
                        <h4>MULTIMÉDIA</h4>
                    </div>
                    <div class="content">
                        <p>A Licenciatura em Multimédia assenta numa visão contemporânea e interdisciplinar. Fundindo várias áreas numa interseção que incluí arte, tecnologia, comunicação e cultura, bem como a música, o teatro, o cinema e o audiovisual, numa plataforma de comunicação diferenciadora e inovadora, capaz de produzir, veicular e transmitir conteúdos a partir de diferentes aplicações, plataformas e suportes.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/486">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
                <div class="block">
                    <div class="title">
                        <h4>DESIGN INDUSTRIAL</h4>
                    </div>
                    <div class="content">
                        <p>Na Licenciatura em Design os estudantes podem escolher a sua especialização: design gráfico e de publicidade ou design industrial, sendo a seleção através da apresentação de um portefólio e de uma entrevista.</p>
                    </div>
                    <form class="button" action="https://www.esmad.ipp.pt/cursos/licenciatura/490">
                        <b-button type="submit" class="infoBtn">+Info</b-button>
                    </form>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.loadingSpinner()
        },

        methods: {
            loadingSpinner () {
                this.$vs.loading ({color:'#F17941'})

                setTimeout( ()=> {
                  this.$vs.loading.close()
                },1000);
            },
        }
    }
</script>

<style scoped>

    .generalContainer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .backgroundImage {
        width: 100%;
        height: 507px;
        margin-bottom: 80px;
        object-fit: cover;
        z-index: 0;
        filter: brightness(50%);
        margin: 0;
    }

    .containerBackgroundImage {
        position: absolute;
    }

    .containerBackgroundImage h2{
        color: white;
        font-weight: 500;
        font-size: 96px;
        line-height: 100px;
    }

    .header {
        display: flex;
        background-color: var(--orange);
        border-radius: 0 0px 15px 15px;
        color: white;
        padding: 15px 35px 15px 35px;
        align-items: center;
    }

    .leftText {
        text-align: left;
        width: 50%;
    }

    .leftText > h3 {
        font-size: 35px;
        font-weight: bold;
    }

    .rightText {
        text-align: left;
        width: 50%;
    }

    .sector2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 50px 250px 0 250px;
        background-color: #f3f3f3;
        border-radius: 15px;
    }

    .sector2 .rightSide {
        text-align: left;
        padding-left: 40px;
    }

    .esmadImg {
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
    }

    .rightSide .title {
        font-weight: bold;
        margin: 15px 0 25px 0;
    }

    .leftSide img {
        width: 100%;
    }

    .desc1, .desc2, .desc3 {
        margin-top: 20px;
    }

    .desc1 p, .desc2 p, .desc3 p {
        margin-bottom: 5px;
    }

    .desc3 {
        margin-bottom: 20px;
    }

    .title h3{
        font-weight: bold;
    }

    .leftSide {
        order: 1;
        padding: 10px;
        border: 2px dashed var(--orange);
        border-radius: 50%;
        width: 250px;
        height: 250px;
        margin: 10px 10px 0 0
    }

    .title1, .title2, .title3 {
        font-weight: bold;
    }


    #esmadPhone{
        margin: 0;
        padding: 0;
    }

    .sector3 {
        padding-top: 80px;
        margin: 75px 100px 30px 100px;
        border-top: 1px solid var(--border);
        text-align: end;
    }

    .sector3 h2 {
        font-weight: bold;
        margin-right: 100px;
        color: var(--black);
    }

    .sector4 .left-side, .right-side {
        text-align: left;
    }

    .sector4 > .left-side > .block > .title > h4{
        font-weight: bold;
        font-size: 1.3rem;
    }

    .sector4 > .left-side > .block > .content > p{
        font-size: 18px;
    }

    .sector4 > .right-side > .block > .title > h4{
        font-weight: bold;
        font-size: 1.3rem;
    }

    .sector4 > .right-side > .block > .content > p{
        font-size: 18px;
    }

    .sector4 > .right-side > .block > .button{
        height: 30px;
    }

    .sector4 > .left-side > .block > .button{
        height: 30px;
    }

    .sector4 > .right-side > .block > .button > button{
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        background-color: #24305E;
        border: none;
    }

    .sector4 > .left-side > .block > .button > button{
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        background-color: #24305E;
        border: none;
    }

    .divContainer {
        display: flex;
        justify-content: space-between;
    }

    .sector4{
        margin: 0 120px;
    }

    .sector4 > .right-side > .block {
        margin-top: 285px;
    }

    .sector4 > .left-side > .block {
        margin-bottom: 285px;
    }
</style>