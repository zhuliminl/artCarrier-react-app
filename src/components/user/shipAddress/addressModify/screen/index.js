
/*
 * Created by gyfhml at 2018/06/5
 *
 * 收货地址修改
 *
 */

import React from 'react';
import {View, TouchableOpacity, Image, DeviceEventEmitter} from 'react-native';
import AddressModify from "../AddressModify";

class AddressModifyScreen extends React.Component {
  constructor(){
    super();
    this.state={
      item:{}
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:  <TouchableOpacity
        style={{marginRight:10}}
        onPress={() => {
          navigation.goBack()
          navigation.setParams({data:'hello'})
        }}
      >
        <Image
          source={require('../../../../../assets/icon/back_dark.png')}
          style={{width:20,height:20,marginLeft:20 }}
        />
      </TouchableOpacity>,
      headerTitle: '修改收货地址'
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});
    this.setState({
      item,
    })
  }
  componentWillUnmount(){
    DeviceEventEmitter.emit('ChangeUI');
  }
  render() {
    return(
      <View>
        <AddressModify item={this.state.item}/>
      </View>
    )
  }
}

export default AddressModifyScreen;
