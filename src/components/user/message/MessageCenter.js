/*
 * Created by gyfhml 2018/05/08
 *
 * 消息中心
 *
 */

import React from 'react';
import Toast from '../../common/toast';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { Button as AntdBtn,Checkbox} from 'antd-mobile';
import DefaultPage from '../../common/defaultPage';
import {
  Color,
  Space,
  GlobalStyle,
  Font
} from '../../../constants';

const CheckboxItem = Checkbox.CheckboxItem;

class MessageCenter extends React.Component {
  constructor(props) {
    super(props);
  }
  readedBtnHandle(){
    Toast.show('标记为已读', Toast.LONG)
  }
  deleteMessageBtnHandle(){
    alert('删除')
  }
  deleteAll(){
    alert(1)
  }
  allRead(){
    alert(2)
  }
  refreshing(){
    let timer =  setTimeout(()=>{
      clearTimeout(timer)
      alert('刷新成功')
    },1500)
  }
  _onload(){
    let timer =  setTimeout(()=>{
      clearTimeout(timer)
      alert('加载成功')
    },1500)
  }
  render() {
    let data = [];
    for (var i = 0; i < 10; i++) {
      data.push({key: i.toString(), content: i + 'content'});
    }
    if(!data || data.length === 0) {
      return (
        <View>
          <DefaultPage message={'暂无消息'} />
        </View>
      )
    }else{
      return(
        <View style={styles.container}>
          <View style={styles.topNav}>
            <View style={styles.topNavItem}>
              <TouchableOpacity onPress={this.allRead}>
                <Text>批量标记已读 <Text style={styles.Unread}>(未读:0)</Text></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.topNavItem}>
              <TouchableOpacity  onPress={this.deleteAll}>
                <Text>批量删除</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList style={styles.messageList}
            ref={(flatList)=>this._flatList = flatList}
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            onRefresh={this.refreshing}
            refreshing={false}
            onEndReachedThreshold={0}
            onEndReached={
              this._onload
            }
            getItemLayout={(data,index)=>(
              {length: 100, offset: (20) * index, index}
            )}
            data={data}>
          </FlatList>
          <Button title='返回顶部' onPress={()=>{
            this._flatList.scrollToOffset({animated: true, offset: 0});
          }}/>
        </View>
      )
    }

  }
  _renderItem = ({item}) => {
    return (
      <View style={styles.messageItem} key={item.id}>
        <View style={styles.messageItemTop}>
          <CheckboxItem >
          </CheckboxItem>
          <Text>2018-06-13</Text>
        </View>
        <View style={styles.messageItemContent}>
          <Text style={styles.messageText}>
            {item.content}我是我是我是我是我是我是我是我是我是我是我是我是
          </Text>
        </View>
        <View style={styles.messageBtns}>
          <AntdBtn style={styles.btn} onClick={this.readedBtnHandle}>
            <Text style={styles.btnText}>已读</Text>
          </AntdBtn>
          <AntdBtn style={styles.btn} onClick={this.deleteMessageBtnHandle }>
            <Text  style={styles.btnText} >删除</Text>
          </AntdBtn>
        </View>
      </View>
    )
  }
  _footer = () => {
    return (
      <View style={styles.message}>
        <Text>没有更多了!!!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   container:{
     paddingBottom:74
   },
   topNav:{
     ...GlobalStyle.tintShadow,
     elevation: 2,
     backgroundColor:Color.white,
     flexDirection:'row',
     flexWrap:'nowrap',
     height:40
   },
   topNavItem:{
     flex:1,
     ...GlobalStyle.center,
     flexDirection:'row',
     flexWrap:'nowrap',
     paddingTop:Space.small,
     paddingBottom:Space.small
   },
   Unread:{
     color:Color.errorBackground
   },
   messageList:{
     backgroundColor:Color.white
   },
   messageItem:{
     marginLeft:Space.tiny,
     marginTop:Space.tiny,
     marginRight:Space.tiny,
     borderWidth:1,
     borderColor:Color.tabIconDefault,
     borderStyle:'solid',
     paddingBottom:Space.small,
     marginBottom:Space.tiny,
     borderRadius:10
   },
   messageItemTop:{
     paddingLeft:Space.tiny,
     borderBottomWidth:1,
     borderColor:Color.tabIconDefault,
     borderStyle:'solid',
     flexWrap:'nowrap',
     flexDirection:'row',
     alignItems:'center'
   },
   messageItemContent:{
     paddingLeft:Space.medium,
     paddingRight:Space.tiny,
     paddingBottom:Space.small,
     paddingTop:Space.small,
   },
   messageText:{
     fontSize:Font.tiny,
     color:Color.medium,
     paddingLeft:Space.small,
     paddingRight:Space.small
   },
   messageBtns:{
     flexDirection:'row',
     flexWrap:'nowrap',
     justifyContent:'flex-end',
     paddingTop:Space.small
   }
   ,message:{
    ...GlobalStyle.center,
    height:30
  },
  btn:{
    height:30,
    borderRadius:20,
    marginLeft:Space.small,
    marginRight:Space.small
  },
  btnText:{
     color:Color.grey,
    fontSize:Font.tiny
  }
})


export default MessageCenter;



