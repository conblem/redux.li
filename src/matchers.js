const { getStore } = require("./store")

const matchers = {
    toDispatchActions: () => ({
        compare(actual, expected, done) {
            const store = getStore()

            matchers.dispatch().compare(actual, () => {
                expect(store.getActions()).toEqual(expected)
                store.clearActions()
            }, done)

            return { pass: true }
        }
    }),
    toDispatchActionsWithState: () => ({
        compare(actual, expectedState, expectedActions, done) {
            const store = getStore()

            matchers.dispatch().compare(actual, () => {
                expect(store.getActions()).toEqual(expectedActions)
                expect(store.getState()).toEqual(expectedState)
                store.clearActions()
            }, done)

            return { pass: true }
        }

    }),
    dispatch: () => ({
        compare(actual, callback, done) {
            const store = getStore()
            Promise.resolve(store.dispatch(actual))
                .then(callback)
                .then(done)
                .catch(done.fail)

            return { pass: true }
        }
    })
}

module.exports = matchers