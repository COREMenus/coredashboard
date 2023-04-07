<template>
  <v-card height="700" rounded="xl" flat>
    <v-card-title>{{ $t('integrations') }}</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="60" tile>
            <v-img :src="stripe" contain></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Stripe</v-list-item-title>
            <v-list-item-subtitle>
              Payment processing for online businesses, supporting various
              payment methods and currencies.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn small color="success" depressed @click="integrateStripe">
              <v-icon left>mdi-connection</v-icon>
              Connect
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import stripeImage from '../../../assets/img/stripe.png'
export default {
  name: 'IntegrationsPage',
  data() {
    return {
      stripe: stripeImage,
    }
  },
  methods: {
    async integrateStripe() {
      const res = await this.$axios.post('/api/stripe/connect');
      const link = res.data.link
      window.location.href = link
    }
  }
}
</script>
