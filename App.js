import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';

function onListPress(item) {
  ToastAndroid.show(item.name, ToastAndroid.SHORT);
}

class App extends React.Component {

  state = {
    loading: true,
    dataSource: [],
    displayData: [],
    clearText: false,
  }

  getAllProducts() {
    const URL = `http://www.mocky.io/v2/5e419e082f0000cb5458368e`;
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false, dataSource: responseJson.products, displayData: responseJson.products })
        // console.log(responseJson.products)
      })
      .catch((error) => {
        this.setState({ loading: false })
        if (error)
          ToastAndroid.show('Network error!', ToastAndroid.SHORT);
      });
  }

  componentDidMount() {
    this.getAllProducts();
  }

  renderItemRow(item) {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Image source={{ uri: 'https://4.imimg.com/data4/BM/KX/MY-15922529/india-gate-basmati-rice-premium-500x500.jpg' }}
            style={{ alignSelf: 'center', resizeMode: 'contain', width: 60, height: 60 }} />
          <View>
            <Text style={styles.listItems}>{item.name}</Text>
            <Text style={{ ...styles.listItems, fontSize: 14 }}>₹ {item.price}</Text>
          </View>
        </View>
        <View style={{ height: 0.5, backgroundColor: '#E6EDF0', marginEnd: 20, marginStart: 20 }}></View>
      </View>
    )
  }

  renderList(data) {
    return data.map(item =>
      <TouchableOpacity activeOpacity={0.6}
        key={item.id} style={{ backgroundColor: 'white' }}
        onPress={() => onListPress(item)}>
        {this.renderItemRow(item)}
      </TouchableOpacity>
    );
  }

  handleSearch(text) {
    let data = this.state.dataSource;
    if (text === '') {
      this.setState({ displayData: data });
    }
    else {
      text = text.trim().toLowerCase();
      data = data.filter(function (d) {
        return d.name.toLowerCase().match(text);
      });
      this.setState({ displayData: data });
    }
  }

  onClear() {
    this.textInput.clear()
    this.handleSearch('')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#005F8F' barStyle="light-content" />
        <View style={styles.inputField}>
          <TextInput
            ref={input => { this.textInput = input }}
            style={{ height: 40, width: 280, paddingStart: 14, paddingEnd: 14, }}
            placeholder='Search'
            editable={true}
            keyboardType='default'
            onChangeText={(text) => this.handleSearch(text)}
          />

          <TouchableOpacity activeOpacity={0.4}
            onPress={() => this.onClear()}>
            <Image source={require('./images/close.png')}
              style={{ alignSelf: 'center', resizeMode: 'contain', width: 20, height: 20, padding: 10, marginEnd: 8 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={{ fontFamily: 'sans-serif-light', padding: 6, fontSize: 15, fontWeight: 'bold', backgroundColor: 'white' }}>Products</Text>
          <ScrollView overScrollMode='always'>
            {this.renderList(this.state.displayData)}
          </ScrollView>
        </View>

      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F9'
  },
  listContainer: {
    marginEnd: 12,
    marginStart: 12,
    borderRadius: 20,
    marginBottom: 100,
  },
  inputField: {
    marginLeft: 28,
    marginRight: 28,
    marginTop: 26,
    marginBottom: 20,
    backgroundColor: '#DAEBF3',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  listItems: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'sans-serif-light',
    color: 'black',
  },
});

export default App;
