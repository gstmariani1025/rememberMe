import React, { Component } from 'react';
import { StyleSheet, View,Image,ImageBackground,StatusBar } from 'react-native';
import {StackNavigator} from 'react-navigation'
import { Button,Container,Header,Content,Text } from 'native-base';
import Expo from "expo";
import Home from './home';
export class SplashScreen extends Component {
    static navigationOptions = {
        header: null
      };
  constructor(props) {
    super(props);
    this.state = {
        loading: true
    };
}
async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
          }
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('./asset/bg.png')} 
            style={{flex:1,justifyContent:'center',alignItems:'center'}}
            >
            <Content>
            <View>
            </View>
            </Content>
            <View>
            <Button light style={{justifyContent:'center', marginBottom:25}} onPress={() => this.props.navigation.navigate('Input')}>
                        <Text>GO !!!</Text>
                    </Button>
            </View>
            </ImageBackground>
        </View>
    )
  }
};

const RootStack = StackNavigator(
    {
      Home: {
        screen: SplashScreen,
      },
      Input: {
        screen: Home,
      }
    },
    {
      initialRouteName: 'Home',
    }
  );

  export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
      return <RootStack />;
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})