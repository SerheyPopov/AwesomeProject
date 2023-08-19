import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Comments from "../Screens/CommentsScreen";
import Map from "../Screens/MapScreen";
import PostsScreen from "../Screens/PostsScreen";
import { authSingOutUser } from "../Redux/authOperations";

const MainStack = createStackNavigator();

const Main = () => {
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(authSingOutUser());
	};

	return (
		<MainStack.Navigator
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
			<MainStack.Screen
				options={() => ({
					headerRight: () => (
						<TouchableOpacity onPress={handleLogOut}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</TouchableOpacity>
					),
					headerRightContainerStyle: { right: 16 },
					headerTitle: "Публікації",
					headerTitleAlign: "center",
				})}
				name="Posts"
				component={PostsScreen}
			/>
			<MainStack.Screen
				name="Comments"
				component={Comments}
				options={() => ({
					headerTitleAlign: "center",
					headerTitle: "Коментарі",
				})}
			/>
			<MainStack.Screen
				name="Map"
				component={Map}
				options={() => ({
					headerTitleAlign: "center",
					headerTitle: "Карта",
				})}
			/>
		</MainStack.Navigator>
	);
};
export default Main;
