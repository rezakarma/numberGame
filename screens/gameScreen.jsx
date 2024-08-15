import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
// import Title from "../components/ui/title";
import Title from "../components/ui/title"
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/numberContainer";
import PrimaryButton from "../components/ui/primaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
// import { Ionicons } from '@expo/vector-icons'
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/guessLogItem";
function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  initialGuess;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    console.log("guess: ", currentGuess);
    console.log("right number user : ", props.userNumber);
    if (currentGuess === props.userNumber) {
      console.log("right number ");
      props.onGameOver(guessRounds.length);
    }
  }, [currentGuess]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "higher" && currentGuess > props.userNumber)
    ) {
      Alert.alert("dont lie", "you know that this is wrong...", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if(width > 500) {
    content = <>
    <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
    <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>

    
    </>
  }

  return (
    <View style={styles.screen}>
      <Title>Opponents Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(itemm, index) => index}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    paddingTop: 40
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center"
  }
});
