import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('Const runs')
  }

  componentDidMount() {
    this.getJoke()
  }

  getJoke() {
    let url = 'https://icanhazdadjoke.com/'

    axios.get(url)
    .then(res => console.log(res))
  }

  render() {
    console.log('render method runs')
    return (
      <View style={styles.container}>
        <Text> Hello </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
