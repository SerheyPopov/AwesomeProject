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

export const RegistrationScreen = () => {
	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					style={styles.mainContainer}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<ImageBackground source={require("../assets/Image/BG.jpg")} style={styles.imageBG}>
						<View style={styles.container}>
							<View style={styles.avatarContainer}>
								<Image
									style={styles.avatar}
									source={require("../assets/Image/userFotoField.jpg")}
								/>
								<TouchableOpacity style={styles.iconAddButton}>
									<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
								</TouchableOpacity>
							</View>
							<Text style={styles.text}>Реєстрація</Text>
							<TextInput style={styles.input} placeholder="Логін" placeholderTextColor="#BDBDBD" />
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
								<Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
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
	avatarContainer: {
		// left: 129,
		// right: 0,
		// top:-60,
		zIndex: 1,
		marginRight: "auto",
		marginLeft: "auto",
		marginBottom: 32,
	},
	avatar: {
		borderRadius: 16,
	},
	iconAddButton: {
		position: "absolute",
		top: 81,
		left: 107,
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
		paddingTop: 92,
		marginTop: 253,
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
		marginBottom: 45,
	},
	loginLinkText: {
		textAlign: "center",
		height: 30,
		color: "#1B4371",
		fontWeight: 400,
		fontSize: 16,
	},
});
