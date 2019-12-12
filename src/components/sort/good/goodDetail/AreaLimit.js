/*
 * Created by Saul at 2018/07/12
 *
 * 区域限售
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
  Dimensions,
  Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';
import R from 'ramda'


const Areas = ({ areas }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
      }}
    >
      {
        areas.map((area, i) => (
          <View
            key={i}
            style={{
              borderRadius: 2,
              marginHorizontal: 10,
              marginVertical: 10,
              backgroundColor: '#DDD',
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: Color.grey,
                fontSize: 12,
              }}
            >
              { area }
            </Text>
          </View>
        ))
      }
    </View>
  )
}


// 全国省、直辖市级别的 code 散列表映射
const areaCodesMap = {
  10: '北京',
  11: '天津市',
  12: '河北省',
  13: '山西省',
  14: '内蒙古自治区',
  15: '辽宁省',
  16: '吉林省',
  17: '黑龙江省',
  18: '上海市',
  19: '江苏省',
  20: '浙江省',
  21: '安徽省',
  22: '福建省',
  23: '江西省',
  24: '山东省',
  25: '河南省',
  26: '湖北省',
  27: '湖南省',
  28: '广东省',
  // 29: '',
  // 30: '',
  31: '广西省',
  32: '海南省',
  33: '重庆市',
  34: '四川省',
  35: '贵州省',
  36: '云南省',
  37: '西藏自治区',
  38: '陕西省',
  39: '甘肃省',
  40: '青海省',
  41: '宁夏回族自治区',
  42: '新疆维吾尔族自治区',
  43: '台湾省',
  44: '香港特别行政区',
  45: '澳门特别行政区',
}

// 全部省份的数量
const areasLength = Object.keys(areaCodesMap).length


class AreaLimit extends React.Component {
  // 本组件只粗略处理地域限售，不做精细处理
  state = {
    // 可售省份
    sellableAreas: [],
    // 不可售省份
    unSellableAreas: [],
    // 默认不显示可售的省份，而是显示不可售的省份
    showSellable: false,
  }

  componentDidMount = () => {
    // 将所有可售地址过滤到省
    const { areaLimitCodes } = this.props
    const areaLimitCodeListWithRepeats = areaLimitCodes.split(',').map(code => code.slice(0, 2))
    const areaLimitCodeList = R.dropRepeats(areaLimitCodeListWithRepeats)

    // 最终的可售省份
    const areasSellable = R.map(code => areaCodesMap[code])(areaLimitCodeList)

    // 默认显示不可售的省份，只当不可售的省份较多的时候才只显示可售的省份
    const unSellableCount = areasLength - areaLimitCodeList.length

    if(unSellableCount < 10) {
      const allAreas = Object.values(areaCodesMap)
      const unSellableAreas = R.without(areasSellable, allAreas)               // 计算不可售区域

      this.setState({
        unSellableAreas,
        showSellable: false,
      })

    } else {

      this.setState({
        showSellable: true,
        sellableAreas: areasSellable
      })
    }
  }

  render() {
    return(
      <View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: '#DDD',
            marginLeft: 10,
            paddingVertical: 10,
          }}
        >
          <Text>
            区域限售
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text style={{ color: Color.primary, }}>
            { this.state.showSellable ? '可售区域' : '不可售区域' }
          </Text>
        </View>
        {/* 售卖区域列表 */}
        {
          this.state.showSellable
            ? <Areas areas={this.state.sellableAreas} />
            : <Areas areas={this.state.unSellableAreas} />
        }
      </View>
    )
  }
}

export default AreaLimit;
