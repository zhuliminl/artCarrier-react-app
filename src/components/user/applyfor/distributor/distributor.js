/*
 * Created by qm06 at 18-5-16
 *
 * 消息中心
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,Alert
} from 'react-native';
import {
  Font, Color, Space, GlobalStyle, GlobalConifg
} from '../../../../constants';
import api from "../../../../utils/api";
const { phoneNumberREG } = GlobalConifg;
export default class  Distributor extends React.Component {
  state={
    name:'',
    phone:'',
    weixin_nickname:'',
    comment:''
  }
  submitHandle =async () =>{
    const {name,phone,weixin_nickname,comment} =this.state
    if(!name){
      Alert.alert('请填写用户名');
    }else if(!phone){
      Alert.alert('请填写手机号');
    }else if(!phoneNumberREG.test(phone)) {
      Alert.alert('请填写有效的手机号');
    }else if(!weixin_nickname){
      Alert.alert('请填写微信号');
    }else if(!/^[a-z_\d]+$/ig.test(weixin_nickname)){
      Alert.alert('请填写有效的微信号');
    }else if(!comment){
      Alert.alert('请填写备注信息');
    }else{
      try {
        await api.post('/user/supplier',
          {
            weixin_nickname,name,phone,comment
          });
        Alert.alert('修改成功')
      } catch(error) {
        console.log('error',error)
        if(error.data) {
          console.log('error.data',error.data)
          return Alert.alert(error.data.message)
        }
        Alert.alert('修改失败')
      }
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.item}>
            <Image style={styles.icon}  source={require('../../../../assets/icon/applyfor/user.png')}/>
            <Text style={styles.label}>姓名</Text>
            <TextInput
              style={styles.input}
              placeholder='请填写姓名'
              underlineColorAndroid='transparent'
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />
          </View>
          <View style={styles.item}>
            <Image style={styles.icon}  source={require('../../../../assets/icon/applyfor/phone.png')}/>
            <Text style={styles.label}>手机号码</Text>
            <TextInput
              style={styles.input}
              placeholder='请填写手机号'
              underlineColorAndroid='transparent'
              keyboardType='phone-pad'
              onChangeText={phone => this.setState({phone})}
              value={this.state.phone}
            />
          </View>
          <View style={styles.item}>
            <Image style={styles.icon}  source={require('../../../../assets/icon/applyfor/wx.png')}/>
            <Text style={styles.label}>微信号</Text>
            <TextInput
              style={styles.input}
              placeholder='请填写微信号'
              underlineColorAndroid='transparent'
              onChangeText={weixin_nickname => this.setState({weixin_nickname})}
              value={this.state.weixin_nickname}
            />
          </View>
          <View style={styles.item}>
            <Image style={styles.icon}  source={require('../../../../assets/icon/user/apply.png')}/>
            <Text style={styles.label}>备注信息</Text>
            <TextInput
              style={styles.input}
              placeholder='请填写备注信息'
              underlineColorAndroid='transparent'
              onChangeText={comment => this.setState({comment})}
              value={this.state.comment}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.submitHandle();
          }}
          style={{
            width: '80%',
            height: 40,
            marginTop: 40,
            marginRight:'10%',
            marginLeft:'10%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: Color.primary,
          }}>
          <Text
            style={styles.buttonTitle}>
            确认提交
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Color.white
  },
  item:{
    flexDirection:'row',
    flexWrap:'nowrap',
    padding:Space.small,
    borderBottomWidth:1,
    borderStyle:'solid',
    borderColor:Color.tabIconDefault,
    ...GlobalStyle.center
  },
  icon:{
    marginRight:10,
    width:20,
    height:20,
  },
  label:{
    width:80
  },
  input:{
    padding: 0,
    flexGrow:1,
  },
  buttonTitle:{
    color:Color.white
  }

})
