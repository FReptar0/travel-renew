import {
	getAuth,
	updateEmail,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export const ChangeEmailForm = ({ close, onReload }) => {
	const [password, setPassword] = useState(false);
	const showPass = () => setPassword(!password);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email obligatorio'),
			password: Yup.string().required('Contraseña obligatoria'),
		}),
		validateOnChange: false,
		onSubmit: async (formData) => {
			try {
				console.log(formData);
				const user = getAuth().currentUser;
				const credential = EmailAuthProvider.credential(
					user.email,
					formData.password
				);
				await reauthenticateWithCredential(user, credential);
				await updateEmail(user, formData.email);
				// Actualizar el texto del toast
				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'Email actualizado',
				});
				close();
				onReload();
			} catch (error) {
				console.log(error);
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Error al actualizar el correo',
				});
			}
		},
	});

	return (
		<View style={styles.viewForm}>
			<Input
				placeholder='Nuevo email'
				rightIcon={{
					type: 'material-community',
					name: 'at',
					color: '#c2c2c2',
				}}
				containerStyle={styles.input}
				onChangeText={(text) => formik.setFieldValue('email', text)}
				errorMessage={formik.errors.email}
			/>

			<Input
				placeholder='Contraseña'
				containerStyle={styles.input}
				secureTextEntry={password ? false : true}
				rightIcon={{
					type: 'material-community',
					name: password ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: showPass,
				}}
				onChangeText={(text) => formik.setFieldValue('password', text)}
				errorMessage={formik.errors.password}
			/>

			<Button
				title='Cambiar email'
				containerStyle={styles.btnContainer}
				buttonStyle={styles.btnStyle}
				onPress={formik.handleSubmit}
				loading={formik.isSubmitting}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	viewForm: {
		paddingVertical: 10,
		alignItems: 'center',
	},
	input: {
		marginBottom: 10,
	},
	btnContainer: {
		width: '95%',
		marginTop: 15,
	},
	btnStyle: {
		backgroundColor: '#00a680',
	},
});
