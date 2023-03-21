import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { LoginForm } from '../components/account/LoginForm';

export const LoginScreen = () => {
	const navigation = useNavigation();

	const irARegistro = () => {
		navigation.navigate('registerS');
	};

	return (
		<View>
			<Image
				source={require('../../assets/imagenes/github.jpg')}
				style={styles.logo}
			/>
			<View style={styles.contentForm}>
				<LoginForm />
				<Text style={styles.text}>
					¿Aún no tienes una cuenta?{' '}
					<Text style={styles.textBtn} onPress={irARegistro}>
						Registrate
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		resizeMode: 'contain',
		marginTop: 30,
	},
	contentForm: {
		marginHorizontal: 30,
	},
	text: {
		marginTop: 15,
		marginHorizontal: 10,
	},
	textBtn: {
		fontWeight: 'bold',
		color: '#0D5BD7',
	},
});
