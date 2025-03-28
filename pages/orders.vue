<template>
  <v-container>
    <v-toolbar dense flat rounded="lg" dark>
      <v-row align="center">
        <v-col cols="4">
          <v-select
            v-model="branch"
            :items="branches"
            item-text="name"
            item-value="id"
            single-line
            hide-details=""
            :label="$t('select_branch')"
            @change="changeBranch"
          ></v-select>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card class="mt-5">
      <v-card-title> {{ $t('todays_orders') }} </v-card-title>
      <v-card-text>
        <v-data-table
          :sort-by="['createdAt']"
          :sort-desc="[true, false]"
          :items="filteredOrders"
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
                  <!-- Order Details -->
                  <v-row>
                    <v-col>
                      <v-text-field
                        dense
                        readonly
                        :label="$t('branch')"
                        :value="getBranch(item.BranchId)"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        dense
                        readonly
                        :label="$t('time')"
                        :value="formatDate(item.createdAt)"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        dense
                        readonly
                        :label="$t('type')"
                        :value="item.type"
                      />
                    </v-col>
                    <v-col v-if="item.type === 'car'">
                      <v-text-field
                        dense
                        readonly
                        :label="$t('car_number')"
                        :value="item.car_number"
                      />
                    </v-col>
                    <v-col v-if="item.type === 'table'">
                      <v-text-field
                        dense
                        readonly
                        :label="$t('table_number')"
                        :value="item.table_number"
                      />
                    </v-col>
                  </v-row>

                  <!-- Order Note -->
                  <v-row>
                    <v-col>
                      <v-textarea
                        readonly
                        label="Notes"
                        :value="item.note"
                        rows="2"
                      />
                    </v-col>
                  </v-row>

                  <!-- Order Items -->
                  <v-list elevation="2" class="mt-5">
                    <v-subheader>Items</v-subheader>
                    <v-list-item
                      v-for="product in item.orders_products"
                      :key="product.id"
                    >
                      <v-list-item-avatar>
                        <v-img :src="product.product.images[0]"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ product.quantity }}x {{ product.product.name }}
                        </v-list-item-title>
                        <v-list-subtitle>
                          {{
                            product.product_option
                              ? product.product_option.name
                              : ''
                          }}
                        </v-list-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn color="red" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
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
            <v-btn
              v-if="item.status === 'pending'"
              icon
              @click="declineOrder(item)"
            >
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { io } from 'socket.io-client'
import moment from 'moment'
export default {
  name: 'OrdersPage',
  layout: 'panel',
  data() {
    return {
      branch: '',
      beep: '',
      interval: null,
      orders: [],
      socket: {},
      branches: [],
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
      headers: [
        {
          text: this.$t('Date'),
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
    }
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(
        (o) => o.status !== 'completed' && o.status !== 'declined'
      )
    },
    pendingOrders() {
      return this.orders.filter((o) => o.status === 'pending')
    },
    isAdmin() {
      return this.$auth.user.role === 'admin'
    },
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
    this.socket.disconnect()
  },
  mounted() {
    this.beep = new Audio('/notif.mp3')
    this.beep.loop = true
  },
  async created() {
    try {
      const socket = io(process.env.API_BASE_URL)
      this.socket = socket

      const shop = this.$auth.user.ShopId

      const res = await this.$axios.get(`/api/branches/${shop}/branches`)
      this.branches = res.data

      // listeners
      socket.on('orders:new', (order) => {
        this.orders.push(order)
        this.$toast.info(this.$t('new_order'))
        this.beep.play()
        this.fetchOrders()
      })
      this.interval = setInterval(() => {
        if (this.branch) {
          this.fetchOrders()
        }
      }, 10000)
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
    formatDate(date) {
      return moment(date).format(moment(date).format('DD-MM-YYYY'))
    },
    formatTime(date) {
      return moment(date).fromNow()
    },
    async changeBranch() {
      try {
        await this.fetchOrders()
        this.socket.emit('branch:join', this.branch)
      } catch (error) {}
    },
    async fetchOrders() {
      try {
        const shop = this.$auth.user.ShopId

        const res = await this.$axios.get(
          `/api/orders/${shop}/orders?branch=${this.branch}`
        )
        this.orders = []
        this.orders = res.data.filter((order) =>
          moment().isSame(order.createdAt, 'day')
        )
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    statusColor(status) {
      if (status === 'pending') {
        return 'orange'
      } else if (status === 'confirmed') {
        return 'amber'
      } else if (status === 'ready') {
        return 'green'
      } else {
        return 'red'
      }
    },
    confirmOrder(order) {
      order.status = 'confirmed'
      if (this.pendingOrders.length < 1) {
        this.beep.pause()
      }
      this.socket.emit('orders:confirm', order.id)
    },
    declineOrder(order) {
      order.status = 'declined'
      if (this.pendingOrders.length < 1) {
        this.beep.pause()
      }
      this.socket.emit('orders:decline', order.id)
    },
    orderReady(order) {
      order.status = 'ready'
      this.socket.emit('orders:ready', order.id)
    },
    completeOrder(order) {
      order.status = 'completed'
      this.socket.emit('orders:complete', order.id)
    },
  },
}
</script>

<style></style>
