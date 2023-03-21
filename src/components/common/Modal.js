import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
export const Modal = ({ visible, close, children }) => {
	return (
		<Overlay
			isVisible={visible}
			onBackdropPress={close}
			overlayStyle={styles.overlay}
		>
			{children}
		</Overlay>
	);
};

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: '#fff',
		height: 'auto',
		width: '90%',
	},
});
