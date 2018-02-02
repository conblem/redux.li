const { createStore: reduxCreateStore, applyMiddleware } = require("redux")

let store
let reducer
let initialState
let actions = []

const actionMiddleware = () => next => action => {
    actions.push(action)
    return next(action)
}

function createStore(newReducer, newState = {}, middlewares = []) {
    initialState = newState
    reducer = newReducer

    store = reduxCreateStore(reducer, initialState, applyMiddleware(...middlewares, actionMiddleware))
}

function applyMiddlewaresToStore(...middlewares) {
    createStore(reducer, initialState, middlewares)
}

function getStore() {
    return store
}

function getActions() {
    return actions
}

function clearActions() {
    actions = []
}

module.exports = {
    createStore,
    getStore,
    applyMiddlewaresToStore,
    getActions,
    clearActions
}