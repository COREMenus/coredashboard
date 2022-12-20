<template>
  <v-container>
    <!-- Add/Edit Dialog -->
    <product-option-dialog ref="createForm" ></product-option-dialog>
    <product-option-dialog ref="editForm" :mode="'edit'" ></product-option-dialog>

    <!-- Toolbar -->
    <v-toolbar flat dense dark rounded="lg">
        <v-toolbar-title>{{$t('options')}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small color="green" @click="createOption">{{$t('new_option')}}</v-btn>
    </v-toolbar>

    <!-- Table -->
    <v-data-table :items="editOptions" class="mt-2" :headers="headers" dense>
        <template #[`item.actions`]="{ item }">
            <v-btn icon x-small color="orange">
                <v-icon @click="editOption(item)"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn icon x-small color="red">
                <v-icon @click="deleteOption(item)"> mdi-delete </v-icon>
            </v-btn>
        </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ProductOptionDialog from '@/components/options/ProductOptionDialog.vue'
export default {
  components: { ProductOptionDialog },
    data() {
        return {
            headers: [
                { text: this.$t('name'), value: 'name'},
                { text: this.$t('price'), value: 'price'},
                { text: this.$t('calories'), value: 'calories'},
                { text: this.$t('actions'), value: 'actions'}
            ]
        }
    },
    computed: {
        ...mapState('product', ['editProduct']),
        ...mapState('option', ['editOptions'])
    },
    methods: {
        ...mapMutations('option', ['setEditOption' , 'removeOption', 'setEditOptions']),
        createOption() {
            this.setEditOption()
            this.$refs.createForm.dialog = true
        },
        editOption(option) {
            this.setEditOption(option)
            this.$refs.editForm.dialog = true
        },
        async deleteOption(option) {
            try {
                if (this.editProduct.id) {
                    await this.$axios.delete('/api/products/options/' + option.id)
                } 
                this.removeOption(option)
                this.$toast.success('Delete Option Successfully')
            } catch (error) {
        this.$toast.error(this.$t('error_occured'))
            }
        }
    }
}
</script>

<style>

</style>