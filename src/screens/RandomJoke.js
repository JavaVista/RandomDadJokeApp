import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class RandomJoke extends Component {
  constructor(props) {
    super(props);
      this.state = {
          joke: '', // for joke
    };
  }

  render() {
    return (
      <View>
        <Text>  Random Dad Joke App </Text>
      </View>
    );
  }
}
