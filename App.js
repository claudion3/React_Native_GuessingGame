import React, { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const background = {
	uri:
		"https://assets.wallpapersin4k.org/uploads/2017/04/Phone-Wallpapers-Black-11.jpg",
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);

	const ConfigureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(0);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};
	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};
	let content = <StartGameScreen onStartGame={startGameHandler} />;
	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={ConfigureNewGameHandler}
			/>
		);
	}
	return (
		<View style={styles.screen}>
			<ImageBackground source={background} style={styles.backgroundImage}>
				<Header title="Guess a Number" />
				{content}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		resizeMode: "center",
		justifyContent: "center",
	},
});
