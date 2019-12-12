/*
 * Created by Saul at 2018/07/19
 *
 * 查看评价
 *
 */

import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import Modal from "react-native-modal";
import api from '../../../utils/api'

class CommentModal extends React.Component {
  state = {
    comments: '',
    commentImgs: [],
  }

  componentDidMount = () => {
    this.fetchComment()
  }

  fetchComment = async () => {
    const { item, orderId } = this.props
    // console.log('=====>>>>>查看评论请求参数', item, orderId);
    try {
      const response = await api.get('/comment/old', {
        params: {
          order_id: orderId,
          item_id: item['item_id'],
          sku_id: item['sku_id'],
        }
      })
      const data = response.data.data
      // console.log('=====>>>>>返回的评论数据', data);
      const imgsRaw = data['img'].split(',')
      const imgs = imgsRaw.map(item => data['baseImgPath'] + '/' + item)

      this.setState({
        comments: data.comments,
        commentImgs: imgs
      },
        () => {
          console.log('=====>>>>>查看评价内容', this.state);
        }
      )

    }catch(error) {
      // console.log('=====>>>>>获取商品评论失败', JSON.parse(JSON.stringify(error)) );
      console.log('=====>>>>>获取商品评论失败', error);
    }
  }

  render() {
    const { item, isComments, index } = this.props
    return(
      <Modal
        style={ styles.modal }
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => {
          this.props.onToggleModal(index);
        }}
        onBackButtonPress={() => {
          this.props.onToggleModal(index);
        }}
      >
        <View style={styles.container}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text>
                  商品评价
                </Text>
              </View>
              {
                isComments === 2 &&
                  <TouchableOpacity
                    onPress={() => {
                      const { navigation, onToggleModal, orderId } = this.props
                      const params = {
                        order_id: orderId,
                        sku_id: item['sku_id'],
                        item_id: item['item_id'],
                        item_name: item['title'],
                        item_sku: item['sku'],
                        item_img: item['img'],
                      }
                      // 追评本来需要自动存入之前的评价数据，但是现在来不及做了
                      navigation.navigate('OrderComment', params)
                      onToggleModal()
                    }}
                  >
                    <Text
                      style={{
                        color: Color.primary,
                        fontSize: 13,
                      }}
                    >
                      追加评价
                    </Text>
                  </TouchableOpacity>
              }
            </View>
            {/* 商品标题 */}
            <View
              style={{
                paddingVertical: 10,
                borderBottomColor: '#DDD',
                borderBottomWidth: 0.5,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: Color.black,
                }}
              >
                {item['title']}
              </Text>
            </View>
            {/* 用户信息和评论内容 */}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
              }}
            >
              {/* 头像，暂时后台未返回头像相关内容 */}
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={ require('../../../assets/icon/anonymous_avatar_grey.png') }
                />
              </View>
              <View
                style={{
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.grey,
                  }}
                >
                  匿名用户
                </Text>
                <Text>
                  {this.state.comments}
                </Text>
              </View>
            </View>
            {/* 评论图片 */}
            {
              this.state.commentImgs.map((img, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      padding: 5,
                    }}
                  >
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                      }}
                      source={{
                        uri: img,
                      }}
                    />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    paddingTop: 30,
    top: 100,
    margin: 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
})


export default CommentModal;
