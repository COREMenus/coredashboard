<template>
  <v-container>
    <v-toolbar dark dense rounded="lg">
      <v-toolbar-title>{{$t('cars_preference')}}</v-toolbar-title>
    </v-toolbar>

    <v-row class="mt-3">
      <v-col>
        <v-card>
          <v-card-title> {{$t('settings')}} </v-card-title>
          <v-card-text class="text--primary">
            <v-checkbox
              :input-value="settings.car_ordering"
              :label="$t('car_ordering')"
              prepend-icon="mdi-car"
              @change="toggle"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-3">
      <v-card-text>
        <v-select
          v-model="branch"
          :items="branches"
          item-text="name"
          item-value="id"
          :label="$t('branch')"
          outlined
          dense
        ></v-select>
        <QRGenerator :type="'car'" :number="1" :branch="branch"></QRGenerator
      ></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import QRGenerator from '~/components/general/QRGenerator.vue'
export default {
  components: { QRGenerator },
  data() {
    return {
      branch: '',
      branches: [],
      settings: {
        car_ordering: false,
      },
    }
  },
  async created() {
    try {
      const res = await this.$axios.get(`/api/branches/${this.$route.params.shopId}/branches`)
      this.branches = res.data

      const res2 = await this.$axios.get(`/api/settings/${this.$route.params.shopId}`)
      this.settings = res2.data
    } catch (error) {
        this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    async toggle() {
      try {
        await this.$axios.put(`/api/settings/${this.$route.params.shopId}`, {
          car_ordering: !this.settings.car_ordering,
        })
        this.settings.car_ordering = !this.settings.car_ordering
        this.$toast.success(this.$t('saved'))
      } catch (error) { 
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
