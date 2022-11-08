<template>
    <v-container>
      <v-row align="center" justify="center" class="mt-16">
        <v-col cols="6">
          <v-alert v-if="success" type="success">
            Your Account has been confirmed successfully.
          </v-alert>
          <v-alert v-else type="error">
            {{message}}
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-btn nuxt outlined color="primary" block :to="localePath('/login')"
            >Go to Login Page</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'VerifyPage',
    auth: 'guest',
    layout: 'auth',
    data() {
      return {
        email: '',
        verification_code: '',
        success: false,
        message: '',
      }
    },
    async mounted() {
      this.verification_code = this.$route.query.token
  
      if (!this.verification_code) {
        this.success = false
        this.message = 'Invalid Token'
        return this.$router.push('/')
      }
  
      try {
        await this.$axios.put('/api/confirm_email', {
          token: this.verification_code,
        })
        this.success = true
      } catch (error) {
        this.success = false
        this.message = 'Verification Failed'
      }
    },
  }
  </script>
  
  <style></style>
  