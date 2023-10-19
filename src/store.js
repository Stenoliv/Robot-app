import { createStore } from 'vuex'

const store = createStore({
    state: {
        spoonacular: localStorage.getItem('spoonacular'),
        google: localStorage.getItem('google'),
    },
    mutations: {
        setSpoonacular (state, value) {
            state.spoonacular = value
        },
        setGoogle (state, value) {
            state.google = value
        }
    },
    getters: {
        getSpoonacular (state) {
            return state.spoonacular
        },
        getGoogle (state) {
            return state.google
        }
    }
})

export default store