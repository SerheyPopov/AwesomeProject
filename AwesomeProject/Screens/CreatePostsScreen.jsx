import { Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const CreatePostsScreen = () => {
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
	
	return (
		<KeyboardAvoidingView
			style={styles.mainContainer}
			keyboardVerticalOffset={Platform.select({ ios: 80, android: 80 })}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
		>
			<TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<View style={styles.fotoContainer}>
						<Image style={styles.foto} source={userFoto && { uri: userFoto }} />
						{userFoto ? (
							<TouchableOpacity
								style={{ ...styles.iconAddButton, backgroundColor: "rgba(255, 255, 255, 0.30)" }}
								onPress={handleSelectAvatar}
							>
								<MaterialIcons name="camera-alt" size={24} color="#FFF" />
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={{ ...styles.iconAddButton, backgroundColor: "#FFF" }}
								onPress={handleSelectAvatar}
							>
								<MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
							</TouchableOpacity>
						)}
					</View>

					<View style={styles.titleContainer}>
						<Text style={styles.title}>{userFoto ? "Редагувати фото" : "Завантажте фото"}</Text>
					</View>
					<View>
						<TextInput style={styles.input} placeholder="Назва..." placeholderTextColor="#BDBDBD" />
						<View>
							<TextInput
								style={styles.inputLocation}
								placeholder="Місцевість..."
								placeholderTextColor="#BDBDBD"
							/>
							<MaterialCommunityIcons
								style={styles.locationIcon}
								name="map-marker-outline"
								size={24}
								color="#BDBDBD"
							/>
						</View>
					</View>
					<View>
						<TouchableOpacity style={styles.btnCreate}>
							<Text style={styles.btnText}>Опубліковати</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.btnDeleteContainer}>
						<TouchableOpacity style={styles.btnDelete} onPress={handleDeleteAvatar}>
							<Text style={styles.btnText}>
								<Feather name="trash-2" size={24} color="#BDBDBD" />
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableNativeFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		fontFamily: "Roboto-Regular",
		paddingHorizontal: 16,
		backgroundColor: "#FFFFFF",
		width: "100%",
	},
	fotoContainer: {
		height: 240,
		marginTop: 32,
		marginBottom: 0,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	foto: {
		borderRadius: 16,
		marginBottom: 8,
		height: 240,
	},
	iconAddButton: {
		position: "absolute",
		top: 90,
		left: 142,
		borderRadius: 30,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		alignSelf: "flex-start",

		marginBottom: 32,
	},
	title: {
		fontSize: 16,
		letterSpacing: 0.3,
		fontFamily: "Roboto-Regular",
		color: "#BDBDBD",
		fontWeight: 400,
	},
	input: {
		borderWidth: 1,
		borderBottomColor: "#E8E8E8",
		borderColor: "#FFF",
		marginBottom: 16,
		backgroundColor: "#FFF",
		color: "#212121",
		paddingVertical: 16,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	inputLocation: {
		borderWidth: 1,
		borderBottomColor: "#E8E8E8",
		borderColor: "#FFF",
		marginBottom: 32,
		backgroundColor: "#FFF",
		color: "#212121",
		paddingVertical: 16,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		paddingLeft: 28,
	},
	locationIcon: {
		position: "absolute",
		top: 13,
	},
	btnCreate: {
		backgroundColor: "#F6F6F6",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 120,
		paddingHorizontal: 32,
		paddingVertical: 16,
	},
	btnDeleteContainer: {
		alignItems: "center",
	},
	btnDelete: {
		width: 70,
		height: 40,
		backgroundColor: "#F6F6F6",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	btnText: {
		color: "#BDBDBD",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
});
export default CreatePostsScreen;
