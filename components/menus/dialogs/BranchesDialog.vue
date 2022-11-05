<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title> {{$t('manage_menu_branches')}} </v-card-title>
      <v-card-text>
        <!-- Branches Menu Settings -->
        <h3 class="text--primary">{{$t('disabled_branches')}}</h3>
        <v-select
          v-model="branch"
          :items="branches"
          item-text="name"
          item-value="id"
          outlined
          dense
          :placeholder="$t('select_branch_disable')"
          @change="disable"
        ></v-select>
        <v-data-table :items="disabledBranches" :headers="headers" dense>
          <template #[`item.actions`]="{ item }">
            <v-btn x-small icon color="red" @click="enable(item)">
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      branches: [],
      dialog: false,
      branch: '',
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('name'), value: 'actions' },
      ],
    }
  },
  computed: mapState('menu', ['editMenu', 'disabledBranches']),

  async created() {
    try {
      const res = await this.$axios.get(`/api/branches/${this.$route.params.shopId}/branches`)
      this.branches = res.data
    } catch (error) {
        this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    ...mapActions('menu', ['enableBranch', 'disableBranch']),
    async disable(id) {
      try {
        const toDisable = this.branches.find((b) => b.id === id)
        const isDisabled = this.disabledBranches.find((b) => b.id === id)
        if (toDisable && !isDisabled) {
          await this.disableBranch(toDisable)
          this.$toast.success(this.$t('saved'))
        }
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async enable(branch) {
      try {
        await this.enableBranch(branch)
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
