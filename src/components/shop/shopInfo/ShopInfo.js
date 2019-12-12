/*
 * Created by gyfhml at 18-6-8
 *
 *店铺详情
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, Dimensions
} from 'react-native';
import DefaultPage from '../../common/defaultPage';
import {Layout, Color, Space, Font} from '../../../constants';
import api from "../../../utils/api";
import {List} from 'antd-mobile';
import HTML from 'react-native-render-html'; // 展示HTML内容
export default class ShopInfo extends React.Component {

  render() {
    const shopLogoURL = this.props.data.shop_logo
    if (!this.props.data) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={
                  shopLogoURL === ""
                    ? require('../../../assets/image/logo.png') :
                    {
                      uri: shopLogoURL
                    }
                }
              />
            </View>
            <View>
              <Text style={{fontSize: Font.medium}}>{this.props.data.shop_name}</Text>
              <Text>注册ID {this.props.data.id}</Text>
            </View>
          </View>
          <HTML html={this.props.data.shop_detail}
                imagesMaxWidth={Dimensions.get('window').width}
                ignoredStyles={['display',]}
          />
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>基础信息</Text>
            </View>
            <List>
              <List.Item>
                <View style={styles.item}>
                  <Text>掌柜名</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.shop_name}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>联系人</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.contacts}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>公司名称</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.company}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>所在地</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.address_detail}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>服务电话</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.tel}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>联系电话</Text>
                  <View style={styles.itemContent}>
                    <Text>{this.props.data.phone}</Text>
                  </View>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.item}>
                  <Text>营业执照</Text>
                  <View style={styles.itemContent}>
                    <Image
                      style={styles.business_license_img}
                      source={{uri: this.props.data.business_license_img}}
                    />
                  </View>
                </View>
              </List.Item>
            </List>
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
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 70,
    overflow: 'hidden',
    marginRight: Space.small
  },
  logo: {
    width: 70,
    height: 70
  },
  title: {
    backgroundColor: Color.white,
    padding: Space.small,
  },
  titleText: {
    color: Color.medium
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContent: {
    maxWidth: Layout.window.width - 100,
    flexGrow: 0,
  },
  business_license_img: {
    width: 20,
    height: 20,
  }
})
