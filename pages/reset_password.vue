<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-alert v-if="success" type="success" outlined>
          Password was reset, now you can login with your new password
          <nuxt-link :to="localePath('/login')"> Here </nuxt-link>
        </v-alert>
        <v-alert v-else-if="error" type="error" outlined>
          {{ errorMessage }}
        </v-alert>
        <v-card v-else>
          <v-card-title> Reset Password </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="data.password"
                outlined
                :rules="[rules.required]"
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="New Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="data.confirmPassword"
                outlined
                dense
                :rules="[rules.required, rules.passwordMatch]"
                label="Confirm Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="reset"> Reset </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      success: false,
      showPassword: false,
      error: false,
      errorMessage: null,
      valid: false,
      rules: {
        required: (value) => !!value || 'Request',
        passwordMatch: (value) =>
          value === this.data.password || 'Password does not match',
      },
      data: {
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async reset() {
      try {
        this.$refs.form.validate()
        if (!this.valid) return

        await this.$axios.put('/api/reset_password', {
          password: this.data.password,
          token: this.$route.query.token,
        })

        this.$toast.success(
          'Password was reset, you can login with the new password.'
        )
        this.success = true
      } catch (error) {
        this.errorMessage = error.response.data.messages[0]
        this.error = true
      }
    },
  },
}
</script>

<style></style>
