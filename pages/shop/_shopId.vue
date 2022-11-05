<template>
  <v-container fluid>
    <nuxt-child :key="$route.fullPath"></nuxt-child>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    layout: 'shop',
  data() {
    return {
        mini: true, 
        drawer: true
    }
  },
    computed: {
        ...mapState('shop', ['shop'])
    },
    async created() {
        try {
            await this.fetchShop(this.$route.params.shopId)
        } catch (error) {
            this.$toast.error(this.$t('error_occured'))
        }
    },
    methods: {
        ...mapActions('shop', ['fetchShop'])
    }
}
</script>

<style>

</style>