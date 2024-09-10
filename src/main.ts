import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from '@services/router/index';
import pinia from '@/stores'

import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { moveDirectivePlugin } from 'lite-move';

const app = createApp(App);
app.use(router);
app.use(pinia)

// @ts-ignore
app.use(Particles, {
    init: async (engine) =>  {
        await loadSlim(engine);
    },
}); 

app.use(moveDirectivePlugin)

app.mount('#app');

