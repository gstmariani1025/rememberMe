import React, { Component } from 'react';
import Expo from "expo";
import { StackNavigator } from 'react-navigation';
import { StatusBar, Alert, FlatList } from "react-native";
import { Container, Text, Header, Content, Form, Item, Input, Label, Body, Title, Icon, Left, Right, Button, View } from 'native-base';
import HomeScreen from './App';

export default class edit extends Component {
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
  UpdateDataToServer = () => {


    const { nama_mk } = this.state;
    const { tanggal_pengumpulan } = this.state;
    const { deskripsi } = this.state;

    fetch('http://gustimariani.000webhostapp.com/D1025API/updateData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        nama_mk: nama_mk,

        tanggal_pengumpulan: tanggal_pengumpulan,

        deskripsi: deskripsi,

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });


  }
  DeleteDataToServer = () =>{
        
    fetch('http://gustimariani.000webhostapp.com/D1025API/deleteData.php', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      nomor : this.state.nomor
  
    })
  
    }).then((response) => response.json())
    .then((responseJson) => {
  
      // Showing response message coming from server after inserting records.
      Alert.alert(responseJson);
  
    }).catch((error) => {
       console.error(error);
    });
  
    this.props.navigation.navigate('Home');
  
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  static navigationOptions = {
    header: null
  };


  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style={{backgroundColor:'#E1F5FE'}}>
        <Header style={{ backgroundColor: '#0277BD' }} >
          <Left>
            <Button style={{ backgroundColor: '#0277BD' }} 
            Title="Kembali"
            onPress={() => this.props.navigation.goBack()} >
              <Icon name='md-arrow-round-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={{ paddingTop: 5, fontWeight: 'bold' }} >REMEMBER ME</Title>
          </Body>
        </Header>
        <Content style={{backgroundColor:'#E1F5FE'}}>
        <FlatList
        data={this.state.data}
        keyExtractor={item=> item.nomor}
        renderItem={({ item }) =>
          <Form>
            <Item stackedLabel>
              <Label>Mata Kuliah</Label>
              <Input value={item.nama_mk} onChangeText={nama_mk => this.setState({ nama_mk })} />
            </Item>
            <Item stackedLabel last>
              <Label>Tanggal Pengumpulan</Label>
              <Input placeholder='yyyy-mm-dd' value={item.tanggal_pengumpulan} onChangeText={tanggal_pengumpulan => this.setState({ tanggal_pengumpulan })} />
            </Item>
            <Item stackedLabel last>
              <Label>Deskripsi Tugas</Label>
              <Input value={item.deskripsi} onChangeText={deskripsi => this.setState({ deskripsi })} />
            </Item>
          </Form>
        }
        />
        </Content>
        <Content style={{ margin: 10 }} >
          <Button style={{ backgroundColor: '#2196F3' }} block info onPress={this.UpdateDataToServer}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} >Perbaharui Data</Text>
          </Button>
          <Button style={{ backgroundColor: '#2196F3', marginTop: 10 }} block info onPress={this.DeleteDataToServer}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} >Delete Data</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

