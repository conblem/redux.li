const { createStore: reduxCreateStore, applyMiddleware } = require("redux");

let initialState;
let reducer = Object;
let middlewares = [];

const actionMiddleware = actions => () => next => action => {
  actions.push(action);
  return next(action);
};

function createStore() {
  const actions = [];
  const store = reduxCreateStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares, actionMiddleware(actions))
  );
  return { store, actions };
}

function setMiddlewares(...newMiddlewares) {
  middlewares = newMiddlewares;
}

function setInitialState(newInitialState) {
  initialState = newInitialState;
}

function setReducer(newReducer) {
  reducer = newReducer;
}

module.exports = {
  createStore,
  setInitialState,
  setReducer,
  setMiddlewares
};
