/*
 * Created by Saul at 2018/05/03
 *
 * 视图宽高
 *
 */

import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
