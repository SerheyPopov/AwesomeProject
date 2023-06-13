import { AntDesign } from "@expo/vector-icons";

import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground,
	Image,
	Platform,
} from "react-native";

export const LoginScreen = () => {
	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					style={styles.mainContainer}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<ImageBackground source={require("../assets/Image/BG.jpg")} style={styles.imageBG}>
						<View style={styles.container}>
							<Text style={styles.text}>Увійти</Text>

							<TextInput
								style={styles.input}
								placeholder="Адреса електронної пошти"
								placeholderTextColor="#BDBDBD"
								secureTextEntry={true}
							/>

							<View style={styles.passwordInputContainer}>
								<TextInput
									style={styles.inputPassword}
									placeholder="Пароль"
									placeholderTextColor="#BDBDBD"
								/>
								<TouchableOpacity style={styles.showPasswordButton}>
									<Text style={styles.showPasswordButtonText}>Показати</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity style={styles.button}>
								<Text style={styles.textBtn}>Зареєстуватися</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.loginLink}>
								<Text style={styles.loginLinkText}>Немає акаунту? Зареєструватися</Text>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</>
	);
};
const styles = StyleSheet.create({
	input: {
		borderColor: "#E8E8E8",
		height: 50,
		width: 343,
		backgroundColor: "#F6F6F6",
		borderWidth: 2,
		marginBottom: 16,
		color: "#212121",
		// fontSize: 16,
		// fontWeight: 400,
		marginRight: "auto",
		marginLeft: "auto",
		borderRadius: 8,
		paddingLeft: 16,
	},
	passwordInputContainer: {
		position: "relative",
	},
	showPasswordButton: {
		position: "absolute",
		right: 18,
		top: "50%",
		transform: [{ translateY: -32 }],
		zIndex: 1,
	},
	showPasswordButtonText: {
		color: "#1B4371",
		fontSize: 16,
		fontWeight: 400,
	},
	inputPassword: {
		borderColor: "#E8E8E8",
		height: 50,
		width: 343,
		backgroundColor: "#F6F6F6",
		borderWidth: 2,
		marginBottom: 43,
		color: "#212121",
		marginRight: "auto",
		marginLeft: "auto",
		borderRadius: 8,
		paddingLeft: 16,
	},

	mainContainer: {
		flex: 1,
		// backgroundColor: "#fff",
		// fontFamily: "Roboto-Regular",
		// fontSize: 16,
		// height: 549,
	},
	text: {
		marginBottom: 32,
		fontSize: 30,
		fontWeight: 500,
		color: "#212121",
		textAlign: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,
		paddingTop: 32,
		marginTop: 320,
		justifyContent: "flex-end",
	},
	button: {
		backgroundColor: "#FF6C00",

		borderRadius: 100,

		marginBottom: 16,
		height: 51,
		justifyContent: "center",
		alignItems: "center",
	},
	textBtn: {
		color: "#FFFFFF",
	},
	imageBG: {
		position: "relative",
		flex: 1,
	},
	loginLink: {
		// justifyContent: "center",
		// alignItems: "center",
		// color: "#1B4371",
		marginBottom: 111,
	},
	loginLinkText: {
		textAlign: "center",
		height: 30,
		color: "#1B4371",
		fontWeight: 400,
		fontSize: 16,
	},
});
