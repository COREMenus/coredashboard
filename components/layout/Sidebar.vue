<template>
  <v-navigation-drawer
    v-if="shop.id"
    :value="drawer"
    :right="$vuetify.rtl"
    dark
    :mini-variant="mini"
    app
    permanent
  >
    <v-list dense nav flat>
      <v-list-item
        v-for="(item, i) in generalRoutes"
        :key="i"
        :to="localePath({ name: item.to, params: { shopId: shop.id } })"
        exact
        exact-active-class=""
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
      <v-list-item disabled>
        <v-list-item-content> {{ $t('menu_settings') }}</v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, i) in menuSettings"
        :key="i"
        :to="localePath({ name: item.to, params: { shopId: shop.id } })"
        exact
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
    <template #append>
      <div class="pa-2">
        <v-btn block> Coremenus V2 </v-btn>
      </div>
    </template>
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

<style></style>
