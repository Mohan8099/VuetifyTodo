<template>
  <v-app>
    <v-app-bar
      app
      color="green lighten-3"
      dark
    >
      <v-card
        flat
        tile
        width="100%"
        class="green lighten-3 text-center"
       >
        <v-card-text class="black--text">
          <strong>Todos App</strong>
        </v-card-text>
      </v-card>
    </v-app-bar>

    <v-main class="bg-container">
      <TodoApp />
    </v-main>
    <v-footer app bottom absolute padless>
      <v-card
        flat
        tile
        width="100%"
        class="green lighten-1 text-center"
       >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoApp from './components/TodoApp.vue';

export default Vue.extend({
  name: 'App',

  components: {
    TodoApp,
  },

  data: () => ({
    //
  }),
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}
.bg-container {
  width: 100%;
  min-height: 100vh;
  background-image: 
  linear-gradient(62deg, rgba(141, 248, 177, 0.973) 13%, rgba(230, 235, 229, 0.5) 4%),
  linear-gradient(44deg, rgb(130, 170, 133) 39%, rgba(83, 243, 176, 0.5) 18%),
  linear-gradient(118deg, rgb(167, 223, 192) 40%, rgba(122, 160, 114, 0.5) 54%),
  linear-gradient(58deg, rgba(107, 241, 148, 0.781) 83%, rgb(185, 129, 160) 23%);
  background-blend-mode: normal, lighten, multiply, hard-light;
  background-size: cover;
}


</style>