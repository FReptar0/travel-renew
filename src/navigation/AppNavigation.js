import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from '../screens/DetailsScreen';
import { IndexScreen } from '../screens/IndexScreen';
import { InformationScreen } from '../screens/InformationScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { DetailsStack } from './DetailsStack';
import { IndexStack } from './IndexStack';

import { Button, Icon, ThemeProvider } from 'react-native-elements';
import { ProfileStack } from './ProfileStack';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const Drawer = createDrawerNavigator();

// export const AppNavigation = () => {
// 	return (
// 		<Drawer.Navigator>
// 			<Drawer.Screen
// 				name='index'
// 				component={IndexScreen}
// 				options={{ title: 'Inicio' }}
// 			/>
// 			<Drawer.Screen
// 				name='details'
// 				component={DetailsScreen}
// 				options={{ title: 'Detalles' }}
// 			/>
// 			<Drawer.Screen
// 				name='information'
// 				component={InformationScreen}
// 				options={{ title: 'Informacion' }}
// 			/>
// 		</Drawer.Navigator>
// 	);
// };

export const AppNavigation = () => {
	const Tab = createBottomTabNavigator();
	const [session, setSession] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setSession(user ? true : false);
		});
	}, []);

	return session ? (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: 'blue',
				tabBarInactiveTintColor: 'gray',
				tabBarIcon: ({ color, size }) => showIcons(route, color, size),
			})}
		>
			<Tab.Screen
				name='index'
				component={IndexStack}
				options={{ title: 'Inicio', headerShown: false }}
			/>

			<Tab.Screen
				name='details'
				component={DetailsStack}
				options={{ title: 'Detalles' }}
			/>

			<Tab.Screen
				name='profile'
				component={ProfileStack}
				options={{ title: 'Perfil' }}
			/>
		</Tab.Navigator>
	) : (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: 'blue',
				tabBarInactiveTintColor: 'gray',
				tabBarIcon: ({ color, size }) => showIcons(route, color, size),
			})}
		>
			<Tab.Screen
				name='index'
				component={IndexStack}
				options={{ title: 'Inicio', headerShown: false }}
			/>
		</Tab.Navigator>
	);
};

const showIcons = (route, color, size) => {
	let icon;

	if (route.name === 'index') {
		icon = 'home-outline';
	}

	if (route.name === 'details') {
		icon = 'details';
	}

	if (route.name === 'profile') {
		icon = 'account-outline';
	}

	return (
		<Icon type='material-community' name={icon} size={size} color={color} />
	);
};
