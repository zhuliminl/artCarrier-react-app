/*
 * Created by jemo on 2018-3-19.
 * Configure redux store
 */
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';

// 数据持久
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 中间件
import thunkMiddleware from 'redux-thunk';
// import devTools from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';


const persistConfig = {
  key: 'globalState',
  // key: 'root',
  storage,
  blacklist: ['cartState', 'mediaState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const preloadedState = {};
const loggerMiddleware = createLogger();


let store = createStore(
  persistedReducer,
  preloadedState,
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
    // 本地可视化调试工具
    // devTools({
      // name: Platform.OS,
      // hostname: 'localhost',
      // port: 5678
    // })
  )
)

// console.log('module', module)
// if(module.hot) {
  // module.hot.accept(() => {
    // const nextRootReducer = require('./reducers/index.js').default;
      // store.replaceReducer(nextRootReducer);
    // });
  // 热更新
  // const nextRootReducer = rootReducer
  // store.replaceReducer(nextRootReducer);
// }

let persistor = persistStore(store)

export {
  store,
  persistor
}
