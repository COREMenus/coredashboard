
export const state = () => ({
    subscriptions: []
})

export const mutations = {
    setSubscription(state, subscriptions) {
        state.subscriptions = subscriptions
    }
}

export const getters = {
    activeSubscription(state) {
        return state.subscriptions.find(s => s.status === 'active')
    }
}

export const actions = {
    async fetchSubscriptions({ commit }) {
        const res = await this.$axios.get('/api/subscriptions')
        commit('setSubscription', res.data)
    },

}
