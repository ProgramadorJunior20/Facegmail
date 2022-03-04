<template>
  <v-app>
    <Navbar v-if="usuario != '' "></Navbar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapState } from 'vuex'
export default {
  components: {Navbar},
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState(['usuario'])
  }
};
</script>
