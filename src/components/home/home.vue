<template>
    <div>    
        <h1 class="centralizado">Alurapic</h1>
        <p v-show="mensagem" class="cntralizado"> {{ mensagem }} </p>
        <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
        <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
            <meu-painel :titulo="foto.titulo">
              <imagem-responsiva 
                v-meu-transform:scale="1.2" 
                :url="foto.url" 
                :titulo="foto.titulo"
              />
              <meu-botao 
                tipo="button" 
                rotulo="Remover" 
                @botaoAtivado="remove(foto)"
                :confirmacao="true"
                estilo="perigo"
              />
            </meu-painel>
        </li>
        </ul>
    </div>
</template>

<script>

import Painel from '../shared/painel.vue';
import ImagemResponsiva from '../shared/imagemResponsiva.vue'
import Botao from '../shared/botao.vue'
import FotoService from '../../domain/fotoService';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data () {
    return {
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {

    this.service = new FotoService(this.$resource);
    this.service.lista()
      .then(fotos => this.fotos = fotos, err => console.log(err));
  },

  methods: {
    remove(foto) {
      this.service
        .apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = 'Foto removida com sucesso'
        }, err => {
          console.log(err);
          this.mensagem = 'Não foi possível remover a foto';
        });
    }
  }
}
</script>
<style>
  .centralizado {
    text-align: center;
  }
  .lista-fotos {
    list-style: none;
  }
  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  .filtro {
    display: block;
    width: 100%;
  }
</style>