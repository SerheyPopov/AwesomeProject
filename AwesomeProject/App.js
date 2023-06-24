import { StatusBar } from "expo-status-bar";
import { PostScreen } from "./Screens/PostsScreen";
import { useFonts } from "expo-font";

export default function App() {
	  const [fontsLoaded] = useFonts({
			"Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
			"Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
		});

		if (!fontsLoaded) {
			return null;
		}
	return (
		<>
			<PostScreen />
			<StatusBar style="auto" />
		</>
	);
}
