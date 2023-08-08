import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import Comments from "../Screens/CommentsScreen";
import Map from "../Screens/MapScreen";
import Home from "../Screens/Home";

const MainStack = createStackNavigator();

const Main = () => {
	return (
		<MainStack.Navigator
			initialRouteName="Login"
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
				name="Registration"
				component={RegistrationScreen}
				options={{ headerShown: false }}
			/>

			<MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

			<MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
			
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
