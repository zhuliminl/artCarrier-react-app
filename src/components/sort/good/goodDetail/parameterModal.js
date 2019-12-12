/*
 * Created by gyfhml at 18-5-16
 *
 * 我的收藏的参数view
 *
 */

import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View,ScrollView} from "react-native";
import Modal from "react-native-modal";
import {Color, Font, Layout, Space} from "../../../../constants/index";

export default class ParameterModal extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({
      isModalVisible: !this.state.isModalVisible ,
      num:0,
    });

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text style={styles.showBtn}>...</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible} style={{margin:0}}>
          <View style={styles.container}>
            <View style={styles.inner}>
              <Text style={styles.title}>
                 产品参数
              </Text>
              <ScrollView style={styles.content}>
                {this.props.itemParameter.map((item, index) => (
                  <View style={styles.paramsterItem} key={item.id.toString()}>
                    <Text style={styles.itemTitle}>{item.parameter_key_val}</Text>
                    <View style={styles.itemDesc}>
                      <Text>{item.parameter_value_val}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={[styles.complete]} onPress={this._toggleModal}>
                <Text style={{color:Color.white}}>完成</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    height:Layout.window.height,
    alignContent:'flex-end',

  },
  inner:{
    marginTop:100,
    paddingLeft:Space.small,
    paddingRight:Space.small,
    backgroundColor:Color.white,
    flexGrow:1,
  },
  title:{
    height:60,
    lineHeight:60,
    textAlign:'center',
    fontSize:Font.medium,
    backgroundColor:Color.white,
    color:Color.black,
  },
  paramsterItem:{
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-between',
    borderStyle:'solid',
    borderColor:Color.tabIconDefault,
    paddingTop:Space.small,
    paddingBottom:Space.small,
    borderBottomWidth:1,
  },
  itemTitle:{
    color:Color.black,
    paddingRight:Space.small,
  },
  itemDesc:{
    flex:1,
    paddingLeft:Space.tiny,
    paddingRight:Space.small,
    overflow:'hidden'
  },
  closeBtn:{
    borderTopWidth:1,
    borderStyle:'solid',
    borderColor:Color.tabIconDefault,
    height:30,
    width:30,
  },
  content:{
    backgroundColor:Color.white,
    height:Layout.window.height-240

  },
  showBtn:{
    fontSize:Font.medium,
    color:Color.grey,
    padding:Space.small,
    lineHeight:10,
    fontSize:Font.medium
  },
  btnWrapper:{
    height:80,
    paddingLeft:Space.small,
    paddingRight:Space.small,
    paddingTop:Space.tiny,
    paddingBottom:Space.tiny,
    flexDirection:'row',
    flexWrap:'nowrap',
    backgroundColor:Color.white,
  },
  complete:{
    flex:1,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Color.primary,
    borderRadius:20,
  },

});