<template>
  <v-container fill-height>
    <ForgotPasswordDialog ref="forgotPassword"></ForgotPasswordDialog>
        <v-row align="center" justify="center">
          <v-col md="5" sm="8">
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
              height="300"
              :loading="loading"
              elevation="14"
              rounded="lg"
              class="loginCard"
            >
              <!-- Title -->
              <v-card-text>
                <h2 class="text--primary text-center">Coremenus Panel</h2>
                <v-form ref="form" v-model="valid" class="mt-10">
                  <!-- Username -->
                  <v-text-field
                  ref="username"
                    v-model="userData.username"
                    prepend-inner-icon="mdi-account"
                    :label="$t('username')"
                    type="text"
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

                  <!-- Login Button -->
                  <v-btn
                    :loading="loading"
                    block
                    :disabled="disabled"
                    color="primary"
                    class="mt-5"
                    @click="submit"
                    >{{$t('login')}}</v-btn
                  >
              
                </v-form>
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
    name: "LoginPage",
    auth: "guest",
    components: { ForgotPasswordDialog },
    layout: "auth",
    data() {
        return {
            valid: false,
            passwordRules: [
                (v) => !!v || "Password is required",
            ],
            error: false,
            loading: false,
            errorMessages: [],
            userData: {
                username: null,
                password: null,
            },
        };
    },
    computed: {
        disabled() {
            return !this.valid;
        }
    },
    methods: {
        async submit() {
            if (this.valid) {
                this.loading = true;
                try {
                    await this.$auth.loginWith("localUser", { data: this.userData });
                }
                catch (error) {
                    this.errorMessages = [];
                    this.error = true;
                    this.errorMessages = error.response.data.messages;
                }
                this.loading = false;
            }
        },
    }
}
</script>

<style scoped>
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
  background: rgba(255, 68, 0, 0.116);
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
}
.loginCard {
  overflow: hidden;
}

</style>
