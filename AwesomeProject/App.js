import { StatusBar } from "expo-status-bar";
import { PostScreen } from "./Screens/PostsScreen";

export default function App() {
	return (
		<>
			<PostScreen />
			<StatusBar style="auto" />
		</>
	);
}
