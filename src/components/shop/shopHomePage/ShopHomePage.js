/*
 * Created by gyfhml at 2018/06/06
 *
 * 店铺主页，也即供应商主页
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import DefaultPage from '../../common/defaultPage';
import {Layout, Color, Space, Font} from '../../../constants';
import api from "../../../utils/api";
import DynamicList from '../../common/dynamicList';
import ListItem from './listItem';

export default class ShopHomePage extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params || {}
    const supplierId = params.supplier;
    this.state = {
      data: '',
      routerPath: `/item/supplier/${supplierId}`,
      requestParams: null
    }
  }

  getSupplierDetail = async () => {
    try {
      const params = this.props.navigation.state.params || {}
      const supplierId = params.supplier;
      const response = await api.get(`/supplier/${supplierId}`);
      this.setState({
          data: response.data.data
        },
        () => {
          this.getSupplierShopList();
        }
      )
    } catch (error) {
      if (error.data) {
        return Alert.alert(error.data.data.message);
      }
      Alert.alert('网络错误');
    }
  }
  getSupplierShopList = async () => {
    try {
      const params = this.props.navigation.state.params || {}
      const supplierId = params.supplier;
      const classes = params.classes;
      console.log('supplierId', supplierId)
      console.log('classes', classes)
      this.setState({
        requestParams: {classes: classes},
      })

    } catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    this.getSupplierDetail();
  }

  render() {
    console.log('routerPath', this.state.routerPath)
    console.log('requestParams', this.state.requestParams)
    if (!this.state.data) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{width:20,height:20,marginRight:Space.small}}
                  source={require('../../../assets/icon/back_dark.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerRight}
                onPress={() => this.props.navigation.navigate('ShopInfo', {
                data: this.state.data
              })}>
                <View style={styles.logoWrapper}>
                  <Image
                    style={styles.logo}
                    source={
                      this.state.data.shop_logo === ""
                        ? require('../../../assets/image/logo.png') :
                        {
                          uri: this.state.data.shop_logo
                        }
                    }
                  />
                </View>
                <View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize: Font.medium}}>
                      {this.state.data.shop_name}
                    </Text>
                    <Image source={require('../../../assets/icon/forward.png')}
                           style={styles.goShopInfo}
                    />
                  </View>
                  <Text>
                    注册ID {this.state.data.id}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.routerPath ? <DynamicList
                requestParams={this.state.requestParams}
                routerPath={this.state.routerPath}
                renderItem={({item, index}) => {
                  return (
                    <ListItem
                      course={item}
                      index={index}
                    />
                  )
                }}
              /> : null}
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerBtn}
              onPress={() => this.props.navigation.navigate('ShopCategory', {
                data: this.state.data
              })}
            >
              <Text>分类</Text>
            </TouchableOpacity>
            <View style={{width: 1, height: 30, backgroundColor: Color.grey}}></View>
            <TouchableOpacity
              style={styles.footerBtn}
              onPress={() => this.props.navigation.navigate('ShopInfo', {
                data: this.state.data
              })}
            >
              <Text>详情</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: Color.white,
    padding: Space.small,
    marginBottom: Space.tiny
  },
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: Space.small
  },
  logo: {
    width: 70,
    height: 70
  },
  goShopInfo: {
    width:15,
    height:15,
    marginLeft:Space.tiny,
  },
  footer: {
    height: 50,
    backgroundColor: Color.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Layout.window.width,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
