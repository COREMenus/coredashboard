import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
    tables: [],
    editTable: {
        name: '',
        BranchId: '',
        branch: {
            name: ''
        }
    },
    defaultTable: {
        name: '',
        BranchId: '',
        branch: {
            name: ''
        }
    }
})

export const mutations = {
    updateField,
    setTables(state, tables) {
        state.tables = tables
    },
    setTable(state, table) {
        state.tables = state.tables.map(s => {
            if (s.id === table.id) {
                return Object.assign({}, s, table)
            }
            return s
        })
    },
    setEditTable(state, table) {
        state.editTable = {}
        Object.assign(state.editTable, state.defaultTable, table)
    },
    addTable(state, table) {
        state.tables.unshift(table)
    },
    removeTable(state, id) {
        state.tables = state.tables.filter(s => s.id !== id)
    }
}

export const getters = {
    getField,
    gettable: (state, id) => {
        return state.tables.find(s => s.id === id)
    },
    getMenutables: (state, getters, rootState) => {
        return state.tables.filter(s => s.MenuId === rootState.menu.currentMenu.id)
    }
}

export const actions = {
    async fetchAllTables({ commit }, ShopId) {
        const res = await this.$axios.get(`/api/tables/${ShopId}/tables`)
        commit('setTables', res.data)
    },
    async updateTable({ commit, state }) {
        const res = await this.$axios.put('/api/tables/' + state.editTable.id, state.editTable)
        commit('setTable', res.data)
    },
    async newTable({ commit, state }, ShopId) {
        const res = await this.$axios.post(`/api/tables/${ShopId}/`, state.editTable)
        commit('addTable', res.data)
    },
    async deleteTable({ commit }, table) {
        await this.$axios.delete('/api/tables/' + table.id)
        commit('removeTable', table.id)
    }
}
