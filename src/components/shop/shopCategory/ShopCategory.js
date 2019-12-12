/*
 * Created by gyfhml at 18-6-8
 *
 * 供货商商品分类
 *
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import DefaultPage from '../../common/defaultPage';
import {Layout, Color, Space, Font} from '../../../constants';
import api from "../../../utils/api";
import {List} from 'antd-mobile';

export default class ShopCategory extends React.Component {
  state = {
    classes: ''
  }
  getData = async (id, flag) => {
    try {
      const response = await api.get('/classes', {
        params: {
          type: 'item',
          id: id,
          supplier_id: this.props.data.id,
        }
      });
      const data = response.data.data;
      switch (flag) {
        case 0:
          for (var i in data){
            data[i].showIcon=true;
          }
          this.setState({
            classes: data
          });
          break;
        case 1:
          if (data.length === 0) {
            this.goShopCategory(id);
            return;
          }
          var classes=this.state.classes;
          for (var i = 0; i < classes.length; i++) {
            delete classes[i].childClasses;
            for (var j = 0; j < data.length; j++) {
              if (classes[i].id === data[j].pid) {
                classes[i].showIcon=false;
                for (var k in data){
                  data[k].showIcon=true
                }
                classes[i].childClasses=data;
              }
            }
          }
          this.setState({
            classes
          });

          break;
        case 2:
          if (data.length === 0) {
            this.goShopCategory(id);
            return;
          }
          var classes=this.state.classes;
          for (var i = 0; i < classes.length; i++) {
            if(classes[i].hasOwnProperty('childClasses')){
              for (var j = 0; j < classes[i].childClasses.length; j++) {
                delete classes[i].childClasses[j].GrandsonClasses;
                classes[i].childClasses[j].showIcon=true;
                for (var k = 0; k < data.length; k++) {
                  if (classes[i].childClasses[j].id === data[k].pid) {
                    classes[i].childClasses[j].GrandsonClasses=data;
                    console.log(classes)
                    classes[i].childClasses[j].showIcon=false;
                  }
                }
              }
            }
          }
          this.setState({
            classes
          });
          break;
      }



    } catch (error) {
      console.log('error', error)
      if (error.data) {
        console.log('error.data', error.data)
        return Alert.alert(error.data.data.message);
      }
      Alert.alert('网络错误');
    }
  }

  componentDidMount() {
    this.getData(0, 0);
  }

  getChildClasses = (id) => {
    this.getData(id, 1);
  }
  getGrandsonClasses = (id) => {
    this.getData(id, 2);
  }
  goShopCategory= (classId)=>{
    console.log('id',classId);
    console.log('this.state.classes',this.state.classes);
    console.log('this.props.data',this.props.data)
    this.props.navigation.navigate('ShopHomePage', {
      supplier:this.props.data.id,
      classes: classId
    });

  }
  render() {
    if (!this.state.classes || this.state.classes.length === 0) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={{uri: this.props.data.shop_logo}}
              />
            </View>
            <View>
              <Text style={{fontSize: Font.medium}}>{this.props.data.shop_name}</Text>
              <Text>
                注册ID {this.props.data.id}
              </Text>
            </View>
          </View>
          <View style={{paddingLeft:Space.small}}>
            <Text style={{fontSize:Font.small}}>所有宝贝</Text>
          </View>
          <ScrollView style={{marginTop: 10, marginBottom: 10}}>
            <List>
              {this.state.classes ? this.state.classes.map((classesItem) => {
                return (
                  <List.Item arrow={classesItem.showIcon === true ? 'horizontal' : 'empty'}
                             key={classesItem.id}
                             onClick={this.getChildClasses.bind(this, classesItem.id)}
                  >
                    {classesItem.name}
                    {classesItem.childClasses ? <List>
                      {classesItem.childClasses ? classesItem.childClasses.map((childClassesItem) => {
                        return (
                          <List.Item
                            arrow={childClassesItem.showIcon === true ? 'horizontal' : 'empty'}
                            key={childClassesItem.id}
                            onClick={this.getGrandsonClasses.bind(this, childClassesItem.id)}>
                            {childClassesItem.name}
                            {childClassesItem.GrandsonClasses ? <List>
                              {childClassesItem.GrandsonClasses  ? childClassesItem.GrandsonClasses.map((GrandsonClassesItem) => {
                                return (
                                  <List.Item arrow='horizontal'
                                             key={GrandsonClassesItem.id}
                                             onClick={this.goShopCategory.bind(this,GrandsonClassesItem.id)}
                                  >
                                    {GrandsonClassesItem.name}
                                  </List.Item>
                                )
                              }) : null}
                            </List> : null}
                          </List.Item>
                        )
                      }) : null}
                    </List> : null}
                  </List.Item>
                )
              }) : null}
            </List>
          </ScrollView>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: Space.small,
    marginBottom: Space.tiny
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: Space.small
  },
  logo: {
    width: 70,
    height: 70
  },
})