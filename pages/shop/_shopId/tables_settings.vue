<template>
  <v-container>
    <TableForm ref="newForm"></TableForm>
    <TableForm ref="editForm" :mode="'edit'"></TableForm>

    <v-toolbar dense dark rounded="lg">
      <v-toolbar-title> {{ $t('tables_preference') }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="green" @click="newTable">
        {{ $t('new_table') }}
      </v-btn>
      <!-- <v-btn small color="green" class="ml-2">
        <v-icon left>mdi-qrcode</v-icon> Generate QR Codes
      </v-btn> -->
    </v-toolbar>

    <!-- settings -->
    <v-row class="mt-3">
      <v-col>
        <v-card>
          <v-card-title> {{$t('settings')}} </v-card-title>
          <v-card-text class="text--primary">
            <v-checkbox
              :input-value="settings.table_ordering"
              :label="$t('table_ordering')"
              @change="toggle"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-3">
      <v-card-text>
        <v-data-table :headers="headers" :items="tables">
          <template #[`item.actions`]="{ item }">
            <v-btn x-small icon color="orange" @click="editTable(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn x-small icon color="red" @click="deleteT(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-dialog v-model="dialog">
              <template #activator="{ on, attrs }">
                <v-btn x-small icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-qrcode </v-icon>
                </v-btn>
              </template>
              <QRGenerator
                :type="'table'"
                :number="item.name"
                :branch="item.BranchId"
              ></QRGenerator>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import QRGenerator from '~/components/general/QRGenerator.vue'
import TableForm from '~/components/tables/TableForm.vue'
export default {
  components: { TableForm, QRGenerator },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('branch'), value: 'branch.name' },
        { text: this.$t('actions'), value: 'actions' },
      ],
      dialog: false,
      table: {
        name: '',
      },
      branch: null,
      settings: {
        table_ordering: true,
      },
    }
  },
  computed: {
    ...mapState('table', ['tables']),
  },
  async created() {
    try {
      await this.fetchAllTables(this.$route.params.shopId)
      const res = await this.$axios.get(`/api/settings/${this.$route.params.shopId}`)
      this.settings = res.data
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    ...mapActions('table', ['fetchAllTables', 'deleteTable']),
    ...mapMutations('table', ['setEditTable']),
    newTable() {
      this.setEditTable()
      this.$refs.newForm.dialog = true
    },
    editTable(table) {
      this.setEditTable(table)
      this.$refs.editForm.dialog = true
    },
    async deleteT(table) {
      try {
        await this.deleteTable(table)
        this.$toast.success(this.$t('deleted_success'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async toggle() {
      try {
        await this.$axios.put(`/api/settings/${this.$route.params.shopId}`)

        this.settings.table_ordering = !this.settings.table_ordering
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
