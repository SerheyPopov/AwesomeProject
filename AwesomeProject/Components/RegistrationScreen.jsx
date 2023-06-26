import { AntDesign } from "@expo/vector-icons";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableNativeFeedback,
} from "react-native";
import { useState } from "react";

export const RegistrationScreen = () => {
	const [focusPassword, setFocusPassword] = useState(false);
	const [focusLogin, setFocusLogin] = useState(false);
	const [focusEmail, setFocusEmail] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePassword = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const defaultAvatar = require("../assets/Image/avatar.jpg");
	return (
		<KeyboardAvoidingView
			style={styles.mainContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
		>
			<TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
				<ImageBackground style={styles.imageBg} source={require("../assets/Image/BG.jpg")}>
					<View
						style={{
							...styles.avatarContainer,
							top: focusLogin || focusEmail || focusPassword ? 87 : 203,
						}}
					>
						<Image style={styles.avatar} source={defaultAvatar} />
						<TouchableOpacity style={styles.iconAddButton}>
							<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
						</TouchableOpacity>
					</View>
					<View
						style={{
							...styles.container,
							top: focusLogin || focusEmail || focusPassword ? 147 : 263,
						}}
					>
						<View style={styles.form}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Реєстрація</Text>
							</View>
							<TextInput
								style={[styles.input, focusLogin && styles.inputOnFocus]}
								placeholder="Логін"
								placeholderTextColor="#BDBDBD"
								onFocus={() => setFocusLogin(true)}
								onBlur={() => setFocusLogin(false)}
							/>
							<TextInput
								style={[styles.input, focusEmail && styles.inputOnFocus]}
								placeholder="Адреса електронної пошти"
								placeholderTextColor="#BDBDBD"
								onFocus={() => setFocusEmail(true)}
								onBlur={() => setFocusEmail(false)}
							/>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={[styles.inputPassword, focusPassword && styles.inputOnFocus]}
									placeholder="Пароль"
									placeholderTextColor="#BDBDBD"
									secureTextEntry={isPasswordVisible}
									onFocus={() => setFocusPassword(true)}
									onBlur={() => setFocusPassword(false)}
								/>
								<TouchableOpacity style={styles.showPasswordButton} onPress={togglePassword}>
									<Text style={styles.showPasswordButtonText}>
										{isPasswordVisible ? "Показати" : "Приховати"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity style={styles.btn}>
							<Text style={styles.btnText}>Зареєструватися</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.loginLink}>
							<Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</TouchableNativeFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		fontFamily: "Roboto-Regular",
	},
	imageBg: {
		position: "absolute",
		width: "100%",
		flex: 1,
		resizeMode: "cover",
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingTop: 92,
		alignItems: "center",
		width: "100%",
	},
	avatarContainer: {
		position: "absolute",
		left: "50%",
		zIndex: 1,
	},
	avatar: {
		borderRadius: 16,
		left: "-50%",
		width: 120,
		height: 120,
	},
	iconAddButton: {
		position: "absolute",
		top: 81,
		left: 47.5,
	},
	titleContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 33,
	},
	title: {
		fontSize: 30,
		letterSpacing: 0.3,
		fontFamily: "Roboto-Medium",
		color: "#212121",
	},
	input: {
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		marginBottom: 16,
		backgroundColor: "#F6F6F6",
		color: "#212121",
		padding: 16,
		width: 343,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	inputPassword: {
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		marginBottom: 43,
		backgroundColor: "#F6F6F6",
		color: "#212121",
		padding: 16,
		width: 343,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	inputOnFocus: {
		borderColor: "#FF6C00",
		backgroundColor: "#FFFFFF",
	},

	passwordInputContainer: {},

	showPasswordButton: {
		position: "absolute",
		right: 16,
		top: 16,
		zIndex: 1,
	},
	showPasswordButtonText: {
		color: "#1B4371",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	btn: {
		backgroundColor: "#FF6C00",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		width: 343,
		paddingHorizontal: 32,
		paddingVertical: 16,
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	loginLink: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 350,
	},
	loginLinkText: {
		color: "#1B4371",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
});
