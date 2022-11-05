import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
    branches: [],
    editBranch: {
        name: '',
        active: true
    },
    defaultBranch: {
        name: '',
        active: true
    }
})

export const getters = {
    getField
}

export const mutations = {
    updateField,
    setBranches(state, branches) {
        state.branches = branches
    },
    setBranch(state, branch) {
        state.branches = state.branches.map(b => {
            if (b.id === branch.id) {
                return Object.assign({}, b, branch)
            }
            return b
        })
    },
    addBranch(state, branch) {
        state.branches.push(branch)
    },
    removeBranch(state, branch) {
        state.branches = state.branches.filter(b => b.id !== branch.id)
    },
    setEditBranch(state, branch) {
        state.editBranch = {}
        Object.assign(state.editBranch, state.defaultBranch, branch)
    }
}


export const actions = {
    async fetchBranches({commit}, ShopId) {
        const res = await this.$axios.get(`/api/branches/${ShopId}/branches`)
        commit('setBranches', res.data)
    },
    async newBranch({commit, state}, ShopId) {
        const res = await this.$axios.post('/api/branches/' + ShopId, state.editBranch)
        commit('addBranch', res.data)
    },
    async updateBranch({commit, state}) {
        const res = await this.$axios.put('/api/branches/' + state.editBranch.id, state.editBranch)
        commit('setBranch', res.data)
    },
    async deleteBranch({commit}, branch) {
        const res = await this.$axios.delete('/api/branches/' + branch.id)
        commit('removeBranch', res.data)
    }
}
