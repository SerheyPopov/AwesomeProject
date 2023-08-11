import { AntDesign } from "@expo/vector-icons";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableNativeFeedback,
	Text,
	TextInput,
} from "react-native";

import Comment from "../Components/Comments";

const Comments = ({ route }) => {
	const defaultImage = require("../assets/Image/defaultImage.jpg");
	return (
		<KeyboardAvoidingView
			style={styles.mainContainer}
			keyboardVerticalOffset={Platform.select({ ios: 80, android: 80 })}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
		>
			<TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.subContainer}>
					<View style={styles.container}>
						<View style={styles.fotoContainer}>
							<Image
								style={styles.foto}
								source={route.params.uri === undefined ? defaultImage : { uri: route.params.uri }}
							/>
						</View>
					</View>
					<View>{/* <Comment/> */}</View>
					<View style={styles.formContainer}>
						<TextInput
							style={styles.input}
							placeholder="Коментувати..."
							placeholderTextColor="#BDBDBD"
						/>
						<TouchableOpacity style={styles.btn}>
							<AntDesign name="arrowup" size={24} color="#FFFFFF" />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableNativeFeedback>
		</KeyboardAvoidingView>
	);
};

export default Comments;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	subContainer: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: "#FFF",
		justifyContent: "space-between",
	},
	container: {
		position: "relative",
		width: "100%",
		marginTop: 32,
	},
	fotoContainer: {
		width: "100%",
		height: 240,
		borderRadius: 8,
	},
	foto: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		marginBottom: 8,
	},
	formContainer: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 25,
		backgroundColor: "#F6F6F6",
		color: "#212121",
		paddingVertical: 16,
		paddingLeft: 16,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	btn: {
		position: "absolute",
		right: 8,
		top: 8,
		width: 34,
		height: 34,
		backgroundColor: "#FF6C00",
		borderRadius: 17,
		justifyContent: "center",
		alignItems: "center",
	},
});
