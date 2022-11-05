<template>
  <v-card>
    <plan-checkout
      ref="checkoutDialog"
      :plan="selectedPlan"
      :annual="annual"
    ></plan-checkout>
    <v-card-text class="text--primary">
      <v-switch
        v-model="annual"
        :label="$t('twenty_off')"
        prepend-icon="mdi-percent"
      ></v-switch>
      <v-row>
        <v-col
          v-for="plan in plans"
          :key="plan.id"
          lg="4"
          md="6"
          sm="12"
        >
          <v-card flat height="400" rounded="lg" elevation="1">
            <v-card-title> {{ plan.name }} </v-card-title>
            <v-card-text class="text-center text--primary">
              
              <h2 class="text--primary font-weight-medium">
                {{ annual ? plan.annual_price : plan.monthly_price }} {{$t('per_month')}}
              </h2>
              <h3 class="font-weight-regular mt-3">
                {{ annual ? $t('billed_annually') : $t('billed_monthly') }}
              </h3>
              <v-divider class="my-5"></v-divider>
              <v-list class="text-left">
                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title> {{plan.branches}}  </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list>

              <div class="card-footer">
                <v-divider class="mb-3"></v-divider>
                <v-btn
                  :outlined="plan.id !== selectedPlan.id"
                  block
                  small
                  color="primary"
                  @click="pick(plan)"
                >
                  {{ plan.id === selectedPlan.id ? $t('picked') : $t('pick') }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="error">
        <v-col>
            <v-alert type="error" outlined dense>
                {{$t('used_trail')}}
            </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="selectedPlan.id ? false : true" color="primary" block @click="checkout">{{$t('start_trial')}} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PlanCheckout from '../checkout/PlanCheckout.vue'
export default {
  components: { PlanCheckout },
  data() {
    return {
      annual: false,
      error: false,
      errorMessage: '',
      plans: [],
      selectedPlan: {
        id: null,
      },
    }
  },
  async created() {
    try {
      const res = await this.$axios.get('/api/stripe/plans')
      this.plans = res.data.data
      console.log(this.plans)
    } catch (error) {
        this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    pick(plan) {
      this.selectedPlan = plan
    },
    async checkout() {
      try {
        if (!this.selectedPlan) return
        await this.$axios.post(
          '/api/subscriptions/' + this.selectedPlan.id + '?trail=true',
          {
            cycle: this.annual ? 'annual' : 'monthly',
          }
        )
        this.$router.push(this.localePath('/'))
      } catch (error) {
        if (error.response.status === 400) {
            this.error = true
        } else {
            this.$toast.error(this.$t('error_occured'))
        }
        
      }
    },
  },
}
</script>

<style>
.card-footer {
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 100%;
  padding: 10px 15px;
}
</style>
