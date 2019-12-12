/*
 * Created by Saul at 2018/05/22
 *
 * 切换列表的组合方式控件
 *
 * 单列还是双列
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const rowCompositionIconURL = require('../../../../assets/icon/sort/rowComposition.png');
const columnCompositionIconURL = require('../../../../assets/icon/sort/columnComposition.png');


class ToggleCompositionWidget extends React.Component {
  static propTypes = {
    compositionStyle: PropTypes.string,
    onToggleComposition: PropTypes.func
  }

  static defaultProps = {
    onToggleComposition: () => {}
  }

  render() {
    const { onToggleComposition, compositionStyle } = this.props;
    return(
      <TouchableOpacity
        style={{
          paddingLeft: 5,
          // backgroundColor: '#999'
        }}
        onPress={() => {
          onToggleComposition();
        }}
      >
        <Image
          source={
            compositionStyle === 'row' ?
              columnCompositionIconURL :
              rowCompositionIconURL
          }
          style={{
            width: 36,
            height: 36
          }}
        />
      </TouchableOpacity>
    )
  }
}

export default ToggleCompositionWidget;
