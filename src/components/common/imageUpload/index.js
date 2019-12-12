/*
 * Created by Saul at 2018/07/11
 *
 * 图片列表长传
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../constants';
import Toast from '../toast'
import ImagePicker from 'react-native-image-picker'


const options = {
  title: '选择上传方式',
	cancelButtonTitle: '取消',
	chooseFromLibraryButtonTitle: '从图库选择',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

// 如果图片都删除了，则重新标记第一次上传

class ImageUpload extends React.Component {
  state = {
    isLoadingFirstTime: true,
    imgList: [ ],
    imgListWithBase64: [],
    isUploadAgain: false,
  }

  // 删除当前图片
  deleteCurrentImage = (i) => {
    let { imgList } = this.state
    imgList.splice(i, 1)

    this.setState({
      imgList
    })

    // 当用户删除了所有的图片列表，则重置为第一次上传
    if(imgList.length === 0) {
      this.setState({
        isLoadingFirstTime: true,
      })
    }
  }


  uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
			console.log('图片选择响应', response);

			if (response.didCancel) {
				console.log('用户取消图片选择');
			}
			else if (response.error) {
				console.log('图片选择错误', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
        let source = { uri: response.uri };

			// You can also display the image using data:
      // let sourceBase64 = { uri: 'data:image/jpeg;base64,' + response.data };
      let base64 = 'data:image/jpeg;base64,' + response.data
        console.log('=====>>>>>查看base 64 图片数据', source);
      // 暂时只是显示图片，还未确定如何上传给服务器

        let { imgList, imgListWithBase64 } = this.state

        // 将 base64 数据传给上级组件
        this.props.onBase64Upload(base64)

        imgList.push(source)
				this.setState({
          imgList,
          isLoadingFirstTime: false,
				});

			}
		})
  }

  render() {
    return(
      <ScrollView
        style={{
          paddingHorizontal: 20,
        }}
      >
        {
          this.state.isLoadingFirstTime ? (
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: '#DDD',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                width: 100,
                height: 100,
              }}
              onPress={() => {
                this.uploadImage()
              }}
            >
              <Text>
                点击上传图片
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  color: '#777',
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          )
            :
          (
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                // height: 500,
              }}
            >
              {
                this.state.imgList.map((image, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        position: 'relative',
                        width: '33.33333%',
                        padding: 5,
                        backgroundColor: '#DDD',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          height: 15,
                          width: 15,
                          borderRadius: 7.5,
                          backgroundColor: '#333',
                          opacity: 0.7,
                          zIndex: 1,
                        }}
                        onPress={() => {
                          this.deleteCurrentImage(i)
                        }}
                      >
                        <Text style={{ color: Color.white, lineHeight: 15, }}> x </Text>
                      </TouchableOpacity>

                      <Image
                        style={{
                          borderRadius: 4,
                          height: 100,
                          width: '100%',
                        }}
                        source={image}
                      />
                    </View>
                  )
                })
              }
              <TouchableOpacity
                style={{
                  height: 100,
                  width: 100,
                  // backgroundColor: '#DDD',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.uploadImage()
                }}
              >
                <Text
                  style={{
                    color: Color.primary,
                  }}
                >
                  继续添加图片
                </Text>
              </TouchableOpacity>
            </View>
          )

        }
      </ScrollView>
    )
  }
}

export default ImageUpload;

