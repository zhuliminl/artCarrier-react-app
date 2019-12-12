/*
 * Created by gyfhml at 18-6-1
 *
 *  收货地址修改
 *
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native';
import {
  Font, Color, Space, Layout, GlobalStyle,GlobalConifg
} from '../../../../constants';
import { List, Switch ,Button as AntdBtn } from 'antd-mobile';
import ModalTester from "./editAddressModal";
import api from "../../../../utils/api";
import Toast from "../../../common/toast";
const { phoneNumberREG } = GlobalConifg;
export default class AddressModify extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentPage: 0,//省市县的选项卡的当前位置
      addressArr: [],//用户请求的省/市/县 列表数据
      province: props.item.province,
      city: props.item.city,
      county: props.item.county,
      address:'',//具体的收货地址,
      item:props.item,
      name:props.item.name,
      phone:props.item.phone,
      address:props.item.address,
      isDefault:props.item.is_default===0?false:true,
      selectAddress: {//用户的选择数据,
        province:props.item.province,
        provinceCode:props.item.province_code,
        city:props.item.city,
        cityCode:props.item.city_code,
        county:props.item.county,
        countyCode:props.item.county_code,
      },
      isModalVisible:false
    }
    console.log('props.item',props.item)
  }

  /*address  string  ' sheng /shi/xian'
  * */
  async getData(address, params) {
    try {
      const response = await api.post(address, params ? {
        ...params
      } : '');
      this.setState({
        addressArr: response.data.data
      })
    } catch (error) {
      if (error.data) {
        const message = error.data.data.message;
        return Alert.alert(message);
      }
      console.log('error', error)
      Alert.alert('网络错误');
    }
  }

  componentDidMount() {
    this.getData('/sheng');
  }

  //根据点击不同的tab 请求不同的数据
  tabBarHandle = ({i, ref}) => {
    switch (i) {
      case 0:
        this.selectProvinceHandle();
        break;
      case 1:
        this.selectCityHandle();
        break;
      case 2:
        this.selectCountyHandle();
        break;
    }
  }
  //查询省
  selectProvinceHandle = () => {
    this.setState({
      currentPage: 0,
    }, () => {
      this.getData('/sheng');
    });

  }
  //查询市
  selectCityHandle = async (address) => {
    console.log("new 22222")
    try {
      // 如果有address 是选项卡在内部点击事件
      if (address) {
        //获取省name 省code
        let province = address.name;
        let provinceCode = address.code;

        let selectAddress = {
          province,
          provinceCode,
          city: '',
          cityCode: '',
        }
        this.setState({
          //currentPage: 1,
          province,
          city: '请选择城市',
          county: '请选择区县',
          selectAddress,
        },()=>{
          this.setState({
            currentPage: 1
          });
          this.getData('shi', {provinceCode});
        });

      }else{
        this.setState({
          county: '请选择区县',
        },()=>{
          this.setState({
            currentPage: 1
          });
          this.getData('shi', {provinceCode:this.state.selectAddress.provinceCode});
        });
      }
    } catch (e) {
      console.log('err', e)
    }
  }
  //查询区
  selectCountyHandle = async (address) => {
    try {
      if (address) {// 如果有address 是选项卡在内部点击事件
        let city = address.name;
        let cityCode = address.code;
        let selectAddress = this.state.selectAddress;
        selectAddress.city = city;
        selectAddress.cityCode = cityCode;
        selectAddress.county = '';
        selectAddress.countyCode = '';
        await this.getData('xian', {provinceCode: this.state.selectAddress.provinceCode, cityCode: cityCode});
        this.setState({
          currentPage: 2,
          city,
          selectAddress
        });
      }
    } catch (e) {
      console.log('err', e)
    }
  }
  // 当用户点击完区域时
  selectedHandle = (address) => {
    if (address) {// 如果有address 是选项卡在内部点击事件
      let county = address.name;
      let countyCode = address.code;
      let selectAddress = this.state.selectAddress;
      selectAddress.county = county;
      selectAddress.countyCode = countyCode;
      this.setState({
        county,
        selectAddress
      },()=>{
        this.toggleModal();
      });
    }
  }
  //点击提交修改收货地址
  submitHandle = async () => {
    try {
      if(!this.state.item.name) {
        return Alert.alert('请填写收货人！');
      }
      if(!phoneNumberREG.test(this.state.item.phone)) {
        return Alert.alert('手机号格式错误');
      }
      if(!this.state.selectAddress.province||
        !this.state.selectAddress.cityCode ||
        !this.state.selectAddress.county){
        return Alert.alert('请输入完整的省市区地址');
      }
      if(!this.state.address){
        return  Alert.alert('请输入您的详细地址！');
      }
      console.log('this.state.name',this.state.name)
      console.log('this.state.phone',this.state.phone)
      console.log('this.state.address',this.state.address)
      console.log('this.state.isDefault',this.state.isDefault)
      console.log('this.state.selectAddress',this.state.selectAddress)
      const result = await api.put('/address/'+this.props.item.id,{
        user_id:1,
        name:this.state.name,
        phone:this.state.phone,
        address:this.state.address,
        isDefault:this.state.isDefault,
        ...this.state.selectAddress,
        del:false,
      });
      console.log(result.data.result);
      if(result.data.result==="ok"){
        Toast.show('修改成功', Toast.LONG);
      }

    } catch (error) {
      if (error.data) {
        const message = error.data.data.message;
        return Alert.alert(message);
      }
      console.log('error', error)
      Alert.alert('网络错误');
    }

  }
  deleteHandle= async ()=>{
    try {
      const response = await api.put('/address/'+this.props.item.id,{
        user_id:1,
        name:this.state.name,
        phone:this.state.phone,
        province:this.state.selectAddress.province,
        provinceCode:this.state.selectAddress.provinceCode,
        city:this.state.selectAddress.city,
        cityCode:this.state.selectAddress.cityCode,
        county:this.state.selectAddress.county,
        countyCode:this.state.selectAddress.countyCode,
        address:this.state.address,
        isDefault:this.state.isDefault,
        del:true
      });
      if(response.data.result==='ok'){
        Toast.show('删除成功', Toast.LONG);
      }
    }catch (error) {
      if (error.data) {
       console.log(error);
        return Alert.alert('删除失败！');
      }
      Alert.alert('网络错误');
    }

  }
  toggleModal=()=>{
    this.setState({ isModalVisible: !this.state.isModalVisible }
    );
  }
  render() {
    return (
      <View>
        <List>
          <List.Item>
            <View style={styles.name}>
              <Text style={styles.itemIcon}>{this.state.name[0]}</Text>
              <TextInput
                  style={styles.input}
                  placeholder={this.state.name}
                  underlineColorAndroid='transparent'
                  onChangeText={name => this.setState({name})}

              />
            </View>
          </List.Item>
          <List.Item >
            <TextInput
                style={{padding:0}}
                placeholder={this.state.phone}
                underlineColorAndroid='transparent'
                keyboardType='phone-pad'
                onChangeText={phone => this.setState({phone})}

            />
          </List.Item>
          <List.Item >
            <View style={styles.addressWrapper}>
              <Text style={styles.address}>
                <Text style={styles.addressItem}>{this.state.selectAddress.province} {this.state.selectAddress.city} {this.state.selectAddress.county}</Text>
              </Text>
              <ModalTester item={this.state.item}
                           currentPage={this.state.currentPage}
                           province={this.state.province}
                           city={this.state.city}
                           county={this.state.county}
                           addressArr={this.state.addressArr}
                           selectAddress={this.state.selectAddress}
                           selectProvinceHandle={this.selectProvinceHandle}
                           selectCityHandle={this.selectCityHandle}
                           selectCountyHandle={this.selectCountyHandle}
                           tabBarHandle={this.tabBarHandle}
                           selectedHandle={this.selectedHandle}
                           isModalVisible={this.state.isModalVisible}
                           toggleModal={this.toggleModal}
              />
            </View>
          </List.Item>
          <List.Item>
            <TextInput
              style={styles.input}
              placeholder={this.state.address}
              underlineColorAndroid='transparent'
              onChangeText={address => this.setState({address})}

            />
          </List.Item>
          <List.Item
              extra={<Switch
                checked={this.state.isDefault}
                onChange={(isDefault) => {
                  this.setState({
                    isDefault:isDefault
                  }) }}
              />}
          >
            <Text>设为默认地址</Text>
          </List.Item>
            <List.Item arrow='horizontal'>
              <TouchableOpacity onPress={this.deleteHandle}>
                <Text style={styles.delBtn}>
                  删除收货地址
                </Text>
              </TouchableOpacity>
            </List.Item>
          </List>
          <AntdBtn  style={{margin:Space.small,backgroundColor:Color.primary}}
                    onClick={this.submitHandle}
          >
            <Text style={{color:Color.white}}>修改收货地址</Text>
          </AntdBtn>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  name:{
    flexDirection:'row',
    flexWrap:'nowrap',
  },
  itemIcon:{
    borderRadius:40,
    height:40,
    width:40,
    margin:10,
    backgroundColor:Color.grey,
    color:Color.white,
    textAlign:'center',
    lineHeight:38,
  },
  delBtn:{
    color:Color.errorBackground
  },
  addressWrapper:{
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems:'center',
  },
  address:{
    width:Layout.window.width-60,
  },
  input:{
    padding:0,
    flexGrow:1,
  }
})