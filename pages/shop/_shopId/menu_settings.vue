<template>
  <v-container fluid>
    <v-toolbar dark dense rounded="lg">
      <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
    </v-toolbar>

    <v-card class="mt-5">
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-text-field
              outlined
              dense
              :label="$t('symbol')"
              readonly
              :value="symbol"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
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
          </v-col>
          <v-col cols="2">
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
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-3">
      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              v-model="settings.default_language"
              outlined
              dense
              :label="$t('default_language')"
              :items="languages"
              item-text="native"
              item-value="code"
            ></v-select>
          </v-col>
          <v-col>
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
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>{{ $t('theme') }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-card height="400">
              <v-card-title> {{ $t('accent_color') }} </v-card-title>
              <v-card-text>
                <v-color-picker
                  v-model="settings.accent_color"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card height="400">
              <v-card-title> {{ $t('background_color') }} </v-card-title>
              <v-card-text>
                <v-color-picker
                  v-model="settings.background_color"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="save">{{ $t('save') }}</v-btn>
      </v-card-actions>
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
