const { createStore: reduxCreateStore, applyMiddleware } = require("redux")

let store
let reducer
let initialState

const actionMiddleware = () => next => action => {
    store.getActions().push(action)
    return next(action)
}

function createStore(newReducer, newState = {}, middlewares = []) {
    initialState = newState
    reducer = newReducer

    store = reduxCreateStore(reducer, initialState, applyMiddleware(...middlewares, actionMiddleware))

    let actions = []
    store.getActions = () => actions
    store.clearActions = () => actions = []
}

function applyMiddlewaresToStore(...middlewares) {
    createStore(reducer, initialState, middlewares)
}

function getStore() {
    return store
}

module.exports = {
    createStore,
    getStore,
    applyMiddlewaresToStore
}