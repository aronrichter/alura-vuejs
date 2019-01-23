import Cadastro from './cadastro/cadastro.vue';
import Home from './home/home.vue'

export const routes = [
    { path: '', name:'home', component: Home, titulo: 'Home', menu: true },
    { path: '/cadastro/:id', name:'altera', component: Cadastro, titulo: 'Cadastro', menu: false },
    { path: '/cadastro', name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '*', component: Home, menu:false }
];