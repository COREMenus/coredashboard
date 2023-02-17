<template>
  <v-container>
    <h2>{{ $t('hello') }} {{ $auth.user.first_name }}</h2>
    <v-card class="mt-5" flat>
      <v-card-title>
        {{ $t('your_shops') }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="shop, i in shops">
            <v-list-item :key="shop.id">
              <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ shop.name || 'Your Shop'}} </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" :to="localePath({name: 'shop-shopId', params: { shopId: shop.id }})">
                  <v-icon left>mdi-login</v-icon>
                  {{ $t('go') }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn text outlined color="primary" block>
                <v-icon left>mdi-store-plus</v-icon>
                New Shop
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
        shops: []
    }
  },
  async created() {
    try {
        const res = await this.$axios.get('/api/shops')
        this.shops = res.data
    } catch (error) {
        this.$axios.error(this.$t('error_occured'))
    }
  }
}
</script>

<style></style>
