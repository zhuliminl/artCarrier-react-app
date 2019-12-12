/*
 * Created by gyfhml at 18-6-1
 *
 * 我的收货地址
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Alert, DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux'
import DefaultPage from '../../../common/defaultPage';
import {
  Font, Color, Space, Layout
} from '../../../../constants';
import api from "../../../../utils/api";
import CheckBox from '../../../common/checkBox'

class AddressList  extends React.Component {
  constructor(props){
    super(props);
    this.state={
      checkedAddressIndex: 0,
      data:[]
    }
  }

  handleOnCheckAddress = (index) => {
    const { setDefaultAddress } = this.props
    this.setState({
      checkedAddressIndex: index
    })
    // 取出当前被选中的地址作为默认地址，传递给确认订单页面使用
    const address = this.state.data[index]
    setDefaultAddress(address)
  }

   getdata=async()=>{
    try {
      const { userInfo } = this.props
      const response = await api.get('/address',{
        params: {
          user_id: userInfo.id
        }
      });
      //处理默认的在数组的第一位显示
      let data =response.data.data;
      if(data && data.length>0){
        var isNoDefaultArr=data.filter((item)=>{
          if(item.is_default!==1)
            return  item;
        });

        var isDefaultItem=data.filter((item)=>{
          if(item.is_default===1)
            return  item;
        });
        if(isDefaultItem.length>0){
          isNoDefaultArr.unshift(isDefaultItem[0]);
        }
        this.setState({
          data:isNoDefaultArr
        });
      }else{
        this.setState({
          data:data
        });
      }
    } catch(error) {
      if(error.data) {
        return Alert.alert(error.data.data.message.message);
      }
      Alert.alert('网络错误');
    }
  }
  //注册通知
  componentDidMount(){
    this.deEmitter=DeviceEventEmitter.addListener('ChangeUI',(dic)=>{
      //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
      this.setState({
        flag:true,
      },()=>{
        this.getdata();

      });
    });
    this.getdata();
  }
  componentWillUnmount() {
    this.deEmitter.remove();
  }
  render() {
    if (this.state.data.length===0) {
      return (
        <View style={styles.container}>
          <DefaultPage message={'您还没有所收货地址哦,快去添加吧'}/>
        </View>
      )
    } else {
      const { isFromCheckoutScreen } = this.props
      return (
        <ScrollView style={styles.container}>
          {this.state.data.map((item, i) => {
            // console.log('=====>>>>>data', this.state.data);
            // console.log('=====>>>>>data i', i);
            return(
              <View style={styles.item} key={item.id} >
                <View style={styles.itemLeft}>
                  <Text style={styles.name}>{item.name[0]}</Text>
                </View>
                <View style={styles.itemCenter}>
                  <Text style={styles.allName}>{item.name} <Text style={styles.phone}>{item.phone}</Text></Text>
                  <Text style={styles.address} >
                    {item.is_default===1 ? <Text style={styles.defaultAddress}> [默认] &nbsp;</Text> :''}
                    <Text style={styles.addressItem}>{item.province}&nbsp;</Text>
                    <Text style={styles.addressItem}>{item.city}&nbsp;</Text>
                    <Text style={styles.addressItem}>{item.county}&nbsp;</Text>
                    <Text style={styles.addressItem}>{item.address}&nbsp;</Text>
                  </Text>

                    {/* 单选框 */}
                    {
                      isFromCheckoutScreen &&
                        <CheckBox
                          onClick={() => {
                            this.handleOnCheckAddress(i)
                          }}
                          isChecked={ this.state.checkedAddressIndex === i ? true : false }
                        />
                    }
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressModify',{
                  item:item
                })}>
                  <Text style={styles.editBtn}>编辑</Text>
                </TouchableOpacity>
              </View>
            )
          })}

        </ScrollView>
      )
    }

  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Color.white,
  },
  item:{
    flexDirection:'row',
    flexWrap:'nowrap',
    backgroundColor:Color.white,
    paddingBottom:Space.medium,
    alignItems:'center',
    paddingTop:Space.tiny,
  },
  itemLeft:{
    borderRadius:40,
    height:40,
    width:40,
    margin:10,
    backgroundColor:Color.grey,
    alignItems:'center',
    justifyContent:'center'
  },
  allName:{
    color:Color.black,
  },
  name:{
    fontSize:Font.tiny,
    color:Color.white
  },
  itemCenter:{
    width:Layout.window.width-110,
    marginRight:10,
  },
  addressItem:{
    fontSize:Font.tiny,
  },
  phone:{
    color:Color.grey,
    fontSize:Font.tiny,
  },
  address:{
    borderStyle:'solid',
    borderColor:Color.grey,
    paddingRight:Space.mini,
    borderRightWidth:1,

  },
  defaultAddress:{
    color:Color.primary,
  },
  editBtn:{
    color:Color.grey,
  }
})

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo = {} } = globalState
  return {
    userInfo
  }
}

export default connect(mapStateToProps)(AddressList)
