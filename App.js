import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'https://icanhazdadjoke.com/';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joke: null,
			error: null,
		};
		//this.getJoke = this.getJoke.bind(this);
	}

	componentDidMount() {
		this.getJoke();
	}

	getJoke() {
		let url = API_URL;

		if (this.props.jokeID) {
			url += `/j/${this.props.jokeID}`;
		}

		axios
			.get(url, {
				headers: { Accept: 'application/json' },
			})
			.then(res => {
				this.setState({
					joke: { id: res.data.id, text: res.data.joke },
				});
			})
			.catch(error => {
				this.setState({
					error: error.response.data.message,
				});
			});
	}

	render() {
		const { joke, error } = this.state;
		if (!joke) {
			return (
				<View style={styles.container}>
					<Text>No Joke Amigo</Text>
					<Text>{error}</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<Text> Hello {joke.text} </Text>
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

App.propTypes = {
	jokeID: PropTypes.string,
};

App.defaultProps = {
	jokeID: null,
};
