<template>
  <v-dialog v-model="dialog" width="400">
    <v-card>
      <v-card-title> {{$t('reset_password')}} </v-card-title>
      <v-card-subtitle>
        {{$t('reset_password_desc')}}
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="form" v-model="valid">
            <v-text-field v-model="email" outlined dense :rules="emailRules" :label="$t('email')"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">{{$t("cancel")}}</v-btn>
        <v-btn color="primary" @click="send"> {{$t('send')}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
        valid: false,
      dialog: false,
      email: '',
      emailRules: [
        (v) => !!v || this.$t('required'),
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
    }
  },
  methods: {
    async send() {
        try {
            this.$refs.form.validate()
            if (this.valid) {
                await this.$axios.post('/api/reset_password/', {
                    email: this.email
                })
                this.$toast.success(this.$t('reset_link_sent'))
                this.dialog = false
            }
        } catch (error) {
        this.$toast.error(this.$t('error_occured'))
        }
    }
  }
}
</script>

<style></style>
