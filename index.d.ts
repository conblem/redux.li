import { Store, Reducer, Middleware } from 'redux'

declare global {
    export namespace jest {
        type DispatchCallback = (() => void) | (() => Promise<any>)
        interface Matchers<R> {
            toDispatchActions(expected: any[], done: DoneCallback)
            toDispatchActionsWithState(expectedState: any, expectedActions: any[], done: DoneCallback)
            dispatch(expected: DispatchCallback, done: DoneCallback)
        }
    }
}

declare namespace reduxLi {
    interface MockStore<T> extends Store<T> {
        getActions(): any[]
        clearActions()
    }
    function createStore(reducer: Reducer<any>, initialState?: any)
    function getStore(): MockStore<any>
    function applyMiddlewaresToStore(...middlewares: Middleware[])
}

export = reduxLi