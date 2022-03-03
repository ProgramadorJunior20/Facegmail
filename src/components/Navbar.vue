<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-toolbar-title class="headline text-uppercase">
          <span>Vue</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon class="fa-light">fa fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer color="grey lighten-5" v-model="drawer" app>
      
      <v-row  class="mt-5" no-gutters>
        <v-col cols="12" align="center">
          <v-avatar color="indigo">
            <img :src="usuario.foto" alt="">
          </v-avatar>
        </v-col>
        <v-col cols="12" align="center">
            <p class="mt-3">{{ usuario.nombre }}</p>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-list>
        <v-list-item 
            v-for="(item, index) in items" :key="index"
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon class="black--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Perfil", icon: "fas fa-address-card", to: {name: "Home"}},
        { title: "Fotografias", icon: "fas fa-images", to: {name: "Ingreso"} },
        { title: "Admin", icon: "fas fa-chalkboard-teacher", to: {name: "Admin"} },
      ],
    };
  },
  methods: {
    ...mapActions(['cerrarSesion']),
  },
  computed: {
      ...mapState(['usuario'])
  }
};
</script>
