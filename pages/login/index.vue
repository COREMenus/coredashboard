<template>
  <v-container class="banner" fluid fill-height>
    <ForgotPasswordDialog ref="forgotPassword"></ForgotPasswordDialog>
    <v-row align="center" justify="center">
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
          flat
          height="470"
          :loading="loading"
          rounded="lg"
          class="loginCard"
        >
          <!-- Title -->
          <v-card-text>
            <h2 class="text--primary text-center">{{ $t('login_to_core') }}</h2>
            <v-form ref="form" v-model="valid" class="mt-10">
              <!-- Email -->
              <v-text-field
                ref="username"
                v-model="userData.username"
                prepend-inner-icon="mdi-email"
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
                prepend-inner-icon="mdi-lock"
                :rules="passwordRules"
                :label="$t('password')"
                type="password"
                required
                outlined
                dense
              ></v-text-field>

              <div class="d-flex align-center justify-space-between">
                <v-checkbox :label="$t('remember_me')"></v-checkbox>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.forgotPassword.dialog = true"
                >
                  {{ $t('forgot_password') }}</v-btn
                >
              </div>

              <!-- Login Button -->
              <v-btn
                :loading="loading"
                block
                :disabled="disabled"
                color="primary"
                class="mt-5"
                @click="submit"
                >{{ $t('login') }}</v-btn
              >

              <v-divider class="mt-3"></v-divider>
              <v-btn
                block
                outlined
                class="mt-3"
                :to="localePath('/login/panel')"
                color="primary"
              >
                {{ $t('login_panel') }}</v-btn
              >
            </v-form>

            <!-- No Account? -->
            <div class="footer">
              <p class="text-center subtitle-1 font-weight-medium mt-4">
                {{ $t('no_account')
                }}<nuxt-link :to="localePath('/register')">
                  {{ $t('sign_up') }}
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
import ForgotPasswordDialog from '~/components/auth/ForgotPasswordDialog.vue'
export default {
  valid: false,
  name: 'LoginPage',
  auth: 'guest',
  components: { ForgotPasswordDialog },
  layout: 'auth',
  data() {
    return {
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
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
          await this.$auth.loginWith('localAdmin', { data: this.userData })
        } catch (error) {
          this.errorMessages = []
          this.error = true
          if (error.response.status >= 500) {
            this.errorMessages = [
              'Unexpected Error Has Occured, Please try again later.',
            ]
          } else {
            this.errorMessages = error.response.data.messages
          }
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
