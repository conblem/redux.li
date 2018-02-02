const thunk = require("redux-thunk").default;

const { matchers, setMiddlewares, setInitialState } = require("../src/");

describe("matcher", () => {
  beforeAll(() => {
    setMiddlewares(thunk);
    setInitialState({ message: "HALLO" });
  });
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });
  it("should toDispatch with callback", done => {
    const asyncAction = dispatch =>
      Promise.resolve().then(() => dispatch({ type: "TEST2" }));

    expect(asyncAction).toDispatch(done, async (actions, state) => {
      await Promise.resolve();
      expect(actions).toEqual([{ type: "TEST2" }]);
      expect(state).toEqual({ message: "HALLO" });
    });
  });
  it("should toDispatch empty", done => {
    expect({ type: "TEST3" }).toDispatch(done);
  });
  it("should toDispatch with action", done => {
    expect({ type: "TEST3" }).toDispatch(done, [{ type: "TEST3" }]);
  });
  it("should toDispatch with action and state", done => {
    expect({ type: "TEST3" }).toDispatch(done, [{ type: "TEST3" }], {
      message: "HALLO"
    });
  });
});
