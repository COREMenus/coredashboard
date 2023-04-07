<template>
  <v-container fluid>
    <!-- <v-toolbar dark dense rounded="lg">
      <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
      <template #extension>
        
      </template>
    </v-toolbar> -->

    <v-card flat height="700" rounded="xl">
      <v-card-title>
        <v-tabs v-model="tab">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab>{{$t('currency')}}</v-tab>
          <v-tab>{{$t('language')}}</v-tab>
          <v-tab>{{$t('theme')}}</v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text>
        <v-tabs-items v-model="tab" class="mt-5">
          <!-- * Currency Settings -->
          <v-tab-item>
            <v-text-field
            class="mt-1"
              outlined
              dense
              :label="$t('symbol')"
              readonly
              :value="symbol"
            ></v-text-field>
            <v-select
              v-model="settings.currency"
              outlined
              dense
              :label="$t('currency')"
              :items="currencies"
              item-text="code"
              item-value="code"
            >
            </v-select>
            <v-text-field
              v-model="tax_number"
              max="100"
              min="0"
              outlined
              dense
              type="number"
              :label="$t('tax')"
              prepend-inner-icon="mdi-percent"
            ></v-text-field>
            <v-btn color="success" @click="save">{{ $t('save') }}</v-btn>
          </v-tab-item>

          <!-- * Language Settings -->
          <v-tab-item>
            <v-select
              v-model="settings.default_language"
              outlined
              dense
              class="mt-1"
              :label="$t('default_language')"
              :items="languages"
              item-text="native"
              item-value="code"
            ></v-select>
            <v-select
              v-model="settings.enabled_languages"
              multiple
              outlined
              dense
              chips
              :label="$t('enabled_languages')"
              :items="languages"
              item-text="native"
              item-value="code"
            >
            </v-select>
            <v-btn color="success" @click="save">{{ $t('save') }}</v-btn>
          </v-tab-item>

          <!-- * Theme Settings -->
          <v-tab-item>
            <v-row justify="center">
              <v-col>
                <h2>{{ $t('accent_color') }}</h2>
                <v-color-picker
                  v-model="settings.accent_color"
                ></v-color-picker>
              </v-col>
              <v-col>
                <h2>{{ $t('background_color') }}</h2>
                <v-color-picker
                  v-model="settings.background_color"
                ></v-color-picker>
              </v-col>
            </v-row>
            <v-btn color="success" @click="save">{{ $t('save') }}</v-btn>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import currencies from '@/assets/json/currencies.json'
import languages from '@/assets/json/languages.json'
export default {
  name: 'ThemePage',
  data() {
    return {
      tax_number: 0,
      tab: 0,
      settings: {
        default_language: '',
        enabled_languages: null,
        currency: null,
        accent_color: '',
        background_color: '',
      },
    }
  },
  computed: {
    languages() {
      const keys = Object.keys(languages)
      const langs = keys.map((k) => {
        return {
          ...languages[k],
          code: k,
        }
      })

      return langs
    },
    currencies() {
      return Object.keys(currencies).map((key) => {
        return currencies[key]
      })
    },
    symbol() {
      if (this.settings.currency) {
        return currencies[this.settings.currency].symbol_native
      } else {
        return ''
      }
    },
    tax() {
      return this.tax_number / 100
    },
  },
  async created() {
    try {
      const res = await this.$axios.get(
        `/api/settings/${this.$route.params.shopId}`
      )
      this.settings = res.data
      this.tax_number = res.data.tax * 100
    } catch (error) {
      this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    async save() {
      try {
        await this.$axios.put(`/api/settings/${this.$route.params.shopId}`, {
          ...this.settings,
          tax: this.tax,
        })
        this.$toast.success(this.$t('saved'))
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

<style></style>
