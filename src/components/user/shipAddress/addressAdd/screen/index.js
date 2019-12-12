/*
 * Created by gyfhml at 2018/05/14
 *
 * 收货地址添加
 *
 */

import React from 'react';
import { View ,TouchableOpacity, Image,DeviceEventEmitter} from 'react-native';
import AddressAdd from "../AddressAdd";

class AddressAddScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
  }
  componentWillUnmount(){
    DeviceEventEmitter.emit('ChangeUI');
  }
  render() {
    return(
      <View>
        <AddressAdd/>
      </View>
    )
  }
}

export default AddressAddScreen;
