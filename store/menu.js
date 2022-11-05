import { updateField, getField } from "vuex-map-fields"
export const state = () => ({
    menus: [],
    disabledBranches: [],
    editMenu: {
        name: '',
        description: '',
        imageURL: null,
        menu_translations: [],
        active: true,
        branches: []
    },
    defaultMenu: {
        name: '',
        description: '',
        imageURL: null,
        menu_translations: [],
        active: true,
        branches: []
    },

    editTranslations: [],
    editTranslation: {
        name: '',
        description: '',
        locale: ''
    },
    defaultTranslation: {
        name: '',
        description: '',
        locale: ''
    },
})

export const mutations = {
    updateField,
    setMenus(state, menus) {
        state.menus = menus
    },
    setMenu(state, menu) {
        state.menus = state.menus.map(m => {
            if (m.id === menu.id) {
                return Object.assign({}, m, menu)
            }
            return m
        })
    },
    addMenu(state, menu) {
        state.menus.push(menu)
    },
    removeMenu(state, menu) {
        state.menus = state.menus.filter(m => m.id !== menu.id)
    },
    setEditMenu(state, menu) {
        state.editMenu = {}
        state.editTranslation = []
        state.editMenu = Object.assign({}, state.defaultMenu, menu)
        state.editTranslations = state.editMenu.menu_translations
        state.disabledBranches = state.editMenu.branches
    },

    // * Translations
    setEditTranslation(state, translation) {
        state.editTranslation = {}
        Object.assign(state.editTranslation, state.defaultTranslation, translation)
    },
    addTranslation(state, translation) {
        state.editTranslations.push(translation)
    },
    setTranslation(state, translation) {
        state.editTranslations = state.editTranslations.map(t => {
            if (t.id === translation.id) {
                return Object.assign({}, t, translation)
            }
            return t
        })
    },
    removeTranslation(state, translation) {
        state.editTranslations = state.editTranslations.filter(t => t !== translation)
    },

    // * Branches
    addDisabledBranch(state, branch) {
        state.disabledBranches.push(branch)
    },
    removeDisabledBranch(state, branch) {
        state.disabledBranches = state.disabledBranches.filter(b => b.id !== branch.id)
    }
}

export const getters = {
    getField,
    getMenu: (state, id) => {
        return state.menus.find(m => m.id === id)
    }
}

export const actions = {
    async fetchMenus({ commit }, ShopId) {
        const res = await this.$axios.get('/api/menus/' + ShopId + '/menus')
        commit('setMenus', res.data)
    },
    async fetchMenu({ commit }, id) {
        const res = await this.$axios.get('/api/menus/' + id)
        commit('setCurrentMenu', res.data)
    },
    async updateMenu({ commit, state }) {
        const res = await this.$axios.put('/api/menus/' + state.editMenu.id, state.editMenu)
        commit('setMenu', res.data)
    },
    async updateMenuOrder({ commit }, menu) {
        const res = await this.$axios.put('/api/menus/' + menu.id, menu)
        commit('setMenu', res.data)
    },
    async newMenu({ commit, state }, ShopId) {
        const res = await this.$axios.post('/api/menus/' + ShopId, state.editMenu)
        commit('addMenu', res.data)
    },
    async deleteMenu({commit}, menu) {
        await this.$axios.delete('/api/menus/' + menu.id)
        commit('removeMenu', menu)
    },

    // branches manager
    async enableBranch({commit, state}, branch) {
        await this.$axios.delete(`/api/menus/disabled_branches/${state.editMenu.id}?branch=${branch.id}`)
        commit('removeDisabledBranch', branch)
    } ,
    async disableBranch({commit, state}, branch) {
        await this.$axios.post(`/api/menus/disabled_branches/${state.editMenu.id}?branch=${branch.id}`)
        commit('addDisabledBranch', branch)
    }
}
