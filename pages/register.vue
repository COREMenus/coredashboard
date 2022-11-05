<template>
  <v-container class="fill-height banner" fluid>
    <v-row class="fill-height" align="center" justify="center">

      <v-col lg="4" md="7" sm="8">
            <!-- Error Alert -->
            <transition name="slide">
              <v-alert v-if="error" outlined type="error">
                <span v-for="(message, i) in errorMessages" :key="i">{{
                  message
                }}</span>
              </v-alert>
            </transition>
            <v-card
              ref="form"
              height="350"
              :loading="loading"
              flat
              rounded="lg"
              class="loginCard"
            >
              <!-- Title -->
              <v-card-title class="text--primary">{{
                $t('join_core')
              }}</v-card-title>
              <v-card-subtitle> {{ $t('try_core') }}</v-card-subtitle>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <!-- Email -->
                  <v-text-field
                  ref="email"
                    v-model="userData.email"
                    :label="$t('email')"
                    type="email"
                    :rules="emailRules"
                    required
                    outlined
                    dense
                  ></v-text-field>

                  <!-- Password -->
                  <v-text-field
                    ref="password"
                    v-model="userData.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    :label="$t('password')"
                    required
                    outlined
                    dense
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <!-- Login Button -->
                  <v-btn
                    :loading="loading"
                    block
                    :disabled="disabled"
                    color="primary"
                    @click="submit"
                    >{{ $t('create_account') }}</v-btn
                  >
                </v-form>

                <!-- No Account? -->
                <div class="footer">
                  <p class="text-center subtitle-1 font-weight-medium mt-4">
                    {{ $t('have_account')
                    }}<nuxt-link :to="localePath('/login')">
                      {{ $t('login') }}
                    </nuxt-link>
                  </p>
                </div>
              </v-card-text>
            </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  valid: false,
  name: 'RegisterPage',
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      passwordToolTip: false,
      btypes: [
        'Coffee Shop',
        'Restaurant',
        'Catering',
        'Hotel',
        'Food Kiosk',
        'Showroom',
        'Salon',
        'Company & Offices',
        'Diet Center',
        'Gym',
        'Hospital',
      ],
      showPassword: false,
      valid: false,
      emailRules: [
        (v) => !!v || this.$t('required'),
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      passwordRules: [
        (v) => /^.{8,}/.test(v) || 'Must be minimum eight characters',
        (v) =>
          /(?=.*?[A-Z])/.test(v) ||
          'Must contain at least one uppercase letter',
        (v) =>
          /(?=.*?[a-z])/.test(v) ||
          'Must contain at least one lowercase letter',
        (v) => /(?=.*?[0-9])/.test(v) || 'Must contain at least one digit',
        (v) =>
          /(?=.*?[#?!@$%^&*-])/.test(v) || 'Must contain one special character',
      ],
      error: false,
      loading: false,
      errorMessages: [],
      userData: {
        username: null,
        password: null,
      },
    }
  },
  computed: {
    disabled() {
      return !this.valid
    },
  },
  methods: {
    async submit() {
      if (this.valid) {
        this.loading = true
        try {
          await this.$axios.post('/api/accounts', this.userData)
          await this.$auth.loginWith('localAdmin', {
            data: {
              username: this.userData.email,
              password: this.userData.password,
            },
          })
        } catch (error) {
          this.errorMessages = []
          this.error = true
          this.errorMessages = error.response.data.messages
        }
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

.banner {
    background-image: url('/authBanner.png');
    background-size: contain;
}
.slide-enter-active {
  transition: all 0.5s;
}

.slide-enter {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
}
.loginCard {
  overflow: hidden;
}
</style>
