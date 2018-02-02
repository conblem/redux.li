const { createStore } = require("./store");

const matchers = {
  toDispatch: () => ({
    compare(actual, done, callbackOrExpectedActions = () => {}, expectedState) {
      const callback =
        typeof callbackOrExpectedActions === "function"
          ? callbackOrExpectedActions
          : (actions, state) => {
              expect(callbackOrExpectedActions).toEqual(actions);
              if (expectedState) {
                expect(expectedState).toEqual(state);
              }
            };

      const { store, actions } = createStore();

      Promise.resolve(store.dispatch(actual))
        .then(() => callback(actions, store.getState()))
        .then(done)
        .catch(done.fail);

      return { pass: true };
    }
  })
};

module.exports = matchers;
