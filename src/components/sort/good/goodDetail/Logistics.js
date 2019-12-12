/*
 * Created by Saul at 2018/07/12
 *
 * 物流相关
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
import Modal from "react-native-modal";
import AreaLimit from './AreaLimit'


class Logistics extends React.Component {
  state = {
    isVisible: false,
  }

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    // console.log('===========>> propsOf Logistics', this.props)
    const { logistics = {} } = this.props
    return(
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderColor: '#DDD',
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            this.toggleModal()
          }}
        >
          <Text style={{ flex: 1, }}>
            物流服务
          </Text>
          <Image
            style={{
              marginRight: 10,
              height: 14,
              width: 14,
            }}
            source={require('../../../../assets/icon/arrow.png')}
          />
        </TouchableOpacity>
        <Modal
          style={styles.modalContainer}
          isVisible={ this.state.isVisible }
          onBackdropPress={() => {
            this.toggleModal()
          }}
          onBackButtonPress={() => {
            this.setState({
              isVisible: false
            })
          }}
        >
          <View
            style={styles.menuContainer}
          >
            {/* 标题 */}
            <View style={{ marginLeft: 10, paddingVertical: 10,}}>
              <Text style={{ color: Color.primary, fontWeight: 'bold' }}>
                物流支持
              </Text>
            </View>

            {/* 各项单元列表 */}
            <View style={{
              marginLeft: 10,
              paddingVertical: 6,
              flexDirection: 'row',
              paddingRight: 20,
            }}>
              <Text style={{ flex: 1, }}>
                是否支持到付
              </Text>
              <Text style={{ color: Color.primary, }}>
                {
                  logistics.is_to_pay ? '支持' : '不支持'
                }
              </Text>
            </View>

            <View style={{
              marginLeft: 10,
              paddingVertical: 6,
              flexDirection: 'row',
              paddingRight: 20,
            }}>
              <Text style={{ flex: 1, }}>
                是否支持自提
              </Text>
              <Text style={{ color: Color.primary, }}>
                {
                  logistics.is_extract ? '支持' : '不支持'
                }
              </Text>
            </View>
            {/* 区域限售 */}
            {
              logistics.is_limit_area &&
                <AreaLimit
                  areaLimitCodes={logistics.logistics_area}
                />
            }
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'relative',
    paddingTop: 30,
    top: 100,
    margin: 0,
  },
  menuContainer: {
    paddingTop: 20,
    // paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },

})

export default Logistics;
