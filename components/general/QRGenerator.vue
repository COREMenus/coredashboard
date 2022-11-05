<template>
  <v-card>
    <v-card-title
      >{{$t('qr_generator')}}
      <v-spacer></v-spacer>
      <v-btn :href="qrlink" target="_blank" color="primary" dark>{{$t('download')}}</v-btn>
    </v-card-title>
    <v-card-text class="text--primary">
      <v-row align="center">
        <v-col cols="5">
          <v-card>
            <v-card-title> {{$t('color')}} </v-card-title>
            <v-card-text><v-color-picker v-model="color"></v-color-picker></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card>
            <v-card-title> {{$t('background_color')}} </v-card-title>
            <v-card-text><v-color-picker v-model="bg"></v-color-picker></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['type', 'number', 'branch'],
    data() {
        return {
            color: '#000000',
            bg: '#FFFFFF',
            branches: [],
        }
    },
    computed: {
        link() {
            return `http://localhost:3000/${this.branch}?${this.type || ''}=${this.number || ''}`
        },
        qrlink() {
            const color = this.color.split('#').join('')
            const bgColor = this.bg.split('#').join('')
            return `https://api.qrserver.com/v1/create-qr-code/?data=${this.link}&amp;size=100x100&color=${color}&bgcolor=${bgColor}`
        } 
    },
}
</script>

<style></style>
