/*
 * Created by gyfhml at 18-5-16
 *
 * 收货地址的修改
 *
 */

import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View,ScrollView,TextInput} from "react-native";
import Modal from "react-native-modal";
import {
  Font, Color, Space, Layout, GlobalStyle
} from '../../../../constants/index';
import { List } from 'antd-mobile';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
export default class ModalTester extends Component {
  render() {
    console.log('this.props.addressArr',this.props.addressArr)
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.toggleModal.bind(this)}
          style={{ marginRight:40}}
        >
          <Text style={styles.showBtn}>...</Text>
        </TouchableOpacity>
        <Modal isVisible={this.props.isModalVisible} style={{margin: 0}}>
          <View style={styles.container}>
            <View>
              <Text style={styles.header}>选择省份地区</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={this.props.toggleModal.bind(this)}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
              <Text style={{color: Color.grey, paddingBottom: Space.tiny}}>
                {this.props.selectAddress.hasOwnProperty('province') ? '已选择' + this.props.selectAddress['province'] :
                  <Text></Text>}
                {this.props.selectAddress.hasOwnProperty('city') ? this.props.selectAddress['city'] : <Text></Text>}
                {this.props.selectAddress.hasOwnProperty('county') ? this.props.selectAddress['county'] : <Text></Text>}
              </Text>
            </View>
            <ScrollableTabView
              page={this.props.currentPage}
              style={{marginTop: 20,}}
              initialPage={0}
              renderTabBar={() => <DefaultTabBar/>}
              onChangeTab={this.props.tabBarHandle}
            >
              <View tabLabel={this.props.province}>
                <ScrollView>
                  <List>
                    {this.props.addressArr.map((item) => {
                      return (
                        <List.Item key={item.code} onClick={this.props.selectCityHandle.bind(this, item)}>
                          <Text> {item.name}</Text>
                        </List.Item>
                      )
                    })}
                  </List>
                </ScrollView>
              </View>
              {this.props.selectAddress.hasOwnProperty('city') && this.props.addressArr.length > 0 ?
                <View tabLabel={this.props.city +' '}>
                  <List>
                    {this.props.addressArr.map((item, index) => {
                      return (
                        <List.Item key={index} onClick={this.props.selectCountyHandle.bind(this, item)}>
                          <Text> {item.name}</Text>
                        </List.Item>
                      )
                    })}
                  </List>
                </View> : null}
              {this.props.selectAddress.hasOwnProperty('county') && this.props.addressArr.length > 0 ?
                <View tabLabel={this.props.county}>
                  <List>
                    {this.props.addressArr.map((item, index) => {
                      return (
                        <List.Item key={index} onClick={this.props.selectedHandle.bind(this, item)}>
                          <Text> {item.name}</Text>
                        </List.Item>
                      )
                    })}
                  </List>
                </View> : null}
            </ScrollableTabView>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    marginTop:150,
    height:Layout.window.height-150,
    alignContent: 'space-between',
    backgroundColor:Color.white,
    padding:Space.tiny,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  },
  header:{
    textAlign:'center',
    paddingTop:Space.small,
    paddingBottom:Space.small,
  },

  text:{
    color:Color.tabIconDefault
  },
  closeBtn:{
    position:'absolute',
    right:5,
    top:5,
    borderWidth:1,
    borderStyle:'solid',
    borderRadius:50,
    borderColor:Color.tabIconDefault,
    width:25,
    height:25,
    ...GlobalStyle.center,
  },
  closeBtnText:{
    marginTop:-5,
  },
  showBtn:{
    fontSize:Font.medium,
    color:Color.grey,
    marginTop:-10,
    alignItems:'center',
    justifyContent:'center',
  },
  address:{
    paddingTop:Space.small,
    paddingBottom:Space.small,
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-around',
    backgroundColor:Color.bg
  },
  closeBtnText:{
    marginTop:1,
    color:Color.grey,
  },
  active:{
    borderStyle:'solid',
    borderColor:Color.primary,
    borderBottomWidth:1,
  }


});