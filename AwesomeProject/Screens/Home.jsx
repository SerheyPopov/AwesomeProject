import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const MainTab = createBottomTabNavigator();

const Home = () => {
	return (
		<MainTab.Navigator
			initialRouteName="Posts"
			screenOptions={{
				tabBarShowLabel: false,
				headerTitleStyle: {
					color: "#212121",
					fontSize: 17,
					fontFamily: "Roboto-Medium",
					lineHeight: 22,
					letterSpacing: -0.408,
				},
				headerStyle: {
					borderBottomColor: "#BDBDBD",
					borderBottomWidth: 1,
					backgroundColor: "#FFF",
				},
			}}
		>
			<MainTab.Screen
				options={({ navigation }) => ({
					headerRight: () => (
						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</TouchableOpacity>
					),
					headerTitleAlign: "center",
					headerShown: true,
					headerRightContainerStyle: { right: 16 },
					headerTitle: "Публікації",
					tabBarIcon: ({}) => (
						<AntDesign name="appstore-o" size={24} color="#212121" focused={false} />
					),
					tabBarItemStyle: { left: 40 },
				})}
				name="Posts"
				component={PostsScreen}
			/>

			<MainTab.Screen
				options={({ navigation }) => ({
					tabBarStyle: { display: "none" },
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate("Posts")}>
							<AntDesign name="arrowleft" size={24} color="#212121" />
						</TouchableOpacity>
					),
					headerTitleAlign: "center",
					headerLeftContainerStyle: { left: 16 },
					title: "Створити публікацію",
					tabBarIcon: ({}) => (
						<View style={styles.createPostIcon}>
							<AntDesign name="plus" size={18} color="#ffffff" />
						</View>
					),
				})}
				name="CreatePosts"
				component={CreatePostsScreen}
			/>

			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({}) => <Ionicons name="person-outline" size={24} color="black" />,
					tabBarItemStyle: { right: 40 },
				}}
				name="Profile"
				component={ProfileScreen}
			/>
		</MainTab.Navigator>
	);
};
export default Home;

const styles = StyleSheet.create({
	createPostIcon: {
		width: 70,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FF6C00",
	},
});
