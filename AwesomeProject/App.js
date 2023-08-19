import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { store } from "./Redux/store";
import Home from "./Screens/Home";

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
				<Provider store={store}>
					<Home />
					<StatusBar style="auto" />
				</Provider>
			</NavigationContainer>
		</>
	);
}
