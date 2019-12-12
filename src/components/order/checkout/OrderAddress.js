/*
 * Created by Saul at 2018/06/11
 *
 * 确认订单顶部地址栏
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import api from '../../../utils/api'
import { setShippingAddress } from '../../../reducers/globalReducer/actions'
import Toast from '../../common/toast'

class OrderAddress extends React.Component {

  /*
    一进入确认订单页面，就先请求默认的收货地址，我们默认用户会使用默认收货地址
    但如果用户需要选取其他收货地址，则可以进入地址管理页面进行选择
    如此一来，用户的收货地址应该统一交给全局管理
    本组件内部虽然请求了 默认地址的数据，但仍然需要将地址信息存入全局，然后组件从全局拿取地址信息
  */
  componentDidMount = () => {
    // console.log('=====>>>>>收货人地址', );
    this.fetchDefaultShipingAddress()
  }

  fetchDefaultShipingAddress = async () => {
    const { userInfo } = this.props
    // console.log('=====>>>>>userInfo', userInfo);
    try {
      const response = await api.get('/address', {
        params: {
          user_id: userInfo.id
        }
      })
      const addressData = response.data.data
      const defaultAddress = addressData.filter(address => address['is_default'] === 1)[0]

      const { dispatch } = this.props
      dispatch(
        setShippingAddress(defaultAddress)
      )

    } catch(error) {
      console.log('=====>>>>>订单结算页面请求收货地址错误', error);
      if(error.data) {
        const data = error.data.data;
        const message = data.message
        Toast.show(message, Toast.LONG)
        return
      }
      return Alert.alert('网络错误')
    }
  }

  render() {
    // const {
      // navigation,
      // consignee = "朱黎明",
      // phoneNumber = "13735881684",
      // addressText = "浙江省杭州市余杭区仓前街道文一西路1324号利尔达物联网产业园6号楼1905室"
    // } = this.props
    const { shipingAddress = {}, navigation } = this.props
    const {
      name = '',
      phone = '',
      province = '',
      city = '',
      county = '',
      address = ''
    } = shipingAddress
    return(
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddressList', {
              // 从订单页到地址管理页意味着将要选择一个收货地址
              actionType: 'selectAddress'
            })
          }}
          style={styles.container}
        >
          {/* 地址图标 */}
          <View style={styles.addressIconContainer}>
            <Image
              source={require('../../../assets/icon/address.png')}
              style={styles.addressIcon}
            />
          </View>
          {/* 地址文本信息 */}
          <View style={styles.addressInfoContainer}>
            <View style={styles.userInfoContianer}>
              <Text style={styles.consigneeText}>
                收货人: {name}
              </Text>
              <Text style={styles.phoneNumberText}>
                {phone}
              </Text>
            </View>
            <View>
              <Text style={styles.addressText}>
                {`${province} ${city} ${county} ${address}`}
              </Text>
            </View>
          </View>
          {/* 右箭头 */}
          <View style={styles.arrowContainer}>
            <Image
              source={require('../../../assets/icon/arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
        {/* 装饰条 */}
        <View>
          <Image
            source={require('../../../assets/icon/mail_decoration.png')}
            style={{width: Layout.window.width, height: 5}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  addressIconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  addressIcon: {
    height: 18,
    width: 18,
  },
  addressInfoContainer: {
    // backgroundColor: '#999',
    flex: 1
  },
  userInfoContianer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  consigneeText: {
    flex: 1,
    color: Color.black,
    fontSize: Font.small
  },
  addressText: {
    color: Color.black,
    fontSize: Font.tiny
  },
  arrowContainer: {
    paddingHorizontal: 5,
    marginRight: 10,
    justifyContent: 'center',
  },
  phoneNumberText: {
    paddingTop: 12,
    color: Color.medium,
    fontSize: Font.tiny
  },
  arrowIcon: {
    width: 24,
    height: 24
  }
})

const mapStateToProps = state => {
  const { globalState } = state
  const { userInfo = {} } = globalState
  return {
    shipingAddress: globalState.shipingAddress,
    userInfo
  }
}

export default connect(mapStateToProps)(OrderAddress)
