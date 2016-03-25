import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

export default function create() {
  const sagaMiddleware = createSagaMiddleware(sagas);
  const middleware = compose(
    applyMiddleware(sagaMiddleware),
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() :
      f => f
  );
  const store = createStore(reducers, middleware);

  return store;
}
