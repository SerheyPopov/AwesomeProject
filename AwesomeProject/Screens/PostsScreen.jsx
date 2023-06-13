import { View, StyleSheet } from "react-native";
import { RegistrationScreen } from "../Components/RegistrationScreen";
import { LoginScreen } from "../Components/LoginScreen";

export const PostScreen = () => {
	return (
		<View style={styles.container}>
			{/* <RegistrationScreen /> */}
			{/* <LoginScreen/> */}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
