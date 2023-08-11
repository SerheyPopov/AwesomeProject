import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Platform,
	Text,
} from "react-native";
import { useState } from "react";

const Posts = ({ post }) => {
	const [userLike, setUserLike] = useState(null);
	const navigation = useNavigation();
	const defaultImage = require("../assets/Image/defaultImage.jpg");

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

	return (
		<KeyboardAvoidingView
			style={styles.mainContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			enabled
		>
			<View style={styles.container}>
				<View style={styles.fotoContainer}>
					<Image
						style={styles.foto}
						source={post.photo === undefined ? defaultImage : { uri: post.photo }}
					/>
					<View style={styles.containerTitle}>
						<Text style={styles.title}>{post.namePost}</Text>
					</View>

					<View style={styles.containerOptions}>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								style={{ flexDirection: "row" }}
								onPress={() => navigation.navigate("Comments", { uri: post.photo })}
							>
								<Feather name="message-circle" size={24} color="#BDBDBD" />
								<Text style={styles.comment}>0</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ flexDirection: "row" }} onPress={like}>
								<Feather name="thumbs-up" size={24} color={likeColor()} />
								<Text style={styles.like}>{userLike}</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={{ flexDirection: "row" }}
							onPress={() => navigation.navigate("Map", { post })}
						>
							<MaterialCommunityIcons name="map-marker-outline" size={24} color="#BDBDBD" />
							<Text style={styles.location}>{post.nameLocations}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		fontFamily: "Roboto-Regular",
		backgroundColor: "#FFFFFF",
	},

	container: {
		flex: 1,
		position: "relative",
		width: "100%",
	},
	fotoContainer: {
		width: "100%",
		height: 240,
		borderRadius: 8,
	},
	foto: {
		width: "100%",
		borderRadius: 8,
		height: 240,
		marginBottom: 8,
	},
	containerTitle: {
		position: "relative",
		marginBottom: 8,
	},
	title: {
		fontSize: 16,
		fontFamily: "Roboto-Medium",
		color: "#212121",
	},
	containerOptions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	containerLike: {
		flexDirection: "row",
	},
	comment: {
		marginLeft: 6,
		marginRight: 24,
		color: "#BDBDBD",
		fontSize: 16,
	},
	like: {
		marginLeft: 6,
		color: "#212121",
		fontSize: 16,
	},
	location: {
		marginLeft: 4,
		color: "#212121",
		fontSize: 16,
		textDecorationLine: "underline",
	},
});
export default Posts;
