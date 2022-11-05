<template>
  <v-container>
    <h1 class="font-weight-regular text-center">Purchased Successfully</h1>
    <p class="text-center">Thank you for becoming a part of CoreMenus!</p>
    <v-row justify="center">
        <v-col cols="7">
            <v-card flat>
        <v-card-title class="text-weight-regular"> Your Order Details </v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-list-item-icon><v-icon> mdi-update</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title> {{billingMode === 'month' ? $t('billed_monthly') : $t('billed_annually')}} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon><v-icon> mdi-calendar</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title> {{$t('next_billing_date')}}: {{next_billing_date}} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="localePath('/')" small color="primary" outlined>
                {{$t('home')}}
            </v-btn>
        </v-card-actions>
    </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SuccessPage',
  data() {
    return {
        session: {},
        subscription: {},
        next_billing_date: '',
        billingMode: 'month'
    }
  },
  async created() {
    try {
        const res = await this.$axios.get(`/api/stripe/get-checkout-session/${this.$route.query.session_id}`)
        this.session = res.data
        
        const res2 = await this.$axios.get(`/api/stripe/get-subscription/${this.session.subscription}`)
        this.subscription = res2.data

        moment.locale(this.$i18n.locale)
        this.next_billing_date = moment.unix(this.subscription.current_period_end).format('dddd, MMMM Do YYYY')
        this.billingMode = this.subscription.plan.interval
        
    } catch (error) {
        this.$router.push(this.localePath('/'))
    }
  }
}
</script>

<style></style>
