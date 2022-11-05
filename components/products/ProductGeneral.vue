<template>
  <v-container fluid>
    <div class="uploader">
      <input ref="fileInput" accept="image/png, image/jpeg, image/jpg" type="file" class="d-none" @change="upload" />
      <v-btn
        :loading="loadingImg"
        outlined
        height="70"
        class="rounded-lg"
        color="primary"
        @click="openFileInput"
      >
        <v-icon> {{ imageError ? 'mdi-alert-circle' : 'mdi-upload' }}</v-icon>
      </v-btn>
      <v-slide-group show-arrows>
        <v-slide-item v-for="(img, i) in editImages" :key="i">
          <v-card flat class="mx-1">
            <v-hover v-slot="{ hover }">
              <v-overlay absolute :opacity="hover ? 0.7 : 0">
                <v-btn v-if="hover" icon x-large @click="removeImage(img)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-overlay>
            </v-hover>
            <v-img width="70" height="70" :src="img"></v-img
          ></v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
    <v-subheader>Only .png, jpeg, and jpg are allowed </v-subheader>
    <v-alert v-if="imageError" class="mt-1" dense type="error"
      >Image must be less than 2 MB</v-alert>

    <!-- Name -->
    <v-text-field
      v-model="name"
      class="mt-3"
      outlined
      dense
      :label="$t('name')"
    ></v-text-field>

    <!-- Description -->
    <v-textarea
      v-model="description"
      outlined
      dense
      rows="2"
      :label="$t('description')"
      placeholder="Keep it small and simple"
    ></v-textarea>

    <!-- Section -->
    <v-select
      v-if="show"
      v-model="SectionId"
      outlined
      dense
      :items="sectionItems"
      item-text="name"
      item-value="id"
      :label="$t('section')"
    >
    </v-select>

    <!-- Price and Calories -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="price"
          type="number"
          outlined
          min="0"
          dense
          :label="$t('price')"
          prepend-inner-icon="mdi-currency-usd"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="calories"
          :label="$t('calories')"
          type="number"
          min="0"
          prepend-inner-icon="mdi-fire"
          outlined
          dense
        >
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Labels -->
    <v-combobox
      v-model="labels"
      multiple
      small-chips
      outlined
      dense
      :label="$t('labels')"
      :items="['New', 'Signature', 'Special']"
    >
    </v-combobox>

    <!-- Warnings -->
    <v-combobox
      v-model="warnings"
      multiple
      outlined
      small-chips
      dense
      :label="$t('warnings')"
      :items="[
        'Halal',
        'Alchohol',
        'Peanut',
        'Sea Food',
        'Wheat',
        'Diary',
        'Allergic',
      ]"
    >
    </v-combobox>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import axios from 'axios'
const { mapFields } = createHelpers({
  getterType: 'product/getField',
  mutationType: 'product/updateField',
})
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['section'],
  data() {
    return {
      imageError: false,
      show: false,
      sections: [],
      imageFile: [],
      videoFile: [],
      loadingImg: false,
      rules: [
        (value) =>
          value.size < 2000000 || 'Image size should be less than 2 MB!',
      ],
    }
  },
  computed: {
    ...mapState('product', ['editProduct', 'editImages']),
    imagesSource() {
      return this.editImages
    },
    ...mapFields([
      'editProduct.name',
      'editProduct.description',
      'editProduct.price',
      'editProduct.calories',
      'editProduct.images',
      'editProduct.videoURL',
      'editProduct.labels',
      'editProduct.warnings',
      'editProduct.SectionId',
    ]),
    sectionItems() {
      return this.sections
    },
    imageSource() {
      return this.imageURL
    },
  },
  async created() {
    try {
      const res = await this.$axios.get(`/api/sections/${this.$route.params.shopId}/sections`)
      this.sections = res.data
      const sectionId = this.$route.params.sectionId
      if (sectionId) {
        this.sections = this.sections.sort(function (x, y) {
          return x.id === sectionId ? -1 : y.id === sectionId ? 1 : 0
        })
        this.SectionId = this.sections[0].id
      }
      this.show = true
    } catch (error) {}
  },

  methods: {
    ...mapMutations('product', ['setEditProduct', 'addImage', 'removeImage']),

    openFileInput() {
      this.$refs.fileInput.click()
    },

    // Uploading
    async upload(e) {
      try {
        const file = e.target.files[0]
        this.imageError = false
        if (file.size > 2097152) {
          this.imageError = true
          return
        }
        this.loadingImg = true
        // Get Upload URL
        const res = await this.$axios.post('/api/storage/upload', {
          type: file.type,
        })

        // URL
        const signedURL = res.data.url
        const newKey = res.data.key

        // Upload
        await axios.put(signedURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        })

        // Add
        const url = `https://cdn.coremenus.com/` + newKey
        this.addImage(url)
        this.loadingImg = false
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style>
.image-card-footer {
  position: absolute;
  top: 0;
  background: black;
  opacity: 10%;
  width: 100%;
  height: 100%;
}

.uploader {
  display: flex;
  gap: 5px;
}

.uploader img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.image-continaer {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid #ff5349;
}

.uploader input::before {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  content: '+';
  text-align: center;
  font-size: 50px;
}
.uploader input {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 2px solid #999999;
}

.uploader input:hover {
  border: 2px solid #ff5349;
}
.uploader input:hover::before {
  color: #ff5349;
}

.uploader input::-webkit-file-upload-button {
  visibility: hidden;
}
</style>
