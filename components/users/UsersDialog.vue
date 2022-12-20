<template>
  <v-dialog v-model="dialog" width="400">
    <v-card v-if="dialog">
      <v-card-title> {{ mode === 'edit' ? 'Edit' : 'New' }} User </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          :disabled="mode === 'edit'"
          prepend-inner-icon="mdi-account"
          :label="$t('username')"
          :suffix="domain"
          dense
          outlined
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          prepend-inner-icon="mdi-lock"
          :label="$t('password')"
          dense
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false"> {{$t('cancel')}} </v-btn>
        <v-btn color="green" dark @click="save"> {{$t('save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'users/getField',
  mutationType: 'users/updateField',
})
export default {
  props: ['mode'],
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapFields(['editUser.username', 'editUser.password']),
    ...mapState('shop', ['shop']),
    domain() {
        return ``
    }
  },
  methods: {
    ...mapActions('users', ['newUser', 'updateUser']),
    async save() {
      try {
        if (this.mode === 'edit') {
          await this.updateUser()
        } else {
          await this.newUser(this.$route.params.shopId)
        }
        this.dialog = false
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
