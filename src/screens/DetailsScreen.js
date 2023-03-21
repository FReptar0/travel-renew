import { Button, StyleSheet, Text, View } from 'react-native';

export const DetailsScreen = ({ navigation }) => {
	return (
		<View>
			<Text>DetailsScreen</Text>
			<Button
				title='Ir a index'
				onPress={() => navigation.navigate('index')}
			/>
			<Button
				title='Ir a informacion'
				onPress={() => navigation.navigate('information')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
