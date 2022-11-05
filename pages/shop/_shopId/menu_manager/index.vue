<template>
  <v-container>
    <menu-dialog ref="editForm" :mode="'edit'"></menu-dialog>
    <menu-dialog ref="newForm"></menu-dialog>
    <branches-dialog ref="branchesManager"></branches-dialog>
    <translation-dialog ref="translation"></translation-dialog>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular
    ></v-overlay>

    <v-toolbar flat dense dark rounded="lg">
      <v-toolbar-title>{{ $t('menu_manager') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small depressed color="green" dark @click="createMenu">
        {{ $t('create_menu') }}
      </v-btn>
    </v-toolbar>

    <v-col v-if="menus.length === 0 && !loading"
      ><v-alert
        type="info"
        color="primary"
        dense
        prominent
        border="left"
        dark
        rounded="lg"
      >
        {{ $t('no_menu') }}
      </v-alert></v-col
    >

    <draggable
      v-bind="dragOptions"
      v-model="currentMenus"
      class="mt-4"
      handle=".handle"
      tag="v-list"
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
      } catch (error) {
        console.log(error)
      }
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
