<template>
  <v-container>
    <v-row>
      <h3>Bienvenido: {{ usuario.nombre }}</h3>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
  export default {
    computed:{
      ...mapState(['usuario'])
    }
  }
</script>
