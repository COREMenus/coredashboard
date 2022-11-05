<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>{{$t('change_card')}}</v-card-title>
      <v-card-text>
        <v-alert type="info">
          {{$t('change_card_desc')}}
        </v-alert>
        <pay-forms @checked="checkout"></pay-forms>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import PayForms from './PayForms.vue'
export default {
  components: { PayForms },
  data() {
    return {
        dialog: false,
    }
  },
  methods: {
    async checkout(cardToken) {
      try {
        // Create Payment
        const res = await this.$axios.post('/api/change_card/', {
            cardToken
        })

        window.location.replace(res.data.checkout)
      } catch (error) {
        this.loading = false
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
