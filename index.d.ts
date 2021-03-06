/// <reference types="jest" />

import { Store, Reducer, Middleware } from "redux";

declare global {
  export namespace jest {
    type DispatchCallback = (actions, state) => void | Promise<any>;
    interface Matchers<R> {
      toDispatch(done: DoneCallback, callback: DispatchCallback);
      toDispatch(
        done: DoneCallback,
        expectedActions?: any,
        expectedState?: any
      );
    }
  }
}

declare namespace reduxLi {
  function setMiddlewares(...middlewares: Middleware[]);
  function setInitialState(initialState: any);
  function setReducer(reducer: Reducer<any>);
  const matchers: jasmine.CustomMatcherFactories;
}

export = reduxLi;
