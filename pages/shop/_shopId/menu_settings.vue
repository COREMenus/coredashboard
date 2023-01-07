<template>
  <v-container fluid>
    <v-toolbar dark dense rounded="lg">
      <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
      <template #extension>
        <v-tabs v-model="tab">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab>Currency</v-tab>
          <v-tab>Language</v-tab>
          <v-tab>Theme</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" class="mt-5">
      <!-- * Currency Settings -->
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-text-field
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
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <!-- * Language Settings -->
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-select
              v-model="settings.default_language"
              outlined
              dense
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
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <!-- * Theme Settings -->
      <v-tab-item>
        <v-card>
          <v-card-title>{{ $t('theme') }}</v-card-title>
          <v-card-text>
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
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
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
