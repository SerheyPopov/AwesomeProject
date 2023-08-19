import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";

import { RegistrationScreen } from "./RegistrationScreen";
import { LoginScreen } from "./LoginScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Main from "../Components/Main";
import { authStateChangeUser } from "../Redux/authOperations";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const Home = () => {
	const stateChange = useSelector((state) => state.stateChange);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authStateChangeUser());
	}, [dispatch]);

	if (!stateChange) {
		return (
			<MainStack.Navigator initialRouteName="Login">
				<MainStack.Screen
					name="Registration"
					component={RegistrationScreen}
					options={{ headerShown: false }}
				/>
				<MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
			</MainStack.Navigator>
		);
	}

	return (
		<MainTab.Navigator
			initialRouteName="Main"
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
				options={() => ({
					tabBarIcon: ({}) => (
						<AntDesign name="appstore-o" size={24} color="#212121" focused={false} />
					),
					tabBarItemStyle: { left: 40 },
					headerShown: false,
				})}
				name="Main"
				component={Main}
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
