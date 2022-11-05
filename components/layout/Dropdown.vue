<template>
  <v-menu transition="scale" :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list dense rounded>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar color="orange">MO</v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>{{$auth.user.first_name}} {{$auth.user.last_name}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item :to="localePath('/account_settings')">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('settings')}}</v-list-item-title>
      </v-list-item>

      <!-- Langs -->
      <v-list-group>
        <template #activator>
          <v-list-item-icon>
            <v-icon>mdi-translate</v-icon>
          </v-list-item-icon>
          <v-list-item-title> {{$t('language')}} </v-list-item-title>
        </template>

        <v-list-item :to="switchLocalePath('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item :to="switchLocalePath('ar')" >
          <v-list-item-title>العربية</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('logout')}}</v-list-item-title>

        
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'DropdownComponent',
  methods: {
      changelang() {
          this.$vuetify.lang.current = 'ar'
          this.$vuetify.rtl = true
      },
      async logout() {
        try {
            await this.$auth.logout()
        } catch (error) {}
      }
  }
}
</script>

<style></style>
