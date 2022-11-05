
import { getField, updateField } from "vuex-map-fields"

export const state = () => ({
    products: [],

    // * Creating and Updating
    editImages: [],
    editProduct: {},

    // * Translation
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

    // * Default Values
    defaultProduct: {
        name: '',
        price: 0,
        description: '',
        SectionId: '',
        images: [],
        options: [],
        calories: 0,
        labels: [],
        warnings: [],
        product_translations: []
    }
})

export const mutations = {
    updateField,
    setProducts(state, products) {
        state.products = products
    },
    setProduct(state, product) {
        state.products = state.products.map(p => {
            if (p.id === product.id) {
                return Object.assign({}, p, product)
            }
            return p
        })
    },
    setEditProduct(state, product) {
        state.editTranslations = []
        state.editImages = []
        state.defaultProduct.images = []
        state.editProduct = Object.assign({}, state.defaultProduct, product)
        state.editTranslations = state.editProduct.product_translations
        state.editImages = state.editProduct.images || []
    },
    addProduct(state, product) {
        state.products.unshift(product)
    },
    removeProduct(state, product) {
        state.products = state.products.filter(p => p.id !== product.id)
    },

    // * Images
    setEditImages(state, images) {
        state.editImages = images
    },
    addImage(state, image) {
        state.editImages.push(image)
    },
    removeImage(state, image) {
        state.editImages = state.editImages.filter(i => i !== image)
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
    getField
}

export const actions = {
    async fetchSectionProducts({ commit }, {SectionId, ShopId}) {
        const res = await this.$axios.get(`/api/products/${ShopId}/products?section=${SectionId}`)
        commit('setProducts', res.data)
    },
    async newProduct({ commit, state, rootState }) {
        const payload = Object.assign({}, state.editProduct,
            {
                options: rootState.option.editOptions,
                product_translations: state.editTranslations,
                images:  state.editImages
            })
        const res = await this.$axios.post(`/api/products/${state.editProduct.SectionId}`, payload)
        commit('addProduct', res.data)
    },
    async updateProduct({ commit, state }) {
        const payload = Object.assign({}, state.editProduct, { images: state.editImages })
        const res = await this.$axios.put('/api/products/' + state.editProduct.id, payload)
        commit('setProduct', res.data)
    },
    async deleteProduct({ commit }, product) {
        await this.$axios.delete('/api/products/' + product.id)
        commit('removeProduct', product)
    }
}
