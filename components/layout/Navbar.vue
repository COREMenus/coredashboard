<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="$emit('mini')"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon href="https://guide.coremenus.com" target="_blank">
      <v-icon> mdi-help</v-icon>
    </v-btn>
    <v-btn icon @click="changeTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <dropdown @open-settings="$emit('open-settings')" />
  </v-app-bar>
</template>

<script>
import Dropdown from './Dropdown.vue'
export default {
  name: 'NavbarComponent',
  components: { Dropdown },
  methods: {
    changeTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        if (process.client) {
            localStorage.setItem('dark' , this.$vuetify.theme.dark)
        }
    }
  }
}
</script>

<style></style>
