/*
 * Created by Saul at 2018/06/11
 *
 * 物流配送方式
 *
 */

import React from 'react'
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
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import Modal from "react-native-modal";
import CheckBox from '../../common/checkBox'


class LogisticsTypeModal extends React.Component {
  static defaultProps = {
    isModalVisible: false,
    onToggleModal: () => {}
  }

  state = {
    isChecked: true,
  }

  render() {
    return(
      <Modal
        style={ styles.modal }
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => {
          this.props.onToggleModal();
        }}
        onBackButtonPress={() => {
          this.props.onToggleModal();
        }}
      >
        <View style={styles.container}>
          <Text
            style={{
              flex: 1,
            }}
          >
            物流
          </Text>
          <CheckBox
            isChecked={this.state.isChecked}
            onClick={() => {
              this.setState({ isChecked: true})
              // 只提供物流配送

            }}
          />
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
    flexDirection: 'row',
    // paddingLeft: 10,
    height: Layout.window.height - 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
})

export default LogisticsTypeModal;
