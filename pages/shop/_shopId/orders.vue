<template>
  <v-container>
    <v-toolbar dark dense rounded="lg">
      <v-toolbar-title> {{ $t('orders') }}</v-toolbar-title>
      <v-row justify="end">
        <v-col cols="4">
            <v-select
        v-model="branch"
        :items="branches"
        item-text="name"
        item-value="id"
        single-line
        dense
        outlined
        hide-details=""
        :label="$t('select_branch')"
        @change="changeBranch"
      ></v-select>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card class="mt-5">
      <v-data-table
        :sort-by="['createdAt']"
        :sort-desc="[true, false]"
        :items="orders"
        :headers="headers"
      >
        <template #[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template #[`item.time`]="{ item }">
          {{ formatTime(item.createdAt) }}
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip :color="statusColor(item.status)">{{
            item.status === 'confirmed' ? 'preparing' : item.status
          }}</v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-dialog width="900">
            <template #activator="{ attrs, on }">
              <v-btn v-bind="attrs" icon v-on="on">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>{{ $t('order') }} {{ item.id }}</v-card-title>
              <v-card-text class="text--primary">
                <v-row>
                  <v-col>
                    {{ $t('branch') }}:
                    {{ getBranch(item.BranchId) }}
                  </v-col>
                  <v-col>
                    {{ $t('time') }}: {{ formatDate(item.createdAt) }}
                  </v-col>
                  <v-col> {{ $t('type') }}: {{ item.type }} </v-col>
                  <v-col v-if="item.type === 'car'">
                    {{ $t('car_number') }}: {{ item.car_number }}
                  </v-col>
                  <v-col v-if="item.type === 'table'">
                    {{ $t('table_number') }}: {{ item.table_number }}
                  </v-col>
                </v-row>
                <v-data-table
                  :items="item.orders_products"
                  :headers="productsHeaders"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn
            v-if="item.status === 'pending'"
            x-small
            depressed
            dark
            color="green"
            @click="confirmOrder(item)"
          >
            {{ $t('confirm_order') }}
          </v-btn>
          <v-btn v-if="item.status === 'pending'" icon>
            <v-icon color="red">mdi-window-close</v-icon>
          </v-btn>
          <v-btn
            v-if="item.status === 'confirmed'"
            icon
            @click="orderReady(item)"
          >
            <v-icon color="green">mdi-check</v-icon>
          </v-btn>
          <v-btn
            v-if="item.status === 'ready'"
            x-small
            dark
            color="green"
            @click="completeOrder(item)"
          >
            {{ $t('complete_order') }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      branches: [],
      branch: '',
      headers: [
        {
          text: this.$t('date'),
          value: 'createdAt',
        },
        {
          text: this.$t('time'),
          value: 'time',
        },
        {
          text: this.$t('type'),
          value: 'type',
        },
        {
          text: this.$t('status'),
          value: 'status',
        },
        {
          text: this.$t('actions'),
          value: 'actions',
        },
      ],
      productsHeaders: [
        {
          text: this.$t('name'),
          value: 'product.name',
        },
        {
          text: this.$t('quantity'),
          value: 'quantity',
        },
        {
          text: this.$t('options'),
          value: 'product_option.name',
        },
        {
          text: this.$t('quantity'),
          value: 'price',
        },
      ],
    }
  },
  async created() {
    try {
      await this.fetchOrders()
      const shop = this.$route.params.shopId

      const res = await this.$axios.get(
        `/api/branches/${shop}/branches`
      )
      console.log(res.data)
      this.branches = res.data
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    getBranch(id) {
        const branch = this.branches.find((b) => b.id === id)
        if (branch) {
            return branch.name
        } else {
            return 'None'
        }
    },
    async changeBranch() {
      try {
        await this.fetchOrders()
      } catch (error) {}
    },
    formatDate(date) {
      return moment(date).format(moment(date).format('DD-MM-YYYY'))
    },
    formatTime(date) {
      return moment(date).fromNow()
    },
    async fetchOrders() {
      try {
        const res = await this.$axios.get(
          `/api/orders/${this.$route.params.shopId}/orders`
        )
        this.orders = res.data
        console.log(res.data)
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    statusColor(status) {
      if (status === 'pending') {
        return 'orange'
      } else if (status === 'confirmed') {
        return 'amber'
      } else if (status === 'ready' || status === 'completed') {
        return 'green'
      } else {
        return 'red'
      }
    },
  },
}
</script>

<style></style>
