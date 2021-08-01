import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}
