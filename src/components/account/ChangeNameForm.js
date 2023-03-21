import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Toast } from 'react-native-toast-message';
import { getAuth, updateProfile } from 'firebase/auth';

export const ChangeNameForm = ({ close, onReload }) => {
	const formik = useFormik({
		initialValues: {
			displayName: '',
		},
		validationSchema: Yup.object({
			displayName: Yup.string().required(
				'El nombre y apellido es obligatorio pendejo'
			),
		}),
		validateOnChange: false,
		onSubmit: async (formData) => {
			try {
				const currentUser = getAuth().currentUser;
				await updateProfile(currentUser, {
					displayName: formData.displayName,
				});
				onReload();
				close();
			} catch (error) {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Error al actualizar el nombre y apellido',
				});
			}
		},
	});

	return (
		<View style={styles.viewForm}>
			<Input
				placeholder='Nombre y Apellido'
				rightIcon={{
					type: 'material-community',
					name: 'account-circle-outline',
					color: '#c2c2c2',
				}}
				containerStyle={styles.input}
				onChangeText={(text) =>
					formik.setFieldValue('displayName', text)
				}
				errorMessage={formik.errors.displayName}
			/>

			<Button
				title='Cambiar nombre y apellido'
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
