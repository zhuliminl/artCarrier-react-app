/*
 * Created by Saul at 2018/07/05
 *
 * 订单评价顶部栏
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Layout, Font } from '../../../../constants'
import Toast from '../../../common/toast'
import api from '../../../../utils/api'


class Header extends React.Component {
  render() {
    return(
      <View style={ styles.headerContainer }>
        <View
          style={ styles.headerTitleContainer }>
          <Text style={ styles.headerTitleText }>
            发表评价
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.onCommentSubmit()
          }}
          style={ styles.headerRightContainer }
        >
          <Text style={ styles.headerRightText }>
            发布
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const headerRightWidth = 80

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: Color.primary,
    height: Platform.OS === 'ios' ? 70 : 50,
    flexDirection: 'row'
  },
  headerTitleContainer: {
    paddingBottom: 0,
    marginLeft: headerRightWidth,
    justifyContent: 'center',
    flex: 1
  },
  headerRightContainer: {
    width: headerRightWidth,
    justifyContent: 'center',
  },
  headerTitleText: {
    textAlign: 'center',
    fontSize: Font.medium,
    color: Color.white
  },
  headerRightText: {
    textAlign: 'center',
    fontSize: Font.small,
    color: Color.white,
  }
})

export default Header
