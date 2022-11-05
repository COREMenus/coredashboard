<template>
  <v-list-item>
    <!-- Dragging -->
    <v-list-item-avatar size="50" tile rounded="xl">
      <v-avatar color="white" size="50" tile rounded="xl">
        <v-img :src="menu.imageURL || ''" />
      </v-avatar>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ menu.name }}</v-list-item-title>
      <v-list-item-subtitle> {{ menu.description }} </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-row align="center">
        <v-col>
          <!-- <delete-menu :menu="menu" /> -->
          <v-btn icon color="red" small @click="$emit('deleteMenu', menu)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <!-- <menu-settings :menu="menu" /> -->
          <v-btn small color="orange" icon @click="$emit('editMenu', menu)">
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </v-col>
        <!-- Branches Manager -->
        <v-col>
          <v-btn color="primary" icon small @click="$emit('translation', menu)">
            <v-icon> mdi-translate-variant</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon small @click="$emit('manageBranches', menu)">
            <v-icon> mdi-store </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="primary"
            nuxt
            :to="
              localePath({
                name: 'shop-shopId-menu_manager-menuId',
                params: { shopId: menu.ShopId, menuId: menu.id },
              })
            "
          >
            {{ $t('manage') }}
          </v-btn>
        </v-col>
        <v-col>
          <v-checkbox
            :input-value="menu.active"
            @change="toggleActive"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-icon class="handle">mdi-drag</v-icon>
        </v-col>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MenuCardComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['menu'],
  data() {
    return {
      updated: false,
    }
  },
  methods: {
    ...mapMutations('menu', ['setMenu']),
    async toggleActive() {
      try {
        const res = await this.$axios.put('/api/menus/' + this.menu.id, {
          active: !this.menu.active,
        })
        this.setMenu(res.data)
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
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
