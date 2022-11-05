<template>
  <v-dialog v-model="modal" width="400">
    <v-card>
      <v-card-title> You have unsaved changes </v-card-title>
      <v-card-text> Are you sure you want to discard changes? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn dark color="red" @click="confirm">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UnsavedDialogComponent',
  data() {
    return {
      modal: false,
      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },
  methods: {
    show() {
      this.modal = true
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    cancel() {
      this.modal = false
      this.resolvePromise(false)
    },
    confirm() {
      this.modal = false
      this.resolvePromise(true)
    },
  },
}
</script>

<style></style>
