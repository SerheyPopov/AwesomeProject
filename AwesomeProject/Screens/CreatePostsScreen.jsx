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
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { storage, db } from "../Firebase/config";

const CreatePostsScreen = ({ navigation }) => {
	const [photo, setPhoto] = useState(null);
	const [namePost, setNamePost] = useState("");
	const [nameLocations, setNameLocations] = useState("");
	const [location, setLocation] = useState(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const userId = useSelector((state) => state.userId);
	const login = useSelector((state) => state.login);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const takePhoto = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			alert("Permission to access location was denied");
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		const photo = await cameraRef.takePictureAsync();
		setPhoto(photo.uri);
	};

	const activeButton = () => {
		if (photo === null || namePost === "" || nameLocations === "") {
			return { ...styles.btnCreate };
		}
		return {
			...styles.btnCreate,
			backgroundColor: "#FF6C00",
		};
	};

	const activeTextColor = () => {
		if (photo === null || namePost === "" || nameLocations === "") {
			return { ...styles.btnText };
		}
		return {
			...styles.btnText,
			color: "#FFF",
		};
	};

	const handleDeleteFoto = () => {
		setPhoto(null);
		setNamePost("");
		setNameLocations("");
	};

	const sendPhoto = () => {
		if (photo === null || namePost === "" || nameLocations === "") {
			return alert("Missing require field");
		}
		navigation.navigate("Posts");
		uploadPostToServer();
		setPhoto(null);
		setNamePost("");
		setNameLocations("");
	};

	const uploadPostToServer = async () => {
		const photo = await uploadPhotoToServer();
		const createPost = await addDoc(collection(db, "posts"), {
			photo,
			namePost,
			nameLocations,
			location: location.coords,
			userId,
			login,
		});
	};

	const uploadPhotoToServer = async () => {
		const response = await fetch(photo);
		const file = await response.blob();
		const uniquePostId = Date.now().toString();
		const data = ref(storage, `postImage/${uniquePostId}`);
		const upload = await uploadBytes(data, file);
		const download = await getDownloadURL(data, file);
		return download;
	};

	const handleSelectFoto = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Permission to access location was denied");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		let location = await Location.getCurrentPositionAsync({});

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
			setLocation(location);
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
						<Camera style={styles.camera} type={type} ref={setCameraRef}>
							{photo && (
								<View style={styles.photoContainer}>
									<Image
										source={{ uri: photo }}
										style={{
											height: 240,
											width: "100%",
											borderRadius: 8,
										}}
									/>
									<TouchableOpacity
										style={{
											...styles.iconAddButton,
											backgroundColor: "rgba(255, 255, 255, 0.30)",
										}}
										onPress={handleDeleteFoto}
									>
										<MaterialIcons name="camera-alt" size={24} color="#FFF" />
									</TouchableOpacity>
								</View>
							)}

							<View style={styles.photoView}>
								<TouchableOpacity
									style={styles.flipContainer}
									onPress={() => {
										setType(
											type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back
										);
									}}
								>
									<MaterialCommunityIcons
										name="camera-retake-outline"
										size={24}
										color="rgba(255, 255, 255, 0.70)"
									/>
								</TouchableOpacity>

								{!photo && (
									<TouchableOpacity
										style={{ ...styles.iconAddButton, backgroundColor: "#FFF" }}
										onPress={takePhoto}
									>
										<MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
									</TouchableOpacity>
								)}
							</View>
						</Camera>
					</View>

					<TouchableOpacity style={styles.titleContainer} onPress={handleSelectFoto}>
						<Text style={styles.title}>{photo ? "Редагувати фото" : "Завантажте фото"}</Text>
					</TouchableOpacity>
					<View>
						<TextInput
							value={namePost}
							style={styles.input}
							placeholder="Назва..."
							placeholderTextColor="#BDBDBD"
							onChangeText={setNamePost}
						/>
						<View>
							<TextInput
								value={nameLocations}
								style={styles.inputLocation}
								placeholder="Місцевість..."
								placeholderTextColor="#BDBDBD"
								onChangeText={setNameLocations}
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
						<TouchableOpacity style={activeButton()} onPress={sendPhoto}>
							<Text style={activeTextColor()}>Опубліковати</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.btnDeleteContainer}>
						<TouchableOpacity style={styles.btnDelete} onPress={handleDeleteFoto}>
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
		borderRadius: 8,
	},
	camera: { flex: 1, borderRadius: 8 },
	photoView: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
	},
	flipContainer: {
		flex: 0.1,
		alignSelf: "flex-end",
		marginBottom: 8,
		marginRight: 8,
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
