
import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
     // * Options
     editOptions: [],
     editOption: {},
    // * Translation
    editTranslations: [],
    editTranslation: {
        name: '',
        description: '',
        locale: ''
    },
    // * Default
    defaultOption: {
        name: '',
        price: 0,
        calories: 0,
    },
    defaultTranslation: {
        name: '',
        description: '',
        locale: ''
    },
})

export const mutations = {
    updateField,
    setEditOptions(state, options) {
        state.editOptions = options || []
        state.editTranslations = []
    },
    setEditOption(state, option) {
        state.editOption = {}
        state.editTranslations = []
        state.editOption = Object.assign({}, state.defaultOption, option)
        if (state.editOption.product_option_translations) state.editTranslations = state.editOption.product_option_translations
    },
    addOption(state, option) {
        state.editOptions.push(option)
    },
    setOption(state, option) {
        state.editOptions = state.editOptions.map(o => {
            if (o.id === option.id) {
                return Object.assign({}, o, option)
            }
            return o
        })
    },
    removeOption(state, option) {
        state.editOptions = state.editOptions.filter(o => o !== option)
    },

    // * Translations
    setEditTranslation(state, translation) {
        state.editTranslation = {}
        Object.assign(state.editTranslation, state.defaultTranslation, translation)
    },
    addTranslation(state, translation) {
        state.editTranslations.push(translation)
        // state.editOption.product_option_translations = state.editTranslations
    },
    setTranslation(state, translation) {
        state.editTranslations = state.editTranslations.map(t => {
            if (t.id === translation.id) {
                return Object.assign({}, t, translation)
            }
            return t
        })
        state.editOption.product_option_translations = state.editTranslations

    },
    removeTranslation(state, translation) {
        state.editTranslations = state.editTranslations.filter(t => t !== translation)
        state.editOption.product_option_translations = state.editTranslations
    },
}

export const getters = {
    getField,
    getProduct: (state, id) => {
        return state.products.find(s => s.id === id)
    },
    options: (state) => {
        return state.editProduct.options
    }
}

export const actions = {
    async fetchProductOptions({commit}, ProductId) {
        const res = await this.$axios.get(`/api/products/options/${ProductId}`)
        console.log(res.data)
        commit('setEditOptions', res.data)
    }
}
