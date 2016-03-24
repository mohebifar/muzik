import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

export default function create() {
  const sagaMiddleware = createSagaMiddleware(sagas);
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(reducers, middleware);

  return store;
}
