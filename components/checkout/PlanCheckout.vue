<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title> Complete Checkout </v-card-title>
      <v-card-text>
        <v-card flat class="mb-4">
          <v-card-subtitle>Order Summary</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>{{ plan.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ annual ? 'Annual' : 'Monthly' }} Billing
                </v-list-item-subtitle>
                <v-list-item-action
                  >{{ price }} /
                  {{ annual ? 'Year' : 'Month' }}</v-list-item-action
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Total</v-list-item-title>
                <v-list-item-action>{{ total }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <pay-forms @checked="checkout"></pay-forms>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import PayForms from './PayForms.vue'
export default {
  components: { PayForms },
  // eslint-disable-next-line vue/require-prop-types
  props: ['plan', 'annual'],
  data() {
    return {
      loading: false,
      dialog: false,
    }
  },
  computed: {
    price() {
      return this.annual ? this.plan.annual_price : this.plan.monthly_price
    },
    total() {
      return this.annual ? this.price * 12 : this.price * 1
    },
  },
  methods: {
    async checkout(cardToken) {
      try {
        // Create Payment
        const res = await this.$axios.post(
          '/api/subscriptions/' + this.plan.id,
          {
            cardToken,
            cycle: this.annual ? 'annual' : 'monthly',
          }
        )

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
