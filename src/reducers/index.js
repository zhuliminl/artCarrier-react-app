/*
 * Created by jemo on 2018-3-19.
 * Reducers
 */

import { combineReducers } from 'redux';

import glabalReducer from './globalReducer';
import cartReducer from '../components/cart/reducer'
import mediaReducer from '../components/media/reducer'
// import checkoutOrder from '../components/order/checkout/reducer'

const rootReducer = combineReducers({
  globalState: glabalReducer,
  cartState: cartReducer,
  mediaState: mediaReducer,
});

export default rootReducer;
