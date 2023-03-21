import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoginScreen } from './LoginScreen';

import { Loading } from '../components/common/Loading';

export const IndexScreen = ({ navigation }) => {
	const [session, setSession] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setSession(user ? true : false);
		});
	}, []);

	if (session === null) {
		return <Loading text='Validando...' />;
	}

	return session ? (
		<View>
			<Text>IndexScreen</Text>
			<Button
				title='Ir a detalles'
				onPress={() => navigation.navigate('details')}
			/>
			<Button
				title='Ir a informacion'
				onPress={() => navigation.navigate('information')}
			/>
			<Button
				title='Ir a Login'
				onPress={() =>
					navigation.navigate('details', { screen: 'loginS' })
				}
			/>
		</View>
	) : (
		<LoginScreen />
	);
};

const styles = StyleSheet.create({});
