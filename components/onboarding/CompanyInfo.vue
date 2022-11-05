<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="data.company"
            outlined
            dense
            :label="$t('company_name')"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-combobox
            v-model="data.type"
            outlined
            dense
            :items="companyTypes"
            :label="$t('company_type')"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="data.country"
            :items="countries"
            dense
            outlined
            :label="$t('country')"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :loading="loading" dark @click="save">{{$t('next')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import countries from '@/assets/json/countries.json'
export default {
  data() {
    return {
        companyTypes: [
        'Coffee Shop',
        'Restaurant',
        'Catering',
        'Hotel',
        'Food Kiosk',
        'Showroom',
        'Salon',
        'Company & Offices',
        'Diet Center',
        'Gym',
        'Hospital',
      ],
      loading: false,
      data: {
        company: '',
        type: '',
        country: '',
      },
    }
  },
  computed: {
    countries() {
      return Object.values(countries)
    },
  },
  methods: {
    async save() {
      try {
        this.loading = true
        const res = await this.$axios.put('/api/accounts', this.data)
        const newUser = Object.assign({}, this.$auth.user, res.data)
        this.$auth.setUser(newUser)
        this.loading = false
        this.$emit('next')
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
