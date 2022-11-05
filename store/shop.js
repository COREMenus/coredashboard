
export const state = () => ({
    shop: {}
})

export const mutations = {
    setShop(state, shop) {
        state.shop = shop
    }
}

export const actions = {
    async fetchShop({commit}, id) {
        const res = await this.$axios.get('/api/shops/' + id)
        commit('setShop', res.data)
    }

}
