<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-system-bar app height="30" color="primary" dark>
      <v-spacer></v-spacer>
      <h3>{{ time }}</h3>
    </v-system-bar>

    <navbar
      @mini="$router.push(localePath('/'))"
      @drawer="$router.push(localePath('/'))"
      @open-settings="$refs.dialog.dialog = true"
    />

    <v-main>
      <v-alert v-if="expired" icon="mdi-alert-box" type="warning">
        {{ $t('no_sub') }} 
        <nuxt-link :to="localePath('/subscribe')"> {{$t('subscribe')}} </nuxt-link>
      </v-alert>
      <v-alert v-if="trail" type="info" dismissible>
        {{ daysLeft }} {{$t('on_trail')}}
      </v-alert>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/layout/Navbar.vue'
export default {
  name: 'DefaultLayout',
  components: { Navbar },
  middleware: ['onboarded', 'admin'],
  data() {
    return {
      expired: false,
      trail: false,
      daysLeft: 0,
      mini: false,
      drawer: true,
      interval: null,
      time: null,
      subscription: null,
    }
  },
  computed: {
    ...mapGetters('subscription', ['activeSubscription']),
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  mounted() {
    this.$vuetify.rtl = this.$i18n.localeProperties.dir === 'rtl'
    this.$vuetify.theme.dark = localStorage.getItem('dark') === 'true'
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(this.$i18n.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format()
    }, 1000)
  },
  created() {
    const nextBillingDate = moment(this.$auth.user.next_billing_date)
    const now = moment()
    if (now.isAfter(nextBillingDate) || !this.$auth.user.next_billing_date) {
      this.expired = true
    }

    if (this.$auth.user.free_trail) {
      this.trail = true
      this.daysLeft = moment(this.$auth.user.next_billing_date).diff(
        moment(),
        'days'
      )
    }
  },
  methods: {
    ...mapActions('subscription', ['fetchSubscriptions']),
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {}
    },
    toggle() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.$refs.drawer.drawer = !this.$refs.drawer.drawer
      } else {
        this.mini = !this.mini
      }
    },
  },
}
</script>
