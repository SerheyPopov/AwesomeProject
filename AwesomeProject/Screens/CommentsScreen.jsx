import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
	FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, doc, addDoc, getDocs } from "firebase/firestore";

import { db } from "../Firebase/config";

const Comments = ({ route }) => {
	const [comment, setComment] = useState("");
	const [allComments, setAllComments] = useState([]);

	const login = useSelector((state) => state.login);
	const selectedAvatar = useSelector((state) => state.selectedAvatar);

	const { postId, photo } = route.params;

	const createComment = async () => {
		const commentData = {
			comment,
			login,
			selectedAvatar,
			timestamp: formatTimestamp(new Date().getTime()),
		};
		try {
			const postRef = doc(db, "posts", postId);
			const commentsCollectionRef = collection(postRef, "comments");
			const docRef = await addDoc(commentsCollectionRef, commentData);
			console.log("Comment added with ID: ", docRef.id);
			setComment("");
			setAllComments((prevComments) => [...prevComments, commentData]);
		} catch (error) {
			console.error("Error adding comment: ", error);
		}
	};

	useEffect(() => {
		getAllComments();
	}, []);

	const getAllComments = async () => {
		try {
			const commentsCollectionRef = collection(db, `posts/${postId}/comments`);
			const commentsSnapshot = await getDocs(commentsCollectionRef);
			const comments = commentsSnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setAllComments(comments);
		} catch (error) {
			console.error("Error retrieving comments: ", error);
		}
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		const formattedDate = date.toLocaleString("uk-UA", options);
		return formattedDate;
	};

	const defaultImage = require("../assets/Image/defaultImage.jpg");
	const defaultAvatar = require("../assets/Image/defaultUser.jpg");
	return (
		<KeyboardAvoidingView
			style={styles.mainContainer}
			keyboardVerticalOffset={Platform.select({ ios: 80, android: 80 })}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
		>
			<TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.subContainer}>
					<View style={styles.container}>
						<View style={styles.fotoContainer}>
							<Image
								style={styles.foto}
								source={photo === undefined ? defaultImage : { uri: photo }}
							/>
						</View>
					</View>
					<View>
						<FlatList
							style={{ marginTop: 32 }}
							data={allComments}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View style={styles.commentContainer}>
									<Image
										style={styles.commentUserFoto}
										source={photo === undefined ? defaultAvatar : { uri: item.selectedAvatar }}
									/>
									<View style={styles.textContainer}>
										<Text style={styles.commentText}>{item.comment}</Text>
										<Text style={styles.date}>{item.timestamp}</Text>
									</View>
								</View>
							)}
						/>
						<View
							style={{
								position: "relative",
								backgroundColor: "rgba(0, 0, 0, 0.03)",
								borderRadius: 100,
								marginBottom: 16,
								justifyContent: "center",
							}}
						></View>
					</View>
					<View style={styles.formContainer}>
						<TextInput
							style={styles.input}
							placeholder="Коментувати..."
							placeholderTextColor="#BDBDBD"
							onChangeText={setComment}
							value={comment}
						/>
						<TouchableOpacity style={styles.btn} onPress={createComment}>
							<AntDesign name="arrowup" size={24} color="#FFFFFF" />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableNativeFeedback>
		</KeyboardAvoidingView>
	);
};

export default Comments;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	subContainer: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: "#FFF",
		justifyContent: "space-between",
		paddingBottom: 350,
	},
	container: {
		position: "relative",
		width: "100%",
		marginTop: 32,
	},
	fotoContainer: {
		width: "100%",
		height: 240,
		borderRadius: 8,
	},
	commentContainer: {
		marginBottom: 24,
		flexDirection: "row-reverse",
	},
	foto: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		marginBottom: 8,
	},
	formContainer: {
		marginBottom: 16,
		position: "absolute",
		bottom: 0,
		right: 16,
		left: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 25,
		backgroundColor: "#F6F6F6",
		color: "#212121",
		paddingVertical: 16,
		paddingLeft: 16,
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	btn: {
		position: "absolute",
		right: 8,
		top: 8,
		width: 34,
		height: 34,
		backgroundColor: "#FF6C00",
		borderRadius: 17,
		justifyContent: "center",
		alignItems: "center",
	},
	commentUserFoto: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginHorizontal: 8,
	},
	textContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.03)",
		borderRadius: 6,
		padding: 16,
	},
	commentText: {
		color: "#212121",
		fontSize: 13,
		fontFamily: "Roboto-Regular",
		lineHeight: 18,
	},
	date: {
		color: "#BDBDBD",
		fontSize: 10,
		fontFamily: "Roboto-Regular",
	},
});
