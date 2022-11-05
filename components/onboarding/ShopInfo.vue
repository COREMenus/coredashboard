<template>
  <v-card>
    <v-card-text>
      <v-alert type="info">
        {{$t('shop_unique')}}
      </v-alert>
      <v-text-field
            v-model="data.name"
            outlined
            dense
            :error-messages="errorMessage"
            :error="error"
            :messages="[`${$t('domain_will_be')} @${domain}`]"
            :label="$t('shop_name')">
      </v-text-field>
<v-select 
                    v-model="data.default_language" 
                    outlined dense 
                    :label="$t('default_language')" 
                    :items="languages" 
                    item-text="native" 
                    item-value="code"
                    ></v-select>      </v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :loading="loading" dark @click="save">{{$t('next')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import languages from '@/assets/json/languages.json'
import countries from '@/assets/json/countries.json'
export default {
  data() {
    return {
        error: false,
        errorMessage: [],
      loading: false,
      shop: null,
      data: {
        default_language: '',
        name: ''
      },
    }
  },
  computed: {
    countries() {
      return Object.values(countries)
    },
    domain() {
        const name = this.data.name.toLocaleLowerCase().split(' ').join('_')
        return  name
    },
    languages() {
        const keys = Object.keys(languages)
        const langs = keys.map(k => {
            return {
                ...languages[k],
                code: k
            }
        })

        return langs
    },
  },
  async created() {
    try {
        const res = await this.$axios.get('/api/shops')
        if (res.data.length > 0) {
            this.shop = res.data[0]
        }
    } catch (error) {
        this.$toast.error(this.$t('error_occured'))
    }
  },
  methods: {
    async save() {
      try {
        this.loading = true
        await this.$axios.put(`/api/shops/${this.shop.id}`, this.data)
        this.loading = false
        this.$router.push(this.localePath('/'))
      } catch (error) {
        if (error.response?.status === 400) {
            this.error = true
            this.errorMessage = this.$t('shop_taken')
            setTimeout(() => {
                this.error = false
                this.errorMessage = []
            }, 3000);
        } else {
            this.$toast.error(this.$t('error_occured'))
        }
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
