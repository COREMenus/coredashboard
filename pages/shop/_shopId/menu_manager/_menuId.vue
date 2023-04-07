<template>
  <v-container fluid>
    <v-toolbar dense dark rounded="lg">
      <v-toolbar-title>{{ $t('menu_manager') }}</v-toolbar-title>
    </v-toolbar>

    <div class="mt-5 d-flex" no-gutters>
      <div class="mr-5">
        <select-section :sections="sections"></select-section>
      </div>

      <div class="flex-grow-1">
        <nuxt-child :key="$route.fullPath"></nuxt-child>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SelectSection from '~/components/sections/SelectSection.vue'
export default {
  name: 'ManageMenuPage',
  components: { SelectSection },
  data() {
    return {
        drag: false
    }
  },
  computed: {
    ...mapState('section', ['sections']),
  },
  async created() {
    try {
      await this.fetchMenuSections({
        MenuId: this.$route.params.menuId,
        ShopId: this.$route.params.shopId,
      })
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  beforeDestroy() {
    this.setSections([])
  },
  methods: {
    ...mapActions('section', ['fetchMenuSections', 'updateSectionOrder']),
    ...mapMutations('section', ['setSections']),
  },
}
</script>

<style scoped>
.anime {
  transition: all 0.5s ease;
}

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
