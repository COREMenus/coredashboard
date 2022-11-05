<template>
  <v-dialog v-model="dialog" width="400">
    <v-card v-if="dialog">
      <v-card-title>{{
        mode === 'edit' ? $t('edit_table') : $t('new_table')
      }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          :label="$t('name')"
          outlined
          dense
        ></v-text-field>
        <v-select
          v-model="BranchId"
          :label="$t('branch')"
          item-text="name"
          item-value="id"
          :items="branches"
          outlined
          dense
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-model="BranchId" @click="dialog = false">
          {{ $t('cancel') }}
        </v-btn>
        <v-btn color="green" dark @click="save"> {{ $t('save') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'table/getField',
  mutationType: 'table/updateField',
})
export default {
  props: ['mode'],
  data() {
    return {
      dialog: false,
      branches: [],
    }
  },
  computed: {
    ...mapFields(['editTable.name', 'editTable.BranchId']),
  },
  async created() {
    try {
      const res = await this.$axios.get(
        `/api/branches/${this.$route.params.shopId}/branches`
      )
      this.branches = res.data
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    ...mapActions('table', ['newTable', 'updateTable']),
    async save() {
      try {
        if (this.mode === 'edit') {
          await this.updateTable()
        } else {
          await this.newTable(this.$route.params.shopId)
        }
        this.$toast.success(this.$t('saved'))
        this.dialog = false
      } catch (error) {
        console.log(error)
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
