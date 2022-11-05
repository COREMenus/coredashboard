import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
    sections: [],
    editSection: {
        name: '',
        description: '',
        order: -1,
        MenuId: ''
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
    setSections(state, sections) {
        state.sections = sections
    },
    setSection(state, section) {
        state.sections = state.sections.map(s => {
            if (s.id === section.id) {
                return Object.assign({}, s, section)
            }
            return s
        })
    },
    setEditSection(state, section) {
        state.editSection = {}
        state.editTranslation = []
        Object.assign(state.editSection, state.defaultSection, section)
        state.editTranslations = state.editSection.section_translations
    },
    addSection(state, section) {
        state.sections.unshift(section)
    },
    removeSection(state, id) {
        state.sections = state.sections.filter(s => s.id !== id)
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
}

export const getters = {
    getField,
    getSection: (state, id) => {
        return state.sections.find(s => s.id === id)
    },
    getMenuSections: (state, getters, rootState) => {
        return state.sections.filter(s => s.MenuId === rootState.menu.currentMenu.id)
    }
}

export const actions = {
    async fetchMenuSections({ commit }, { ShopId, MenuId}) {
        const res = await this.$axios.get(`/api/sections/${ShopId}/sections?menu=${MenuId}`)
        commit('setSections', res.data)
    },
    async updateSection({ commit, state }) {
        const res = await this.$axios.put('/api/sections/' + state.editSection.id, state.editSection)
        commit('setSection', res.data)
    },
    async updateSectionOrder({ commit }, section) {
        const res = await this.$axios.put('/api/sections/' + section.id, section)
        commit('setSection', res.data)
    },    async newSection({ commit, state }, MenuId) {
        const res = await this.$axios.post(`/api/sections/${MenuId}`, state.editSection)
        commit('addSection', res.data)
    },
    async deleteSection({ commit }, id) {
        await this.$axios.delete('/api/sections/' + id)
        commit('removeSection', id)
    }
}
