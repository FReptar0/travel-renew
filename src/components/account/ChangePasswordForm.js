import { StyleSheet, Text, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'react-native-elements';
import { Toast } from 'react-native-toast-message';
import { useState } from 'react';
import {
	getAuth,
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';

export const ChangePasswordForm = ({ close }) => {
	const [password, setPassword] = useState(false);
	const showPass = () => setPassword(!password);

	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
			repeatNewPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string().required('Contraseña obligatoria'),
			newPassword: Yup.string().required('Contraseña obligatoria'),
			repeatNewPassword: Yup.string()
				.required('Contraseña obligatoria')
				.oneOf(
					[Yup.ref('newPassword')],
					'Las contraseñas no coinciden'
				),
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
				await updatePassword(user, formData.newPassword);
				close();
			} catch (error) {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Error al cambiar la contraseña',
				});
				console.log(error);
			}
		},
	});

	return (
		<View>
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

			<Input
				placeholder='Nueva contraseña'
				containerStyle={styles.input}
				secureTextEntry={password ? false : true}
				rightIcon={{
					type: 'material-community',
					name: password ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: showPass,
				}}
				onChangeText={(text) =>
					formik.setFieldValue('newPassword', text)
				}
				errorMessage={formik.errors.newPassword}
			/>

			<Input
				placeholder='Confirmar nueva contraseña'
				containerStyle={styles.input}
				secureTextEntry={password ? false : true}
				rightIcon={{
					type: 'material-community',
					name: password ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: showPass,
				}}
				onChangeText={(text) =>
					formik.setFieldValue('repeatNewPassword', text)
				}
				errorMessage={formik.errors.repeatNewPassword}
			/>

			<Button
				title='Cambiar contraseña'
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
