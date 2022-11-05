import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
    users: [],
    editUser: {
        username: '',
        password: '',
        active: false
    },
    defaultUser: {
        username: '',
        password: '',
        active: false
    },
})


export const mutations = {
    updateField,
    setUsers(state, users) {
        state.users = users
    },
    setUser(state, user) {
        state.users = state.users.map(u => {
            if (u.id === user.id) {
                return Object.assign({}, u, user)
            }
            return u
        })
    },
    setEditUser(state, user) {
        state.editUser = {}
        Object.assign(state.editUser, state.defaultUser, user)
    },
    addUser(state, user) {
        state.users.push(user)
    },
    removeUser(state, id) {
        state.users = state.users.filter(u => u.id !== id)
    }
}

export const getters = {
    getField
}

export const actions = {
    async fetchUsers({commit}, ShopId) {
        const res = await this.$axios.get(`/api/users/${ShopId}/users`)
        commit('setUsers', res.data)
    },
    async newUser({commit, state}, ShopId) {
        const res = await this.$axios.post(`/api/users/${ShopId}`, state.editUser)
        commit('addUser', res.data)
    },
    async updateUser({commit, state}) {
        const res = await this.$axios.put('/api/users/' + state.editUser.id, state.editUser)
        commit('setUser', res.data)
    },
    async deleteUser({ commit }, user) {
        await this.$axios.delete('/api/users/' + user.id)
        commit('removeUser', user.id)
    }
}