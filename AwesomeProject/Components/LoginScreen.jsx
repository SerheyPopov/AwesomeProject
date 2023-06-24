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

export const LoginScreen = () => {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePassword = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const handleInputFocus = () => {
		setIsShowKeyboard(true);
	};

	const handleInputBlur = () => {
		setIsShowKeyboard(false);
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
							...styles.container,
							marginTop: isShowKeyboard ? 273 : 323,
						}}
					>
						<View style={styles.form}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Увійти</Text>
							</View>

							<TextInput
								style={styles.input}
								placeholder="Адреса електронної пошти"
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
							/>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={styles.input}
									placeholder="Пароль"
									secureTextEntry={!isPasswordVisible}
									onFocus={handleInputFocus}
									onBlur={handleInputBlur}
								/>
								<TouchableOpacity style={styles.showPasswordButton} onPress={togglePassword}>
									<Text style={styles.showPasswordButtonText}>
										{isPasswordVisible ? "Приховати" : "Показати"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity activeOpacity={0.8} style={styles.btn}>
							<Text style={{ color: "#fff" }}>Увійти</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.loginLink}>
							<Text style={styles.loginLink}>Немає акаунту? Зареєструватися</Text>
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
		backgroundColor: "#fff",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
	},

	imageBg: {
		position: "absolute",
		width: "100%",
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 144,
	},

	titleContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 33,
	},
	title: {
		fontSize: 30,
		fontFamily: "Roboto-Medium",
	},

	input: {
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		marginBottom: 16,
		backgroundColor: "#E8E8E8",
		color: "#212121",
		padding: 16,
	},

	btn: {
		backgroundColor: "#FF6C00",
		height: 50,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		marginTop: 27,
	},
	passwordInputContainer: {
		position: "relative",
	},

	showPasswordButton: {
		position: "absolute",
		right: 16,
		top: "50%",
		transform: [{ translateY: -18 }],
		zIndex: 1,
	},
	showPasswordButtonText: {
		color: "#1B4371",
	},
	loginLink: {
		justifyContent: "center",
		alignItems: "center",
		color: "#1B4371",
	},
});
