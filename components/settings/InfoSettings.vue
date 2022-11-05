<template>
  <v-card>
    <v-card-title> {{$t('account_info')}} </v-card-title>
    <v-card-text>
      <v-text-field
        readonly
        outlined
        dense
        disabled
        :value="$auth.user.email"
      ></v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="data.first_name" outlined dense :label="$t('first_name')"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="data.last_name" outlined dense :label="$t('last_name')"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="data.country_code"
            :items="countryCodes"
            item-text="code"
            item-value="dial_code"
            dense
            outlined
            :label="$t('country_code')"
          >
            <template #item="{ item }">
              {{ `${item.name} (${item.dial_code})` }}
            </template>
            <template #selection="{ item }">
              {{ `${item.name} (${item.dial_code})` }}
            </template>
          </v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="data.phone_number"
            outlined
            dense
            :label="$t('phone_number')"
            >Phone Number</v-text-field
          >
        </v-col>
      </v-row>
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
            v-model="data.company_type"
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
      <v-btn :loading="loading" color="primary" @click="save"> {{$t('save')}} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import countryCodes from '@/assets/json/country_codes.json'
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
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
        country_code: this.$auth.user.country_code,
        phone_number: this.$auth.user.phone_number,
        company: this.$auth.user.company,
        company_type: this.$auth.user.company_type,
        country: this.$auth.user.country,
      },
    }
  },
  computed: {
    countryCodes() {
      return countryCodes
    },
    countries() {
      return Object.values(countries)
    },
  },
  methods: {
    async save() {
        try {
        this.loading = true
        const res = await this.$axios.put('/api/accounts', this.data)
        this.$auth.setUser(res.data)
        this.loading = false
        this.$toast.success('Saved account information')
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    }
  }
}
</script>

<style scoped>
.col {
  padding: 2px 12px;
}
</style>
