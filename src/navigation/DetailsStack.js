import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from '../screens/DetailsScreen';
import { LoginScreen } from '../screens/LoginScreen';

export const DetailsStack = ({ navigation }) => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='detailsS'
				component={DetailsScreen}
				options={{ title: 'Detalles' }}
			/>
		</Stack.Navigator>
	);
};
