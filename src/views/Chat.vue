<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <h3>bienvenido {{ usuario.nombre }}</h3>
                </v-card-text>

                <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                    <div 
                        :class="item.nombre === usuario.nombre ? 'text-right' : 'text-left'"
                        v-for="(item, index) in mensajes" :key="index"
                    >
                        <v-chip
                            class="ma-2"
                        >
                            <v-avatar left>
                                <img :src="item.foto" alt="">
                            </v-avatar>
                            {{item.mensaje}}
                        </v-chip>
                        <p class="caption mr-2">{{item.fecha}}</p>
                    </div>
                </v-card-text>

                <v-card-text>

                    <v-form @submit.prevent="enviarMensaje" v-model="valido">

                        <v-text-field 
                            v-model="mensaje" 
                            label="Escribe tu mensaje aquí"
                            required
                            :rules="reglas"
                        ></v-text-field>

                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { db } from '../firebase';
import moment from 'moment';

export default {
    data() {
        return {
            mensaje: '',
            valido: false,
            reglas: [
                v => !!v || 'Message is required'
            ],
            mensajes: []
        }
    },
    computed: {
        ...mapState(['usuario']),
    },
    methods: {
        enviarMensaje() {
            if (this.valido) {
                console.log('Enviaste el mensaje', this.mensaje);

                db.collection('chats').add({
                    mensaje: this.mensaje,
                    nombre: this.usuario.nombre,
                    foto: this.usuario.foto,
                    fecha: Date.now()
                }).catch(error=> console.log(error))

                this.mensaje = ''
            }else {
                console.log('No escribiste nada')
            }
            
        }
    },
    created(){

        moment.locale('es');


        let ref = db.collection('chats').orderBy('fecha', 'desc').limit(20)

        ref.onSnapshot(querySnapshot => {

            this.mensajes = []

            querySnapshot.forEach(doc => {
                this.mensajes.unshift({
                    mensaje: doc.data().mensaje,
                    foto: doc.data().foto,
                    nombre: doc.data().nombre,
                    fecha: moment(doc.data().fecha).format('LLL')
                })
            })

            console.log(this.mensajes);
        })
    }
}
</script>