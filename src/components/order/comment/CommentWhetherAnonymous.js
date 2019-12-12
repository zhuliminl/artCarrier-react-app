/*
 * Created by Saul at 2018/07/09
 *
 * 是否匿名
 *
 */

import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import Toast from '../../common/toast'
import CheckBox from '../../common/checkBox'

class CommentWhetherAnonymous extends React.Component {

  render() {
    return(
      <View
        style={{
          marginTop: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#DDD',
        }}
      >
        <CheckBox
          isChecked={this.props.isAnonymous}
          onClick={() => {
            this.props.onToggleAnonymous()
          }}
        />
        <Text
          style={{
            paddingLeft: 10,
            color: Color.black,
          }}
        >
          匿名
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
            color: Color.grey,
          }}
        >
          你的评价能帮助其他小伙伴哟
        </Text>
      </View>
    )
  }
}

export default CommentWhetherAnonymous;
