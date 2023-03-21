import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/ProfileScreen';

export const ProfileStack = ({ navigation }) => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='profileS'
				component={ProfileScreen}
				options={{ title: 'Perfil' }}
			/>
		</Stack.Navigator>
	);
};
