<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title>{{(mode === 'edit')? $t('edit_menu') : $t('new_menu')}}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          outlined
          dense
          :label="$t('name')"
        ></v-text-field>
        <v-textarea
          v-model="description"
          outlined
          :label="$t('description')"
          dense
        ></v-textarea>

        <!-- Image -->
        <!-- Image and Video -->
        <v-row align="center">
          <v-col cols="3">
            <v-img
              class="rounded-xl"
              :src="imageSource"
              width="100"
              contain
            ></v-img>
          </v-col>
          <v-col>
            <v-file-input
              v-model="imageFile"
              accept="image/png, image/jpeg, image/jpg"
              class="mt-4"
              :rules="rules"
              :loading="loadingImg"
              prepend-inner-icon="mdi-image"
              prepend-icon=""
          :label="$t('image')"
              outlined
              @change="upload"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false"> {{$t('cancel')}} </v-btn>
        <v-btn color="green" dark @click="save"> {{$t('save')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'menu/getField',
  mutationType: 'menu/updateField',
})
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['mode'],
  data() {
    return {
      dialog: false,
      imageFile: [],

      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!',
      ],
      loadingImg: false,
    }
  },
  computed: {
    ...mapState('menu', ['editMenu']),
    ...mapFields(['editMenu.name', 'editMenu.description', 'editMenu.imageURL']),
    imageSource() {
      return this.imageURL
    },
  },
  methods: {
    ...mapActions('menu', ['updateMenu', 'newMenu']),

    async save() {
      try {
        if (this.mode === 'edit') {
          await this.updateMenu()
        } else {
          await this.newMenu(this.$route.params.shopId)
        }
        this.$toast.success(this.$t('saved'))
        this.dialog = false
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },

    async upload(e) {
      try {
        if (this.imageFile) {
          // Set to Loading
          this.loadingImg = true

          const key = this.editMenu.imageKey

          const res = await this.$axios.post('/api/storage/upload', {
            key,
            type: this.imageFile.type,
          })

          const signedURL = res.data.url
          const newKey = res.data.key

          await axios.put(signedURL, this.imageFile, {
            headers: {
              'Content-Type': this.imageFile.type,
            },
          })
          this.loadingImg = false
          this.imageURL = `https://cdn.coremenus.com/` + newKey
          this.imageKey = newKey
        }
      } catch (error) {
        console.log(error)
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
