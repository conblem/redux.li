const thunk = require("redux-thunk").default

const { matchers, createStore, getStore, applyMiddlewaresToStore } = require("../src/")

describe("matchers", () => {
    let store
    beforeEach(() => {
        jasmine.addMatchers(matchers)
        createStore((state = {}) => state, { message: "HALLO" })
        applyMiddlewaresToStore(thunk)
        store = getStore()
    })
    it("should dispatch actions", done => {
        expect({ type: "TEST" }).toDispatchActions([{ type: "TEST" }], done)

        const asyncAction = dispatch => Promise.resolve()
            .then(() => dispatch({ type: "TEST2" }))

        expect(asyncAction).toDispatchActions([{ type: "TEST2" }], done)
    })
    it("should dispatch actions and state", done => {
        expect({ type: "TEST" }).toDispatchActionsWithState({
            message: "HALLO"
        }, [
            { type: "TEST"}
        ], done)
    })
    it("should dispatch", done => {
        const store = getStore();

        const asyncAction = dispatch => Promise.resolve()
            .then(() => dispatch({ type: "TEST2" }))

        expect(asyncAction).dispatch(async () => {
            await Promise.resolve()
            expect(store.getActions()).toEqual([{ type: "TEST2" }])
            expect(store.getState()).toEqual({ message: "HALLO" })
            store.clearActions()
        }, done)

        expect({ type: "HOLA_ACTION" }).dispatch(() => {
            expect(store.getActions()).toEqual([{ type: "HOLA_ACTION" }])
            store.clearActions()
        }, done)
    })
})
