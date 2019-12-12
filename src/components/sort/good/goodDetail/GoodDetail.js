/*
 * Created by gyhml at 18-5-18
 *
 * 商品详情
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions, Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';
import ModalTester from './skumModal';
import HTML from 'react-native-render-html'; // 展示HTML内容
import api from "../../../../utils/api";
import ParameterModal from "./parameterModal";
import AntCarousel from './antCarousel'
import Toast from '../../../common/toast'
import { addToCart } from '../../../cart/reducer/actions'
import TopBarNav from '../../../common/topBarNav'
import DetailContent from './DetailContent'

import Coupon from './Coupon'
import Point from './Point'
import Logistics from './Logistics'
import Summary from './Summary'

const Comment = () => {
  return (
    <View>
      <Text>
        评论
      </Text>
    </View>
  )
}


class GoodDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      itemPrimaryId: '',
      main_images: [],
      current_price: '',
      old_price: '',
      title: '',
      item_id: "",
      main_images: [],
      details: '<div></div>',
      itemParameter: [],
      skuData: '',
      sum_stock: 0,
      selectFlag: false,//购买条件 属性全选中才能下单
      num: 1,//购买数量
      supplier:'',
      selectedItem:{},//全选后的商品信息
      isModalVisible: false,//模态框的显示与隐藏

      // 基础模板信息
      templateBase: {},
      // 物流规则
      logistics: {},
      // 部分展示信息
      // 基础销量
      baseSale: 0,
      // 基础点赞数
      baseLike: 0,
      // 是否被当前用户喜欢
      isCollection: 0,


      // 积分规则
      // pointInfo: {},
      // 优惠券规则
      // couponInfo: {},
    }
  }

  // 处理规格选中事件
  selectHandle = (skuIndex, elementIndex) => {
    let skuData = this.state.skuData;
    let skuArray = skuData.sku; // 规格数组
    let itemArray = this.state.skuData.itemSku; // 商品数组
    let currentSku = skuArray[skuIndex]; // 当前选中规格
    let currentElementArray = currentSku.values; // 当前选中单元列表
    let currentElement = currentElementArray[elementIndex]; // 当前选中单元
    if (!currentElement.selectable) { // 不可选不做处理
      return
    }
    currentElement.selected = !currentElement.selected;
    if (currentElement.selected) {
      // 当前规格中选中的单元index
      currentSku.selectedIndex = elementIndex;
      currentSku.selected = true;
      // 其他单元为未选中状态
      for (let i = 0; i < currentElementArray.length; i++) {
        if (i != elementIndex) {
          currentElementArray[i].selected = false;
        }
      }
    } else {
      // 当前规格中没有选中的单元index
      currentSku.selectedIndex = null;
      currentSku.selected = false;
    }
    // 确定规格单元是否可选状态
    for (let i = 0; i < skuArray.length; i++) {
      let sku = skuArray[i];
      // 获取其他规格中被选中的单元列表
      let otherSelectedArray = [];
      for (let j = 0; j < skuArray.length; j++) {
        let sku = skuArray[j];
        if (sku.selected && j !== i) {
          let selectedIndex = sku.selectedIndex;
          let elementArray = sku.values;
          otherSelectedArray.push(elementArray[selectedIndex].value);
        }
      }

      let elementArray = sku.values;
      // 遍历商品列表
      for (let j = 0; j < elementArray.length; j++) {
        let element = elementArray[j];
        let elementName = element.value;
        for (let k = 0; k < itemArray.length; k++) {
          let item = itemArray[k];
          let regex = this.getRegex(elementName);
          // 判断是否在商品规格详情中
          let inDescription = regex.test(item.description);
          for (let m = 0; m < otherSelectedArray.length; m++) {
            let selectedRegex = this.getRegex(otherSelectedArray[m]);
            inDescription = inDescription && selectedRegex.test(item.description);
          }
          if (inDescription && item.stock > 0) {
            element.selectable = true;
            //skuData.main_images = item.images; // 设置商品预览图
            break;
          } else {
            element.selectable = false;
          }
        }
      }
    }
    // 获取已选的单元列表
    let selectedElementArray = [];
    for (let i = 0; i < skuArray.length; i++) {
      let sku = skuArray[i];
      if (sku.selected) {
        let selectedIndex = sku.selectedIndex;
        let elementArray = sku.values;
        selectedElementArray.push(elementArray[selectedIndex].value);
      }
    }
    let selectedItem={};
    let selectFlag=false;
    // 所有规格都选中时，确定预览图片、价格、库存
    if (selectedElementArray.length === skuArray.length) {

      for (let i = 0; i < itemArray.length; i++) {
        let item = itemArray[i];
        let inDescription = true;
        for (let j = 0; j < selectedElementArray.length; j++) {
          let regex = this.getRegex(selectedElementArray[j]);
          inDescription = inDescription && regex.test(item.description);
        }
        if (inDescription) {
          skuData.current_price = item.current_price;
          //skuData.main_images = item.images;
          skuData.sum_stock = item.stock;
          selectedItem=item;
          break;
        }
      }
      selectFlag=true;
    } else {
      skuData.current_price = this.state.current_price;
      skuData.sum_stock = this.state.sum_stock;
    }
    this.setState({
      skuData,
      selectFlag,
      selectedItem
    });
  }

  // 获取匹配的正则表达式
  getRegex = (str) => {
    // /^黄色$|^黄色,|,黄色,|,黄色$/
    return new RegExp(`^${str}$|^${str},|,${str},|,${str}$`);
  }
  //购买数量的减减
  reduceHandle = () => {
    if (this.state.skuData.sku.length === 0) {
      this.setState({
        num: Math.max(--this.state.num, 1)
      })
    }else if (this.state.selectFlag) {
      this.setState({
        num: Math.max(--this.state.num, 1)
      })
    } else {
      Alert.alert('请选择商品属性')
    }

  }
  addHandle = () => {
    // console.log('this.state.skuData.sku.length',this.state.skuData.sku.length)
    // console.log('this.state.flag',this.state.flag)
    if (this.state.skuData.sku.length === 0) {
      this.setState({
        num: Math.min(++this.state.num, this.state.skuData.sum_stock)
      })
    }else if (this.state.selectFlag) {
      this.setState({
        num: Math.min(++this.state.num, this.state.skuData.sum_stock)
      })

    }else {
      Alert.alert('请选择商品属性')
    }

  }
  //立即购买
  BuyHandle = () => {

    /**
    if (this.state.skuData.sku.length === 0) {
      Alert.alert('立即购买')
    } else if (this.state.flag) {
      Alert.alert('立即购买')
    } else {
      Alert.alert('请选择商品属性')
    }
    */
  }
  //添加购物车
  getCartIng=()=>{
    let skuData = this.state.skuData;
    let selectedItem = this.state.selectedItem;
    // console.log('=====>>>>>goodDetail state', this.state);

    console.log('=====>>>>>加入购物车', {
        isChecked: false,
        supplier: this.state.supplierName,
        // 这里语义有干扰
        supplierId: this.state.supplier,
        skuId: selectedItem.sku_id,
        img: skuData.main_images,
        desc: selectedItem.description,
        itemId: selectedItem.item_id,
        title: this.state.title,
        price: skuData.current_price,
        amount: this.state.num,
        itemPrimaryId: this.state.selectedItem.id,

    });

    console.log('=====>>>>>查看 sku', this.state.selectedItem);
    // 模拟加入购物车
    this.props.dispatch(
      addToCart({
        isChecked: false,
        // supplier: this.state.supplier,
        supplier: this.state.supplierName,
        // 这里语义有干扰
        supplierId: this.state.supplier,
        skuId: selectedItem.sku_id,
        img: skuData.main_images.split(',')[0],
        desc: selectedItem.description,
        itemId: selectedItem.item_id,

        // 商品主键
        itemPrimaryId: this.state.itemPrimaryId,

        title: this.state.title,
        price: skuData.current_price,
        amount: this.state.num,

        // 由于确认订单页面需要前端根据物流模板和基础模板，计算订单的小结值
        // 所以不可避免地，要附带上 物流模板和基础模板的信息 到购物车的产品单元项中,
        // 并传递给订单确认页面以作为计算的依据
        logistics: this.state.logistics,
        templateBase: this.state.templateBase,
      })
    )
  }

  // 添加商品足迹
  addToTrack = async (item) => {
    try {
      await api.post('/track', {
        item_id: item.itemId,
        item_img: item.itemImg,
        item_name: item.itemName,
        item_price: item.itemPrice
      })
    } catch(error) {
      console.log('=====>>>>>添加足迹失败', error);
    }
  }


  componentDidMount = async () => {
    console.log(this.props.goodId)
    try {
      const response = await api.get(`/item/${this.props.goodId}`);
      const itemSku = response.data.item.item_sku;
      const data = response.data.item || {};
      let {
        id,
        item_id,
        main_images,
        current_price,
        old_price,
        title,
        sum_stock,
        item_parameter,
        sku,
        details,
        supplier,
        templateBase,
        logistics,
        base_sale,
        base_like,
      } = data;
      const supplierName = data.supplierInfo.name
      // 后端返回格式不规范，后期要改过来
      let isCollection = response.data.isCollection || 0


      // 添加商品足迹
      this.addToTrack({
        itemId: item_id,
        itemImg: main_images.split(',')[0],
        itemName: title,
        itemPrice: current_price,

      })


      /*处理数据规格values数据格式成数组包对象
       sku[k].values=[{selected:false,selectable:true,value:'string'},{{selected:false,selectable:true,value:'string'}}]
      * */
      var arr = [];
      for (var i = 0; i < sku.length; i++) {
        var valuesArr = [];
        //sku[i].values 把字符串处理成数组
        for (var j = 0; j < sku[i].values.split(',').length; j++) {
          var obj = {
            selected: false,
            value: sku[i].values.split(',')[j]
          }
          for (var k = 0; k < itemSku.length; k++) {
            let skuValue = sku[i].values.split(',')[j];
            let regex = this.getRegex(skuValue);
            if ((itemSku[k].description.search(regex)) != -1) {
              if (itemSku[k].stock > 0) {
                obj.selectable = true;
                break;
              } else {
                obj.selectable = false
              }
            } else {
              obj.selectable = false
            }
          }
          valuesArr.push(obj)
        }
        arr.push(valuesArr)
      }
      for (var k = 0; k < sku.length; k++) {
        sku[k].values = arr[k]
      }
      // 如果后台是默认的商品规格，则意味着用户不需要选择。系统自动选择默认的规格
      const isDefaultDescription = itemSku.length === 1
      let selectedItem = {}
      if(isDefaultDescription) {
        selectedItem = itemSku[0]
      }
      var skuData = {
        itemSku,
        current_price,
        sum_stock,
        main_images,
        sku,
      }
      this.setState({
        itemPrimaryId: id,
        item_id,
        main_images: main_images.split(','),
        current_price,
        old_price,
        title,
        itemParameter:item_parameter,
        skuData: skuData,
        details,
        sum_stock,
        supplier,
        supplierName,
        selectedItem,
        // 基础模板信息
        templateBase,
        // 物流模板信息
        logistics,
        // 基础销量、基础点赞、是否被当前用户喜欢
        baseSale: base_sale,
        baseLike: base_like,
        isCollection,
      });

    } catch (error) {
      console.log('error trigger', error)
      if (error.data) {
        // 处理业务请求错误
        return Alert.alert('请求错误')
      }
      Alert.alert('网络错误')
    }
  }

  render() {
    // console.log('=====>>>>>查看订单详情的 state', this.state)
    return (
      <View style={styles.container}>
        <ScrollView>
          <AntCarousel main_images={this.state.main_images}/>
          {/*
          <View style={[styles.desc, styles.item]}>
            <View style={styles.price}>
              <View style={styles.nowPrice}>
                <Text style={{color: Color.primary}}>￥<Text
                  style={styles.priceNum}>{this.state.current_price}</Text></Text>
                <Text style={styles.Discount}>开学季</Text>
                <Text style={styles.Discount}>淘宝币抵2%</Text>
              </View>
              <View>
                <Text style={styles.text}>价格
                  <Text style={styles.old_price}>{this.state.old_price}</Text>
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>{this.state.title}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.text}>快递：免运费</Text>
              <Text style={styles.text}>月销0笔</Text>
              <Text style={styles.text}>广东深圳</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemStrip}>
              <Text style={styles.itemStripTitle}>领卷</Text>
              <View style={styles.itemStripDesc}>
                <View style={styles.itemStripDescInner}>
                  <Text>店铺优惠卷</Text>
                  <Text>满298元减10 元，满298元减10 元</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemStrip}>
              <Text style={styles.itemStripTitle}>促销</Text>
              <View style={styles.itemStripDesc}>
                <View style={styles.itemStripDescInner}>
                  <Text>订单险 订单险订单险订单险</Text>
                </View>
              </View>
            </View>
          </View>

            <View style={styles.itemStrip}>
              <Text style={styles.itemStripTitle}>服务</Text>
              <View style={styles.itemStripDesc}>
                <View style={styles.itemStripDescInner}>
                  <Text>订单险 订单险订单险订单险</Text>
                </View>
              </View>
            </View>
              */}
          {/* 商品简略 */}
          <Summary
            item={{
              currentPrice: this.state.current_price,
              oldPrice: this.state.old_price,
              title: this.state.title,
              baseLike: this.state.baseLike,
              baseSale: this.state.baseSale,
              sumStock: this.state.sum_stock,
              supplier: this.state.supplier,
            }}
            isShowSales={ this.state.templateBase.is_show_sales }
          />
          <View style={styles.item}>
            <View style={styles.itemStrip}>
              <Text style={styles.itemStripTitle}>规格</Text>
              <View style={styles.itemStripDesc}>
                <View style={styles.itemStripDescInner}>
                  <Text>{this.state.skuData ? this.state.skuData.sku.map((item) => {
                    return (<Text key={item.id.toString()}>{item.type_name}</Text>)
                  }) : ''}</Text>
                </View>
              </View>
              <ModalTester
                skuData={this.state.skuData}
                selectHandle={this.selectHandle}
                reduceHandle={this.reduceHandle}
                addHandle={this.addHandle}
                num={this.state.num}
                BuyHandle={this.BuyHandle}
                getCartHandle={this.getCartHandle}
                text='...'
                getCartIng={this.getCartIng}
                selectFlag={this.state.selectFlag}
              />
            </View>
            <View style={styles.itemStrip}>
              <Text style={styles.itemStripTitle}>参数</Text>
              <View style={styles.itemStripDesc}>
                <View style={styles.itemStripDescInner}>
                  <Text>
                    {
                      this.state.itemParameter ?
                        this.state.itemParameter
                          .slice(0, 2).map(item => item.parameter_key_val).join('') + "..."
                        : ''
                    }
                  </Text>
                </View>
              </View>
              <ParameterModal itemParameter={this.state.itemParameter}/>
            </View>
            {/* 物流相关 */}
            <Logistics logistics={this.state.logistics} />
            {/* 是否包邮 */}
            {
              this.state.logistics.is_full_cost && (
                <View style={{ paddingBottom: 5, }}>
                  <Text>
                    满 { this.state.logistics.full_cost }￥ 包邮
                  </Text>
                </View>
              )
            }
            {/* 优惠券相关 */}
            <Coupon templateBase={this.state.templateBase}/>
            {/* 积分相关 */}
            <Point templateBase={this.state.templateBase}/>
          </View>
          {/* 详情和评价 */}
          <TopBarNav
            routeStack={[
              {
                label: '详情',
                title: 'DetailContent'
              },
              // 暂时不做评价
              /*
              {
                label: '评价',
                title: 'Comment'
              },
              */
            ]}
            renderScene={(route, i) => {
              // let Routes = { DetailContent, Comment }
              let Routes = { DetailContent }
              let Component = Routes[route.title];
              return (
                <Component
                  navigation={ this.props.navigation }
                  index={i}
                  data={{
                    detailRTF: this.state.details,
                    // courseChapterList
                  }}
                />
              )
            }}
            headerStyle={ [styles.headerStyle, { paddingTop: 20 }] }
            labelStyle={styles.labelStyle}
            underlineStyle={styles.underlineStyle}
            imageStyle={styles.imageStyle}
            sidePadding={40}
            inactiveOpacity={1}
            fadeLabels={false}
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.shopIconWrapper}
            onPress={() => this.props.navigation.navigate('ShopHomePage',{
              supplier:this.state.supplier
            })}
          >
            <Image
              style={styles.shopIcon}
              source={require('../../../../assets/icon/shop/shop.png')}
            />
            <Text>店铺</Text>
          </TouchableOpacity>
          <View style={styles.buyWrapper}>
            <TouchableOpacity style={[styles.btnIng, styles.Cart]}>
              <ModalTester
                skuData={this.state.skuData}
                selectHandle={this.selectHandle}
                reduceHandle={this.reduceHandle}
                addHandle={this.addHandle}
                num={this.state.num}
                BuyHandle={this.BuyHandle}
                getCartHandle={this.getCartHandle}
                text='加入购物车'
                getCartIng={this.getCartIng}
                selectFlag={this.state.selectFlag}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnIng, styles.buyIng]}>
              <ModalTester
                skuData={this.state.skuData}
                selectHandle={this.selectHandle}
                reduceHandle={this.reduceHandle}
                addHandle={this.addHandle}
                num={this.state.num}
                BuyHandle={this.BuyHandle}
                getCartHandle={this.getCartHandle}
                text='立即购买'
                getCartIng={this.getCartIng}
                selectFlag={this.state.selectFlag}
              />
            </TouchableOpacity>
            {/*
            <TouchableOpacity style={[styles.btnIng, styles.buyIng]}>
              <ModalTester
                skuData={this.state.skuData}
                selectHandle={this.selectHandle}
                reduceHandle={this.reduceHandle}
                addHandle={this.addHandle}
                num={this.state.num}
                BuyHandle={this.BuyHandle}
                getCartHandle={this.getCartHandle}
                text='立即购买'
                getCartIng={this.getCartIng}
                selectFlag={this.state.selectFlag}
              />
            </TouchableOpacity>
                */}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nowPrice: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceNum: {
    fontSize: Font.medium,
    color: Color.primary,

  },
  old_price: {
    textDecorationColor: Color.grey,
    textDecorationLine: 'line-through'
  },
  Discount: {
    fontSize: Font.tiny,
    color: Color.primary,
    borderRadius: 10,
    backgroundColor: Color.secondary,
    marginLeft: Space.small,
    paddingLeft: Space.tiny,
    paddingRight: Space.tiny
  },
  title: {
    fontSize: Font.small,
    color: Color.black,
    paddingTop: Space.small,
    paddingBottom: Space.small

  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    marginBottom: Space.tiny,
    backgroundColor: Color.white,
    padding: Space.small
  },
  text: {
    color: Color.grey,
    fontSize: Font.tiny
  },
  itemStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Space.small,

  },
  itemStripTitle: {
    paddingRight: Space.small,
    color: Color.black,

  },
  itemStripDesc: {
    flexGrow: 1,
  },
  itemStripDescInner: {
    width: 160,
    height: 20,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
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
  },
  buyWrapper: {
    height: 50,
    paddingLeft: Space.small,
    paddingRight: Space.small,
    paddingTop: Space.tiny,
    paddingBottom: Space.tiny,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 1,
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
  shopIconWrapper: {
    width: 50,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
  },
  shopIcon: {
    width: 20,
    height: 20,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.primary
  },
  underlineStyle: {
    height: 1,
    backgroundColor: Color.primary
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  headerStyle: {
    borderBottomWidth: 0,
    borderColor: Color.white,
    backgroundColor: Color.white
  },

})

export default connect(null)(GoodDetail)
