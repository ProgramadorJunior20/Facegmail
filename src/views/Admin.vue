<template>
    <v-row justify="center">
        <v-col cols = "9">
            <v-card class="text-center">
                <v-card-text>
                    <v-avatar color="indigo">
                        <img :src="usuario.foto" alt="">
                    </v-avatar>
                </v-card-text>
                <v-card-text>
                    <h3>{{ usuario.nombre }}</h3>
                </v-card-text>
                <v-card-text>
                    <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
                    <v-btn 
                        class="ma-3"
                        color="secondary"
                        @click="$refs.boton.click()"
                    >
                        Buscar Imagen
                        <v-icon dark class="ma-1">fab fa-searchengin</v-icon>
                    </v-btn>
                    <v-btn 
                        color="blue-grey" 
                        class="ma-2 white--text"
                        :disabled="file === null"
                    >
                        Subir Imagen
                        <v-icon dark class="ma-1">fas fa-cloud-upload-alt</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text v-if="file">
                    <h4>{{ file.name }}</h4>
                    <v-img :src="urlTemporal"></v-img>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex"

export default ({
    data() {
        return {
            file: null,
            urlTemporal: ''
        }
    },
    computed:{
        ...mapState(['usuario'])
    },
    methods:{
        buscarImagen(event){
            console.log(event.target.files[0]);
            this.file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                /* console.log(e.target.result); */
                this.urlTemporal = e.target.result
            }
        }
    }
})
</script>
