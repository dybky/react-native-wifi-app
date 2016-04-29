'use strict';
 
import React, {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  AppRegistry,
  StyleSheet,
  ScrollView,
  ListView,
} from 'react-native';


var wifi = require('react-native-android-wifi');
var dimensions = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class myfirebase extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      wifiArray : [],  
      isEnabled : true,
      ssid: '',
      isConnected : true,
      level: 0, 
      ds:[],
      dataSource: ds,
    }
   }
    
  componentDidMount(){
    this._refeshWifi();
  }

  _refeshWifi (){
    
    wifi.isEnabled((isEnabled)=>{
      this.setState({isEnabled: isEnabled});
    });

    wifi.loadWifiList((wifiStringList) => {
      const wifiArray = JSON.parse(wifiStringList);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(wifiArray) });
      console.log('wifiArray',wifiArray);
    },
    (error) => {
      console.log(error);
    }
    )

    wifi.getSSID((ssid) => {
      this.setState({ssid: ssid});
    });

    wifi.connectionStatus((isConnected) => {
      this.setState({isConnected: isConnected});
    });
    
    wifi.getCurrentSignalStrength((level)=>{
      this.setState({level: level});
      console.log('level',level);
    });
  }
   
  _listView(wifiArray){
    return (
      <Text>
      {
        wifiArray.map((val, index)=> {
              return 
                  <Text key = {index}>
                    <Text>BSSID: {val.BSSID}</Text>
                    <Text>SSID: {val.SSID}</Text>
                    <Text>capabilities: {val.capabilities}</Text>
                    <Text>frequency: {val.frequency}</Text>
                    <Text>level: {val.level}</Text>
                  </Text>
          })
      }
      </Text>
    )
  }
  
  render(){
    return (
      <View style = {{flex: 1, flexDirection: 'column'}}>
        <Text style = {{fontSize: 20, textAlign: 'center'}}>Wi-Fi APP</Text>
       
        <View style = {{height: 1, backgroundColor: 'black',width: dimensions.width ,marginVertical: 10,}}></View>

        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={s.scrollView}>
          <Text style = { s.text }>是否开启wifi：{this.state.isEnabled == true ? '是' : '否'}</Text>
          <Text style = { s.text }>是否已连接：{this.state.isConnected == true ? '是' : '否'}</Text>
          <Text style = { s.text }>目前连接的wifi名称（ssid）：{this.state.ssid}</Text>
          <Text style = { s.text }>连接wifi的强度：{this.state.level}</Text>
          <Text style = { s.text }>扫描到的wifi信息：</Text>
  
          <ListView
            style = {{marginLeft: 50}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>  
              <Text style = {{flexDirection: 'column', flex: 1}}>
                    <Text>BSSID: {rowData.BSSID}</Text>{'\n'}
                    <Text>SSID: {rowData.SSID}</Text>{'\n'}
                    <Text>capabilities: {rowData.capabilities}</Text>{'\n'}
                    <Text>frequency: {rowData.frequency}</Text>{'\n'}
                    <Text>level: {rowData.level}</Text>{'\n'}
                  </Text>}
          />
        </ScrollView>

        <View style = {{justifyContent: 'center',alignItems: 'center',height: 35,width: dimensions.width,position: 'absolute', bottom: 40,}}>  
          <TouchableOpacity onPress ={this._refeshWifi.bind(this)} style = {{justifyContent: 'center',alignItems: 'center',height: 35,backgroundColor: '#FFC125',
             borderRadius: 10, }}>
            <Text style = {s.buttom}>刷新</Text>
          </TouchableOpacity>
        </View>
      </View>  
    );
  }
};
const s = StyleSheet.create({
  text: {
   marginLeft: 50,
   paddingVertical: 5,
   fontSize: 15,
  },
  buttom: {
    width: 200,
    height: 30,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 17,
  },
  scrollView: {
    height: 300,
  },
  });
AppRegistry.registerComponent('myfirebase', () => myfirebase);
