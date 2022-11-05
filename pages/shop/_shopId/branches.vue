<template>
  <v-container>
    <branches-forms ref="createForm" />
    <branches-forms ref="editForm" :mode="'edit'" />

    <v-toolbar flat dark rounded="lg" dense>
      <v-toolbar-title> {{ $t('branches') }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="green" small @click="createBranch">
        {{ $t('create_branch') }}
      </v-btn>
    </v-toolbar>

    <v-alert v-if="branches.length > $auth.user.max_branches" type="warning" outlined class="mt-5" dense>
        {{$t('max_branches')}}
    </v-alert>
    <v-row class="mt-5">
      <!-- Branch Data Table -->
      <v-col>
        <v-card height="500">
          <v-card-text>
            <v-data-table
              :loading="loading"
              :headers="headers"
              :items="branches"
            >
              <!-- active checkbox -->
              <template #[`item.active`]="{ item }">
                <v-checkbox
                  :input-value="item.active"
                  @change="toggle(item)"
                ></v-checkbox>
              </template>

              <!-- actions -->
              <template #[`item.actions`]="{ item }">
                <v-btn color="orange" icon @click="editBranch(item)">
                  <v-icon>mdi-pencil </v-icon>
                </v-btn>
                <v-btn color="red" icon @click="dBranch(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import BranchesForms from '~/components/branches/BranchesForms.vue'
const { mapFields } = createHelpers({
  getterType: 'branch/getField',
  mutationType: 'branch/updateField',
})
export default {
  name: 'BranchesPage',
  components: { BranchesForms },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapFields(['editBranch.active']),
    ...mapState('branch', ['branches']),
    headers() {
      return [
        {
          text: this.$t('branch_name'),
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: this.$t('active'), sortable: true, value: 'active' },
        { text: this.$t('actions'), value: 'actions', align: 'center' },
      ]
    },
  },
  async created() {
    try {
      this.loading = true
      await this.fetchBranches(this.$route.params.shopId)
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
    this.loading = false
  },
  methods: {
    ...mapActions('branch', ['fetchBranches', 'updateBranch', 'deleteBranch']),
    ...mapMutations('branch', ['setEditBranch']),
    editBranch(branch) {
      this.setEditBranch(branch)
      this.$refs.editForm.dialog = true
    },
    createBranch() {
      this.setEditBranch()
      this.$refs.createForm.dialog = true
    },
    async dBranch(branch) {
      try {
        await this.deleteBranch(branch)
        this.$toast.success(this.$t('deleted_success'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async toggle(item) {
      try {
        this.setEditBranch(item)
        this.active = !this.active
        await this.updateBranch()
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
