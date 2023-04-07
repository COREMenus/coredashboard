<template>
  <v-container>
    <UsersDialog ref="newForm"></UsersDialog>
    <UsersDialog ref="editForm" :mode="'edit'"></UsersDialog>

    <v-card flat rounded="xl" height="700">
      <v-card-title>
        {{$t('users')}}
        <v-spacer></v-spacer>
        <v-btn color="success" depressed @click="newUser">
          <v-icon left>mdi-plus</v-icon>
           {{$t('new_user')}} 
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :items="users" :headers="headers">
          <template #[`item.date`]="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn x-small icon color="orange" @click="editUser(item)">
              <v-icon> mdi-pencil </v-icon>
            </v-btn>

            <v-btn x-small icon color="red" @click="dUser(item)">
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapMutations, mapState } from 'vuex'
import UsersDialog from '~/components/users/UsersDialog.vue'
export default {
  name: 'UsersPage',
  components: { UsersDialog },
  data() {
    return {
      headers: [
        { text: this.$t('username'), value: 'username' },
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('actions'), value: 'actions' },
      ],
    }
  },
  computed: {
    ...mapState('users', ['users']),
  },
  async created() {
    try {
      await this.fetchUsers(this.$route.params.shopId)
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),
    ...mapMutations('users', ['setEditUser']),
    formatDate(date) {
      return moment(date).format('MM/DD/yyyy')
    },
    newUser() {
      this.setEditUser()
      this.$refs.newForm.dialog = true
    },
    editUser(user) {
      this.setEditUser(user)
      this.$refs.editForm.dialog = true
    },
    async dUser(user) {
      try {
        await this.deleteUser(user)
        this.$toast.success(this.$t('deleted_success'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
