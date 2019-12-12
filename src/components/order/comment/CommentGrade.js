/*
 * Created by Saul at 2018/07/05
 *
 * 店铺评分
 *
 */

import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import Toast from '../../common/toast'

const levelDescs = [ '非常差', '差', '一般', '好', '非常好' ]

class CommentGrade extends React.Component {


  renderStars = (level, praiseType) => {
    // 星星状态列表
    let starsStatusList = levelDescs.map((item, i) => i <= level)
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 20,
        }}
      >
        {
          starsStatusList.map((status, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  paddingHorizontal: 5,
                }}
                onPress={() => {
                  const { onSupplierPraiseLevelChange } = this.props
                  onSupplierPraiseLevelChange(i, praiseType)
                }}
              >
                <Image
                  source={
                    status ?
                        require('../../../assets/icon/order/star_red.png')
                      : require('../../../assets/icon/order/star_grey.png')
                  }
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  renderSupplierPraiseLevel = () => {
    const { supplierPraiseLevel } = this.props

    return Object.keys(supplierPraiseLevel).map((praiseType, i) => {
      let praiseTypeTitle
      switch(praiseType) {
        case 'descMatchLevel':
          praiseTypeTitle =  '描述相符'
          break;
        case 'logisticServiceLevel':
          praiseTypeTitle = '物理服务'
          break;
        case 'serviceAttitude':
          praiseTypeTitle = '服务态度'
          break;
      }

      let level = supplierPraiseLevel[praiseType]

      return (
        <View
          key={i}
          style={{
            paddingLeft: 10,
            paddingVertical: 10,
            flexDirection: 'row',
          }}
        >
          <Text style={{ color: Color.black, }}>
            {praiseTypeTitle}
          </Text>
          {this.renderStars(level, praiseType)}
          <Text>
            { levelDescs[level] }
          </Text>
        </View>
      )
    })

  }

  render() {
    return(
      <View>
        {/* 店铺评分标题 */}
        <View
          style={{
            paddingHorizontal: 10,
            borderTopWidth: 10,
            paddingVertical: 5,
            borderColor: '#DDD',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../../assets/icon/order/shop_grey.png')}
            style={{
              marginRight: 10,
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              color: Color.black,
            }}
          >
            店铺评分
          </Text>
        </View>
        {/* 星星 */}
        {
          this.renderSupplierPraiseLevel()
        }
      </View>
    )
  }
}

export default CommentGrade;

