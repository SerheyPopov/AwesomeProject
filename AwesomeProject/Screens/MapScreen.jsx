import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {
	const { latitude, longitude } = route.params.location;
	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
			>
				<Marker title="I am here" coordinate={{ latitude, longitude }} description="Hello" />
			</MapView>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	mapStyle: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
