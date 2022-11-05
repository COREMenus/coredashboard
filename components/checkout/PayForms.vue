
<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="data.cardHolder"
      prepend-inner-icon="mdi-account"
      outlined
      dense
      :rules="[rules.required]"
      :label="$t('card_holder')"
    ></v-text-field>
    
    <v-text-field
      v-model="data.cardNumber"
      prepend-inner-icon="mdi-credit-card"
      :rules="[rules.required, rules.counter, rules.validCard]"
      :append-icon="cardIcon"
      outlined
      dense
      counter
      maxlength="16"
      :label="$t('card_number')"
    >
    </v-text-field>
    <v-row>
      <v-col>
        <v-text-field
          v-model="expiry"
          dense
          :rules="[rules.expireDate, rules.required, rules.expired]"
          outlined
          placeholder="MM/YY"
          prepend-inner-icon="mdi-calendar"
          :label="$t('expire_date')"
        ></v-text-field>
      </v-col>
      <V-col>
        <v-text-field
          dense
          outlined
          placeholder="***"
          prepend-inner-icon="mdi-numeric"
          :maxlength="cardCode.size"
          :label="cardCode.name"
          counter
          :rules="[rules.required]"
        ></v-text-field>
      </V-col>
    </v-row>
    <v-btn :loading="loading" block color="green" dark @click="checkout">
      <v-icon left>mdi-lock</v-icon>
      {{$t('checkout')}}
    </v-btn>
  </v-form>
</template>

<script>
import moment from 'moment'
import cardValidator from 'card-validator'
export default {
  data() {
    return {
      loading: false,
      expiry: '',
      valid: null,
      rules: {
        counter: (value) => value.length <= 16,
        required: (value) => !!value || this.$t('required'),
        expireDate: (value) =>
          moment(value, 'MM/YY', true).isValid() || this.$t('invalid_date'),
        expired: (value) => moment(value, 'MM/YY').isAfter(moment()) || this.$t('card_expired'),
        validCard: (value) => this.validCard.isPotentiallyValid || this.$t('invalid_card')
      },
      data: {
        cardNumber: '',
        cardCVC: '',
        cardHolder: '',
        locale: 'en_US',
      },
    }
  },
  computed: {
    expireMonth() {
      return moment(this.expiry, 'MM/YY', true).format('MM')
    },
    expireYear() {
      return moment(this.expiry, 'MM/YY', true).format('YY')
    },
    validCard() {
        return cardValidator.number(this.data.cardNumber)
    },
    cardCode() {
        if (this.validCard.card && this.validCard.card.code) {
            return this.validCard.card.code
        } else {
            return {name: 'CVV', size: 3}
        }
    },
    cardIcon() {
        if (this.validCard && this.validCard.card) {
            if (this.validCard.card.type === 'visa') {
                return 'fa-brands fa-cc-visa'
            } else if (this.validCard.card.type === 'mastercard') {
                return 'fa-cc-mastercard'
            }
            else if (this.validCard.card.type === 'american-express') {
                return 'fa-cc-amex'
            }
            else if (this.validCard.card.type === 'discover') {
                return 'fa-cc-discover'
            }
            else {
                return ''
            }
        } else {
            return ''
        }
    }
  },
  methods: {
    async checkout() {
      try {
        this.$refs.form.validate()
        if (this.valid) {
          this.loading = true
          const res = await this.$vault.post('/card-tokens', {
            ...this.data,
            cardExpiryMonth: this.expireMonth,
            cardExpiryYear: this.expireYear,
          })
          const cardToken = res.data.cardToken
          this.$emit('checked', cardToken)
        }
      } catch (error) {
        this.loading = false
        this.$toast.error(this.$t('error_occured'))
      }
    },
  },
}
</script>

