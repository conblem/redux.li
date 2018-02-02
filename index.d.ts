/// <reference types="jest" />

import { Store, Reducer, Middleware } from "redux";

declare global {
  export namespace jest {
    type DispatchCallback = () => void | Promise<any>;
    interface Matchers<R> {
      /**
       * clearActions needs to be manually called
       */
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
  function setReducer(reducer: Reducer);
  const matchers: jasmine.CustomMatcherFactories;
}

export = reduxLi;
