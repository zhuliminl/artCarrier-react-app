/*
 * Created by Saul at 2018/07/10
 *
 * 余额明细
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import {
  Color,
  Space,
  Font,
  GlobalStyle,
  Layout
} from '../../../constants';
import Toast from '../../common/toast'
import DefaultPage from '../../common/defaultPage';
import api from '../../../utils/api'
import DynamicList from '../../common/dynamicList'

const ListItem = () => {
  return (
    <View>
      <Text>
        xxxxxxxxxxxxx
      </Text>
    </View>
  )
}

class BalanceDetailsModal extends React.Component {
  state = {
    // 后期改成 余额的路由
    routerPath: '/poster',
    requestParams: null,
  }

  render() {
    return(
      <View
        style={{
          paddingTop: 20,
          height: Layout.window.height - 200,
          borderRadius: 10,
          backgroundColor: Color.white,
        }}
      >
        <DynamicList
          style={{
            backgroundColor: Color.white,
          }}
          requestParams={ this.state.requestParams }
          routerPath={ this.state.routerPath }
          renderItem={({ item, index }) => {
            return (
              <ListItem
                course={ item }
                index={ index }
              />
            )
          }}
        />
      </View>
    )
  }
}

export default BalanceDetailsModal;
