<template>
  <v-navigation-drawer
    v-if="shop.id"
    :value="drawer"
    :right="$vuetify.rtl"
    :mini-variant="mini"
    class="text-body-2"
    width="200"
    app
    permanent
  >
    <v-list-item v-if="!mini">
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Coremenus </v-list-item-title>
        <v-list-item-subtitle> Version 2.0.1 </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in generalRoutes"
        :key="i"
        :to="localePath({ name: item.to, params: { shopId: shop.id } })"
        exact
        exact-active-class="active"
      >
        <template #default="{ active }">
          <v-list-item-icon>
            <v-icon :color="active ? 'primary' : ''">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ $t(item.name) }}
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-if="!mini" disabled>
        <v-list-item-content> {{ $t('menu_settings') }}</v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, i) in menuSettings"
        :key="i"
        :to="localePath({ name: item.to, params: { shopId: shop.id } })"
        exact
        exact-active-class="active"
      >
        <template #default="{ active }">
          <v-list-item-icon>
            <v-icon :color="active ? 'primary' : ''">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ $t(item.name) }}
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SidebarComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['mini', 'drawer'],
  data() {
    return {
      generalRoutes: [
        {
          name: 'dashboard',
          icon: 'mdi-view-dashboard',
          to: 'shop-shopId',
        },
        {
          name: 'orders',
          icon: 'mdi-receipt-text',
          to: 'shop-shopId-orders',
        },
        {
          name: 'branches',
          icon: 'mdi-store',
          to: 'shop-shopId-branches',
        },
        {
          name: 'receive_orders',
          icon: 'mdi-alarm-light',
          to: 'shop-shopId-orders_panel',
        },
        {
          name: 'menu_manager',
          icon: 'mdi-list-box',
          to: 'shop-shopId-menu_manager',
        },
        {
          name: 'users',
          icon: 'mdi-account-multiple',
          to: 'shop-shopId-users',
        },
        {
          name: 'feedbacks',
          icon: 'mdi-message-reply-text',
          to: 'shop-shopId-feedbacks',
        },
        // {
        //   name: 'integrations',
        //   icon: 'mdi-puzzle-plus',
        //   to: 'shop-shopId-integrations'
        // }
      ],
      menuSettings: [
        {
          name: 'menu_preference',
          icon: 'mdi-cog-box',
          to: 'shop-shopId-menu_settings',
        },
        {
          name: 'tables_preference',
          icon: 'mdi-chair-school',
          to: 'shop-shopId-tables_settings',
        },
        {
          name: 'cars_preference',
          icon: 'mdi-car',
          to: 'shop-shopId-cars_settings',
        },
      ],
    }
  },
  computed: {
    ...mapState('shop', ['shop']),
  },
}
</script>

<style scoped>
.active {
  
}
</style>
