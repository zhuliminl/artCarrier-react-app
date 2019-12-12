/*
 * Created by gyfhml at 18-5-16
 *
 * 商品详情的商品规格
 *
 */

import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import {
  Color,
  Font,
  Layout,
  Space
} from "../../../../constants/index";
import Toast from "../../../common/toast";

export default class ModalTester extends Component {
  state = {
    isModalVisible: false

  };
  _toggleModal=()=> {
    let isModalVisible = this.state.isModalVisible;
    this.setState({
      isModalVisible: !isModalVisible
    })
  }
  // 获取规格说明
  getSkuString = (sku) => {
    let toBeSelectedSkuString = '请选择';
    let selectedSkuString = '已选:';
    let selectedSkuArray = [];
    for (let i = 0; i < sku.length; i++) {
      let item = sku[i];
      if (item.selected) {
        selectedSkuArray.push(item);
        let selectedIndex = item.selectedIndex;
        let elementArray = item.values;
        let selectedElement = elementArray[selectedIndex];
        let selectedElementString = selectedElement.value;
        selectedSkuString += ` "${selectedElementString}"`;
      } else {
        toBeSelectedSkuString += ` ${item.type_name}`;
      }
    }
    let skuString = '';
    if (selectedSkuArray.length === sku.length) {
      skuString = selectedSkuString;
    } else {
      skuString = toBeSelectedSkuString;
    }
    return skuString;
  }


  getCartHandle = () => {
    if (this.props.skuData.sku.length === 0) {
      Toast.show('添加成功！', Toast.LONG);
      this.props.getCartIng();
      this._toggleModal();
    } else if (this.props.selectFlag) {
       Toast.show('添加成功！', Toast.LONG);
     this.props.getCartIng();
      this._toggleModal();
    } else {
      Alert.alert('请选择商品属性')
    }
  }
  render() {
    if (this.props.skuData) {
      let {sku} = this.props.skuData;
      let skuString = this.getSkuString(sku);
      const goodImage = this.props.skuData.main_images.split(',')[0]
      return (
        <View>
          <TouchableOpacity onPress={this._toggleModal}>
            <Text
              style={[styles.showBtn, this.props.text === '加入购物车' || this.props.text === '立即购买' ? styles.shopCar : '']}>
              {this.props.text}
            </Text>
          </TouchableOpacity>
          <Modal isVisible={this.state.isModalVisible} style={{margin: 0}}>
            <View style={styles.container}>
              <View style={styles.inner}>
                <View style={styles.top}>
                  <Image
                    style={styles.goodsImage}
                    source={
                      goodImage === "" ?  require('../../../../assets/image/logo.png')
                        : { uri: goodImage }
                    }
                  />
                  <View style={styles.topRight}>
                    <View>
                      <Text style={styles.price}>￥ {this.props.skuData.current_price}</Text>
                      <Text style={styles.text}>库存{this.props.skuData.sum_stock}件</Text>
                      <Text style={styles.text}>{skuString}</Text>
                    </View>
                    <TouchableOpacity style={styles.closeBtn} onPress={this._toggleModal}>
                      <Text style={{fontSize: 10,}}>关闭</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                <ScrollView style={styles.content}>
                  {this.props.skuData.sku.map((item, id) => {
                    return (
                      <View key={item.id.toString()}>
                        <Text style={styles.classTitle}>
                          {item.type_name}
                        </Text>
                        <View style={styles.classItems}>
                          {item.values.map((valuesItem, index) => {
                            return (
                              <TouchableOpacity key={index} onPress={() => {
                                this.props.selectHandle(id, index)
                              }}>
                                <Text style={[styles.classItem,
                                  valuesItem.selectable ? ((valuesItem.selected) === true ? styles.active : '') : styles.disable]}>
                                  {valuesItem.value}
                                </Text>
                              </TouchableOpacity>
                            )
                          })}
                        </View>
                      </View>
                    )
                  })}

                  <View style={styles.buy}>
                    <Text>购买数量</Text>
                    <View style={styles.buyInput}>
                      <TouchableOpacity onPress={this.props.reduceHandle}>
                        <Text style={styles.buyBtn}>-</Text>
                      </TouchableOpacity>
                      <Text style={[styles.buyBtn, styles.num]}>{this.props.num}</Text>
                      <TouchableOpacity onPress={this.props.addHandle}>
                        <Text style={styles.buyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View style={styles.buyWrapper}>
                {/*点击加入购物车显示的按钮状态*/}
                {
                  this.props.text !== '立即购买' && this.props.text !== '...' ?
                    <TouchableOpacity
                      style={[styles.btnIng, styles.Cart, this.props.text !== '立即购买' ? styles.borderRadiusRight : '']}
                      onPress={() => this.getCartHandle()}
                    >
                      <Text style={{color: Color.white}}>加入购物车</Text>
                    </TouchableOpacity> : null
                }

                {/*点击立即购买显示的按钮状态*/}
                {
                  this.props.text !== '加入购物车' && this.props.text !== '...' ?
                    <TouchableOpacity
                      style={[styles.btnIng, styles.Cart, this.props.text !== '加入购物车' ? styles.borderRadiusRight : '']}
                      onPress={() => this.getCartHandle()}
                    >
                      <Text style={{color: Color.white}}>加入购物车</Text>
                    </TouchableOpacity> : null
                }

                {/*
                  this.props.text !== '加入购物车' && this.props.text !== '...' ?
                    <TouchableOpacity
                      style={[styles.btnIng, styles.buyIng, this.props.text !== '加入购物车' ? styles.borderRadiusLeft : '']}
                      onPress={this.props.BuyHandle}
                    >
                      <Text style={{color: Color.white}}>立即购买</Text>
                    </TouchableOpacity> : null
                */}

                {/*点击规格显示的按钮状态*/}
                {this.props.text === '...' ? <TouchableOpacity
                  style={[styles.btnIng, styles.Cart]}
                  onPress={this.getCartHandle}
                >
                  <Text style={{color: Color.white}}>加入购物车</Text>
                </TouchableOpacity>:null}
                {this.props.text === '...' ? <TouchableOpacity
                  style={[styles.btnIng, styles.buyIng]}
                  onPress={this.props.BuyHandle}
                >
                  <Text style={{color: Color.white}}>立即购买</Text>
                </TouchableOpacity>:null}
              </View>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <View></View>
      )
    }

  }
}


const styles = StyleSheet.create({
  container: {
    height: Layout.window.height,
    alignContent: 'flex-end',
  },
  inner: {
    marginTop: 100,
    flexGrow: 1,
  },
  top: {
    height: 120,
    flexDirection: 'row',
    alignContent: 'space-around',
    borderTopWidth: 10,
    borderTopColor: 'rgba(0,0,0,0)',
    borderStyle: 'solid',
  },
  goodsImage: {
    position: 'absolute',
    top: 0,
    left: Space.small,
    zIndex: 9999,
    width: 120,
    height: 120,
    borderRadius: 5,
    transform: [{translateY: -10}]
  },
  topRight: {
    flexGrow: 1,
    height: 120,
    paddingLeft: 135,
    paddingTop: Space.tiny,
    paddingRight: Space.tiny,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  price: {
    color: Color.primary,
    fontSize: Font.medium,
    flex: 1,
  },
  text: {
    color: Color.black,
    flex: 1,
  },
  closeBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.tabIconDefault,
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    paddingLeft: Space.small,
    paddingRight: Space.small,
    paddingTop: Space.small,
    backgroundColor: Color.white,
  },
  classTitle: {
    fontSize: Font.small,
    color: Color.black,
    paddingBottom: Space.small
  },
  classItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingBottom: Space.small
  },
  classItem: {
    borderRadius: 10,
    backgroundColor: Color.bg,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: Space.tiny,
    color: Color.black,
  },
  active: {
    backgroundColor: Color.primary,
    color: Color.white,
  },
  disable: {
    color: Color.grey
  },
  buy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: Space.small,
    borderStyle: 'solid',
    borderColor: Color.bg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  buyInput: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 200,
    justifyContent: 'flex-end',
  },
  buyBtn: {
    width: 40,
    height: 30,
    lineHeight: 30,
    backgroundColor: Color.grey,
    textAlign: 'center',
    alignItems: 'center'

  },
  num: {
    backgroundColor: Color.white,
    marginRight: Space.small,
    marginLeft: Space.small,
  },
  showBtn: {
    fontSize: Font.medium,
    color: Color.grey,
    padding: Space.small,
    lineHeight: 10,
    fontSize: Font.medium
  },
  buyWrapper: {
    height: 80,
    paddingLeft: Space.small,
    paddingRight: Space.small,
    paddingTop: Space.tiny,
    paddingBottom: Space.tiny,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: Color.white,
  },
  btnIng: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Cart: {
    backgroundColor: Color.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

  },
  buyIng: {
    backgroundColor: Color.primary,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  shopCar: {
    color: Color.white,
    fontSize: 14,
    marginTop: 8
  },
  borderRadiusRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  }
});
