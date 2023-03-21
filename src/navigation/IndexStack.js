import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IndexScreen } from '../screens/IndexScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export const IndexStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='indexS'
				component={IndexScreen}
				options={{ title: 'Inicio' }}
			/>

			<Stack.Screen
				name='loginS'
				component={LoginScreen}
				options={{ title: 'Iniciar Sesion' }}
			/>

			<Stack.Screen
				name='registerS'
				component={RegisterScreen}
				options={{ title: 'Registrarse' }}
			/>
		</Stack.Navigator>
	);
};
