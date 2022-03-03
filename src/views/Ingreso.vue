<template>
    <v-row  class="d-flex justify-center mt-5">
        <v-col xs = "12" sm = "8" md = "6" xl = "4">
            <v-card>
                <v-card-text 
                    class="subtitle-1 text-uppercase white--text text-center"
                    :class="registro ? 'success' : 'accent'"
                >
                    <span v-if="!registro">Ingreso</span>
                    <span v-if="registro">Registro</span>
                </v-card-text>

                <v-card-text class="text-center">
                    <v-btn 
                        rounded 
                        color="error" 
                        block
                        class="my-2"
                        @click="google"
                    >
                        <v-icon left>
                             fab fa-google
                        </v-icon>
                        Google
                    </v-btn>
                    <v-btn 
                        rounded 
                        color="info" 
                        block
                        @click="facebook"
                    >
                        <v-icon left>
                             fab fa-facebook
                        </v-icon>
                        Facebook
                    </v-btn>
                </v-card-text>

                <v-card-text>
                    <v-btn 
                        block 
                        @click="registro = true"
                        v-if="!registro"
                    >
                        ¿No tienes cuenta? Registrate aquí
                    </v-btn>
                    <v-btn 
                        block 
                        @click="registro = false"
                        v-if="registro"
                    >
                        ¿Ya tienes cuenta? Ingresa aquí
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import { firebase, auth, db } from '../firebase';
import {mapMutations} from 'vuex'
import router from '../router';

export default {
      data() {
    return {
      registro: false
    }
  },
  methods:{
    ...mapMutations(['nuevoUsuario']),
    facebook(){
      console.log('facebook');
      const provider = new firebase.auth.FacebookAuthProvider();

      this.ingresar(provider);
    },
    google(){
      console.log('google');
      const provider = new firebase.auth.GoogleAuthProvider();
      
      this.ingresar(provider);
    },
    async ingresar(provider){
      firebase.auth().languageCode = 'es';

      try {
        //Ingreso Usuario
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);

        //Construir usuario
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }

        this.nuevoUsuario(usuario)

        //Guardar en Firestore
        await db.collection('usuarios').doc(usuario.uid).set(
          usuario
        )
        console.log('Usuario guardado en DB');

        router.push({name:'Home'})

      } catch (error) {
        console.log(error);
      }
    }
  }

}
</script>