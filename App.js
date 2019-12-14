import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Share } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'https://icanhazdadjoke.com/';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joke: null,
			error: null,
			tweet: null,
		};
		this.getJoke = this.getJoke.bind(this);
	}

	componentDidMount() {
		this.getJoke();
	}

	getJoke() {
		// called on clicking the 'Get New Joke' button
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
		const { refreshButtonClass } = this.props;
		const { joke, error, tweet } = this.state;
		const source = "~ Dad's Joke";

		if (!joke) {
			return (
				<View style={styles.container}>
					<Text>No Joke Amigo</Text>
					<Text>{error}</Text>
				</View>
			);
		}
		const _handlePressButtonAsync = async () => {
			await WebBrowser.openBrowserAsync(
				`https://twitter.com/intent/tweet?text=${joke.text} ${source}`
			);
		};
		return (
			<View style={styles.container}>
				<Text> {joke.text} </Text>
				<Text> {source} </Text>
				<Button
					className={refreshButtonClass}
					onPress={this.getJoke}
					title="Get a new Joke"
				/>
				<Button
					title="Tweet this Joke"
					onPress={_handlePressButtonAsync}
				/>
				<Text>{tweet && JSON.stringify(tweet)}</Text>
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
	refreshButtonClass: PropTypes.string,
};

App.defaultProps = {
	jokeID: null,
	refreshButtonClass: 'refresh-button',
};
