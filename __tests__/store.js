const thunk = require("redux-thunk").default;

const { createStore, applyMiddlewaresToStore } = require("../src/");
const matchers = require("../src/matchers");

describe("store", () => {
  const rootReducer = (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  beforeEach(() => {
    jasmine.addMatchers(matchers);
    createStore(rootReducer);
  });

  it("should add middleware", done => {
    const asycAction = dispatch =>
      Promise.resolve().then(() => dispatch({ type: "HALLO" }));

    applyMiddlewaresToStore(thunk);

    expect(asycAction).toDispatch(done);
  });
});
