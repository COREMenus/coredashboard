<template>
  <v-container>
    <menu-dialog ref="editForm" :mode="'edit'"></menu-dialog>
    <menu-dialog ref="newForm"></menu-dialog>
    <branches-dialog ref="branchesManager"></branches-dialog>
    <translation-dialog ref="translation"></translation-dialog>

    <v-card height="700" flat rounded="xl">
      <v-card-title>
        {{ $t('menu_manager') }}
        <v-spacer></v-spacer>
        <v-btn small depressed color="green" dark @click="createMenu">
          <v-icon left>mdi-plus</v-icon>
          {{ $t('create_menu') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div
          v-if="menus.length === 0 && !loading"
          class="d-flex flex-column align-center"
        >
          <img src="~/assets/img/no-menus.svg" height="200" />
          <h2 class="mt-3">{{ $t('no_menu') }}</h2>
          <v-btn
            large
            class="mt-3"
            depressed
            color="green"
            dark
            @click="createMenu"
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $t('create_menu') }}
          </v-btn>
        </div>

        <draggable
          v-bind="dragOptions"
          v-model="currentMenus"
          class="mt-5 v-list"
          :class="$vuetify.theme.isDark ? 'theme--dark' : 'theme--light'"
          handle=".handle"
          tag="div"
          @change="updateListSortOrder"
          @start="drag = true"
          @end="drag = false"
        >
          <template v-for="menu in menus">
            <menu-card
              :key="menu.id"
              :menu="menu"
              @editMenu="edit"
              @manageBranches="manageBranches"
              @deleteMenu="deleteM"
              @translation="openTranslation"
            />
          </template>
        </draggable>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// Vuex
import { mapState, mapActions, mapMutations } from 'vuex'

// Import Components
import draggable from 'vuedraggable'
import MenuCard from '~/components/menus/MenuCard.vue'
import MenuDialog from '~/components/menus/dialogs/MenuDialog.vue'
import BranchesDialog from '~/components/menus/dialogs/BranchesDialog.vue'
import TranslationDialog from '~/components/menus/dialogs/TranslationDialog.vue'

export default {
  name: 'MenuManagerPage',
  components: {
    MenuCard,
    draggable,
    MenuDialog,
    BranchesDialog,
    TranslationDialog,
  },
  data() {
    return {
      drag: false,
      loading: true,
    }
  },
  computed: {
    ...mapState('menu', ['menus', 'editMenu']),
    currentMenus: {
      get() {
        return this.menus
      },
      set(val) {
        return this.setMenus(val)
      },
    },
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  async created() {
    this.loading = true
    try {
      await this.fetchMenus(this.$route.params.shopId)
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
    this.loading = false
  },
  methods: {
    ...mapActions('menu', ['fetchMenus', 'deleteMenu', 'updateMenuOrder']),
    ...mapMutations('menu', ['setMenus', 'setEditMenu']),
    edit(menu) {
      this.setEditMenu(menu)
      this.$refs.editForm.dialog = true
    },
    createMenu() {
      this.setEditMenu()
      this.$refs.newForm.dialog = true
    },
    manageBranches(menu) {
      this.setEditMenu(menu)
      this.$refs.branchesManager.dialog = true
    },
    async deleteM(menu) {
      try {
        await this.deleteMenu(menu)
        this.$toast.success(this.$t('deleted_success'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    openTranslation(menu) {
      this.setEditMenu(menu)
      this.$refs.translation.dialog = true
    },
    updateListSortOrder(e) {
      try {
        const newList = [...this.menus].map((item, index) => {
          const newSort = index + 1
          if (item.order !== newSort) {
            this.updateMenuOrder({
              id: item.id,
              order: newSort,
            })
          }
          return item
        })
        this.setMenus(newList)
        this.$toast.success(this.$t('saved'))
      } catch (error) {}
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
  background: orange;
}
</style>
