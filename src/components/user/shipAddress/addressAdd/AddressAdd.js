/*
 * Created by qm06 at 18-6-1
 *
 * 收货地址添加
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import {
  Font, Color, Space, Layout,GlobalConifg
} from '../../../../constants';
import {List, Switch,Button as AntdBtn} from 'antd-mobile';
import ModalTester from "./addAddressModal";
import api from "../../../../utils/api";
const { phoneNumberREG } = GlobalConifg;
import Toast from '../../../common/toast';

export default class AddressModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,//省市县的选项卡的当前位置
      addressArr: [],//用户请求的省/市/县 列表数据
      selectAddress: {},//用户的选择数据,
      phone: '',
      province: '请选择省份/区域',
      city: '请选择城市',
      county: '请选择区县',
      user:'',//收货人,
      address:'',//具体的收货地址,
      isDefault:false,//是否是默认地址,
      submitFlag:false,
      isModalVisible:false,
    }
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
      }else{
        console.log('区')
        this.setState({
          currentPage: 2
        });
        this.getData('xian', {provinceCode: this.state.selectAddress.provinceCode, cityCode: this.state.selectAddress.cityCode});
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
  //点击提交收货地址
  submitHandle = async () => {
    try {
      if(!this.state.user) {
       return Alert.alert('请填写收货人！');
      }
      if(!phoneNumberREG.test(this.state.phone)) {
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
      console.log('this.state.user',this.state.user)
      console.log('this.state.phone',this.state.phone)
      console.log('this.state.address',this.state.address)
      console.log('this.state.isDefault',this.state.isDefault)
      console.log('this.state.selectAddress',this.state.selectAddress)
      this.setState({
        submitFlag:true
      })
      const result = await api.post('/address',{
        name:this.state.user,
        phone:this.state.phone,
        address:this.state.address,
        isDefault:this.state.isDefault,
        ...this.state.selectAddress
      });
      this.setState({
        submitFlag:false
      })
      console.log(3333)
      console.log(result.data.result);
      if(result.data.result==="ok"){
        Toast.show('添加成功', Toast.LONG);
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
  toggleModal=()=> {
    this.setState({isModalVisible: !this.state.isModalVisible}
    );
  }
  render() {
    return (
      <View>
        <List>
          <List.Item>
            <View style={styles.name}>
              <Text style={styles.itemIcon}>
                <Image
                  style={styles.icon}
                  source={require('../../../../assets/icon/applyfor/user.png')}
                />
              </Text>
              <TextInput
                style={{padding: 0, flexGrow: 1}}
                placeholder='收货人'
                underlineColorAndroid='transparent'
                onChangeText={user => this.setState({user})}

              />
            </View>
          </List.Item>
          <List.Item>
            <TextInput
              style={{padding: 0}}
              placeholder='手机号码'
              underlineColorAndroid='transparent'
              keyboardType='phone-pad'
              onChangeText={phone => this.setState({phone})}

            />
          </List.Item>
          <List.Item>
            <View style={styles.addressWrapper}>
              <Text>
                所在地区 {this.state.selectAddress.province} {this.state.selectAddress.city} {this.state.selectAddress.county}
              </Text>
              <View style={styles.addAddressWrapper}>
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
            </View>
          </List.Item>
          <List.Item>
            <TextInput
              style={{padding: 0, flexGrow: 1}}
              placeholder='详细地址：如道路,门牌号,小区,楼栋号,单元室等'
              underlineColorAndroid='transparent'
              onChangeText={address => this.setState({address})}

            />
          </List.Item>
          <List.Item
            extra={<Switch
              checked={this.state.isDefault}
              onChange={(isDefault) => {
                this.setState({
                  isDefault: isDefault
                })
              }}
            />}
          >
            <Text>设为默认地址</Text>
          </List.Item>
        </List>
        <AntdBtn  style={{margin:Space.small,backgroundColor:Color.primary}}
                  onClick={this.submitHandle}
                  disabled={this.state.submitFlag}
        >
          <Text style={{color:Color.white}}>添加收货地址</Text>
        </AntdBtn>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  itemIcon: {
    borderRadius: 40,
    height: 40,
    width: 40,
    marginRight: Space.small,
    backgroundColor: Color.bg,
    color: Color.white,
    textAlign: 'center',
    lineHeight: 38,
    fontSize: 20
  },
  icon: {
    width: 40,
    height: 40
  },
  addressWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  address: {
    width: Layout.window.width - 60,
  },
  addAddressWrapper: {
    width: 40,
    height: 30,
    marginTop: -10,
    justifyContent: 'flex-end'
  }

})
