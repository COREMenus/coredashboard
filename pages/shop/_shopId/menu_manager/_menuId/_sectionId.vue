<template>
  <v-container>
    <!-- New Product Dialog -->
    <product-dialog ref="newForm" :mode="'new'" />
    <product-dialog ref="editForm" :mode="'edit'" />

    <v-card flat min-height="700" rounded="xl">
      <v-card-title>
        {{ $t('products') }}
        <v-spacer></v-spacer>
        <v-btn
          small
          class="mt-3"
          depressed
          color="green"
          dark
          @click="newProduct"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ $t('new_product') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="products.length < 1" class="d-flex flex-column align-center">
          <img src="~/assets/img/no-products.svg" height="200" />
          <h2 class="mt-3">{{ $t('no_product') }}</h2>
          <v-btn
            large
            class="mt-3"
            depressed
            color="green"
            dark
            @click="newProduct"
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $t('new_product') }}
          </v-btn>
        </div>
        <!-- Product List -->
        <draggable
          v-bind="dragOptions"
          v-model="currentProducts"
          class="d-flex flex-column v-list"
          :class="$vuetify.theme.isDark ? 'theme--dark' : 'theme--light'"
          handle=".handle"
          tag="div"
          @change="updateListSortOrder"
          @start="drag = true"
          @end="drag = false"
        >
          <products-card
            v-for="product in currentProducts"
            :key="product.id"
            :product="product"
            @edit-product="editProduct"
            @delete-product="dProduct"
          ></products-card>
        </draggable>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapMutations, mapState } from 'vuex'
import ProductsCard from '~/components/products/ProductsCard.vue'
import ProductDialog from '~/components/products/dialogs/ProductDialog.vue'
export default {
  name: 'ProductsPage',
  components: { ProductsCard, ProductDialog, draggable },
  data() {
    return {
      drag: false,
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapState('product', ['products']),
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      }
    },
    currentProducts: {
      get() {
        return this.products
      },
      set(val) {
        this.setProducts(val)
      },
    },
  },
  async created() {
    try {
      await this.fetchSectionProducts({
        SectionId: this.$route.params.sectionId,
        ShopId: this.$route.params.shopId,
      })
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  beforeDestroy() {
    this.setProducts([])
  },
  methods: {
    ...mapActions('product', ['fetchSectionProducts', 'deleteProduct']),
    ...mapMutations('product', ['setEditProduct', 'setProducts']),
    editProduct(product) {
      this.setEditProduct(product)
      this.$refs.editForm.dialog = true
    },
    newProduct() {
      this.setEditProduct()
      this.$refs.newForm.dialog = true
    },
    async dProduct(product) {
      try {
        await this.deleteProduct(product)
        this.$toast.success(this.$t('deleted_success'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    updateListSortOrder(e) {
      this.loading = true
      const newList = [...this.products].map((item, index) => {
        const newSort = index + 1
        if (item.order !== newSort) {
          try {
            this.$axios.put('/api/products/' + item.id, {
              order: newSort,
            })
          } catch (error) {}
        }
        return item
      })
      this.setProducts(newList)
      this.loading = false
      this.$toast.success(this.$t('saved'))
    },
  },
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
.no-move {
  transition: all 0s;
}
.ghost {
  opacity: 0.5;
  background: rgb(227, 65, 6);
}
</style>
