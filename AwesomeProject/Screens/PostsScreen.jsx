import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";

import { db } from "../Firebase/config";

const PostsScreen = ({ navigation }) => {
	const [posts, setPosts] = useState([]);
	const [userLike, setUserLike] = useState(null);

	const login = useSelector((state) => state.login);
	const email = useSelector((state) => state.email);
	const selectedAvatar = useSelector((state) => state.selectedAvatar);

	const getAllPost = async () => {
		const snapshot = await getDocs(collection(db, "posts"));
		const fetchedPosts = [];

		for (const doc of snapshot.docs) {
			const commentsSnapshot = await getDocs(collection(db, `posts/${doc.id}/comments`));
			const post = {
				...doc.data(),
				id: doc.id,
				comments: commentsSnapshot.size,
			};
			fetchedPosts.push(post);
		}
		setPosts(fetchedPosts);
	};

	useEffect(() => {
		getAllPost();
	}, []);

	useFocusEffect(
		useCallback(() => {
			getAllPost();
		}, [])
	);

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

	const defaultFoto = require("../assets/Image/defaultUser.jpg");
	return (
		<View style={styles.userContainer}>
			<View style={styles.userInfoWrp}>
				<Image
					source={selectedAvatar ? { uri: selectedAvatar } : defaultFoto}
					style={styles.userImg}
				/>
				<View style={styles.userData}>
					<Text style={styles.userName}>{login}</Text>
					<Text style={styles.userEmail}>{email}</Text>
				</View>
			</View>
			<View>
				<FlatList
					style={{ marginTop: 32 }}
					data={posts}
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
										color="#BDBDBD"
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
	);
};

export default PostsScreen;
const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 16,
		backgroundColor: "#FFFFFF",
		paddingBottom: 40,
	},
	userInfoWrp: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	userImg: {
		width: 60,
		height: 60,
		overflow: "hidden",
		borderRadius: 16,
		marginRight: 8,
	},
	userData: {
		flexDirection: "column",
		justifyContent: "center",
	},
	userName: {
		color: "#212121",
		fontFamily: "Roboto-Bold",
		fontSize: 13,
	},
	userEmail: {
		fontFamily: "Roboto-Regular",
		fontSize: 11,
		color: "rgba(33, 33, 33, 0.8)",
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
