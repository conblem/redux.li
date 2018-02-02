const { getStore, getActions, clearActions } = require("./store");

const matchers = {
  toDispatch: () => ({
    compare(
      actual,
      done,
      callbackOrExpectedActions = clearActions,
      expectedState
    ) {
      const callback =
        typeof callbackOrExpectedActions === "function"
          ? callbackOrExpectedActions
          : (actions, state) => {
              expect(callbackOrExpectedActions).toEqual(actions);
              if (expectedState) {
                expect(expectedState).toEqual(state);
              }
              clearActions();
            };

      Promise.resolve(getStore().dispatch(actual))
        .then(() => callback(getActions(), getStore().getState()))
        .then(done)
        .catch(done.fail);

      return { pass: true };
    }
  })
};

module.exports = matchers;
