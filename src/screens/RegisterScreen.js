import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { RegisterForm } from '../components/account/RegisterForm';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const RegisterScreen = () => {
	return (
		<KeyboardAwareScrollView>
			<Image
				source={require('../../assets/imagenes/github.jpg')}
				style={styles.logo}
			/>
			<View style={styles.viewForm}>
				<RegisterForm />
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		resizeMode: 'contain',
		marginTop: 30,
	},
	viewForm: {
		marginHorizontal: 40,
	},
});
