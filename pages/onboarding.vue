<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" md="12">
        <h1>{{ $t('onboarding') }}</h1>
        <p>{{ $t('few_mins') }}</p>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-col lg="10" md="12">
        <v-stepper v-model="step" flat rounded="md" vertical>
          <!-- Personal Info -->
          <v-stepper-step :complete="step > 1" step="1">
            {{ $t('personal_info') }}
          </v-stepper-step>
          <v-stepper-content step="1">
            <personal-info @next="step = 2"></personal-info>
          </v-stepper-content>

          <!-- Company Info -->
          <v-stepper-step :complete="step > 2" step="2">
            {{ $t('company_info') }}
          </v-stepper-step>
          <v-stepper-content step="2">
            <company-info @next="step = 3"></company-info>
          </v-stepper-content>

          <!-- Company Info -->
          <v-stepper-step :complete="step > 3" step="3">
            {{ $t('shop_info') }}
          </v-stepper-step>
          <v-stepper-content step="3">
            <shop-info></shop-info>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompanyInfo from '~/components/onboarding/CompanyInfo.vue'
import PersonalInfo from '~/components/onboarding/PersonalInfo.vue'
// import PickPlan from '~/components/onboarding/PickPlan.vue'
import ShopInfo from '~/components/onboarding/ShopInfo.vue'
export default {
  name: 'OnboardingPage',
  components: { PersonalInfo, CompanyInfo, ShopInfo },
  layout: 'auth',
  data() {
    return {
      step: 1,
    }
  },
  mounted() {
    if (this.$route.query.step) {
      this.step = this.$route.query.step
    }
  },
}
</script>

<style></style>
