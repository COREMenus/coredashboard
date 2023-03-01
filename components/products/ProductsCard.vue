<template>
  <!-- Product Data -->
  <v-list-item>
    <!-- Avatar -->
    <v-list-item-avatar size="50" tile rounded="xl">
      <v-avatar color="white" size="50" tile rounded="xl">
        <v-img :src="product.images[0] || ''" />
      </v-avatar>
    </v-list-item-avatar>

    <!-- Name and description -->
    <v-list-item-content>
      <v-list-item-title>{{ product.name }}</v-list-item-title>
      <v-list-item-subtitle> {{ product.description }} </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-row align="center">
        <!-- Edit -->
        <v-col>
          <v-btn icon color="warning" @click="$emit('edit-product', product)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>

        <!-- Delete -->
        <v-col>
          <!-- Confirm Delete -->
          <v-dialog v-model="confirmDialog" width="600" dark>
            <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </template>
            <v-card flat>
              <v-card-title>
                Are you sure you want to delete {{ product.name }}</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmDialog = false"> Cancel </v-btn>
                <v-btn color="red" @click="deleteProduct"> Delete </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <!-- Toggle -->
        <v-col>
          <v-checkbox
            :input-value="product.active"
            @change="toggleProduct"
          ></v-checkbox>
        </v-col>

        <!-- Drag -->
        <v-col>
          <v-list-item-icon>
            <v-icon class="handle">mdi-drag</v-icon>
          </v-list-item-icon>
        </v-col>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ProductsCardComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['product'],
  data() {
    return {
      confirmDialog: false,
    }
  },
  methods: {
    ...mapMutations('product', ['setEditProduct']),
    async toggleProduct() {
      try {
        const res = await this.$axios.put('/api/products/' + this.product.id, {
          active: !this.product.active,
        })
        this.$emit('edit-product', res.data)
        this.$toast.success(
          `${this.product.name} is now ${
            res.data.active ? 'active' : 'inactive'
          }`
        )
      } catch (error) {}
    },
    deleteProduct() {
      this.confirmDialog = false
      this.$emit('delete-product', this.product)
    },
  },
}
</script>

<style lang="scss" scoped>
$card-title-font-weight: 900;
</style>

<style scoped>
.handle {
  cursor: pointer;
}
</style>
