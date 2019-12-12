/*
 * Created by Saul at 2018/05/14
 *
 * 收货地址列表
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {View, TouchableOpacity, Text, DeviceEventEmitter, Alert} from 'react-native';
import  AddressList from '../AddressList';
import api from "../../../../../utils/api";
import { setShippingAddress } from '../../../../../reducers/globalReducer/actions'

class AddressListScreen extends React.Component {

  state = {
    isFromCheckoutScreen: false
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: '我的收货地址',
      headerStyle: {},
      headerRight:params.headerRight
    }
  }
  componentWillMount() {
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: <TouchableOpacity
        style={{marginRight:10}}
        onPress={() => {
          navigation.navigate('AddressAdd')
        }}
      >
        <Text>添加新地址</Text>
      </TouchableOpacity>,
    })
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const action  = navigation.state.params || {}
    if(action.actionType  === 'selectAddress') {
      this.setState({
        isFromCheckoutScreen: true
      })
      // console.log('=====>>>>>选择地址', );
    }
  }

  handleOnSetDefaultAddress = (address) => {
    const { dispatch } = this.props
    dispatch(
      setShippingAddress(address)
    )
  }

  render() {
    const { navigation } = this.props;
    return(
      <View>
        <AddressList
          setDefaultAddress={this.handleOnSetDefaultAddress}
          isFromCheckoutScreen={this.state.isFromCheckoutScreen}
          navigation={ navigation }
        />
      </View>
    )
  }
}

export default connect(null)(AddressListScreen)
