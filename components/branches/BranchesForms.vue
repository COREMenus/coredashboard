<template>
  <v-dialog v-model="dialog" width="300">
    <v-card>
      <v-card-title> {{ mode === 'edit' ? $t('edit_branch') : $t('create_branch')}}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          dense
          outlined
          label="Branch Name"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false"> {{$t('cancel')}} </v-btn>
        <v-btn color="success" dark @click="save"> {{$t('save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {createHelpers} from 'vuex-map-fields'
const {mapFields} = createHelpers({
    getterType: 'branch/getField',
    mutationType: 'branch/updateField'
})
export default {
  name: 'BranchesNameComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['mode'],
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapFields(['editBranch.name']),
    ...mapState('branch', ['editBranch'])
  },
  methods: {
    ...mapActions('branch', ['updateBranch', 'newBranch']),
    async save() {
        try {
            if (this.mode === 'edit') {
                await this.updateBranch()
            } else {
                await this.newBranch(this.$route.params.shopId)
            }
            this.$toast.success(this.$t('saved'))
            this.dialog = false
        } catch (error) {
            if (error.response.status === 400) {
                this.$toast.error(this.$t('max_branches'))
            } else {
                this.$toast.error(this.$t('error_occured'))
            }
        }
    }
  }
}
</script>

<style></style>
