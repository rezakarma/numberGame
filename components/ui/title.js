import { Platform, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const title = (props) => {
    return <Text style={styles.title}>{props.children}</Text>
}
 
export default title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: "open-sans-bold",
        color: 'white',
        textAlign: "center",
        borderWidth: 0,
        borderColor: 'white',
        padding: 12,
        maxWidth: "80%",
        width: 300
      },
})