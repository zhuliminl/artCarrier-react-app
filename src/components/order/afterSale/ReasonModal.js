/*
 * Created by Saul at 2018/07/11
 *
 * 申请原因选择
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert,
  Toast,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import Modal from "react-native-modal";


class ReasonModal extends React.Component {
  state = {
    isVisible: false,
    activeIndex: 0,
  }

  toggleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { reasons } = this.props
    return(
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            borderColor: '#DDD',
            borderBottomWidth: 10,
          }}
          onPress={() => {
            this.toggleModal()
          }}
        >
          <Text
            style={{
              flex: 1,
            }}
          >
            原因选择
          </Text>
          <Text
            style={{
              color: Color.primary,
            }}
          >
            {
              this.props.reason === "" ? "请选择......" : this.props.reason
            }
          </Text>
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
            <View
              style={{
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',

                }}
              >
                申请原因
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                paddingBottom: 5,
                borderBottomColor: '#DDD',
                borderBottomWidth: 0.5,
              }}
            >
              <Text
                style={{
                  color: Color.primary,
                }}
              >
                { this.props.serviceType }
              </Text>
            </View>
            {
              reasons.map((reason, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      paddingLeft: 20,
                      paddingVertical: 10,
                    }}
                    key={i}
                    onPress={() => {
                      const { onChooseReason } = this.props
                      onChooseReason(i)
                      this.setState({
                        activeIndex: i
                      })
                    }}
                  >
                    <Text
                      style={{
                        color: this.state.activeIndex === i ? Color.primary : '#666'
                      }}
                    >
                      {reason}
                    </Text>
                  </TouchableOpacity>
                )
              })
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
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
})

export default ReasonModal;
