const { getStore, getActions, clearActions } = require("./store")

const matchers = {
    toDispatch: () => ({
        compare(actual, done, callbackOrExpectedActions = clearActions, expectedState) {
            if(typeof callbackOrExpectedActions !== "function") {
                const expectedActions = callbackOrExpectedActions
                callbackOrExpectedActions = (actions, state) => {
                    expect(expectedActions).toEqual(actions)
                    expectedState && expect(expectedState).toEqual(state)
                    clearActions()
                }
            }

            Promise.resolve(getStore().dispatch(actual))
                .then(() => callbackOrExpectedActions(getActions(), getStore().getState()))
                .then(done)
                .catch(done.fail)

            return { pass: true }
        }
    })
}

module.exports = matchers