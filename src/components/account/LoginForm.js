import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';

export const LoginForm = () => {
	const [password, setPassword] = useState(false);

	const showPass = () => setPassword(!password);

	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Formato de email no valido')
				.required('Email es obligatorio'),
			password: Yup.string().required('Contraseña obligatoria'),
		}),
		validateOnChange: false,
		onSubmit: async (formData) => {
			try {
				const auth = getAuth();
				await signInWithEmailAndPassword(
					auth,
					formData.email,
					formData.password
				);
				navigation.navigate('indexS');
			} catch (error) {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Error al iniciar sesión',
					text2: error.message,
				});
				console.log(error);
			}
		},
	});

	return (
		<View style={styles.viewForm}>
			<Input
				placeholder='Correo Electrónico'
				containerStyle={styles.input}
				rightIcon={
					<Icon
						type='material-community'
						name='at'
						iconStyle={styles.icon}
					/>
				}
				onChangeText={(text) => formik.setFieldValue('email', text)}
				errorMessage={formik.errors.email}
			/>
			<Input
				placeholder='Contraseña'
				containerStyle={styles.input}
				secureTextEntry={password ? false : true}
				rightIcon={
					<Icon
						type='material-community'
						name={password ? 'eye-off-outline' : 'eye-outline'}
						iconStyle={styles.icon}
						onPress={showPass}
					/>
				}
				onChangeText={(text) => formik.setFieldValue('password', text)}
				errorMessage={formik.errors.password}
			/>
			<Button
				title='Iniciar Sesión'
				containerStyle={styles.containerBtn}
				buttonStyle={styles.btn}
				onPress={formik.handleSubmit}
				loading={formik.isSubmitting}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	viewForm: {
		marginTop: 30,
	},
	input: {
		width: '100%',
		marginTop: 20,
	},
	icon: {
		color: '#c1c1c1',
	},
	containerBtn: {
		width: '95%',
		marginTop: 20,
	},
	btn: {
		backgroundColor: '#0D5BD7',
	},
});
