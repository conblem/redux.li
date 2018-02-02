const thunk = require("redux-thunk").default;

const { setReducer, setInitialState, setMiddlewares } = require("../src/");
const matchers = require("../src/matchers");

describe("store", () => {
  const rootReducer = (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  beforeAll(() => {
    setReducer(rootReducer);
    setInitialState({ message: "HALLO" });
    setMiddlewares(thunk);
  });

  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  it("should add middleware", done => {
    const asycAction = dispatch =>
      Promise.resolve().then(() => dispatch({ type: "HALLO" }));

    expect(asycAction).toDispatch(done);
  });

  it("should have initialState", done => {
    expect({ type: "TEST" }).toDispatch(done, (actions, state) => {
      expect(state).toEqual({ message: "HALLO" });
    });
  });
});
