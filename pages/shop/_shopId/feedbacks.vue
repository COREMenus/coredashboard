<template>
  <v-container>
    <v-toolbar dense dark rounded="lg">
        <v-toolbar-title> {{$t('feedbacks')}} </v-toolbar-title>
    </v-toolbar>

    <v-card class="mt-3">
        <v-card-text>
            <v-data-table sort-by="createdAt" :sort-desc="true" :headers="headers" :items="feedbacks">
                <template #[`item.createdAt`]="{item}">
                    {{formatDate(item.createdAt)}}
                </template>
                <template #[`item.rating`]="{item}">
                    <v-icon v-for="i in 5" :key="i" small :color="item.rating >= i ? 'green' : ''">mdi-star</v-icon>
                </template>
                <template #[`item.actions`]="{item}">
                    <v-dialog width="700">
                        <template #activator="{attrs, on}">
                            <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title> {{$t('feedback_for_order')}} {{item.order.id}} </v-card-title>
                            <v-card-text>
                                <v-text-field :value="item.name" :label="$t('name')" readonly outlined dense></v-text-field>
                                <v-text-field :value="item.email" :label="$t('email')" readonly outlined dense></v-text-field>
                                <v-text-field :value="`${item.rating}/5`" :label="$t('rating')" readonly outlined dense></v-text-field>
                                <v-textarea :value="item.comment" :label="$t('comment')" readonly outlined dense></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
    name: 'FeedbacksPage',
    data() {
        return {
            feedbacks: [],
            headers: [
                { text: this.$t('date'), value: 'createdAt'},
                { text: this.$t('name'), value: 'name'},
                { text: this.$t('email'), value: 'email'},
                { text: this.$t('rating'), value: 'rating'},
                { text: this.$t('order'), value: 'order.id'},
                { text: this.$t('actions'), value: 'actions'}
            ]
        }
    },
    async created() {
        try {
            const res = await this.$axios.get(`/api/feedbacks/${this.$route.params.shopId}/feedbacks`)
            this.feedbacks = res.data
        } catch (error) {
        this.$toast.error(this.$t('error_occured'))
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('ddd, MMM Do YY, h:mm a')
        }
    }
}
</script>

<style>

</style>