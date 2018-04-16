import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BelajarLayout extends React.Component {
  render() {
    return (
      <View style={styles.containerMain}>
        <View style={styles.box1}>
          <Text style={{ padding: 30, fontSize: 20, color: 'white', textAlign: 'center' }} >
          Pendidikan Teknik Informatika</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text}>Slider</Text>
        </View>
        <View style={styles.box3}>
          <View style={styles.button}><Text> 1 </Text></View>
          <View style={styles.button}><Text> 2 </Text></View>
          <View style={styles.button}><Text> 3 </Text></View>
          <View style={styles.button}><Text> 4 </Text></View>
        </View><View style={styles.box4}>
          <View style={styles.button}><Text> 5 </Text></View>
          <View style={styles.button}><Text> 6 </Text></View>
          <View style={styles.button}><Text> 7 </Text></View>
          <View style={styles.button}><Text> 8 </Text></View>
        </View>
        <View style={styles.box5}>
          <Text style={{ padding: 30, fontSize: 20, color: 'white', textAlign: 'center' }} >
          #JaenKuliahdiPTI</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column' //default Flex Direction adalah column
    //ketika Column maka memenuhi layar secara vertikal
    ////ketika Row maka memenuhi layar secara horizontal
  },
  box1: { //Layar dalam android dibagi menjadi 3 lebar sesuai nilai flex
    flex: 1, //
    backgroundColor: '#0D47A1',
  },
  box2: {
    flex: 2, // lebar dari box menjadi lebih besar dari 1
    backgroundColor: '#1E88E5',
    flexDirection: 'column',
    justifyContent: 'space-around',
    //space-around membuat spasi pada tulisan ->main access
    //space-between membuat spasi diantara tulisan
    alignItems: 'center'
    //center mengatur tulisan pada box bagian tengah
    //flex-end mengatur tulisan pada box bagian akhir
    //flex-start mengatur tulisan pada box bagian awal
  },
  box3: {
    flex: 1, // lebar box lebih besar dari 2
    backgroundColor: '#64B5F6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  box4: {
    flex: 1, // lebar box lebih besar dari 2
    backgroundColor: '#64B5F6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box5: {
    flex: 1, // lebar box lebih besar dari 2
    backgroundColor: '#0D47A1',
    margin: 10,
  },
  text: {
    fontSize: 25
  },
});
