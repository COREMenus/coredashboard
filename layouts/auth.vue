<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <!-- <v-app-bar app flat absolute>
      <v-app-bar-title>
        <v-img src="/logo.png" width="40"></v-img>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
            {{$i18n.locale}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item :to="switchLocalePath('ar')">
            <v-list-item-title>العربية</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar> -->

    <v-main class="main">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  data() {
    return {
      langs: [
        { text: 'English', value: 'en' },
        { text: 'العربية', value: 'ar' },
      ],
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
  },
  created() {
    this.$vuetify.rtl = this.$i18n.localeProperties.dir === 'rtl'
  },
}
</script>

<style>
.main {
    background:linear-gradient(180deg,#F5F9FF 33%,#FFFFFF 33%);
  background:-webkit-linear-gradient(180deg,#F5F9FF 33%,#FFFFFF 33%);
}
</style>
