import { StyleSheet, View, Text, Image } from "react-native";

import Posts from "../Components/posts";

const PostsScreen = ({ route }) => {
	return (
		<View style={styles.userContainer}>
			<View style={styles.userInfoWrp}>
				<Image source={require("../assets/Image/user.jpg")} style={styles.userImg} />
				<View style={styles.userData}>
					<Text style={styles.userName}>Natali Romanova</Text>
					<Text style={styles.userEmail}>email@example.com</Text>
				</View>
			</View>
			<View>
				{route.params!==undefined&&<Posts post={route.params} />}
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
	},
	userInfoWrp: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 32,
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
});
