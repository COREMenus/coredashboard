<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app color="white" flat absolute>
      <v-app-bar-title>
        <v-img src="/logo.png" width="40"></v-img>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout"> <v-icon>mdi-logout-variant</v-icon> </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PanelLayout',
  middleware: 'auth',
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
  },
  created() {
    this.$vuetify.rtl = this.$i18n.localeProperties.dir === 'rtl'
  },
  methods: {
    async logout() {
        try {
            await this.$auth.logout()
        } catch (error) {}
      }
  }
}
</script>

<style></style>
