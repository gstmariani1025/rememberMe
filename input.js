import React, { Component } from 'react';
import Expo from "expo";
import { StackNavigator } from 'react-navigation';
import { StatusBar, Alert } from "react-native";
import { Container, Text, Header, Content, Form, Item, Input, Label, Body, Title, Icon, Left, Right, Button, View } from 'native-base';
import HomeScreen from './App';

export default class dbinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nama_mk: '',
      tanggal_pengumpulan: '',
      deskripsi: ''
    };
  }


  InsertDataToServer = () => {


    const { nama_mk } = this.state;
    const { tanggal_pengumpulan } = this.state;
    const { deskripsi } = this.state;

    fetch('http://gustimariani.000webhostapp.com/D1025API/kirimData.php', {
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
          <Form>
            <Item stackedLabel>
              <Label>Mata Kuliah</Label>
              <Input onChangeText={nama_mk => this.setState({ nama_mk })} />
            </Item>
            <Item stackedLabel last>
              <Label>Tanggal Pengumpulan</Label>
              <Input placeholder='yyyy-mm-dd' onChangeText={tanggal_pengumpulan => this.setState({ tanggal_pengumpulan })} />
            </Item>
            <Item stackedLabel last>
              <Label>Deskripsi Tugas</Label>
              <Input onChangeText={deskripsi => this.setState({ deskripsi })} />
            </Item>
          </Form>
        </Content>
        <Content style={{ margin: 10 }} >
          <Button style={{ backgroundColor: '#2196F3' }} block info onPress={this.InsertDataToServer}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} >SUBMIT</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
