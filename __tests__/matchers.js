const thunk = require("redux-thunk").default

const { matchers, createStore, getStore, applyMiddlewaresToStore, clearActions } = require("../src/")

describe("matcher", () => {
    beforeEach(() => {
        jasmine.addMatchers(matchers)
        createStore((state = {}) => state, { message: "HALLO" })
        applyMiddlewaresToStore(thunk)
    })
    it("should toDispatch with callback", done => {
        const asyncAction = dispatch => Promise.resolve()
            .then(() => dispatch({ type: "TEST2" }))

        expect(asyncAction).toDispatch(done, async (actions, state) => {
            await Promise.resolve()
            expect(actions).toEqual([{ type: "TEST2" }])
            expect(state).toEqual({ message: "HALLO" })
            clearActions()
        })
    })
    it("should toDispatch empty", done => {
        expect({ type: "TEST3" }).toDispatch(done)
    })
    it("should toDispatch with action", done => {
        expect({ type: "TEST3" }).toDispatch(done, [
            { type: "TEST3" }
        ])
    })
    it("should toDispatch with action and state", done => {
        expect({ type: "TEST3" }).toDispatch(done, [
            { type: "TEST3" }
        ], {
            message: "HALLO"
        })
    })
})
