<template>
  <v-container fluid>
    <section-dialog ref="newForm"></section-dialog>
    <section-dialog ref="editForm" :mode="'edit'"></section-dialog>
    <TranslationDialog ref="translationDialog"></TranslationDialog>
    <!-- Section Sidebar -->
    <v-card height="500" flat>
      <v-card-title>{{$t('sections')}}</v-card-title>
      <v-card-text>
        <draggable
            v-bind="dragOptions"
            v-model="currentSections"
            class="d-flex flex-column v-list"
            handle=".handle"
            tag="div"
            @change="updateListSortOrder"
            @start="drag = true"
            @end="drag = false"
          >
              <v-list-item
                v-for="section in currentSections"
                :key="section.id"
                nuxt
                :to="
                  localePath({
                    name: 'shop-shopId-menu_manager-menuId-sectionId',
                    params: {
                      menuId: $route.params.menuId,
                      shopId: $route.params.shopId,
                      sectionId: section.id,
                    },
                  })
                "
              >
                <!-- Dragging Handler -->
                <v-list-item-icon class="handle">
                  <v-icon> mdi-drag </v-icon></v-list-item-icon
                >

                <!-- Section Name -->
                <v-list-item-title> {{ section.name }} </v-list-item-title>

                <!-- Delete and Edit -->
                <v-list-item-action
                  ><v-menu offset-y open-on-hover>
                    <template #activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon small>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="edit(section)">
                        <v-list-item-title>{{
                          $t('edit_section')
                        }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteSection(section.id)">
                        <v-list-item-title>{{
                          $t('delete_section')
                        }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="translation(section)">
                        <v-list-item-title>{{
                          $t('translation')
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu></v-list-item-action
                >
              </v-list-item>
          </draggable>
      </v-card-text>
      <v-card-actions class="card-footer">
        <v-btn block color="green" dark outlined @click="newSection">
          <v-icon left>mdi-plus</v-icon>
          {{ $t('new_section') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapMutations } from 'vuex'
import SectionDialog from './SectionDialog.vue'
import TranslationDialog from './TranslationDialog.vue'
export default {
  name: 'SelectSectionComponent',
  components: { draggable, SectionDialog, TranslationDialog },
  // eslint-disable-next-line vue/require-prop-types
  props: ['sections'],
  data() {
    return {
      drag: false,
      selected: 0,
      drawer: true,
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      }
    },
    currentSections: {
      get() {
        return this.sections
      },
      set(val) {
        this.setSections(val)
      },
    },
    width() {
      if (this.$vuetify.breakpoint.name === 'sm') {
        return 0
      } else {
        return null
      }
    },
  },
  methods: {
    ...mapMutations('section', ['setSections', 'setEditSection']),
    ...mapActions('section', ['updateSectionOrder', 'deleteSection']),
    edit(section) {
      this.setEditSection(section)
      this.$refs.editForm.dialog = true
    },
    newSection() {
      this.setEditSection({
        MenuId: this.$route.params.id,
      })
      this.$refs.newForm.dialog = true
    },
    translation(section) {
        this.setEditSection(section)
        this.$refs.translationDialog.dialog = true
    },
    updateListSortOrder(e) {
      const newList = [...this.sections].map((item, index) => {
        const newSort = index + 1
        // also add in a new property called has changed if you want to style them / send an api call

        if (item.order !== newSort) {
          this.updateSectionOrder({
            id: item.id,
            order: newSort
          })
        }
        return item
      })
      this.setSections(newList)
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
