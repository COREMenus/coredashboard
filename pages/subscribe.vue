<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn-toggle v-model="mode">
          <v-btn> {{ $t('monthly') }} </v-btn>
          <v-btn> {{ $t('annual') }} </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(plan, i) in plans" :key="i" sm="12" md="4" lg="4">
        <v-card height="400" class="d-flex flex-column">
          <v-card-title> {{ $t(plan.name) }} </v-card-title>
          <v-card-subtitle>
            {{ mode === 0 ? $t('billed_monthly') : $t('billed_annually') }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <h2 class="font-weight-medium">
              {{ mode === 0 ? plan.monthly_price : plan.annual_price }}
              {{ $t('per_month') }}
            </h2>
            <v-list>
              <v-subheader>{{ $t('features') }}</v-subheader>
              <v-list-item :key="i">
                <v-list-item-icon>
                  <v-icon small color="primary"> mdi-check </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ plan.branches }} {{ $t('branches') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="card-footer">
            <v-btn
              block
              color="primary"
              @click="
                checkout(
                  mode === 0 ? plan.monthly_priceId : plan.annual_priceId
                )
              "
            >
              {{ subscribed ? $t('upgrade') : $t('checkout') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SubscribePage',
  data() {
    return {
      subscribed: false,
      subscription: null,
      mode: 0,
      plans: [
        {
          name: 'basic_plan',
          branches: '1',
          monthly_price: '$9.99',
          annual_price: '$7.5',
          monthly_priceId: process.env.BASIC_MONTHLY_PRICE,
          annual_priceId: process.env.BASIC_ANNUAL_PRICE,
        },
        {
          name: 'intermediate_plan',
          branches: '5',
          monthly_price: '$19.99',
          annual_price: '$16.6',
          monthly_priceId: process.env.INTER_MONTHLY_PRICE,
          annual_priceId: process.env.INTER_ANNUAL_PRICE,
        },
        {
          name: 'premium_plan',
          branches: '8',
          monthly_price: '$49.99',
          annual_price: '$39.99',
          monthly_priceId: process.env.PREMIUM_MONTHLY_PRICE,
          annual_priceId: process.env.PREMIUM_ANNUAL_PRICE,
        },
      ],
    }
  },
  async mounted() {
    try {
      const subscirptionId = this.$auth.user.stripe_subscription_id
      if (subscirptionId) {
        
        const res = await this.$axios.get(
          `/api/stripe/get-subscription/${subscirptionId}`
        )
        const subscription = res.data
        this.subscription = subscription
        this.subscribed = subscription.status === 'active'
      }
    } catch (error) {}
  },
  methods: {
    async checkout(priceId) {
      try {
        if (this.subscribed) {
          await this.$axios.put(`/api/stripe/update-subscription/${this.subscription.id}`, {
            price_id: priceId
          })
          this.$router.push(
            this.localePath({
              name: 'upgraded',
              query: { subscription_id: this.subscription.id },
            })
          )
        } else {
          const res = await this.$axios.post(
            `/api/stripe/create-checkout-session/${priceId}`
          )
          const url = res.data.url
          window.location.replace(url)
        }
      } catch (error) {
        
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
