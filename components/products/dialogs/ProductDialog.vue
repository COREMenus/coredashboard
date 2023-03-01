<template>
  <v-dialog v-model="dialog" width="700">
    <v-card class="card">
      <v-card-title>
        {{ mode === 'edit' ? $t('edit_product') : $t('new_product') }}
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="tab" grow>
          <v-tab> {{$t('general')}} </v-tab>
          <v-tab> {{$t('options')}} </v-tab>
          <v-tab> {{$t('translation')}}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item><ProductGeneralVue v-if="dialog" /></v-tab-item>
          <v-tab-item><ProductOptions v-if="dialog" /></v-tab-item>
          <v-tab-item><product-translation></product-translation></v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions
        class="action"
        
      >
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false"> {{$t('cancel')}} </v-btn>
        <v-btn color="success" :loading="loading" @click="save">
          {{$t('save')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import ProductGeneralVue from '../ProductGeneral.vue'
import ProductOptions from '../../options/ProductOptions.vue'
import ProductTranslation from '../ProductTranslation.vue'
export default {
  components: { ProductGeneralVue, ProductOptions, ProductTranslation },
  props: ['mode'],
  data() {
    return {
      loading: false,
      dialog: false,
      tab: 0,
    }
  },
  computed: {
    ...mapState('product', ['editProduct', 'editOptions', 'editImages']),
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
  },
  watch: {
    dialog(newDialog, oldDialog) {
        this.tab = 0
        if (newDialog === true) {
            // * Set Edit Translations and Edit 
            if (this.mode === 'edit') {
                this.fetchProductOptions(this.editProduct.id)
            } else {
                this.setEditOptions()
            }
        } 
    }
  },
  methods: {
    ...mapMutations('product', ['setEditProduct']),
    ...mapMutations('option', ['setEditOptions']),
    ...mapActions('product', ['newProduct', 'updateProduct']),
    ...mapActions('option', ['fetchProductOptions']),
    async save() {
        this.loading = true
      try {
        if (this.mode === 'edit') {
          await this.updateProduct()
        } else {
            await this.newProduct()
        }
        this.setEditProduct()
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
        this.dialog = false
        this.loading = false
    },
  },
}
</script>

<style scoped>
.card {
  position: relative;
}
.action {
  position: sticky;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
