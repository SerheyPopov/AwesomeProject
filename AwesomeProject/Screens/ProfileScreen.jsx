import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	Text,
	FlatList,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { setSelectedAvatarUser, authSingOutUser } from "../Redux/authOperations";
import { db } from "../Firebase/config";

const ProfileScreen = ({ navigation }) => {
	const [userPosts, setUserPosts] = useState([]);
	const [userLike, setUserLike] = useState(null);

	const login = useSelector((state) => state.login);
	const userId = useSelector((state) => state.userId);
	const selectedAvatar = useSelector((state) => state.selectedAvatar);

	const dispatch = useDispatch();

	useEffect(() => {
		getUserPosts();
	}, []);

	useFocusEffect(
		useCallback(() => {
			getUserPosts();
		}, [])
	);

	const getUserPosts = async () => {
		const q = query(collection(db, "posts"), where("userId", "==", userId));
		const posts = await getDocs(q);
		const fetchedUserPosts = [];

		for (const doc of posts.docs) {
			const commentsSnapshot = await getDocs(collection(db, `posts/${doc.id}/comments`));
			const post = {
				...doc.data(),
				id: doc.id,
				comments: commentsSnapshot.size,
			};
			fetchedUserPosts.push(post);
		}
		setUserPosts(fetchedUserPosts);
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
			const avatar = result.assets[0].uri;
			dispatch(setSelectedAvatarUser(avatar));
		}
	};

	const handleLogOut = () => {
		dispatch(authSingOutUser());
	};

	const like = () => {
		if (userLike === null) {
			setUserLike(userLike + 1);
			return;
		}
		setUserLike(null);
	};

	const likeColor = () => {
		if (userLike === null) {
			return "#BDBDBD";
		}
		return "#FF6C00";
	};

	const defaultAvatar = require("../assets/Image/defaultUser.jpg");
	return (
		<View style={styles.mainContainer}>
			<ImageBackground style={styles.imageBg} source={require("../assets/Image/BG.jpg")}>
				<View
					style={{
						...styles.avatarContainer,
						top: 87,
					}}
				>
					<Image
						style={styles.avatar}
						source={selectedAvatar ? { uri: selectedAvatar } : defaultAvatar}
					/>
					<TouchableOpacity style={styles.iconAddButton} onPress={handleSelectAvatar}>
						<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						...styles.container,
						top: 147,
					}}
				>
					<TouchableOpacity style={styles.logout} onPress={handleLogOut}>
						<Feather name="log-out" size={24} color="#BDBDBD" />
					</TouchableOpacity>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{login}</Text>
					</View>
					<View style={styles.postContainer}>
						<FlatList
							data={userPosts}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View
									style={{
										marginBottom: 34,
										justifyContent: "center",
									}}
								>
									<Image source={{ uri: item.photo }} style={styles.postFoto} />
									<View style={styles.nameContainer}>
										<Text style={styles.namePost}>{item.namePost}</Text>
									</View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<TouchableOpacity
											style={{ flexDirection: "row", marginRight: 24 }}
											onPress={() =>
												navigation.navigate("Comments", {
													postId: item.id,
													photo: item.photo,
												})
											}
										>
											{item.comments ? (
												<>
													<FontAwesome name={"comment"} size={24} color="#FF6C00" />
													<Text style={styles.commentText}>{item.comments}</Text>
												</>
											) : (
												<>
													<FontAwesome name={"comment-o"} size={24} color="#BDBDBD" />
													<Text style={{ ...styles.commentText, color: "#BDBDBD" }}>
														{item.comments}
													</Text>
												</>
											)}
										</TouchableOpacity>

										<TouchableOpacity style={{ flexDirection: "row" }} onPress={like}>
											<AntDesign name="like2" size={24} color={likeColor()} />
											<Text style={{ marginLeft: 8, fontSize: 16 }}>{userLike}</Text>
										</TouchableOpacity>

										<TouchableOpacity
											title="go to map"
											onPress={() => navigation.navigate("Map", { location: item.location })}
											style={styles.mapButton}
										>
											<Feather
												name="map-pin"
												size={24}
												color="black"
												style={{
													marginRight: 8,
												}}
											/>
											<Text style={styles.mapText}>
												{item.nameLocations ? item.nameLocations : null}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						/>
					</View>
				</View>
			</ImageBackground>
		</View>
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
		paddingBottom: 200,
	},
	postFoto: {
		height: 240,
		marginBottom: 10,
		borderRadius: 8,
	},
	namePost: {
		fontSize: 16,
		fontFamily: "Roboto-Medium",
		color: "#212121",
		marginBottom: 8,
	},
	commentText: {
		marginLeft: 8,
		fontSize: 16,
		color: "#212121",
	},
	mapButton: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginLeft: "auto",
	},
	mapText: {
		borderBottomWidth: 1,
		fontSize: 16,
		fontFamily: "Roboto-Medium",
		color: "#212121",
	},
});

export default ProfileScreen;
