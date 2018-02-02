/// <reference types="jest" />

import { Store, Reducer, Middleware } from "redux"

declare global {
    export namespace jest {
        type DispatchCallback = () => void | Promise<any>
        interface Matchers<R> {
            /**
             * clearActions needs to be manually called
             */
            toDispatch(done: DoneCallback, callback: DispatchCallback)
            toDispatch(done: DoneCallback, expectedActions?: any, expectedState?: any)
        }
    }
}

declare namespace reduxLi {
    function createStore(reducer: Reducer<any>, initialState?: any)
    function applyMiddlewaresToStore(...middlewares: Middleware[])
    function clearActions()
    const matchers: jasmine.CustomMatcherFactories
}

export = reduxLi