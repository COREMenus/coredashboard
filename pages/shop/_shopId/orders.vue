<template>
  <v-container fluid>
    <h2> Orders </h2>
    
    <v-row>
      <v-col sm="12" md="6">
        <v-select
            v-model="branch"
            :items="branches"
            item-text="name"
            item-value="id"
            single-line
            dense
            solo
            flat
            hide-details=""
            :label="$t('select_branch')"
            @change="changeBranch"
          ></v-select>
      </v-col>
    </v-row>

    <v-card class="mt-5">
      <v-data-table
        :sort-by="['createdAt']"
        :sort-desc="[true, false]"
        :items="ordersToShow"
        :headers="headers"
        :loading="loading"
      >
        <template #[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template #[`item.time`]="{ item }">
          {{ formatTime(item.createdAt) }}
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip dark label :color="statusColor(item.status)">{{
            item.status === 'confirmed' ? 'preparing' : item.status
          }}</v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-dialog width="700">
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn>Cancel</v-btn>
                <v-btn color="green">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      loading: true,
      orders: [],
      ordersToShow: [],
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
      const res = await this.$axios.get(`/api/branches/${shop}/branches`)
      this.loading = false
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
    changeBranch() {
      try {
        this.ordersToShow = this.orders.filter(
          (order) => order.BranchId === this.branch
        )
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
        this.ordersToShow = this.orders
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
