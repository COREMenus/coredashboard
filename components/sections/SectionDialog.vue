<template>
  <v-dialog v-model="dialog" width="400">
    <v-card>
      <v-card-title> {{mode === 'edit'? $t('edit_section'):$t('new_section')}} </v-card-title>
      <v-card-text>
        <v-text-field v-model="name" dense outlined placeholder="Section Name"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">{{$t('cancel')}}</v-btn>
        <v-btn color="green" dark @click="save">{{$t('save')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
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
    }
  },
  computed: {
    ...mapFields(['editSection.name']),
    ...mapState('section', ['editSection']),
  },
  methods: {
    ...mapActions('section', ['newSection', 'updateSection']),
    async save() {
      try {
        if (this.mode === 'edit') {
            await this.updateSection()
        } else {
            console.log(this.$route)
            await this.newSection(this.$route.params.menuId)
        }
        this.dialog = false
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
