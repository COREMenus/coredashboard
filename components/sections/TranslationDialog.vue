<template>
    <v-dialog v-model="dialog" width="700">
      <v-card>
          <v-card-title></v-card-title>
        <v-card-text>
          <!-- Add/Edit Dialog -->
          <TranslationFormDialog ref="createForm"></TranslationFormDialog>
          <TranslationFormDialog
            ref="editForm"
            :mode="'edit'"
          ></TranslationFormDialog>
  
          <!-- Toolbar -->
          <v-toolbar flat dense dark rounded="lg">
            <v-toolbar-title>{{ $t('translation') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small color="green" @click="createTranslation">{{
              $t('new_translation')
            }}</v-btn>
          </v-toolbar>
  
          <!-- Table -->
          <v-data-table
            :items="editTranslations"
            class="mt-2"
            :headers="headers"
            dense
          >
            <template #[`item.actions`]="{ item }">
              <v-btn icon x-small color="orange">
                <v-icon @click="editTranslation(item)"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon x-small color="red">
                <v-icon @click="deleteTranslation(item)"> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapMutations, mapState } from 'vuex'
import TranslationFormDialog from './TranslationFormDialog.vue'
  export default {
    components: { TranslationFormDialog },
    data() {
      return {
        dialog: false,
        headers: [
          { text: this.$t('name'), value: 'name' },
          { text: this.$t('description'), value: 'description' },
          { text: this.$t('locale'), value: 'locale' },
          { text: this.$t('actions'), value: 'actions' },
        ],
      }
    },
    computed: {
      ...mapState('section', ['editTranslations', 'editSection']),
    },
    methods: {
      ...mapMutations('section', ['setEditTranslation', 'removeTranslation']),
      createTranslation() {
        this.setEditTranslation()
        this.$refs.createForm.dialog = true
      },
      editTranslation(translation) {
        this.setEditTranslation(translation)
        this.$refs.editForm.dialog = true
      },
      async deleteTranslation(translation) {
        try {
          if (this.editSection.id) {
            await this.$axios.delete('/api/sections/translations/' + translation.id)
          }
          this.removeTranslation(translation)
          this.$toast.success('Delete Tran Successfully')
        } catch (error) {
          this.$toast.error(this.$t('error_occured'))
        }
      },
    },
  }
  </script>
  
  <style></style>
  