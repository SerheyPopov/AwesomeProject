import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Components/Main";
import "react-native-gesture-handler";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<>
			<NavigationContainer>
				<Main />
				<StatusBar style="auto" />
			</NavigationContainer>
		</>
	);
}
