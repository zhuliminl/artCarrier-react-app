/*
 * Created by gyfhml at 18-5-16
 *
 * 我的收藏
 *
 */

import React, { Component } from "react";
import {StyleSheet, Text, TouchableOpacity, View,Image} from "react-native";
import Modal from "react-native-modal";
import {Color, Font, GlobalStyle, Layout, Space} from "../../../constants";

export default class ModalTester extends Component {
  state = {
    isModalVisible: false,
    toggle:true
  };
  //切换模态框的显示隐藏并根据用户选择收藏或取消删除条数
  _toggleModal(id){
    this.setState({ isModalVisible: !this.state.isModalVisible },()=>{
        if(this.state.toggle==false){
          this.props.cancelCollection(id)
        }
      }
    );
  }
  toggleCollecHandle(){
    this.setState({ toggle: !this.state.toggle});
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._toggleModal.bind(this)}>
          <Text style={styles.showBtn}>...</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible} style={{margin:0}}>
          <View style={styles.container}>
            <View style={styles.lists}>
              <View style={styles.item}>
                <View style={styles.imgWrapper}>
                  <Image style={styles.collectionImg}
                         source={require('../../../assets/image/select.png')}/>
                </View>
                <Text style={styles.text}>找相似</Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity style={styles.imgWrapper}
                                  onPress={this.toggleCollecHandle.bind(this)}>
                  {console.log(this.state.toggle)}
                  <Image style={styles.collectionImg}
                         source={this.state.toggle ?require('../../../assets/image/collection.png'):require('../../../assets/image/nocollection.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>{this.state.toggle?'取消收藏':'收藏'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={this._toggleModal.bind(this,this.props.itemId)}>
              <Text style={styles.closeBtnText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    marginTop:Layout.window.height/3*2,
    height:Layout.window.height/3,
    alignContent: 'space-between',
    backgroundColor:Color.white
  },
  lists:{
    height:Layout.window.height/3-60,
    flexDirection:'row',
    alignContent:'space-around',
  },
  item:{
    flex:1,
    ...GlobalStyle.center,
  },
  imgWrapper:{
    width:80,
    height:80,
    borderColor:Color.tabIconDefault,
    borderStyle:'solid',
    borderWidth:1,
    borderRadius:40,
    ...GlobalStyle.center,
    marginBottom:Space.small
  },
  collectionImg:{
    width:30,
    height:30,
  },
  text:{
    color:Color.tabIconDefault
  },
  closeBtn:{
    borderTopWidth:1,
    borderStyle:'solid',
    borderColor:Color.tabIconDefault,
    height:60,
    ...GlobalStyle.center,
  },
  closeBtnText:{
    marginTop:-5,
  },
  showBtn:{
    fontSize:Font.medium,
    color:Color.grey,
  }
});