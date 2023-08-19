import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	TouchableNativeFeedback,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginDB } from "../Redux/authOperations";

const initialState = {
	email: "",
	password: "",
};

export const LoginScreen = ({ navigation }) => {
	const [focusPassword, setFocusPassword] = useState(false);
	const [focusEmail, setFocusEmail] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [loginUser, setLoginUser] = useState(initialState);

	const dispatch = useDispatch();

	const togglePassword = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const handleLogin = () => {
		if (loginUser.email === "" || loginUser.password === "") {
			return console.log("Ви повинні заповнити усі поля");
		}
		dispatch(loginDB(loginUser));
		setLoginUser(initialState);
	};

	return (
		<TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.mainContainer}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				enabled
			>
				<ImageBackground style={styles.imageBg} source={require("../assets/Image/BG.jpg")}>
					<View
						style={{
							...styles.container,
							top: focusEmail || focusPassword ? 273 : 323,
						}}
					>
						<View style={styles.form}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Увійти</Text>
							</View>

							<TextInput
								style={[styles.input, focusEmail && styles.inputOnFocus]}
								placeholder="Адреса електронної пошти"
								placeholderTextColor="#BDBDBD"
								inputMode={"email"}
								onFocus={() => setFocusEmail(true)}
								onBlur={() => setFocusEmail(false)}
								value={loginUser.email}
								onChangeText={(value) =>
									setLoginUser((prevState) => ({ ...prevState, email: value }))
								}
							/>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={[styles.inputPassword, focusPassword && styles.inputOnFocus]}
									placeholder="Пароль"
									placeholderTextColor="#BDBDBD"
									secureTextEntry={isPasswordVisible}
									onFocus={() => setFocusPassword(true)}
									onBlur={() => setFocusPassword(false)}
									value={loginUser.password}
									onChangeText={(value) =>
										setLoginUser((prevState) => ({ ...prevState, password: value }))
									}
								/>
								<TouchableOpacity style={styles.showPasswordButton} onPress={togglePassword}>
									<Text style={styles.showPasswordButtonText}>
										{isPasswordVisible ? "Показати" : "Приховати"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity style={styles.btn} onPress={handleLogin}>
							<Text style={styles.btnText}>Увійти</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.loginLink}
							onPress={() => navigation.navigate("Registration")}
						>
							<Text style={styles.loginLinkText}>Немає акаунту? Зареєструватися</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
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
		paddingTop: 32,
		fontFamily: "Roboto-Regular",
		alignItems: "center",
		width: "100%",
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
	showPasswordButton: {
		position: "absolute",
		right: 16,
		top: 0,
		height: 50,
		justifyContent: "center",
		zIndex: 1,
	},
	showPasswordButtonText: {
		color: "#1B4371",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	loginLink: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 470,
	},
	loginLinkText: {
		color: "#1B4371",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
});
