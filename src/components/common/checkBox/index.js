/*
 * Created by Saul at 2018/06/04
 *
 * 定制单选框
 *
 * 单选框的原始样式样式和 App 风格不符， 所以都需要重新定制
 * 当单选框在 App 出现的频次达到一定程度的时候，
 * 有必要对其做一次简单的封装
 *
 */

import React from 'react'
import CheckBox from 'react-native-check-box'
import {
  Image
} from 'react-native'

class CustomCheckBox extends React.Component {
  static defaultProps = {
        isChecked: false,
        disabled: false
  }
  render() {
    return(
      <CheckBox
        onClick={this.props.onClick}
        isChecked={this.props.isChecked}
        disabled={this.props.disabled}
        // 定制的风格
        checkedImage={
          <Image
            source={require('../../../assets/icon/checked.png')}
            style={{
              width: 25,
              height: 25
            }}
            />
        }
        unCheckedImage={
          <Image
            source={require('../../../assets/icon/unChecked.png')}
            style={{
              width: 25,
              height: 25
            }}
            />
        }
      />
    )
  }
}

export default CustomCheckBox
