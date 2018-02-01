const thunk = require("redux-thunk").default
//console.error(thunk(null))

const { createStore, getStore, applyMiddlewaresToStore } = require("../src/")

describe('store', () => {
    const rootReducer = (state = {}, action) => {
        switch(action.type) {
            default:
                return state
        }
    }
    let store

    beforeEach(() => {
        createStore(rootReducer)
        store = getStore()
    })

    it('should create and get', () => {
        expect(store).toHaveProperty('subscribe')
        expect(store).toHaveProperty('getState')
        expect(store).toHaveProperty('dispatch')
        expect(store).toBe(getStore())
    })

    it('should add middleware', async () => {
        const asycAction = dispatch => Promise.resolve()
            .then(() => dispatch({ type: "HALLO" }))

        expect(() => store.dispatch(asycAction)).toThrow()

        applyMiddlewaresToStore(thunk)
        store = getStore()

        await store.dispatch(asycAction)
        expect(store.getActions()).toEqual([
            { type: "HALLO" }
        ])
    })

    it('should get actions and clear actions', () => {
        store.dispatch({ type: "GET_ACTIONS_TEST" })
        expect(store.getActions()).toEqual([
            { type: "GET_ACTIONS_TEST" }
        ])

        store.clearActions()
        expect(store.getActions()).toHaveLength(0)
    })

    it('should have initial state', () => {
        createStore(rootReducer, {
            test: "Hallo Welt"
        })

        expect(getStore().getState()).toEqual({
            test: "Hallo Welt"
        })
    })
})