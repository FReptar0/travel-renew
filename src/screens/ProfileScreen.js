import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { ProfileInfo } from '../components/account/ProfileInfo';
import { Loading } from '../components/common/Loading';
import { ProfileOptions } from '../components/account/ProfileOptions';

export const ProfileScreen = () => {
	const navigation = useNavigation();
	const [visibleLoading, setVisibleLoading] = useState(false);
	const [textLoading, setTextLoading] = useState('');
	const [reaload, setReaload] = useState(false);

	const onReload = () => setReaload((prevState) => !prevState);

	const cerrarSesion = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			navigation.navigate('indexS', { screen: 'indexS' });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<ProfileInfo
				setVisibleLoading={setVisibleLoading}
				setTextLoading={setTextLoading}
			/>

			<ProfileOptions onReload={setReaload} />

			<Button
				title='Cerrar sesión'
				onPress={cerrarSesion}
				buttonStyle={styles.button}
				titleStyle={styles.title}
			/>
			<Loading visible={visibleLoading} text={textLoading} />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#e3e3e3',
		borderBottomColor: '#e3e3e3',
		marginTop: 30,
		paddingVertical: 10,
	},
	title: {
		color: '#0D5BD7',
	},
});
