import { Button, StyleSheet, Text, View } from 'react-native';

export const InformationScreen = ({ navigation }) => {
	return (
		<View>
			<Text>InformationScreen</Text>
			<Button
				title='Ir a index'
				onPress={() => navigation.navigate('index')}
			/>
			<Button
				title='Ir a detalles'
				onPress={() => navigation.navigate('details')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
