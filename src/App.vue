<template>
  <div class="corpo">
    <meu-menu :rotas="routes"/>
   <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes }  from './components/routes';
import menu from './components/shared/menu.vue';

export default {
  components: {
    'meu-menu': menu
  },
  data() {
    return {
      routes : routes.filter(route => route.menu)
    }
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica;
    width: 96%;
    margin: 0 auto;
  }
  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .3s
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0
  }
</style>
