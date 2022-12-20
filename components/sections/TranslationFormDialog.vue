<template>
    <v-dialog v-model="dialog" width="500">
      <v-card v-if="dialog">
        <v-card-title>
          {{ mode === 'edit' ? $t('edit_translation') : $t('new_translation') }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            dense
            outlined
            :label="$t('name')"
          ></v-text-field>
          <v-textarea
            v-model="description"
            dense
            outlined
            :label="$t('description')"
          ></v-textarea>
          <v-select
            v-model="locale"
            outlined
            dense
            :label="$t('locale')"
            :items="languages"
            item-text="native"
            item-value="code"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false"> {{ $t('cancel') }} </v-btn>
          <v-btn color="green" dark @click="save">
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapMutations, mapState } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  import languages from '@/assets/json/languages.json'
  
  const { mapFields } = createHelpers({
    getterType: 'section/getField',
    mutationType: 'section/updateField',
  })
  
  export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['mode'],
    data() {
      return {
        dialog: false,
        locales: [],
      }
    },
    computed: {
      ...mapState('section', ['editSection', 'editTranslation']),
      ...mapFields([
        'editTranslation.name',
        'editTranslation.description',
        'editTranslation.locale',
      ]),
      languages() {
        // const keys = Object.keys(languages)
        const langs = this.locales.map((l) => {
          return {
            ...languages[l],
            code: l,
          }
        })
        return langs
      },
    },
    async created() {
      try {
        const shopId = this.$route.params.shopId
        const res = await this.$axios.get(`/api/settings/${shopId}`)
        this.locales = res.data.enabled_languages
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    methods: {
      ...mapMutations('section', ['addTranslation', 'setTranslation']),
      async save() {
        try {
          // Edit
          if (this.mode === 'edit') {
            const res = await this.$axios.put(
              '/api/sections/translations/' + this.editTranslation.id,
              this.editTranslation
            )
            this.setTranslation(res.data)
          }
          // Create
          else if (this.editSection.id) {
            const res = await this.$axios.post(
              `/api/sections/translations/${this.editSection.id}`,
              {
                ...this.editTranslation,
              }
            )
            this.addTranslation(res.data)
          } else {
            this.addTranslation(this.editTranslation)
          }
          this.$toast.success(this.$t('saved'))
          this.dialog = false
        } catch (error) {
            
          this.$toast.error(this.$t('error_occured'))
        }
      },
    },
  }
  </script>
  
  <style></style>
  