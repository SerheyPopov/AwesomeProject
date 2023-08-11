import { AntDesign, Feather } from "@expo/vector-icons";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableNativeFeedback,
	Text,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

// import Posts from "../Components/posts";

const ProfileScreen = ({ navigation }) => {
	const [userFoto, setUserFoto] = useState(null);

	const handleDeleteAvatar = () => {
		setUserFoto(null);
	};

	const handleSelectAvatar = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			alert("Доступ заборонено");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.canceled) {
			setUserFoto(result.assets[0].uri);
		}
	};

	const defaultAvatar = require("../assets/Image/avatar.jpg");
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
							...styles.avatarContainer,
							top: 87,
						}}
					>
						<Image style={styles.avatar} source={userFoto ? { uri: userFoto } : defaultAvatar} />
						{userFoto ? (
							<TouchableOpacity style={styles.iconAddButton} onPress={handleDeleteAvatar}>
								<AntDesign name="closecircleo" size={24} color="#E8E8E8" />
							</TouchableOpacity>
						) : (
							<TouchableOpacity style={styles.iconAddButton} onPress={handleSelectAvatar}>
								<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
							</TouchableOpacity>
						)}
					</View>

					<View
						style={{
							...styles.container,
							top: 147,
						}}
					>
						<TouchableOpacity style={styles.logout} onPress={() => navigation.navigate("Login")}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</TouchableOpacity>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Natali Romanova</Text>
						</View>
						<View style={styles.postContainer}>{/* <Posts /> */}</View>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		fontFamily: "Roboto-Regular",
	},
	logout: {
		position: "absolute",
		top: 22,
		right: 16,
	},
	imageBg: {
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
		width: 120,
		height: 120,
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
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
	},
	titleContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		letterSpacing: 0.3,
		fontFamily: "Roboto-Medium",
		color: "#212121",
		marginBottom: 33,
	},
	postContainer: {
		width: "100%",
		paddingHorizontal: 16,
	},
});

export default ProfileScreen;
