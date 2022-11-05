<template>
  <v-container fill-height>
    <change-card-dialog ref="changeCardDialog"></change-card-dialog>
    <!-- Personal Info -->
    <v-row class="mt-5" justify="center">
      <v-col cols="10">
        <info-settings></info-settings>
      </v-col>
    </v-row>
    <v-row class="mt-5 pb-16" justify="center">
      <v-col cols="10">
        <v-card>
            <v-card-title> {{$t('billing_settings')}} </v-card-title>
            <v-card-text class="text--primary">
                <v-btn outlined color="primary" block :href="customerPortalUrl"> {{$t('billing_manager')}} </v-btn>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import InfoSettings from '~/components/settings/InfoSettings.vue'
import ChangeCardDialog from '~/components/checkout/ChangeCardDialog.vue'

export default {
  components: { InfoSettings, ChangeCardDialog },
  data() {
    return {
        customerPortalUrl: '',
        headers: [
            {text: 'ID', value: 'id'},
            {text: this.$t('current_plan'), value: 'plan.name'},
            {text: this.$t('date'), value: 'createdAt'},
            {text: this.$t('cycle'), value: 'billing_cycle'},
            {text: this.$t('status'), value: 'status'}
        ]
    }
  },
  computed: {
    ...mapState('subscription', ['subscriptions']),
    ...mapGetters('subscription', ['activeSubscription']),
    price() {
        const plan = this.activeSubscription.plan
        return this.activeSubscription.cycle === 'annual' ? plan.annual_price : plan.monthly_price 
    }
  },
  async created() {
    try {
        const res = await this.$axios.post('/api/stripe/create-customer-portal')
        this.customerPortalUrl = res.data.url
    } catch (error) {
        console.log(error)
    }
  },
  methods: {
    formatDate(date) {
        return moment(date).format('MMM Do YYYY')
    }
  }
}
</script>

<style scoped>
.col {
    padding: 2px 12px;
}
</style>
