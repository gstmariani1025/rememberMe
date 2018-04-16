import React, { Component } from 'react';
import {  View, Text,StyleSheet,Image, FlatList,RefreshControl,StatusBar,
          ActivityIndicator,TouchableOpacity } from 'react-native';
import {Container,Title,Header, Content, Form, Item, Input, Label, Left, Button,Icon, Body,Card,CardItem,List,ListItem, Thumbnail, Right} from 'native-base'
import { StackNavigator } from 'react-navigation';
import dbinput from './input';
import Expo from "expo";

export class HomeScreen extends Component {

    constructor(props) {
		super(props);
		this.state = {
      loading: true,
      nama_mk: '',
      tanggal_pengumpulan: '',
      deskripsi: '',
			data: [],
			error: null,
			refreshing: false,
			ActivityIndicator_Loading: false,
		};
  }

  componentDidMount() {
		this.setState({ ActivityIndicator_Loading: true }, () => {
			this.setState({ refreshing: true });
			const url = 'http://gustimariani.000webhostapp.com/D1025API/getData.php';
			//this.setState({ loading: true });
			fetch(url)
				.then((response) => response.json())
				.then((responseJson) => {
					console.log("comp");
					console.log(responseJson);
					this.setState({
						data: responseJson,
						error: responseJson.error || null,
						loading: false,
						refreshing: false,
						ActivityIndicator_Loading: false,

					});
				}
				);
		});
  }

  onRefresh() {
		this.setState({refreshing: true});
		this.componentDidMount();
	  } static navigationOptions = {
    header: null
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
        <Container>
            <Header style={{backgroundColor:'#0277BD'}} >
            <Left>
                <Button style={{backgroundColor:'#0277BD'}}>
                </Button>
                </Left>
                <Body>
                <Title style={{paddingTop:5,fontWeight:'bold'}} >REMEMBER ME</Title>
                </Body>
            </Header>
            <View style={{flex:1,backgroundColor:'#E1F5FE'}}>
					{
						this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'/> : null
					}
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>
						}
						data={this.state.data}
						keyExtractor={item=> item.nomor}
						renderItem={({ item }) =>
							<Card>
								<CardItem>
									<Left>
										<Thumbnail square size={80} source={require('./asset/note.png')}/>
									<Body>
									<Text style={{fontWeight:'bold'}} >Mata Kuliah: {item.nama_mk}</Text>
									<Text style={{fontWeight:'bold'}} >Deadline : {item.tanggal_pengumpulan}</Text>
									</Body>
									</Left>
								</CardItem>
                <CardItem>
                <Text>{item.deskripsi}</Text>
                </CardItem>
							</Card>
						}
					/>
				</View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Input')} style={styles.addButton}>
            <Thumbnail square size={60} style={styles.icon} source={require('./asset/addnote.png')}/>
                </TouchableOpacity>
        </Container>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Input: {
      screen: dbinput,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class home extends React.Component {
    static navigationOptions = {
        header: null
    }
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 65,
    backgroundColor: '#0277BD',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
},
addButtonText: {
    color: '#fff',
    fontSize: 24
},
icon: {
  tintColor: '#fff'
}
});