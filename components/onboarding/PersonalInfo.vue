<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="data.first_name"
            outlined
            dense
            :label="$t('first_name')"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="data.last_name"
            outlined
            dense
            :label="$t('last_name')"
          ></v-text-field>
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
            ></v-text-field
          >
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
import countryCodes from '@/assets/json/country_codes.json'
export default {
  data() {
    return {
      loading: false,
      data: {
        first_name: '',
        last_name: '',
        country_code: '',
        phone_number: '',
      },
    }
  },
  computed: {
    countryCodes() {
      return countryCodes
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
