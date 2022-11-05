<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn-toggle v-model="mode">
          <v-btn> {{$t('monthly')}} </v-btn>
          <v-btn> {{$t('annual')}} </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(plan, i) in plans" :key="i" cols="4">
        <v-card height="400">
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
              <v-subheader>{{$t('features')}}</v-subheader>
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
              {{$t('checkout')}}
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
      mode: 0,
      plans: [
        {
          name: 'basic_plan',
          branches: '1',
          monthly_price: '$9.99',
          annual_price: '$7.5',
          monthly_priceId: 'price_1LZdPXIrF0x4aHJ61ZxXzFCb',
          annual_priceId: 'price_1LZdPXIrF0x4aHJ64zQl17zn',
        },
        {
          name: 'intermediate_plan',
          branches: '5',
          monthly_price: '$19.99',
          annual_price: '$16.6',
          monthly_priceId: 'price_1LaNu4IrF0x4aHJ6aymAmCYT',
          annual_priceId: 'price_1LaNu4IrF0x4aHJ6lvbId5vc',
        },
        {
          name: 'premium_plan',
          branches: '8',
          monthly_price: '$49.99',
          annual_price: '$39.99',
          monthly_priceId: 'price_1LaNy4IrF0x4aHJ6p0B1OHol',
          annual_priceId: 'price_1LaNy4IrF0x4aHJ63Ugjoy4a',
        },
      ],
    }
  },
  methods: {
    async checkout(priceId) {
      try {
        const res = await this.$axios.post(
          `/api/stripe/create-checkout-session/${priceId}`
        )
        const url = res.data.url
        window.location.replace(url)
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
